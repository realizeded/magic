import React from 'react';
import { useSelector } from 'react-redux';
import { IProject } from '../../../../store/module/template';
import { TRootState } from '../../../../store/type';
import $style from './style.module.less';

interface IProps {}

export const StageList: React.FC<IProps> = props => {
    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { template, activeIndex } = project;

    const { stages, controls } = template;
    return (
        <div className={$style.listWrapper}>
            <div className={$style.listItemWrapper}>
                <div className={$style.imgWrapper}>12</div>
                <div className={$style.stageText}>场景1</div>
            </div>
        </div>
    );
};
