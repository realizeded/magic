import { useEffect } from 'react';

export const useWatchDown = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
        const current = ref.current;
        if (current) {
            current.addEventListener('mousedown', e => {
                console.log(e.offsetX);
            });
        }
    }, []);
};
