import { css } from '@emotion/css';
import classNames from 'classnames';
import React from 'react';
import { EAnimateType, IAnimateLeftInto, TAnimate } from '../../../../store/module/template';
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
            [EAnimateType.LeftInto](animate: IAnimateLeftInto) {
                const { start, end, top, left } = animate;
                if (currentTime >= start && currentTime <= end) {
                    let leftInto = css`
                        animation-duration: 1s;
                        animation-name: leftInto;

                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                    `;

                    if (!playState) {
                        leftInto = css`
                            animation-duration: 1s;
                            animation-delay: ${-currentTime + start}s;
                            animation-name: leftInto;
                            animation-timing-function: linear;
                            animation-play-state: paused;
                        `;
                    }
                    const animateCss = css`
                        @keyframes leftInto {
                            from {
                                margin-left: ${left}px;
                                margin-top: ${top}px;
                            }

                            to {
                                margin-left: 0;
                                margin-top: 0;
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
                processFn(animateItem);
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
