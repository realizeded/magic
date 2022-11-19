import { Text } from '@icon-park/react';
import { start } from 'repl';
import { EAnimateType, EControlTypes, EEventType, ITemplateState, ETargetEventType } from './type';

export const initState: ITemplateState = {
    project: {
        playState: false,
        activeIndex: '',
        activeStageIndex: 0,
        scaleCanvas: 0.4,
        currentTime: 0,
        selectAnimateId: '',
        selectEventId: '',
        template: {
            name: '',
            id: '',
            stages: [
                {
                    name: '',
                    value: [],
                    posts: ''
                }
            ],
            controls: {}
        },
        customList: []
    }
};
