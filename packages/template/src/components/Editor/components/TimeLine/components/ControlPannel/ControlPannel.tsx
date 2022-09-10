import React from 'react';
import { useSelector } from 'react-redux';
import { EControlTypes, IProject } from '../../../../../../store/module/template';
import { TRootState } from '../../../../../../store/type';
import $style from './style.module.less';
import { Pic, Video } from '@icon-park/react';
import classNames from 'classnames';
interface IProps {}

export const ControlPannel: React.FC<IProps> = props => {
    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { template, activeIndex, activeStageIndex } = project;

    const { stages, controls } = template;

    const activeStage = stages[activeStageIndex];
    const activeControls = activeStage.value.map(val => controls[val]);

    const typeMapToIcon = {
        [EControlTypes.Img]: Pic,
        [EControlTypes.Video]: Video
    };
    return (
        <div className={$style.ControlPannel}>
            {activeControls.map((control, i) => {
                const { name, type } = control;
                const Icon = typeMapToIcon[type];
                const isActive = activeIndex === activeStage.value[i];
                return (
                    <div key={i} className={classNames($style.controlItem, isActive && $style.active)}>
                        <Icon size={14} fill="#000" theme="outline" />
                        <span className={$style.text}>{name}</span>
                    </div>
                );
            })}
        </div>
    );
};
