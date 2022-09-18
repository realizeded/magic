import { css } from '@emotion/css';
import classNames from 'classnames';
import React from 'react';
import {
    EAnimateType,
    IAnimateNomal,
    IAnimateOpacity,
    IAnimateRotate,
    IAnimateScale,
    TAnimate
} from '../../../../store/module/template';
import { TEventComponentType } from '../Event';
import { TRenderComponentType } from '../Render';
import $style from './style.module.less';
import { IAnimateProps } from './type';

export const AnimateHoc = (C: TEventComponentType) => {
    const Animate: React.FC<IAnimateProps> = props => {
        const { controls, controlValue, currentTime, playState, activeIndex } = props;

        const animate = controls[controlValue]?.animate ?? ([] as TAnimate);

        const classAnimate = [$style.animateWrapper];

        const animateProcess = {
            [EAnimateType.Normal](animate: IAnimateNomal) {
                return;
            },
            [EAnimateType.Scale](animate: IAnimateScale) {
                const { start, end, to, from, duration } = animate;

                if (currentTime >= start && currentTime <= end) {
                    let leftInto = css`
                        animation-duration: ${duration}s;
                        animation-name: cscale;

                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                    `;

                    if (!playState) {
                        leftInto = css`
                            animation-duration: ${duration}s;
                            animation-delay: ${-currentTime + start}s;
                            animation-name: cscale;
                            animation-timing-function: linear;
                            animation-play-state: paused;
                        `;
                    }
                    const animateCss = css`
                        @keyframes cscale {
                            from {
                                transform: scale(${from});
                            }

                            to {
                                transform: scale(${to});
                            }
                        }
                    `;

                    classAnimate.push(leftInto, animateCss);
                }
            },
            [EAnimateType.Rotate](animate: IAnimateRotate) {
                const { start, end, to, from, duration } = animate;
                if (currentTime >= start && currentTime <= end) {
                    let leftInto = css`
                        animation-duration: ${duration}s;
                        animation-name: leftInto;

                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                    `;

                    if (!playState) {
                        leftInto = css`
                            animation-duration: ${duration}s;
                            animation-delay: ${-currentTime + start}s;
                            animation-name: leftInto;
                            animation-timing-function: linear;
                            animation-play-state: paused;
                        `;
                    }
                    const animateCss = css`
                        @keyframes leftInto {
                            to {
                                transform: rotate(${to}deg);
                            }

                            from {
                                transform: rotate(${from}deg);
                            }
                        }
                    `;

                    classAnimate.push(leftInto, animateCss);
                }
            },
            [EAnimateType.Opacity](animate: IAnimateOpacity) {
                const { start, end, to, from, duration } = animate;
                if (currentTime >= start && currentTime <= end) {
                    let leftInto = css`
                        animation-duration: ${duration}s;
                        animation-name: leftInto;

                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                    `;

                    if (!playState) {
                        leftInto = css`
                            animation-duration: ${duration}s;
                            animation-delay: ${-currentTime + start}s;
                            animation-name: leftInto;
                            animation-timing-function: linear;
                            animation-play-state: paused;
                        `;
                    }

                    const animateCss = css`
                        @keyframes leftInto {
                            to {
                                opacity: ${to};
                            }

                            from {
                                opacity: ${from};
                            }
                        }
                    `;

                    classAnimate.push(leftInto, animateCss);
                }
            }
        };

        animate.forEach(animateItem => {
            const animteKey = animateItem.type;

            const processFn = animateProcess[animteKey];
            if (processFn) {
                processFn(animateItem as any);
            }
        });

        return (
            <div className={classNames(...classAnimate)}>
                <C {...props} />
            </div>
        );
    };

    return Animate;
};
