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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PopupSuspenseMapStateToProps {}

export interface PopupSuspenseMapDispatchToProps {
    showOverlay: (overlayKey: string) => void;
}

export interface PopupSuspenseComponentBaseProps {
    onVisible: () => void;
    actualOverlayKey: string;
}

export type PopupSuspenseComponentProps = PopupSuspenseMapDispatchToProps & PopupSuspenseComponentBaseProps;
