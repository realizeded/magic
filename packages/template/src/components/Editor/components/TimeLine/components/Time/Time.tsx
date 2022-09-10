import React from 'react';
import { useSelector } from 'react-redux';
import { IProject } from '../../../../../../store/module/template';
import { TRootState } from '../../../../../../store/type';
import { Line } from '../Line';
import $style from './style.module.less';

interface IProps {}

export const Time: React.FC<IProps> = props => {
    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { template, activeIndex, activeStageIndex } = project;

    const { stages, controls } = template;

    const activeStage = stages[activeStageIndex];
    const activeControls = activeStage.value.map(val => controls[val]);

    return (
        <div className={$style.time}>
            <div className={$style.controlName}>控件</div>
            <div className={$style.timeWrapper}>
                <Line />
            </div>
        </div>
    );
};
