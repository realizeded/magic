import React, { useEffect, useRef } from 'react';
import { TRenderComponent } from '../Render/type';
import { TEventComponent } from './type';
import $style from './style.module.less';
import { EEventType, ETargetEventType, IJumpEvent, TTargetEvent, TToggleStage } from '../../types';

export const EventHoc = (C: TRenderComponent) => {
    const Event: TEventComponent = props => {
        const { controls, controlVal, currentTime, playState, setActiveStage } = props;

        const clickRef = useRef<HTMLDivElement>(null);

        const targetEventRef = useRef<TTargetEvent>([]);
        const targetEventProcess = {
            [ETargetEventType.jumpPlay]: async (targetEvent: IJumpEvent) => {
                const start = targetEvent.start;
                // await dispatch(getChangeCurrentTime(start));
            },
            [ETargetEventType.toggleStage]: async (targetEvent: TToggleStage) => {
                const nextStage = targetEvent.stageIndex;
                console.log(12);
                setActiveStage(nextStage);
                // await dispatch(getChangeActiveStageIndexAction(nextStage));
            }
        };

        const handleProcessTargetEvent = async () => {
            const targetEvent = targetEventRef.current;
            // dispatch(getTogglePlayState(false));

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
                // dispatch(getTogglePlayState(true));
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

            const event = controls[controlVal].event || [];

            event.map(eventItem => {
                const { type, start, targetEvent } = eventItem;

                if (start <= currentTime) {
                    eventProcessMap[type](targetEvent);
                }
            });
        }, [currentTime, playState]);

        return (
            <div className={$style.eventWrapper} ref={clickRef}>
                <C {...props} />
            </div>
        );
    };

    return Event;
};
