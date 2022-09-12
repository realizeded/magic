import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    EAnimateType,
    EControlTypes,
    getChangeActiveIndexAction,
    IProject,
    TAnimate
} from '../../../../../../store/module/template';
import { TRootState } from '../../../../../../store/type';
import { ControlPannel } from '../ControlPannel';
import { Line } from '../Line';
import $style from './style.module.less';
import { CircleDoubleUp, Mark } from '@icon-park/react';
import { start } from 'repl';
import { animteKeyMapToText } from './constant';

interface IProps {}

export const TimePannel: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { template, activeIndex, activeStageIndex, currentTime } = project;

    const { stages, controls } = template;

    const activeStage = stages[activeStageIndex];
    const activeControls = activeStage.value.map(val => controls[val]);

    const handleChangeControl = (id: string) => {
        dispatch(getChangeActiveIndexAction(id));
    };

    return (
        <div className={$style.timePannelWrapper}>
            <div className={$style.controlWrapper}>
                <div className={$style.controlName}>控件名称</div>
                <ControlPannel handleChangeControl={handleChangeControl} />
            </div>
            <div className={$style.life}>
                <Line />

                <div className={$style.verticalLine} style={{ left: currentTime * 10 * 10 + 30 + 'px' }}>
                    <CircleDoubleUp theme="filled" fill="rgb(13 206 138)" size="14" />
                </div>
                {activeControls.map((control, i) => {
                    const isActive = activeIndex === activeStage.value[i];
                    const type = control.type;

                    const animate = control.animate ?? ([] as TAnimate);
                    const event = control.event ?? [];
                    const handleClick = handleChangeControl.bind(this, activeStage.value?.[i]);
                    if (type === EControlTypes.Img) {
                        return (
                            <div
                                key={i}
                                className={classNames($style.lineControl, isActive && $style.active)}
                                onClick={handleClick}
                                // style={{ background: `url(${control.data.src})`, backgroundSize: '32px' }}
                            >
                                {animate.map((animateItem, i) => {
                                    const key = animateItem.type;
                                    const { start, end } = animateItem;

                                    const width = (end - start) * 10 * 10;
                                    return (
                                        <div
                                            key={i}
                                            className={$style.animateLineItem}
                                            style={{ width, left: start * 10 * 10 + 30 + 'px' }}
                                        >
                                            {animteKeyMapToText[key]}
                                        </div>
                                    );
                                })}

                                {event.map((eventItem, i) => {
                                    const start = eventItem.start;
                                    const left = start * 10 * 10 + 30 + 'px';
                                    return (
                                        <div key={i} className={$style.eventLineItem} style={{ left }}>
                                            <Mark size={20} fill="#3955f6" theme="outline" />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }

                    return (
                        <div
                            key={i}
                            onClick={handleClick}
                            className={classNames($style.lineControl, isActive && $style.active)}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};
