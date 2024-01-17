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

import { FieldType } from 'Component/Field/Field.config';
import { FieldContainerProps } from 'Component/Field/Field.type';
import { FormSection } from 'Component/FieldForm/FieldForm.type';
import { ValidationInputType } from 'Util/Validator/Config';

import {
    MyAccountAddressFormEvents,
    MyAccountAddressFormProps,
} from './MyAccountAddressForm.type';

/**
 * Returns fields for street
 * @param props
 * @returns {[{addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue: (*|string), name: string, placeholder: *}}]|*[]}
 * @namespace Component/MyAccountAddressForm/Form/getStreetFields */
export const getStreetFields = (props: MyAccountAddressFormProps): Partial<FieldContainerProps>[] => {
    const {
        addressLinesQty = 1,
        address: { street = [] } = {},
    } = props;

    if (addressLinesQty === 1) {
        return [{
            type: FieldType.TEXT,
            label: __('Street address'),
            attr: {
                name: 'street',
                defaultValue: street[ 0 ] || '',
                placeholder: __('Your street address'),
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true,
            },
        }];
    }

    const streets = [];

    // eslint-disable-next-line fp/no-loops, fp/no-let
    for (let i = 0; i < addressLinesQty; i++) {
        streets.push({
            type: FieldType.TEXT,
            label: __('Street address line %s', i + 1),
            attr: {
                name: `street_${i}`,
                defaultValue: street[ i ] || '',
                placeholder: __('Your street address line %s', i + 1),
            },
            addRequiredTag: i === 0,
            validateOn: i === 0 ? ['onChange'] : [],
            validationRule: {
                isRequired: i === 0,
            },
        });
    }

    return streets;
};

/**
 * Returns region fields
 * @param props
 * @param events
 * @returns {[{addRequiredTag: boolean, validateOn: (string[]|*[]), validationRule: {isRequired}, options, label: *, type: string, attr: {defaultValue: number, name: string, selectPlaceholder: *}}]|*[]|[{validateOn: (string[]|*[]), validationRule: {isRequired}, label: *, type: string, attr: {defaultValue, name: string, id: string, placeholder: *}}]}
 * @namespace Component/MyAccountAddressForm/Form/getRegionFields
 */
export const getRegionFields = (
    props: MyAccountAddressFormProps,
    events: MyAccountAddressFormEvents,
): Partial<FieldContainerProps>[] => {
    const {
        currentRegion,
        currentRegionId,
        regionDisplayAll,
        availableRegions,
        isStateRequired,
    } = props;

    const { onRegionChange, onRegionIdChange } = events;

    if (!regionDisplayAll && !isStateRequired) {
        return [];
    }

    if (!availableRegions || !availableRegions.length) {
        return [
            {
                type: FieldType.TEXT,
                label: __('State / Province'),
                attr: {
                    id: 'address-region-id',
                    name: 'region_string',
                    value: currentRegion,
                    placeholder: __('Your state / province'),
                },
                events: {
                    onChange: onRegionChange,
                },
                addRequiredTag: isStateRequired,
                validateOn: isStateRequired ? ['onChange'] : [],
                validationRule: {
                    isRequired: isStateRequired,
                },
            },
        ];
    }

    return [
        {
            type: FieldType.SELECT,
            label: __('State / Province'),
            attr: {
                name: 'region_id',
                value: currentRegionId,
                selectPlaceholder: __('Select region...'),
            },
            events: {
                onChange: onRegionIdChange,
            },
            options: availableRegions.map(({ id, name }) => ({ id, label: name, value: id })),
            addRequiredTag: isStateRequired,
            validateOn: isStateRequired ? ['onChange'] : [],
            validationRule: {
                isRequired: isStateRequired,
            },
        },
    ];
};

/**
 * Returns VAT fields
 * @param props
 * @returns {*[]|[{label: *, type: string, attr: {defaultValue: string, name: string}}]}
 * @namespace Component/MyAccountAddressForm/Form/getVatFields */
export const getVatFields = (props: MyAccountAddressFormProps): Partial<FieldContainerProps>[] => {
    const { showVatNumber, vat_id: vatID = '' } = props;

    if (!showVatNumber) {
        return [];
    }

    return [
        {
            type: FieldType.TEXT,
            label: __('VAT Number'),
            attr: {
                placeholder: __('Your VAT number'),
                name: 'vat_id',
                defaultValue: vatID,
            },
            addRequiredTag: false,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: false,
            },
        },
    ];
};

