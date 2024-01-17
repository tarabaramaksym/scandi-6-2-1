/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

export enum RouterItemType {
    BEFORE_ITEMS_TYPE = 'BEFORE_ITEMS_TYPE',
    SWITCH_ITEMS_TYPE = 'SWITCH_ITEMS_TYPE',
    AFTER_ITEMS_TYPE = 'AFTER_ITEMS_TYPE',
}

export enum RouterBeforeItemType {
    NOTIFICATION_LIST = 'NOTIFICATION_LIST',
    NAVIGATION_TABS = 'NAVIGATION_TABS',
    DEMO_NOTICE = 'DEMO_NOTICE',
    HEADER = 'HEADER',
    BREADCRUMBS = 'BREADCRUMBS',
    NEW_VERSION_POPUP = 'NEW_VERSION_POPUP',
}

export enum RouterSwitchItemType {
    HOME = 'HOME',
    SEARCH = 'SEARCH',
    CMS_PAGE = 'CMS_PAGE',
    CART = 'CART',
    CHECKOUT = 'CHECKOUT',
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
    CREATE_ACCOUNT = 'CREATE_ACCOUNT',
    LOGIN = 'LOGIN',
    ACCOUNT_FORGOT_PASSWORD = 'ACCOUNT_FORGOT_PASSWORD',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
    CONFIRM_ACCOUNT = 'CONFIRM_ACCOUNT',
    MY_ACCOUNT = 'MY_ACCOUNT',
    MY_ACCOUNT_ORDER = 'MY_ACCOUNT_ORDER',
    MY_ACCOUNT_ORDERS = 'MY_ACCOUNT_ORDERS',
    MY_ACCOUNT_DOWNLOADABLE = 'MY_ACCOUNT_DOWNLOADABLE',
    MY_ACCOUNT_WISHLIST = 'MY_ACCOUNT_WISHLIST',
    MY_ACCOUNT_ADDRESS = 'MY_ACCOUNT_ADDRESS',
    MY_ACCOUNT_NEWSLETTER = 'MY_ACCOUNT_NEWSLETTER',
    MENU = 'MENU',
    SHARED_WISHLIST = 'SHARED_WISHLIST',
    CONTACT_PAGE = 'CONTACT_PAGE',
    COMPARE = 'COMPARE',
    STYLE_GUIDE = 'STYLE_GUIDE',
    URL_REWRITES = 'URL_REWRITES',
}

export enum RouterAfterItemType {
    FOOTER = 'FOOTER',
    COOKIE_POPUP = 'COOKIE_POPUP',
}

export const URL_ONLY_MAIN_ITEMS_RENDER = [
    '/sales/order/print',
    '/styleguide',
];
