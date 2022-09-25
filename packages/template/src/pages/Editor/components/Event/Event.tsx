import classNames from 'classnames';
import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
    EControlTypes,
    EEventType,
    ETargetEventType,
    getChangeActiveStageIndexAction,
    getChangeControlAction,
    getChangeCurrentTime,
    getTogglePlayState,
    IJumpEvent,
    TTargetEvent,
    TToggleStage,
    TTopacity
} from '../../../../store/module/template';
import { TRenderComponentType } from '../Render';
import $style from './style.module.less';
import { IEventProps } from './type';

interface IProps {}

export const EvenHoc = (C: TRenderComponentType) => {
    const Event: React.FC<IEventProps> = props => {
        const dispatch = useDispatch();
        const { controls, controlValue, currentTime, playState, activeIndex } = props;

        const clickRef = useRef<HTMLDivElement>(null);

        const targetEventRef = useRef<TTargetEvent>([]);
        const targetEventProcess = {
            [ETargetEventType.jumpPlay]: async (targetEvent: IJumpEvent) => {
                const start = targetEvent.start;
                await dispatch(getChangeCurrentTime(start));
            },
            [ETargetEventType.toggleStage]: async (targetEvent: TToggleStage) => {
                const nextStage = targetEvent.stageIndex;

                await dispatch(getTogglePlayState(false));
                await dispatch(getChangeCurrentTime(0));
                await dispatch(getChangeActiveStageIndexAction(nextStage));
                await dispatch(getTogglePlayState(true));
            },
            [ETargetEventType.setOpacity]: async (targetEvent: TTopacity) => {
                const { targetControlId, value } = targetEvent;
                if (!targetControlId) {
                    return;
                }
                const newControl = _.cloneDeep(controls[targetControlId]);
                if (newControl.type === EControlTypes.Audio) return;
                const style = (newControl.style || {}) as any;
                style.opacity = value;
                newControl.style = style;

                await dispatch(getChangeControlAction(targetControlId, newControl));
            }
        };

        const handleProcessTargetEvent = async () => {
            const targetEvent = targetEventRef.current;
            dispatch(getTogglePlayState(false));

            targetEvent.forEach(async (tagetEventItem, i) => {
                const type = tagetEventItem.type;
                const processFn = targetEventProcess[type];
                if (processFn) {
                    await processFn(tagetEventItem as any);
                }
            });

            const current = clickRef.current;
            if (current) {
                current.onclick = null;
            }

            setTimeout(() => {
                dispatch(getTogglePlayState(true));
            });
        };

        const eventProcessMap = {
            [EEventType.Click]: (targetEvent: TTargetEvent) => {
                const current = clickRef.current;
                if (!current) {
                    return;
                }
                targetEventRef.current = targetEvent;

                if (current.onclick) {
                    return;
                }

                current.onclick = handleProcessTargetEvent;
            }
        };

        useEffect(() => {
            if (!playState) return;

            const event = controls[controlValue].event || [];

            event.map(eventItem => {
                const { type, start, targetEvent } = eventItem;
                if (start <= currentTime) {
                    eventProcessMap[type](targetEvent);
                }
            });
        }, [currentTime, playState]);

        return (
            <div className={$style.eventWrapper} ref={clickRef}>
                <C
                    controlValue={controlValue}
                    controls={controls}
                    currentTime={currentTime}
                    playState={playState}
                />
            </div>
        );
    };

    return Event;
};
