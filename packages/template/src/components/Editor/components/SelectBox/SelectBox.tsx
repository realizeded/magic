import React, { useEffect, useRef } from 'react';
import { EUseDragELType, useDragEl } from './hooks/useDragEl';
import $style from './style.module.less';

interface IProps {
    parentRef: React.RefObject<HTMLDivElement>;
    resizeDone: (newWdith: number, newHeight: number, top: number, left: number) => void;
}

export const SelectBox: React.FC<IProps> = ({ parentRef, resizeDone }) => {
    const selectBoxRef = useRef<HTMLDivElement>(null);

    useDragEl(selectBoxRef, parentRef, resizeDone);
    return (
        <div className={$style.selectBox} ref={selectBoxRef}>
            <div className={$style.topStart} data-drag={EUseDragELType.TopStart} />
            <div className={$style.top} data-drag={EUseDragELType.Top} />
            <div className={$style.topEnd} data-drag={EUseDragELType.TopEnd} />
            <div className={$style.leftCenter} data-drag={EUseDragELType.LeftCenter} />
            <div className={$style.rightCenter} data-drag={EUseDragELType.RightCenter} />
            <div className={$style.bottomStart} data-drag={EUseDragELType.BottomStart} />
            <div className={$style.bottom} data-drag={EUseDragELType.Bottom} />
            <div className={$style.bottomEnd} data-drag={EUseDragELType.BottomEnd} />
        </div>
    );
};
