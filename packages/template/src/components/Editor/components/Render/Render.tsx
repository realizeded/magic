import React, { useMemo } from 'react';
import { EControlTypes, TControls } from '../../../../store/module/template';
import $style from './style.module.less';
import { TRenderComponentType } from './type';

export const Render: TRenderComponentType = props => {
    const typeMapToEl = {
        [EControlTypes.Img]: (control: TControls) => {
            const data = control.data;
            const imgSrc = data.src;
            return <div className={$style.imgWrapper} style={{ backgroundImage: `url(${imgSrc})` }} />;
        }
    };

    const { controlValue, controls } = props;

    const el = useMemo(() => {
        const control = controls[controlValue];
        const { type } = control;

        const processFn = typeMapToEl[type];

        if (processFn) {
            return processFn(control);
        }

        return null;
    }, [controlValue, controls]);

    return <div className={$style.renderWrapper}>{el}</div>;
};
