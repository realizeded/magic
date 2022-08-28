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

export const BoxHoc = (C: TRenderComponentType) => {
    const Box: TBoxComponentType = (props: IBoxProps) => {
        const dispatch = useDispatch();

        const { stage, controls, activeIndex } = props;

        const { value } = stage;
        const controlOfStage = controls[value];
        const box = controlOfStage.box;

        const { width, height, top, right, bottom, left } = box;

        const isSelect = activeIndex === value;

        const boxStyle = css`
            width: ${width};
            height: ${height};
            top: ${top};
            bottom: ${bottom};
            right: ${right};
            left: ${left};
        `;

        const handleDragEnd = (position: IDragPosition) => {
            controlOfStage.box.top = position.y + 'px';
            controlOfStage.box.left = position.x + 'px';

            dispatch(getChangeControlAction(value, controlOfStage));
        };

        const handleDragStart = () => {
            dispatch(getChangeActiveIndexAction(value));
        };

        const ref = useRef<HTMLDivElement>(null);
        useDrag({ ref, dragEnd: handleDragEnd, dragStart: handleDragStart });

        return (
            <div className={classnames($style.box, boxStyle, $style.select)} ref={ref}>
                <C stage={stage} controls={controls} />
                <SelectBox isSelect={isSelect} />
            </div>
        );
    };

    return Box;
};
