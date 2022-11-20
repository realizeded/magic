import React, { useMemo } from 'react';
import {
    EControlTypes,
    IAudio,
    IComponent,
    IImg,
    IText,
    IVideo,
    TControls
} from '../../../../store/module/template';
import { CAudio } from './components/CAudio';
import { Custom } from './components/Custom';
import { CVideo } from './components/CVideo';
import $style from './style.module.less';
import { TRenderComponentType } from './type';

export const Render: TRenderComponentType = props => {
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
        },
        [EControlTypes.Component]: (control: IComponent, currentTime: number, playState: boolean) => {
            const { style = {}, data, id } = control;
            const scriptPath = data.src;
            return <Custom scriptPath={scriptPath} id={id} />;
        }
    };

    const { controlValue, controls, currentTime, playState } = props;

    const el = useMemo(() => {
        const control = controls[controlValue];
        const { type } = control;

        const processFn = typeMapToEl[type];

        if (processFn) {
            return processFn(control as any, currentTime, playState);
        }

        return null;
    }, [controlValue, controls, currentTime]);

    return <div className={$style.renderWrapper}>{el}</div>;
};