/**
 * Returns address form fields
 * @param props
 * @param events
 * @returns {[{label: *, type: string, attr: {defaultChecked, name: string}}, {label: *, type: string, attr: {defaultChecked, name: string}}, {addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue: string, name: string, placeholder: *}}, {addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue: string, name: string, placeholder: *}}, {mods: {street: boolean, multipleFields: boolean, oddAddresses: boolean}, name: string, fields: ({addRequiredTag: boolean, validateOn: string[], validationRule: {isRequired: boolean}, label: *, type: string, attr: {defaultValue: (*|string), name: string, placeholder: *}}[]|*[])}, null, ...*[]|{label: *, type: string, attr: {defaultValue: string, name: string}}[], null]}
 * @namespace Component/MyAccountAddressForm/Form/myAccountAddressForm */
export const myAccountAddressForm = (
    props: MyAccountAddressFormProps,
    events: MyAccountAddressFormEvents,
): Array<Partial<FieldContainerProps> | FormSection> => {
    const {
        default_billing: defaultBilling,
        default_shipping: defaultShipping,
        countryId,
        firstname = '',
        lastname = '',
        city = '',
        countries = [],
        postcode: zipcode = '',
        telephone = '',
        addressLinesQty = 1,
    } = props;

    const {
        onCountryChange,
        onZipcodeChange,
        onCityChange,
    } = events || {};

    return [
        {
            type: FieldType.CHECKBOX,
            label: __('This is default Billing Address'),
            attr: {
                name: 'default_billing',
                defaultChecked: defaultBilling,
            },
        },
        {
            type: FieldType.CHECKBOX,
            label: __('This is default Shipping Address'),
            attr: {
                name: 'default_shipping',
                defaultChecked: defaultShipping,
            },
        },
        {
            type: FieldType.TEXT,
            label: __('First name'),
            attr: {
                name: 'firstname',
                defaultValue: firstname,
                placeholder: __('Your first name'),
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true,
            },
        },
        {
            type: FieldType.TEXT,
            label: __('Last name'),
            attr: {
                name: 'lastname',
                defaultValue: lastname,
                placeholder: __('Your last name'),
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true,
            },
        },
        {
            name: 'streetGroup',
            mods: {
                street: true,
                multipleFields: addressLinesQty > 0,
                oddAddresses: addressLinesQty % 2 === 1,
            },
            fields: getStreetFields(props),
        },
        {
            name: 'addressGroup',
            mods: { address: true },
            fields: [
                {
                    type: FieldType.SELECT,
                    label: __('Country'),
                    attr: {
                        id: 'address-country-id',
                        name: 'country_id',
                        value: countryId,
                        selectPlaceholder: __('Select country...'),
                    },
                    events: {
                        onChange: onCountryChange,
                    },
                    options: countries,
                    addRequiredTag: true,
                    validateOn: ['onChange'],
                    validationRule: {
                        isRequired: true,
                    },
                },
                ...getRegionFields(props, events),
                {
                    type: FieldType.TEXT,
                    label: __('Zip / Postal code'),
                    attr: {
                        name: 'postcode',
                        defaultValue: zipcode,
                        placeholder: __('Your zip / postal code'),
                    },
                    events: {
                        onChange: onZipcodeChange,
                    },
                    addRequiredTag: true,
                    validateOn: ['onChange', 'onBlur'],
                    validationRule: {
                        isRequired: true,
                    },
                },
                {
                    type: FieldType.TEXT,
                    label: __('City'),
                    attr: {
                        name: 'city',
                        defaultValue: city,
                        placeholder: __('Your city'),
                    },
                    events: {
                        onChange: onCityChange,
                    },
                    addRequiredTag: true,
                    validateOn: ['onChange'],
                    validationRule: {
                        isRequired: true,
                    },
                },
            ],
        },
        ...getVatFields(props),
        {
            type: FieldType.TEL,
            label: __('Phone number'),
            attr: {
                name: 'telephone',
                defaultValue: telephone,
                placeholder: __('Your phone number'),
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                inputType: ValidationInputType.PHONE,
                isRequired: true,
            },
        },
    ];
};

export default myAccountAddressForm;
