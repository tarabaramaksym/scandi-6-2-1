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

import { ProductItem } from 'Query/ProductList.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface StyleGuidePageContainerMapStateProps {
    product: Partial<IndexedProduct>;
}

export interface StyleGuidePageContainerMapDispatchProps {
    updateProductDetails: (product: ProductItem) => void;
}

export type StyleGuidePageContainerProps = StyleGuidePageContainerMapStateProps
& StyleGuidePageContainerMapDispatchProps;

export interface StyleGuidePageComponentProps {
    fakeFunction: () => string;
    product: Partial<IndexedProduct>;
}
