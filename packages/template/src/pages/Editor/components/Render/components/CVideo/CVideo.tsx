import React, { useEffect, useRef } from 'react';
import $style from './style.module.less';

interface IProps {
    videoSrc: string;
    currentTime: number;
    playState: boolean;
    volume: number;
    style: Record<string, string>;
}

export const CVideo: React.FC<IProps> = props => {
    const { videoSrc, currentTime, playState, volume, style } = props;

    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (!playState) {
            const current = videoRef.current;

            if (current) {
                current.currentTime = currentTime;
            }
        }
    }, [currentTime]);

    useEffect(() => {
        const current = videoRef.current;

        if (current) {
            if (current.paused && playState) {
                current.currentTime = currentTime;
                current.play();
                current.volume = volume / 100;
            } else if (!current.paused && !playState) {
                current.pause();
            }
        }
    }, [playState]);
    return (
        <video
            preload="auto"
            crossOrigin="anonymous"
            style={style}
            src={videoSrc}
            ref={videoRef}
            className={$style.videoWrapper}
        />
    );
};
