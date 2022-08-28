import React from 'react';
import { TRenderComponentType } from '../Render';
import $style from './style.module.less';
import { IBoxProps } from './type';
import { css } from '@emotion/css';
import classnames from 'classnames';

export const BoxHoc = (C: TRenderComponentType) => {
    const Box = (props: IBoxProps) => {
        const { stage, controls } = props;

        const { value } = stage;
        const controlOfStage = controls[value];
        const box = controlOfStage.box;

        const { width, height, top, right, bottom, left } = box;

        const boxStyle = css`
            width: ${width};
            height: ${height};
            top: ${top};
            bottom: ${bottom};
            right: ${right};
            left: ${left};
        `;

        return (
            <div className={classnames($style.box, boxStyle)}>
                <C stage={stage} controls={controls} />
            </div>
        );
    };

    return Box;
};
