import { css } from '@emotion/css';
import classNames from 'classnames';
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

    const { template, activeIndex, scaleCanvas, activeStageIndex } = project;

    const { stages, controls } = template;

    const activeStage = stages[activeStageIndex];
    const stageValues = activeStage.value;

    const pxToScale = (pxStr = '') => {
        const px = pxStr.replace('px', '');
        return Number(px) * scaleCanvas + 'px';
    };

    const phoneStyle = css`
        width: ${pxToScale('375')};
        height: ${pxToScale('667')};
        margin: ${pxToScale('100')} auto;
    `;
    return (
        <div className={classNames($style.phoneWrapper, phoneStyle)}>
            {stageValues.map((controlValue, key) => {
                return (
                    <Flow
                        key={controlValue}
                        activeIndex={activeIndex}
                        stage={activeStage}
                        controls={controls}
                        controlValue={controlValue}
                        scaleCanvas={scaleCanvas}
                    />
                );
            })}
        </div>
    );
};
