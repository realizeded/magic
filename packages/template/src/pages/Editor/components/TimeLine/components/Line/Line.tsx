import classNames from 'classnames';
import _ from 'lodash';
import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChangeCurrentTime, IProject } from '../../../../../../store/module/template';
import { TRootState } from '../../../../../../store/type';
import { useWatchDown } from './hooks/useWatchDown';
import $style from './style.module.less';

interface IProps {}

export const Line: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { template, activeStageIndex } = project;
    const { stages, controls } = template;
    const unit = 0.1;
    const gridUnitNum = 10;

    const gridLen = useMemo(() => {
        if (_.isUndefined(activeStageIndex)) {
            return 20;
        }
        const activeStage = stages[activeStageIndex];

        const { value } = activeStage;

        const allControls = value.map(val => controls[val]);

        let max = 20;

        allControls.forEach(control => {
            const { type, animate = [], event = [] } = control;

            animate.forEach(({ end }) => {
                const endUnitNum = Math.ceil(end / (gridUnitNum * 0.1)) + 1;
                max = max > endUnitNum ? max : endUnitNum;
            });

            event.forEach(({ start }) => {
                const endUnitNum = Math.ceil(start / (gridUnitNum * 0.1)) + 1;

                max = max > endUnitNum ? max : endUnitNum;
            });
        });

        return max;
    }, [project]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const left = e.nativeEvent.offsetX - 30;
        const newLeft = left <= 0 ? 0 : left;
        const time = newLeft / 100;
        dispatch(getChangeCurrentTime(time));
    };

    return (
        <div className={$style.lineWrapper} onMouseDown={handleMouseDown}>
            <div className={$style.vLine}>
                <div className={classNames($style.unitWrapper)}></div>
                <div className={classNames($style.unitWrapper)}></div>
                <div className={classNames($style.unitWrapper)}></div>
            </div>
            {Array(gridLen)
                .fill(1)
                .map((val, pi) => {
                    return (
                        <div className={$style.grid} key={pi}>
                            {Array(gridUnitNum)
                                .fill(1)
                                .map((val, i) => {
                                    const isMiddle = i !== 0 && i === gridUnitNum / 2;
                                    return (
                                        <>
                                            <div
                                                className={classNames(
                                                    $style.unitWrapper,
                                                    isMiddle && $style.middleLine
                                                )}
                                                key={i}
                                            ></div>
                                        </>
                                    );
                                })}

                            <span className={$style.unitText}>{unit * 10 * pi}</span>
                        </div>
                    );
                })}
        </div>
    );
};
