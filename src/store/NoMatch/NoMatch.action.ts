/* eslint-disable import/prefer-default-export */
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

import { NoMatchActionType, UpdateNoMatchAction } from './NoMatch.type';

/**
 * Update router to show NoMatch page
 * @param  {Boolean} noMatch New noMatch value
 * @return {void}
 * @namespace Store/NoMatch/Action/updateNoMatch
 */
export const updateNoMatch = (noMatch: boolean): UpdateNoMatchAction => ({
    type: NoMatchActionType.UPDATE_NOMATCH,
    noMatch,
});
