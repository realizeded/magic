import React from 'react';
import { compose } from 'redux';
import { Phone } from '../Phone';
import $style from './style.module.less';

interface IProps {}

export const Layout: React.FC<IProps> = props => {
    return (
        <div className={$style.layoutWrapper}>
            <Phone />
        </div>
    );
};
