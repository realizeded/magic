import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
    EEventType,
    ETargetEventType,
    getChangeCurrentTime,
    getTogglePlayState,
    IJumpEvent,
    TTargetEvent
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
            }
        };

        const handleProcessTargetEvent = async () => {
            const targetEvent = targetEventRef.current;
            dispatch(getTogglePlayState(false));

            targetEvent.forEach(async (tagetEventItem, i) => {
                const type = tagetEventItem.type;
                await targetEventProcess[type](tagetEventItem);
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
