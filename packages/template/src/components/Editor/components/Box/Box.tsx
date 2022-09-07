import React, { useRef } from 'react';
import { TRenderComponentType } from '../Render';
import $style from './style.module.less';
import { IBoxProps, IDragPosition, TBoxComponentType } from './type';
import { css } from '@emotion/css';
import classnames from 'classnames';
import { useDrag } from './hooks/useDrag';
import { useDispatch } from 'react-redux';
import { getChangeActiveIndexAction, getChangeControlAction } from '../../../../store/module/template';
import { SelectBox } from '../SelectBox';
import _ from 'lodash';

export const BoxHoc = (C: TRenderComponentType) => {
    const Box: TBoxComponentType = (props: IBoxProps) => {
        const dispatch = useDispatch();

        const { stage, controls, activeIndex, controlValue, scaleCanvas } = props;

        const controlOfStage = controls[controlValue];
        const box = controlOfStage.box;

        const { width, height, top, right, bottom, left } = box;

        const isSelect = activeIndex === controlValue;

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
            const newControl = _.clone(controlOfStage);
            newControl.box.top = position.y / scaleCanvas + 'px';
            newControl.box.left = position.x / scaleCanvas + 'px';

            dispatch(getChangeControlAction(controlValue, newControl));
        };

        const handleDragStart = () => {
            dispatch(getChangeActiveIndexAction(controlValue));
        };

        const handleResizeDone = (newWdith: number, newHeight: number, top: number, left: number) => {
            const newControl = _.clone(controlOfStage);
            newControl.box.top = top / scaleCanvas + 'px';
            newControl.box.left = left / scaleCanvas + 'px';
            newControl.box.width = newWdith / scaleCanvas + 'px';
            newControl.box.height = newHeight / scaleCanvas + 'px';
            dispatch(getChangeControlAction(controlValue, newControl));
        };
        const ref = useRef<HTMLDivElement>(null);

        useDrag({ ref, dragEnd: handleDragEnd, dragStart: handleDragStart });

        const wrapperClassNames = classnames($style.box, boxStyle, $style.select);

        return (
            <>
                <div className={wrapperClassNames} ref={ref}>
                    <C controlValue={controlValue} controls={controls} />
                    {isSelect && <SelectBox parentRef={ref} resizeDone={handleResizeDone} />}
                </div>
            </>
        );
    };

    return Box;
};
