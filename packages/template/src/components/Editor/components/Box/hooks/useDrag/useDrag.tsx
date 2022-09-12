import { useEffect, useRef, useState } from 'react';
import { IUseDragProps } from '../../type';

export const useDrag = (props: IUseDragProps) => {
    const { ref, dragEnd, dragStart, playState } = props;

    const refPlayState = useRef(playState);
    refPlayState.current = playState;

    const elStartMoveRef = useRef({ x: 0, y: 0 });
    const elPositionRef = useRef({ x: 0, y: 0 });

    const handleMove = (e: MouseEvent) => {
        const current = ref.current;

        if (!current) return;

        const { x: moveStartX, y: moveStartY } = elStartMoveRef.current;
        const { x: left, y: top } = elPositionRef.current;

        const moveAfterX = e.x;
        const moveAfterY = e.y;

        const newLeft = left + (moveAfterX - moveStartX);
        const newTop = top + (moveAfterY - moveStartY);

        elStartMoveRef.current = { x: moveAfterX, y: moveAfterY };
        elPositionRef.current = { y: newTop, x: newLeft };

        dragEnd(elPositionRef.current);
        e.stopPropagation();
    };

    const handleMouseDown = (e: MouseEvent) => {
        const current = ref.current;

        if (!current || refPlayState.current) {
            return;
        }
        dragStart();

        const top = current.offsetTop;
        const left = current.offsetLeft;
        elStartMoveRef.current = { x: e.x, y: e.y };
        elPositionRef.current = { y: top, x: left };
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMove);
        e.stopPropagation();
    };

    const handleMouseUp = (e: MouseEvent) => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMove);

        e.stopPropagation();
    };
    useEffect(() => {
        const current = ref.current;

        if (!current) return;
        current.addEventListener('mousedown', handleMouseDown);
    }, [ref]);
};
