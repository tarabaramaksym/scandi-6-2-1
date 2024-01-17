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

import { Children, ReactElement } from 'Type/Common.type';

export interface RenderWhenVisibleComponentProps {
    children: Children;
    fallback: () => ReactElement | void;
}

export interface RenderWhenVisibleComponentState {
    wasVisible: boolean;
}
