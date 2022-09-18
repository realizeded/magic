import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    EAnimateType,
    EControlTypes,
    getChangeActiveIndexAction,
    IProject,
    selectAnimateId,
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

    // const handleContextMenu = (id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     dispatch(getChangeActiveIndexAction(id));
    //     e.stopPropagation();
    //     e.preventDefault();
    // };

    const handleSelectAnimateId = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string,
        controlId: string
    ) => {
        dispatch(selectAnimateId([id, controlId]));
        e.stopPropagation();
        e.preventDefault();
    };
    return (
        <div className={$style.timePannelWrapper}>
            <div className={$style.controlName}>控件名称</div>
            <Line />

            <ControlPannel handleChangeControl={handleChangeControl} />
            <div>
                {activeControls.map((control, i) => {
                    const controlId = activeStage.value[i];
                    const isActive = activeIndex === controlId;
                    const type = control.type;
                    const animate = control.animate ?? ([] as TAnimate);
                    const event = control.event ?? [];
                    const handleClick = handleChangeControl.bind(this, controlId);
                    // const handleContextMenuBind = handleContextMenu.bind(this, controlId);
                    return (
                        <div
                            className={classNames($style.lineControl, isActive && $style.active)}
                            onClick={handleClick}
                            key={controlId}
                            // onContextMenu={handleContextMenuBind}
                        >
                            {animate.map((animateItem, i) => {
                                const key = animateItem.type;
                                const { start, end, id } = animateItem;

                                const width = (end - start) * 10 * 10;
                                return (
                                    <div
                                        key={i}
                                        className={$style.animateLineItem}
                                        style={{ width, left: start * 10 * 10 + 30 + 'px' }}
                                        onClick={e => handleSelectAnimateId(e, id, controlId)}
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
                })}
            </div>
        </div>
    );
};
