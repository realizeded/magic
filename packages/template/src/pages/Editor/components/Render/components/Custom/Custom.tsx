import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { dep } from '../../../../../../util';
import $style from './style.module.less';

interface IProps {
    scriptPath: string;
    id: number;
}

// eslint-disable-next-line react/display-name, react/prop-types
export const Custom: React.FC<IProps> = React.memo(({ scriptPath, id }) => {
    const containRef = useRef<HTMLDivElement>(null);

    const renderComponent = () => {
        const current = containRef.current;
        if (current) {
            fetch(scriptPath)
                .then(res => res.text())
                .then(code => {
                    const exports = {};
                    const module = { exports };
                    eval(code);
                    const C = module.exports as React.FunctionComponent;
                    ReactDOM.render(<C />, current);
                });
        }
    };
    useEffect(() => {
        const current = containRef.current;
        if (current) {
            renderComponent();
            if (dep.includes(id)) {
                dep.on('magicOk', renderComponent);
            }
        }
    }, [containRef]);
    return <div className={$style.cutomComponent} ref={containRef}></div>;
});
