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

    const { template, activeIndex, activeStageIndex } = project;

    const { stages, controls } = template;

    const activeStage = stages[activeStageIndex];
    const stageValues = activeStage.value;
    return (
        <div className={$style.phoneWrapper}>
            {stageValues.map((controlValue, key) => {
                return (
                    <Flow
                        key={controlValue}
                        activeIndex={activeIndex}
                        stage={activeStage}
                        controls={controls}
                        controlValue={controlValue}
                    />
                );
            })}
        </div>
    );
};
