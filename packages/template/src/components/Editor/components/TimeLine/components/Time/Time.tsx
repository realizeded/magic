import React from 'react';
import { Line } from '../Line';
import $style from './style.module.less';

interface IProps {}

export const Time: React.FC<IProps> = props => {
    return (
        <div className={$style.time}>
            <div className={$style.controlName}>控件</div>
            <div className={$style.timeWrapper}>
                <Line />
            </div>
        </div>
    );
};
