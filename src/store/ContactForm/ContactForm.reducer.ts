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

import { Reducer } from 'redux';

import {
    ContactFormActionType,
    ContactFormStore,
    UpdateContactFormAction,
} from './ContactForm.type';

export const initialState = {
    isLoading: false,
};

/** @namespace Store/ContactForm/Reducer/ContactFormReducer */
export const ContactFormReducer: Reducer<ContactFormStore, UpdateContactFormAction> = (
    state = initialState,
    action,
) => {
    const {
        type,
        data,
    } = action;

    switch (type) {
    case ContactFormActionType.UPDATE_CONTACT_FORM:
        return { ...state, ...data };

    default:
        return state;
    }
};

export default ContactFormReducer;
