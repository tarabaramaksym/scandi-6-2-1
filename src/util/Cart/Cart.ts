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

import { ShippingMethod } from 'Query/Checkout.type';
import { IndexedCartItem } from 'Store/Cart/Cart.type';
import { RootState } from 'Util/Store/Store.type';

import {
    CartItemPriceProps,
    DisplayCartTaxInPrice,
    DisplayCartTaxInShipping,
    DisplayCartTaxInSubTotal,
    DisplayShippingPrices,
} from './Cart.type';

/** @namespace Util/Cart/getCartSubtotal */
export const getCartSubtotal = (state: RootState): number => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_subtotal = '',
            } = {},
        } = {},
        CartReducer: {
            cartTotals: {
                prices: {
                    subtotal_excluding_tax: {
                        value: subtotal = 0,
                    } = {},
                    subtotal_including_tax: {
                        value: subtotal_incl_tax = 0,
                    } = {},
                } = {},
            } = {},
        } = {},
    } = state;

    if (display_tax_in_subtotal === DisplayCartTaxInSubTotal.EXCL_TAX) {
        return subtotal;
    }

    return subtotal_incl_tax;
};

/** @namespace Util/Cart/getCartSubtotalSubPrice */
export const getCartSubtotalSubPrice = (state: RootState): number | null => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_subtotal = '',
            } = {},
        } = {},
        CartReducer: {
            cartTotals: {
                prices: {
                    subtotal_excluding_tax: {
                        value: subtotal = 0,
                    } = {},
                } = {},
            } = {},
        } = {},
    } = state;

    if (display_tax_in_subtotal === DisplayCartTaxInSubTotal.BOTH) {
        return subtotal;
    }

    return null;
};

/** @namespace Util/Cart/getCartItemPrice */
export const getCartItemPrice = (state: RootState) => (props: CartItemPriceProps): number => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_price = '',
            } = {},
        } = {},
    } = state;

    const {
        row_total = 0,
        row_total_incl_tax = 0,
    } = props;

    if (display_tax_in_price === DisplayCartTaxInPrice.EXCL_TAX) {
        return row_total;
    }

    return row_total_incl_tax;
};

/** @namespace Util/Cart/getCartItemSubPrice */
export const getCartItemSubPrice = (state: RootState) => (props: CartItemPriceProps): number | null => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_price = '',
            } = {},
        } = {},
    } = state;

    const {
        row_total = 0,
    } = props;

    if (display_tax_in_price === DisplayCartTaxInPrice.BOTH) {
        return row_total;
    }

    return null;
};

/** @namespace Util/Cart/getCartShippingPrice */
export const getCartShippingPrice = (state: RootState): number => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_shipping_amount = '',
            } = {},
        } = {},
        CartReducer: {
            cartTotals: {
                shipping_addresses: {
                    selected_shipping_method,
                } = {},
            } = {},
        } = {},
    } = state;

    if (!selected_shipping_method) {
        return 0;
    }

    const {
        amount: {
            value: shipping_amount = 0,
        } = {},
        amount_incl_tax: shipping_incl_tax = 0,
    } = selected_shipping_method;

    if (display_tax_in_shipping_amount === DisplayCartTaxInShipping.EXCL_TAX) {
        return shipping_amount;
    }

    return shipping_incl_tax;
};

/** @namespace Util/Cart/getCartShippingSubPrice */
export const getCartShippingSubPrice = (state: RootState): number | null => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_shipping_amount = '',
            } = {},
        } = {},
        CartReducer: {
            cartTotals: {
                shipping_addresses: {
                    selected_shipping_method,
                } = {},
            } = {},
        } = {},
    } = state;

    if (!selected_shipping_method) {
        return null;
    }

    const {
        amount: {
            value: shipping_amount = 0,
        } = {},
    } = selected_shipping_method;

    if (display_tax_in_shipping_amount === DisplayCartTaxInShipping.BOTH) {
        return shipping_amount;
    }

    return null;
};

/** @namespace Util/Cart/getCartShippingItemPrice */
export const getCartShippingItemPrice = (state: RootState) => (props: ShippingMethod): number => {
    const {
        ConfigReducer: {
            priceTaxDisplay: {
                shipping_price_display_type = '',
            } = {},
        } = {},
    } = state;

    const {
        price_incl_tax = 0,
        price_excl_tax = 0,
    } = props;

    if (shipping_price_display_type === DisplayShippingPrices.EXCL_TAX) {
        return price_excl_tax;
    }

    return price_incl_tax;
};

/** @namespace Util/Cart/getCartShippingItemSubPrice */
export const getCartShippingItemSubPrice = (state: RootState) => (props: ShippingMethod): number | null => {
    const {
        ConfigReducer: {
            priceTaxDisplay: {
                shipping_price_display_type = '',
            } = {},
        } = {},
    } = state;

    const {
        price_excl_tax = 0,
    } = props;

    if (shipping_price_display_type === DisplayShippingPrices.BOTH) {
        return price_excl_tax;
    }

    return null;
};

/** @namespace Util/Cart/getCartTotalSubPrice */
export const getCartTotalSubPrice = (state: RootState): number | null => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                include_tax_in_order_total = '',
            } = {},
        } = {},
        CartReducer: {
            cartTotals: {
                prices: {
                    grand_total: {
                        value: grand_total = 0,
                    } = {},
                    applied_taxes = [],
                } = {},
            } = {},
        } = {},
    } = state;

    if (include_tax_in_order_total) {
        return applied_taxes.reduce((acc, { amount: { value: tax_amount = 0 } = {} }) => acc - tax_amount, grand_total);
    }

    return null;
};

/** @namespace Util/Cart/getItemsCountLabel */
export const getItemsCountLabel = (items_qty: number): string => (
    items_qty === 1
        ? __('1 item')
        : __('%s items', items_qty || 0)
);

/** @namespace Util/Cart/getAllCartItemsSku */
export const getAllCartItemsSku = (
    cartItems: IndexedCartItem[],
): Array<{ sku: string }> => (cartItems ? cartItems.reduce<Array<{ sku: string }>>((acc, item) => {
    acc.push({ sku: item.sku || '' });

    return acc;
}, []) : []);

/** @namespace Util/Cart/trimCrossSellDuplicateItems */
export const trimCrossSellDuplicateItems = (items: IndexedCartItem[]): IndexedCartItem[] => items.filter(
    ({
        sku: itemSku,
        product: { variants: itemVariants, id: itemId },
    }, index, array) => {
        if (!index || !itemVariants?.length) {
            return true;
        }

        const foundItem = array.find(({ product: { id: elementId } }) => elementId === itemId);

        if (!foundItem) {
            return false;
        }

        const {
            sku: duplicateSku,
            product: { id: duplicateId },
        } = foundItem;

        return (duplicateId === itemId && duplicateSku === itemSku);
    },
);
