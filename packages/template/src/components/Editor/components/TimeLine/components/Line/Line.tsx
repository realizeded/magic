import classNames from 'classnames';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getChangeCurrentTime } from '../../../../../../store/module/template';
import { useWatchDown } from './hooks/useWatchDown';
import $style from './style.module.less';

interface IProps {}

export const Line: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const gridLen = 20;
    const unit = 0.1;
    const gridUnitNum = 10;

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const left = e.nativeEvent.offsetX - 30;
        const newLeft = left <= 0 ? 0 : left;
        const time = newLeft / 10;
        console.log(time);
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
