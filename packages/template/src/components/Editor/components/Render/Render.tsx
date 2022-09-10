import React, { useMemo } from 'react';
import { EControlTypes, TControls } from '../../../../store/module/template';
import { CVideo } from './components/CVideo';
import $style from './style.module.less';
import { TRenderComponentType } from './type';

export const Render: TRenderComponentType = props => {
    const typeMapToEl = {
        [EControlTypes.Img]: (control: TControls, currentTime: number, playState: boolean) => {
            const data = control.data;
            const imgSrc = data.src;
            return <div className={$style.imgWrapper} style={{ backgroundImage: `url(${imgSrc})` }} />;
        },
        [EControlTypes.Video]: (control: TControls, currentTime: number, playState: boolean) => {
            const data = control.data;
            const videoSrc = data.src;
            return <CVideo playState={playState} videoSrc={videoSrc} currentTime={currentTime} />;
        }
    };

    const { controlValue, controls, currentTime, playState } = props;

    const el = useMemo(() => {
        const control = controls[controlValue];
        const { type } = control;

        const processFn = typeMapToEl[type];

        if (processFn) {
            return processFn(control, currentTime, playState);
        }

        return null;
    }, [controlValue, controls, currentTime]);

    return <div className={$style.renderWrapper}>{el}</div>;
};
