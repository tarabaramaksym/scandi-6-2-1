/* eslint-disable @scandipwa/scandipwa-guidelines/no-arrow-functions-in-class */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { GraphQlResponse } from '@tilework/opus';

import { isSignedIn } from 'Util/Auth/IsSignedIn';
import { getAuthorizationToken, refreshAuthorizationToken } from 'Util/Auth/Token';
import { refreshUid } from 'Util/Compare';
import { getCurrency } from 'Util/Currency';
import {
    GRAPHQL_URI, HTTP_201_CREATED, HTTP_410_GONE, HTTP_503_SERVICE_UNAVAILABLE, ONE_MONTH_IN_SECONDS, WINDOW_ID,
} from 'Util/Request/Config';

import { hash } from './Hash';

/** @namespace Util/Request/getWindowId */
export const getWindowId = (): string => {
    const result = sessionStorage.getItem(WINDOW_ID);

    if (!result) {
        const id = String(Date.now());

        sessionStorage.setItem(WINDOW_ID, id);

        return id;
    }

    return result;
};

/** @namespace Util/Request/getStoreCodePath */
export const getStoreCodePath = (): string => {
    const path = location.pathname;
    // eslint-disable-next-line no-undef
    const firstPathPart = path.split('/')[1];

    if (window.storeList.includes(firstPathPart)) {
        return `/${ firstPathPart }`;
    }

    return '';
};

/** @namespace Util/Request/getGraphqlEndpoint */
export const getGraphqlEndpoint = (): string => getStoreCodePath().concat(GRAPHQL_URI);

/**
 * Append authorization token to header object
 * @param {Object} headers
 * @returns {Object} Headers with appended authorization
 * @namespace Util/Request/appendTokenToHeaders
 */
export const appendTokenToHeaders = (headers: HeadersInit): HeadersInit => {
    const token = getAuthorizationToken();

    return {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
    };
};

/**
 *
 * @param {String} query Request body
 * @param {Object} variables Request variables
 * @param {String} url GraphQL url
 * @returns {*}
 * @namespace Util/Request/formatURI
 */
export const formatURI = (query: string, variables: Record<string, string>, url: string): string => {
    const stringifyVariables = Object.keys(variables).reduce(
        (acc, variable) => [...acc, `${ variable }=${ JSON.stringify(variables[variable]) }`],
        [`?hash=${ hash(query) }`],
    );

    return `${ url }${ stringifyVariables.join('&') }`;
};

/**
 *
 * @param {String} uri
 * @param {String} name
 * @returns {Promise<Response>}
 * @namespace Util/Request/getFetch
 */
export const getFetch = (uri: string, name: string, signal?: AbortSignal): Promise<Response> => fetch(
    uri,
    {
        method: 'GET',
        signal,
        headers: appendTokenToHeaders({
            'Content-Type': 'application/json',
            'Content-Currency': getCurrency(),
            'Application-Model': `${ name }_${ getWindowId() }`,
            Accept: 'application/json',
        }),
    },
);

// TODO CacheTTL number or string?
/**
 *
 * @param {String} graphQlURI
 * @param {{}} query Request body
 * @param {Int} cacheTTL
 * @namespace Util/Request/putPersistedQuery
 */
export const putPersistedQuery = (
    graphQlURI: string,
    query: string,
    cacheTTL: number,
): Promise<Response> => fetch(
    `${ graphQlURI }?hash=${ hash(query) }`,
    {
        method: 'PUT',
        body: JSON.stringify(query),
        headers: {
            'Content-Type': 'application/json',
            'SW-Cache-Age': String(Number.isInteger(cacheTTL) ? cacheTTL : ONE_MONTH_IN_SECONDS),
        },
    },
);

/**
 *
 * @param {String} graphQlURI
 * @param {String} queryObject
 * @param {String} name
 * @returns {Promise<Response>}
 * @namespace Util/Request/postFetch
 */
export const postFetch = (
    graphQlURI: string,
    query: string,
    variables: Record<string, string>,
): Promise<Response> => fetch(
    graphQlURI,
    {
        method: 'POST',
        body: JSON.stringify({ query, variables }),
        headers: appendTokenToHeaders({
            'Content-Type': 'application/json',
            'Content-Currency': getCurrency(),
            Accept: 'application/json',
        }),
    },
);

