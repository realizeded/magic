import { useEffect } from 'react';
import { EUseDragELType } from './types';

export const useDragEl = (
    ref: React.RefObject<HTMLDivElement>,
    parentRef: React.RefObject<HTMLDivElement>,
    resizeDone: (newWdith: number, newHeight: number, top: number, left: number) => void
) => {
    const dragMapToProcess = {
        [EUseDragELType.TopStart](
            width: number,
            height: number,
            top: number,
            left: number,
            moveMomentX: number,
            moveMomentY: number
        ) {
            const isNotDrag = (width < 20 || height < 20) && moveMomentX > 0;
            const newWdith = isNotDrag ? width : width - moveMomentX;
            const newHeight = isNotDrag ? height : height - moveMomentX;
            const newTop = isNotDrag ? top : top + moveMomentX;
            const newLeft = isNotDrag ? left : left + moveMomentX;

            return { newWdith, newHeight, newTop, newLeft, isNotDrag };
        },
        [EUseDragELType.Top](
            width: number,
            height: number,
            top: number,
            left: number,
            moveMomentX: number,
            moveMomentY: number
        ) {
            const isNotDrag = height < 20 && moveMomentY > 0;
            const newWdith = width;
            const newHeight = isNotDrag ? height : height - moveMomentY;
            const newTop = isNotDrag ? top : top + moveMomentY;
            const newLeft = left;

            return { newWdith, newHeight, newTop, newLeft, isNotDrag };
        },
        [EUseDragELType.TopEnd](
            width: number,
            height: number,
            top: number,
            left: number,
            moveMomentX: number,
            moveMomentY: number
        ) {
            const isNotDrag = (width < 20 || height < 20) && moveMomentX < 0;
            const newWdith = isNotDrag ? width : width + moveMomentX;
            const newHeight = isNotDrag ? height : height + moveMomentX;
            const newTop = isNotDrag ? top : top - moveMomentX;
            const newLeft = left;

            return { newWdith, newHeight, newTop, newLeft, isNotDrag };
        },
        [EUseDragELType.LeftCenter](
            width: number,
            height: number,
            top: number,
            left: number,
            moveMomentX: number,
            moveMomentY: number
        ) {
            const isNotDrag = width < 20 && moveMomentX < 0;
            const newWdith = isNotDrag ? width : width - moveMomentX;
            const newHeight = height;
            const newTop = top;
            const newLeft = isNotDrag ? left : left + moveMomentX;

            return { newWdith, newHeight, newTop, newLeft, isNotDrag };
        },
        [EUseDragELType.RightCenter](
            width: number,
            height: number,
            top: number,
            left: number,
            moveMomentX: number,
            moveMomentY: number
        ) {
            const isNotDrag = width < 20 && moveMomentX < 0;
            const newWdith = isNotDrag ? width : width + moveMomentX;
            const newHeight = height;
            const newTop = top;
            const newLeft = left;

            return { newWdith, newHeight, newTop, newLeft, isNotDrag };
        },
        [EUseDragELType.BottomStart](
            width: number,
            height: number,
            top: number,
            left: number,
            moveMomentX: number,
            moveMomentY: number
        ) {
            const isNotDrag = (width < 20 || height < 20) && moveMomentX > 0;
            const newWdith = isNotDrag ? width : width - moveMomentX;
            const newHeight = isNotDrag ? height : height - moveMomentX;
            const newTop = top;
            const newLeft = isNotDrag ? left : left + moveMomentX;

            return { newWdith, newHeight, newTop, newLeft, isNotDrag };
        },
        [EUseDragELType.Bottom](
            width: number,
            height: number,
            top: number,
            left: number,
            moveMomentX: number,
            moveMomentY: number
        ) {
            const isNotDrag = height < 20 && moveMomentY > 0;
            const newWdith = width;
            const newHeight = isNotDrag ? height : height + moveMomentY;
            const newTop = top;
            const newLeft = left;

            return { newWdith, newHeight, newTop, newLeft, isNotDrag };
        },
        [EUseDragELType.BottomEnd](
            width: number,
            height: number,
            top: number,
            left: number,
            moveMomentX: number,
            moveMomentY: number
        ) {
            const isNotDrag = (width < 20 || height < 20) && moveMomentX < 0;
            const newWdith = isNotDrag ? width : width + moveMomentX;
            const newHeight = isNotDrag ? height : height + moveMomentX;
            const newTop = top;
            const newLeft = left;

            return { newWdith, newHeight, newTop, newLeft, isNotDrag };
        }
    };
    useEffect(() => {
        const current = ref.current;
        const wrapperEl = parentRef.current;

        if (current && wrapperEl) {
            let moveStartX = 0;
            let moveStartY = 0;
            let offsetX = 0;
            let offsetY = 0;
            let dragType = EUseDragELType.TopStart;

            const handleMouseDown = (e: MouseEvent) => {
                const target = e.target as HTMLDivElement;
                const dataSet = target.dataset;
                const { drag } = dataSet;

                if (drag) {
                    moveStartX = e.x;
                    moveStartY = e.y;
                    offsetX = e.offsetX;
                    offsetY = e.offsetY;
                    dragType = drag as EUseDragELType;

                    document.addEventListener('mousemove', handleMove);

                    document.addEventListener('mouseup', handleMouseUp);

                    e.preventDefault();
                    e.stopPropagation();
                }
            };

            const handleMove = (e: MouseEvent) => {
                const moveAfterx = e.x;
                const moveAfterY = e.y;
                const moveMomentX = moveAfterx - moveStartX;
                const moveMomentY = moveAfterY - moveStartY;
                const top = wrapperEl.offsetTop;
                const left = wrapperEl.offsetLeft;
                const width = wrapperEl.offsetWidth;
                const height = wrapperEl.offsetHeight;
                const processFn = dragMapToProcess[dragType];

                const { newWdith, newHeight, newTop, newLeft, isNotDrag } = processFn(
                    width,
                    height,
                    top,
                    left,
                    moveMomentX,
                    moveMomentY
                );
                if (!isNotDrag) {
                    moveStartX = moveAfterx;
                    moveStartY = moveAfterY;
                }

                resizeDone(newWdith, newHeight, newTop, newLeft);
                e.stopPropagation();
            };

            const handleMouseUp = () => {
                console.log('mouse up');

                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
            current.addEventListener('mousedown', handleMouseDown);
        }
    }, []);
};
