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

import {
    WishlistItemComponentContainerPropKeys,
    WishlistItemComponentProps,
    WishlistItemContainerBaseProps,
    WishlistItemContainerMapDispatchProps,
    WishlistItemContainerMapStateProps,
    WishlistItemContainerState,
} from 'Component/WishlistItem/WishlistItem.type';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SharedWishlistItemContainerMapStateProps extends WishlistItemContainerMapStateProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SharedWishlistItemContainerMapDispatchProps extends WishlistItemContainerMapDispatchProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SharedWishlistItemContainerBaseProps extends WishlistItemContainerBaseProps {}

export type SharedWishlistItemContainerProps = SharedWishlistItemContainerMapStateProps
& SharedWishlistItemContainerMapDispatchProps
& SharedWishlistItemContainerBaseProps;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SharedWishlistItemContainerState extends WishlistItemContainerState {
    quantity: number;
}

export interface SharedWishlistItemComponentProps extends WishlistItemComponentProps {
    configurableVariantIndex: number;
    parameters: string[];
    quantity: number;
}

export type SharedWishlistItemComponentContainerPropKeys = WishlistItemComponentContainerPropKeys
| 'configurableVariantIndex'
| 'parameters'
| 'quantity';
