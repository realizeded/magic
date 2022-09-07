import classNames from 'classnames';
import React from 'react';
import $style from './style.module.less';

interface IProps {}

export const Line: React.FC<IProps> = props => {
    const gridLen = 20;
    const unit = 0.1;
    const gridUnitNum = 10;
    return (
        <div className={$style.lineWrapper} style={{ width: gridUnitNum * gridLen * 10 + 30 + 'px' }}>
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
