import React from 'react';
import { ControlPannel } from '../ControlPannel';
import { Line } from '../Line';
import $style from './style.module.less';

interface IProps {}

export const TimePannel: React.FC<IProps> = props => {
    return (
        <div className={$style.timePannelWrapper}>
            <div className={$style.controlWrapper}>
                <div className={$style.controlName}>控件名称</div>
                <ControlPannel />
            </div>
            <div className={$style.life}>
                <Line />
            </div>
        </div>
    );
};
