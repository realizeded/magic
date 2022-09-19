import { PlayOne, Acoustic } from '@icon-park/react';
import Item from 'antd/lib/list/Item';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EControlTypes, getCreateControlAction } from '../../../../../../store/module/template';
import $style from './style.module.less';

interface IProps {}

export const AudioList: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const [playIndex, setPlayIndex] = useState<number>(-1);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const imgList = [
        {
            text: '背景图',
            list: [
                {
                    text: '海浪',
                    audioSrc: 'http://localhost:3000/audio/lucky.mp3'
                },
                {
                    text: '海浪1',
                    audioSrc: 'http://localhost:3000/audio/lucky.mp3'
                },
                {
                    text: '海浪2',
                    audioSrc: 'http://localhost:3000/audio/lucky.mp3'
                },
                {
                    text: '海浪3',
                    audioSrc: 'http://localhost:3000/audio/lucky.mp3'
                },
                {
                    text: '海浪4',
                    audioSrc: 'http://localhost:3000/audio/lucky.mp3'
                }
            ]
        }
    ];

    const handleClick = (audio: { text: string; audioSrc: string }) => {
        const { audioSrc, text } = audio;
        dispatch(
            getCreateControlAction({
                type: EControlTypes.Audio,
                name: text,
                box: {
                    width: '0',
                    height: '0',
                    top: '0',
                    left: '0'
                },
                config: {
                    volume: 100
                },
                data: {
                    src: audioSrc
                }
            })
        );
    };

    const handleMouseDiv = (audioSrc: string, index: number) => {
        const audio = document.createElement('audio');
        audio.src = audioSrc;
        document.body.appendChild(audio);
        audio.oncanplay = () => {
            audio.play();
        };
        // audio.onpause = () => {
        //     document.body.removeChild(audio);
        // };
        audioRef.current = audio;
        setPlayIndex(index);
    };

    const handleMouseOut = () => {
        const current = audioRef.current;

        if (current) {
            console.log(current);
            audioRef.current = null;
            if (!current.paused) {
                current.pause();
            }
            document.body.removeChild(current);
            setPlayIndex(-1);
        }
    };

    return (
        <div className={$style.dialog}>
            {imgList.map((item, i) => {
                const { text, list } = item;
                return (
                    <div key={i} className={$style.subItemWrapper}>
                        <div className={$style.bgTitle}>{text}</div>
                        <div className={$style.listItems}>
                            {list.map((item, musicIndex) => {
                                const { text, audioSrc } = item;
                                const index = (musicIndex + 1) * (i + 1);

                                return (
                                    <div
                                        key={text}
                                        className={$style.audioItemWrapper}
                                        onClick={() => handleClick(item)}
                                    >
                                        <div
                                            className={$style.audioItem}
                                            onMouseEnter={() => handleMouseDiv(audioSrc, index)}
                                            onMouseLeave={() => handleMouseOut()}
                                        >
                                            <div className={$style.iconWrapper}>
                                                {playIndex === index ? (
                                                    <Acoustic size="14" fill="#000" theme="filled" />
                                                ) : (
                                                    <PlayOne size="14" fill="#000" theme="filled" />
                                                )}
                                            </div>
                                            <div className={$style.text}>{text}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
