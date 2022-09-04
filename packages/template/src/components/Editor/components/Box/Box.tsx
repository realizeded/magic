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

        const { stage, controls, activeIndex, controlValue } = props;

        const controlOfStage = controls[controlValue];
        const box = controlOfStage.box;

        const { width, height, top, right, bottom, left } = box;

        const isSelect = activeIndex === controlValue;

        const boxStyle = css`
            width: ${width};
            height: ${height};
            top: ${top};
            bottom: ${bottom};
            right: ${right};
            left: ${left};
        `;

        const handleDragEnd = (position: IDragPosition) => {
            const newControl = _.clone(controlOfStage);
            newControl.box.top = position.y + 'px';
            newControl.box.left = position.x + 'px';

            dispatch(getChangeControlAction(controlValue, newControl));
        };

        const handleDragStart = () => {
            dispatch(getChangeActiveIndexAction(controlValue));
        };

        const handleResizeDone = (newWdith: number, newHeight: number, top: number, left: number) => {
            const newControl = _.clone(controlOfStage);
            newControl.box.top = top + 'px';
            newControl.box.left = left + 'px';
            newControl.box.width = newWdith + 'px';
            newControl.box.height = newHeight + 'px';
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
