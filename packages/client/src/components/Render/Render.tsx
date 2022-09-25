import React, { useMemo } from 'react';
import { EControlTypes, IAudio, IImg, IText, IVideo } from '../../types';
import { TRenderComponent } from './type';
import $style from './style.module.less';
import { CVideo } from './components/CVideo';
import { CAudio } from './components/CAudio';
export const Render: TRenderComponent = props => {
    const typeMapToEl = {
        [EControlTypes.Img]: (control: IImg, currentTime: number, playState: boolean) => {
            const { data, style } = control;
            const imgSrc = data.src;
            return (
                <div className={$style.imgWrapper} style={{ backgroundImage: `url(${imgSrc})`, ...style }} />
            );
        },
        [EControlTypes.Video]: (control: IVideo, currentTime: number, playState: boolean) => {
            const { style, data } = control;
            const { volume } = control.config;
            const videoSrc = data.src;
            return (
                <CVideo
                    playState={playState}
                    videoSrc={videoSrc}
                    currentTime={currentTime}
                    volume={volume}
                    style={style}
                />
            );
        },
        [EControlTypes.Audio]: (control: IAudio, currentTime: number, playState: boolean) => {
            const { data } = control;
            const { volume } = control.config;
            const audioSrc = data.src;
            return (
                <CAudio audioSrc={audioSrc} playState={playState} currentTime={currentTime} volume={volume} />
            );
        },
        [EControlTypes.Text]: (control: IText, currentTime: number, playState: boolean) => {
            const { style = {}, data } = control;
            const text = data.text;
            return (
                <p className={$style.textWrapper} style={style}>
                    {text}
                </p>
            );
        }
    };

    const { controlVal, controls, currentTime, playState } = props;

    const el = useMemo(() => {
        const control = controls[controlVal];
        const { type } = control;

        const processFn = typeMapToEl[type];

        if (processFn) {
            return processFn(control as any, currentTime, playState);
        }

        return null;
    }, [controlVal, controls, currentTime, playState]);

    return <div className={$style.renderWrapper}>{el}</div>;
};
