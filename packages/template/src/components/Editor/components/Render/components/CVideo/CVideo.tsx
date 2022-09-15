import React, { useEffect, useRef } from 'react';
import $style from './style.module.less';

interface IProps {
    videoSrc: string;
    currentTime: number;
    playState: boolean;
}

export const CVideo: React.FC<IProps> = props => {
    const { videoSrc, currentTime, playState } = props;

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
                current.play();
            } else if (!current.paused && !playState) {
                current.pause();
            }
        }
    }, [playState]);
    return <video preload="auto" src={videoSrc} ref={videoRef} className={$style.videoWrapper} />;
};
