import React, { useEffect, useRef } from 'react';
import $style from './style.module.less';
interface IProps {
    audioSrc: string;
    currentTime: number;
    playState: boolean;
}

export const CAudio: React.FC<IProps> = props => {
    const { audioSrc, currentTime, playState } = props;

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const current = audioRef.current;
        if (current && !playState) {
            current.currentTime = currentTime;
        }
    }, [currentTime]);

    useEffect(() => {
        const current = audioRef.current;
        if (current) {
            if (playState && current.paused) {
                current.play();
            } else if (!playState && !current.paused) {
                current.pause();
            }
        }
    }, [playState]);
    return <audio src={audioSrc} preload="auto" ref={audioRef} />;
};
