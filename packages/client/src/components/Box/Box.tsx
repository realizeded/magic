import React from 'react';
import { TAnimateComponent } from '../Animate';
import { IBoxProps } from './type';
import { css } from '@emotion/css';
import classnames from 'classnames';
import $style from './style.module.less';
import { ptToRem } from '../../util';
import { EControlTypes } from '../../types';

export const BoxHoc = (C: TAnimateComponent) => {
    const Box: React.FC<IBoxProps> = props => {
        const { controlVal, controls } = props;

        const controlOfVal = controls[controlVal];

        const { box, type } = controlOfVal;

        const { width, height, top, left } = box;
        const boxStyle = css`
            width: ${ptToRem(width)};
            height: ${ptToRem(height)};
            top: ${ptToRem(top)};
            left: ${ptToRem(left)};
        `;

        let isHidden = false;
        console.log(controlOfVal);
        if (type !== EControlTypes.Audio) {
            const opacity = controlOfVal.style.opacity;
            console.log(opacity);
            isHidden = Number(opacity) === 0;
        }
        return (
            <div className={classnames($style.boxWrapper, boxStyle)}>
                {isHidden ? null : <C {...props} />}
            </div>
        );
    };

    return Box;
};
