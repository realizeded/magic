import React from 'react';
import { TAnimateComponent } from '../Animate';
import { IBoxProps } from './type';
import { css } from '@emotion/css';
import classnames from 'classnames';
import $style from './style.module.less';
import { ptToRem } from '../../util';

export const BoxHoc = (C: TAnimateComponent) => {
    const Box: React.FC<IBoxProps> = props => {
        const { controlVal, controls } = props;

        const controlOfVal = controls[controlVal];

        const { box } = controlOfVal;

        const { width, height, top, left } = box;
        const boxStyle = css`
            width: ${ptToRem(width)};
            height: ${ptToRem(height)};
            top: ${ptToRem(top)};
            left: ${ptToRem(left)};
        `;

        return (
            <div className={classnames($style.boxWrapper, boxStyle)}>
                <C {...props} />
            </div>
        );
    };

    return Box;
};
