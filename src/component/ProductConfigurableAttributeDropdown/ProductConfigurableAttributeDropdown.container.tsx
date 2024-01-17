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

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import ProductConfigurableAttributeDropdown from './ProductConfigurableAttributeDropdown.component';
import {
    ProductConfigurableAttributeDropdownComponentContainerProps,
    ProductConfigurableAttributeDropdownComponentProps,
    ProductConfigurableAttributeDropdownContainerFunctions,
    ProductConfigurableAttributeDropdownContainerProps,
    ProductConfigurableAttributeDropdownOption,
} from './ProductConfigurableAttributeDropdown.type';

/** @namespace Component/ProductConfigurableAttributeDropdown/Container */
export class ProductConfigurableAttributeDropdownContainer extends PureComponent<
ProductConfigurableAttributeDropdownContainerProps
> {
    static defaultProps: Partial<ProductConfigurableAttributeDropdownContainerProps> = {
        isUnselected: false,
    };

    containerFunctions: ProductConfigurableAttributeDropdownContainerFunctions = {
        onChange: this.onChange.bind(this),
    };

    onChange(value: string): void {
        const {
            updateConfigurableVariant,
            option: { attribute_code = '' },
        } = this.props;

        if (updateConfigurableVariant) {
            updateConfigurableVariant(attribute_code, value, true);
        }
    }

    containerProps(): Pick<
    ProductConfigurableAttributeDropdownComponentProps,
    ProductConfigurableAttributeDropdownComponentContainerProps
    > {
        const {
            option: { attribute_code = '', attribute_label = '' },
            isUnselected,
            handleShakeAnimationEnd,
        } = this.props;

        return {
            selectValue: this._getSelectValue(),
            selectOptions: this._getSelectOptions(),
            selectName: attribute_code,
            selectLabel: attribute_label,
            isUnselected,
            handleShakeAnimationEnd,
        };
    }

    _getSelectOptions(): Partial<ProductConfigurableAttributeDropdownOption>[] {
        const {
            option: {
                attribute_options = {},
                attribute_code,
            },
            getIsConfigurableAttributeAvailable,
        } = this.props;

        if (!attribute_options) {
            // eslint-disable-next-line no-console
            console.warn(`Please make sure "${attribute_code}" is visible on Storefront.`);

            return [];
        }

        return Object.values(attribute_options)
            .reduce((acc: Partial<ProductConfigurableAttributeDropdownOption>[], option) => {
                const { value } = option;

                const isAvailable = getIsConfigurableAttributeAvailable({
                    attribute_code,
                    attribute_value: value,
                });

                return [...acc, {
                    ...option,
                    id: value,
                    isAvailable,
                }];
            }, []);
    }

    _getSelectValue(): string {
        const { option: { attribute_code = '' } } = this.props;
        const { parameters = {} } = this.props;

        return parameters[ attribute_code ]?.toString();
    }

    render(): ReactElement {
        return (
            <ProductConfigurableAttributeDropdown
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductConfigurableAttributeDropdownContainer;
