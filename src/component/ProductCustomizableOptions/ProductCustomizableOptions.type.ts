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

import { IndexedCustomOption, ProductOption } from 'Util/Product/Product.type';

export interface ProductCustomizableOptionsContainerProps {
    options: IndexedCustomOption[];
    updateSelectedValues: (data?: Partial<ProductOption>) => void;
}

export interface ProductCustomizableOptionsComponentProps {
    options: IndexedCustomOption[];
    updateSelectedValues: (data?: Partial<ProductOption>) => void;
}
