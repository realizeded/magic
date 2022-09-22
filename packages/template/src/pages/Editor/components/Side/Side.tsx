import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getCreateNewStageAction } from '../../../../store/module/template';
import { StageList } from '../StageList';
import $style from './style.module.less';

interface IProps {}

export const Side: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const handleCreateStage = () => {
        dispatch(getCreateNewStageAction());
    };

    return (
        <div className={$style.sideWrapper}>
            <div className={$style.createbuttonStyle}>
                <Button type="primary" size="large" className={$style.createBtn} onClick={handleCreateStage}>
                    创建场景
                </Button>
            </div>
            <div className={$style.list}>
                <StageList />
            </div>
        </div>
    );
};
