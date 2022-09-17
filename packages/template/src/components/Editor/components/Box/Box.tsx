import React, { useRef } from 'react';
import { TRenderComponentType } from '../Render';
import $style from './style.module.less';
import { IBoxProps, IDragPosition, TBoxComponentType } from './type';
import { css } from '@emotion/css';
import classnames from 'classnames';
import { useDrag } from './hooks/useDrag';
import { useDispatch } from 'react-redux';
import {
    getChangeActiveIndexAction,
    getChangeControlAction,
    TControls
} from '../../../../store/module/template';
import { SelectBox } from '../SelectBox';
import _ from 'lodash';
import { TAnimateComponentType } from '../Animate';

export const BoxHoc = (C: TAnimateComponentType) => {
    const Box: TBoxComponentType = (props: IBoxProps) => {
        const dispatch = useDispatch();

        const { stage, controls, activeIndex, controlValue, scaleCanvas, currentTime, playState } = props;

        const controlOfStage = controls[controlValue];
        const box = controlOfStage.box;

        const { width, height, top, right, bottom, left } = box;

        const isSelect = activeIndex === controlValue;

        const controlValRef = useRef<string>(controlValue);
        controlValRef.current = controlValue;

        const controlOfStageRef = useRef<TControls>(controlOfStage);
        controlOfStageRef.current = controlOfStage;

        const pxToScale = (pxStr = '') => {
            const px = pxStr.replace('px', '');
            return Number(px) * scaleCanvas + 'px';
        };

        const boxStyle = css`
            width: ${pxToScale(width)};
            height: ${pxToScale(height)};
            top: ${pxToScale(top)};
            bottom: ${pxToScale(bottom)};
            right: ${pxToScale(right)};
            left: ${pxToScale(left)};
        `;

        const handleDragEnd = (position: IDragPosition) => {
            const newControl = _.clone(controlOfStageRef.current);

            newControl.box.top = position.y / scaleCanvas + 'px';
            newControl.box.left = position.x / scaleCanvas + 'px';
            const controlValue = controlValRef.current;
            dispatch(getChangeControlAction(controlValue, newControl));
        };

        const handleDragStart = () => {
            const controlValue = controlValRef.current;
            dispatch(getChangeActiveIndexAction(controlValue));
        };

        const handleResizeDone = (newWdith: number, newHeight: number, top: number, left: number) => {
            const newControl = _.clone(controlOfStageRef.current);
            newControl.box.top = top / scaleCanvas + 'px';
            newControl.box.left = left / scaleCanvas + 'px';
            newControl.box.width = newWdith / scaleCanvas + 'px';
            newControl.box.height = newHeight / scaleCanvas + 'px';
            const controlValue = controlValRef.current;
            dispatch(getChangeControlAction(controlValue, newControl));
        };
        const ref = useRef<HTMLDivElement>(null);

        useDrag({ ref, dragEnd: handleDragEnd, dragStart: handleDragStart, playState });

        const wrapperClassNames = classnames(
            $style.box,
            boxStyle,
            $style.select,
            !playState ? $style.boxHover : ''
        );

        return (
            <>
                <div className={wrapperClassNames} ref={ref}>
                    <C {...props} />
                    {isSelect && !playState && <SelectBox parentRef={ref} resizeDone={handleResizeDone} />}
                </div>
            </>
        );
    };

    return Box;
};
