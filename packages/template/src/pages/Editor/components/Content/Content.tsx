import React from 'react';
import { LeftContent } from '../LeftContent';
import { Side } from '../Side';
import $style from './style.module.less';

interface IProps {}

export const Content: React.FC<IProps> = props => {
    return (
        <div className={$style.contentWrapper}>
            <div className={$style.sideWrapper}>
                <Side />
            </div>
            <div className={$style.leftCotentWrapper}>
                <LeftContent />
            </div>
        </div>
    );
};
