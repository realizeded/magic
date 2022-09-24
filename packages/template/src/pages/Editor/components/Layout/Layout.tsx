import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import {
    getChangeActiveIndexAction,
    getChangeScaleCanvas,
    IProject
} from '../../../../store/module/template';
import { TRootState } from '../../../../store/type';
import { Phone } from '../Phone';
import $style from './style.module.less';

interface IProps {}

export const Layout: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const project = useSelector<TRootState, IProject>(state => state.project.project);
    const { scaleCanvas } = project;

    const handleMouseDown = () => {
        dispatch(getChangeActiveIndexAction(''));
    };

    const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const isUp = (e.nativeEvent as any).wheelDelta > 0;
        if (isUp && scaleCanvas < 1) {
            dispatch(getChangeScaleCanvas(scaleCanvas + 0.02));
        } else if (scaleCanvas > 0.1) {
            dispatch(getChangeScaleCanvas(scaleCanvas - 0.02));
        }
    };

    useEffect(() => {
        const scale = (0.4 * window.innerHeight) / 951;
        dispatch(getChangeScaleCanvas(scale));
    }, []);
    return (
        <div
            className={$style.layoutWrapper}
            id="layoutCanvas"
            onMouseDown={handleMouseDown}
            onWheel={handleMouseWheel}
        >
            <Phone />
        </div>
    );
};
