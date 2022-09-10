import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { EControlTypes, IProject } from '../../../../../../store/module/template';
import { TRootState } from '../../../../../../store/type';
import { ControlPannel } from '../ControlPannel';
import { Line } from '../Line';
import $style from './style.module.less';
import { CircleDoubleUp } from '@icon-park/react';

interface IProps {}

export const TimePannel: React.FC<IProps> = props => {
    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { template, activeIndex, activeStageIndex, currentTime } = project;

    const { stages, controls } = template;

    const activeStage = stages[activeStageIndex];
    const activeControls = activeStage.value.map(val => controls[val]);

    return (
        <div className={$style.timePannelWrapper}>
            <div className={$style.controlWrapper}>
                <div className={$style.controlName}>控件名称</div>
                <ControlPannel />
            </div>
            <div className={$style.life}>
                <Line />

                <div className={$style.verticalLine} style={{ left: currentTime * 10 + 30 + 'px' }}>
                    <CircleDoubleUp theme="filled" fill="rgb(13 206 138)" size="14" />
                </div>
                {activeControls.map((control, i) => {
                    const isActive = activeIndex === activeStage.value[i];
                    const type = control.type;

                    if (type === EControlTypes.Img) {
                        return (
                            <div
                                key={i}
                                className={classNames($style.lineControl, isActive && $style.active)}
                                style={{ background: `url(${control.data.src})`, backgroundSize: '32px' }}
                            ></div>
                        );
                    }

                    if (type === EControlTypes.Video) {
                        return (
                            <div
                                key={i}
                                className={classNames($style.lineControl, isActive && $style.active)}
                                style={{ background: `url(${control.data.posts})`, backgroundSize: '32px' }}
                            ></div>
                        );
                    }
                    return (
                        <div
                            key={i}
                            className={classNames($style.lineControl, isActive && $style.active)}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};
