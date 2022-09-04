import { Button } from 'antd';
import React from 'react';
import { StageList } from '../StageList';
import $style from './style.module.less';

interface IProps {}

export const Side: React.FC<IProps> = props => {
    return (
        <div className={$style.sideWrapper}>
            <Button type="primary" size="large" className={$style.createbuttonStyle}>
                创建场景
            </Button>
            <div className={$style.list}>
                <StageList />
            </div>
        </div>
    );
};
