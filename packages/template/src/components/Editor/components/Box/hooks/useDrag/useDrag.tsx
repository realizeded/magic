import { useEffect, useRef, useState } from 'react';
import { IUseDragProps } from '../../type';

export const useDrag = (props: IUseDragProps) => {
    const { ref, dragEnd, dragStart } = props;

    const [isTouch, setIsTouch] = useState(false);
    const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const elPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const handleMove = (e: MouseEvent) => {
        const current = ref.current;

        if (!current) return;

        const { x, y } = positionRef.current;

        const afterX = e.offsetX;
        const afterY = e.offsetY;

        const top = window.getComputedStyle(current).top.replace('px', '');
        const left = window.getComputedStyle(current).left.replace('px', '');

        const newY = Number(top) + afterY - y;
        const newX = Number(left) + afterX - x;
        current.style.top = newY + 'px';
        current.style.left = newX + 'px';
        elPositionRef.current = { x: newX, y: newY };

        e.stopPropagation();
    };

    const handleMouseDown = (e: MouseEvent) => {
        setIsTouch(true);
        const x = e.offsetX;
        const y = e.offsetY;
        const current = ref.current;

        if (!current) return;
        dragStart();
        current.style.zIndex = '9999';
        positionRef.current = { x, y };
        elPositionRef.current = { x, y };
        current.addEventListener('mousemove', handleMove);
    };

    const handleMouseUp = (e: MouseEvent) => {
        const current = ref.current;

        if (!current) return;
        setIsTouch(false);
        const x = e.offsetX;
        const y = e.offsetY;
        positionRef.current = { x, y };

        current.style.zIndex = '0';

        dragEnd(elPositionRef.current);
        current.removeEventListener('mousemove', handleMove);
    };

    useEffect(() => {
        const current = ref.current;

        if (!current) return;

        current.addEventListener('mousedown', handleMouseDown);

        current.addEventListener('mouseup', handleMouseUp);
    }, [ref]);
};
