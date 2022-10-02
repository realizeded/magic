import { CircleDoubleUp, DownSquare, FigmaFlattenSelection } from '@icon-park/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { IProject } from '../../../../store/module/template';
import { TRootState } from '../../../../store/type';
import { ControlPannel } from './components/ControlPannel';
import { Time } from './components/Time/Time';
import { TimePannel } from './components/TimePannel';
import { ToolBarPannel } from './components/ToolBarPannel';

import $style from './style.module.less';

interface IProps {}

export const TimeLine: React.FC<IProps> = props => {
    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { currentTime } = project;

    return (
        <div className={$style.TimeLineWrapper}>
            <ToolBarPannel />
            <div className={$style.bottomScrollWrapper}>
                <TimePannel />
                <div className={$style.verticalLine} style={{ left: currentTime * 10 * 10 + 270 + 'px' }}>
                    <FigmaFlattenSelection theme="filled" fill="rgb(13 206 138)" size="14" />
                </div>
            </div>
        </div>
    );
};
