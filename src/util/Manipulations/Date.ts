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

import { getDateValue } from 'Util/Form/Extract';

export const MILLISECONDS_PER_MINUTE = 60000;

/** @namespace Util/Manipulations/Date/convertStringToDate */
export const convertStringToDate = (stringDate: string, options?: Intl.DateTimeFormatOptions): string => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const date = new Date(stringDate.replace(/\s/, 'T'));
    const language = navigator.languages ? navigator.languages[0] : navigator.language;

    return date.toLocaleDateString(language, options || defaultOptions);
};

/** @namespace Util/Manipulations/Date/getTimeInCurrentTimezone */
export const getTimeInCurrentTimezone = (timestamp: string): number | string | Date => {
    const currentDate = new Date();
    const timezone = currentDate.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
    const timeInCurrentTimezone = new Date(timestamp.replace(/-/g, '/')).getTime() - new Date(timezone).getTime();

    return getDateValue(timeInCurrentTimezone);
};
