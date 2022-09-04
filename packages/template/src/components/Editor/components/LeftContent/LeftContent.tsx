import React from 'react';
import $style from './style.module.less';
import { Layout } from '../Layout';
import { ToolBar } from '../ToolBar';
interface IProps {}

export const LeftContent: React.FC<IProps> = props => {
    return (
        <div className={$style.leftContent}>
            <div className={$style.top}>
                <div className={$style.toolbar}>
                    <ToolBar />
                </div>
                <Layout />
                <div className={$style.propertyPannel}></div>
            </div>
            <div className={$style.bottom}></div>
        </div>
    );
};
