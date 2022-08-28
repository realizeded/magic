import React from 'react';
import $style from './style.module.less';

interface IProps {
    isSelect: boolean;
}

export const SelectBox: React.FC<IProps> = ({ isSelect }) => {
    if (!isSelect) {
        return null;
    }
    return (
        <div className={$style.selectBox}>
            <div className={$style.topStart} />
            <div className={$style.top} />
            <div className={$style.topEnd} />
            <div className={$style.leftCenter} />
            <div className={$style.rightCenter} />
            <div className={$style.bottomStart} />
            <div className={$style.bottom} />
            <div className={$style.bottomEnd} />
        </div>
    );
};