export type ResponseBody<T> = Omit<GraphQlResponse, 'data'> & {
    data: T;
};

/**
 * Checks for errors in response, if they exist, rejects promise
 * @param  {Object} res Response from GraphQL endpoint
 * @return {Promise<Object>} Handled GraphqlQL results promise
 * @namespace Util/Request/checkForErrors
 */
export const checkForErrors = <T>(res: ResponseBody<T>): Promise<T> => new Promise((resolve, reject) => {
    const { errors, data } = res;

    if (errors) {
        reject(errors);

        return;
    }

    resolve(data);
});

/**
 * Handle connection errors
 * @param  {any} err Error from fetch
 * @return {void} Simply console error
 * @namespace Util/Request/handleConnectionError
 */
// eslint-disable-next-line no-console
export const handleConnectionError = (err: unknown, msg: string): void => {
    // eslint-disable-next-line no-console
    console.error(msg, err);
}; // TODO: Add to logs pool

/**
 * Parse response and check wether it contains errors
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 * @namespace Util/Request/parseResponse
 */
export const parseResponse = async <T>(response: Response): Promise<T> => {
    try {
        const promiseResponse = await response;
        const data = await promiseResponse.json();

        return await checkForErrors(data);
    } catch (err) {
        handleConnectionError(err, 'Can not parse JSON!');

        throw err;
    }
};

// TODO
export interface QueryObject {
    query: string;
    variables: Record<string, string>;
}

export type QueryVariables = Record<string, string>;

/**
 * Make GET request to endpoint (via ServiceWorker)
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
 * @param  {Number} cacheTTL Cache TTL (in seconds) for ServiceWorker to cache responses
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 * @namespace Util/Request/executeGet
 */
export const executeGet = async <T>(
    queryObject: QueryObject,
    name: string,
    cacheTTL: number,
    signal?: AbortSignal,
): Promise<T> => {
    const { query, variables } = queryObject;
    const uri = formatURI(query, variables, getGraphqlEndpoint());

    if (isSignedIn()) {
        refreshAuthorizationToken();
        refreshUid();
    }

    // Fetch only throws on network error, http errors have to be handled manually.
    try {
        const result = await getFetch(uri, name, signal);

        if (result.status === HTTP_410_GONE) {
            const putResponse = await putPersistedQuery(getGraphqlEndpoint(), query, cacheTTL);

            if (putResponse.status === HTTP_201_CREATED) {
                return await parseResponse(await getFetch(uri, name, signal));
            }
        }

        if (result.status === HTTP_503_SERVICE_UNAVAILABLE) {
            handleConnectionError(result.status, result.statusText);
            throw new Error(result.statusText);
        }

        // Successful and all other http responses go here:
        return await parseResponse(result);
    } catch (error) {
        // Network error
        handleConnectionError(error, 'executeGet failed');
        throw new Error(error as string);
    }
};
/**
 * Make POST request to endpoint
 * @param  {{}} queryObject prepared with `prepareDocument()` from `Util/Query` request body object
 * @return {Promise<Request>} Fetch promise to GraphQL endpoint
 * @namespace Util/Request/executePost
 */
export const executePost = async <T>(queryObject: QueryObject): Promise<T> => {
    const { query, variables } = queryObject;

    if (isSignedIn()) {
        refreshAuthorizationToken();
        refreshUid();
    }

    try {
        const response = await postFetch(getGraphqlEndpoint(), query, variables);

        return await parseResponse(response);
    } catch (err) {
        handleConnectionError(err, 'executePost failed');

        throw err;
    }
};

/**
 * Listen to the BroadCast connection
 * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
 * @return {Promise<any>} Broadcast message promise
 * @namespace Util/Request/listenForBroadCast
 */
export const listenForBroadCast = <T = unknown>(name: string): Promise<T> => new Promise((resolve) => {
    const { BroadcastChannel } = window;
    const windowId = getWindowId();

    if (BroadcastChannel) {
        const bc = new BroadcastChannel(`${ name }_${ windowId }`);

        bc.onmessage = (update) => {
            const { data: { payload: body } } = update;

            resolve(checkForErrors(body));
        };
    }
});
