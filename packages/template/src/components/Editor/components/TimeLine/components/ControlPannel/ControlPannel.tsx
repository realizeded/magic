import React from 'react';
import { useSelector } from 'react-redux';
import { IProject } from '../../../../../../store/module/template';
import { TRootState } from '../../../../../../store/type';
import $style from './style.module.less';
import { Pic } from '@icon-park/react';
interface IProps {}

export const ControlPannel: React.FC<IProps> = props => {
    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { template, activeIndex, activeStageIndex } = project;

    const { stages, controls } = template;

    const activeStage = stages[activeStageIndex];
    const activeControls = activeStage.value.map(val => controls[val]);

    return (
        <div className={$style.ControlPannel}>
            {activeControls.map((control, i) => {
                const { name, type } = control;

                return (
                    <div key={i} className={$style.controlItem}>
                        <Pic size={14} fill="#000" theme="outline" />
                        <span className={$style.text}>{name}</span>
                    </div>
                );
            })}
        </div>
    );
};
