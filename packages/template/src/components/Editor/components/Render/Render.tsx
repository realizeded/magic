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

    const { stage, controls } = props;

    const el = useMemo(() => {
        const val = stage.value;
        const control = controls[val];
        const { type } = control;

        const processFn = typeMapToEl[type];

        if (processFn) {
            return processFn(control);
        }

        return null;
    }, [stage, controls]);

    return <div className={$style.renderWrapper}>{el}</div>;
};
