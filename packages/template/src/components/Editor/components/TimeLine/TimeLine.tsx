import React from 'react';
import { ControlPannel } from './components/ControlPannel';
import { Time } from './components/Time/Time';
import { TimePannel } from './components/TimePannel';
import { ToolBarPannel } from './components/ToolBarPannel';

import $style from './style.module.less';

interface IProps {}

export const TimeLine: React.FC<IProps> = props => {
    return (
        <div className={$style.TimeLineWrapper}>
            <ToolBarPannel />
            <div className={$style.bottomScrollWrapper}>
                <TimePannel />
            </div>
        </div>
    );
};
