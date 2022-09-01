import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import { IProject } from '../../../../store/module/template';
import { TRootState } from '../../../../store/type';
import { BoxHoc } from '../Box';
import { Render } from '../Render';
import $style from './style.module.less';
interface IProps {}

const Flow = compose(BoxHoc)(Render);
export const Phone: React.FC<IProps> = () => {
    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { template, activeIndex } = project;

    const { stages, controls } = template;

    return (
        <div className={$style.phoneWrapper}>
            {stages.map((stage, key) => {
                return <Flow key={stage.value} activeIndex={activeIndex} stage={stage} controls={controls} />;
            })}
        </div>
    );
};
