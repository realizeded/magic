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
            <div className={$style.topStart} draggable={false} data-drag={EUseDragELType.TopStart} />
            <div className={$style.top} draggable={false} data-drag={EUseDragELType.Top} />
            <div className={$style.topEnd} draggable={false} data-drag={EUseDragELType.TopEnd} />
            <div className={$style.leftCenter} draggable={false} data-drag={EUseDragELType.LeftCenter} />
            <div className={$style.rightCenter} draggable={false} data-drag={EUseDragELType.RightCenter} />
            <div className={$style.bottomStart} draggable={false} data-drag={EUseDragELType.BottomStart} />
            <div className={$style.bottom} draggable={false} data-drag={EUseDragELType.Bottom} />
            <div className={$style.bottomEnd} draggable={false} data-drag={EUseDragELType.BottomEnd} />
        </div>
    );
};
