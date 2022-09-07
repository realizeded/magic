import { Delete, PlayOne } from '@icon-park/react';
import React from 'react';
import $style from './style.module.less';

interface IProps {}

export const ToolBarPannel: React.FC<IProps> = props => {
    return (
        <div className={$style.ToolBarPannel}>
            <div className={$style.toolbarItemWrapper}>
                <Delete size={14} fill="#000" theme="outline" />
            </div>
            <div className={$style.toolbarItemWrapper}>
                <PlayOne size={14} fill="#000" theme="filled" />
            </div>
        </div>
    );
};
