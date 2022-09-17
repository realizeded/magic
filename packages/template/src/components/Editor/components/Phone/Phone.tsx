import { css } from '@emotion/css';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import {
    getChangeActiveIndexAction,
    getChangeActiveStageIndexAction,
    getChangeCurrentTime,
    IProject
} from '../../../../store/module/template';
import { TRootState } from '../../../../store/type';
import { AnimateHoc } from '../Animate';
import { BoxHoc } from '../Box';
import { EvenHoc } from '../Event';
import { Render } from '../Render';
import $style from './style.module.less';
interface IProps {}

const Flow = compose(BoxHoc, AnimateHoc, EvenHoc)(Render);
export const Phone: React.FC<IProps> = () => {
    const dispatch = useDispatch();

    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { template, activeIndex, scaleCanvas, activeStageIndex, currentTime, playState } = project;

    const { stages, controls } = template;

    const activeStage = stages[activeStageIndex];
    const stageValues = activeStage.value;
    const playStateRef = useRef<boolean>(playState);
    playStateRef.current = playState;
    useEffect(() => {
        const startTime = Date.now();
        const fn = () => {
            const newTime = currentTime + (Date.now() - startTime) / 1000;
            dispatch(getChangeCurrentTime(newTime));
            if (playStateRef.current) {
                requestAnimationFrame(fn);
            }
        };
        if (playState) {
            requestAnimationFrame(fn);
        }
    }, [playState]);

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
        <div className={classNames($style.phoneWrapper, phoneStyle)} id="phone">
            {stageValues.map((controlValue, key) => {
                return (
                    // eslint-disable-next-line react/jsx-key
                    <Flow
                        activeIndex={activeIndex}
                        stage={activeStage}
                        controls={controls}
                        controlValue={controlValue}
                        scaleCanvas={scaleCanvas}
                        currentTime={currentTime}
                        playState={playState}
                    />
                );
            })}
        </div>
    );
};
