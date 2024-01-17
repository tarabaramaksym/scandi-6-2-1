/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

export enum NotificationActionType {
    SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
    HIDE_NOTIFICATION = 'HIDE_NOTIFICATION',
}

export enum NotificationType {
    INFO = 'info',
    ERROR = 'error',
    SUCCESS = 'success',
}

export interface Notification<T> {
    msgType: NotificationType;
    msgText: string;
    msgDebug?: T;
}

export interface ShowNotificationAction<T = unknown> extends AnyAction {
    type: NotificationActionType.SHOW_NOTIFICATION;
    msgType?: NotificationType;
    msgText?: string;
    msgDebug?: T;
}

export interface HideNotificationAction extends AnyAction {
    type: NotificationActionType.HIDE_NOTIFICATION;
    id?: string;
}

export type NotificationAction = ShowNotificationAction<unknown> | HideNotificationAction;

export interface NotificationStore {
    notifications: Record<string, Notification<unknown>>;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        NotificationReducer: NotificationStore;
    }
}
