import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import $style from './style.module.less';

interface IProps {
    scriptPath: string;
}

// eslint-disable-next-line react/display-name, react/prop-types
export const Custom: React.FC<IProps> = React.memo(({ scriptPath }) => {
    const containRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const current = containRef.current;
        if (current) {
            fetch(scriptPath)
                .then(res => res.text())
                .then(code => {
                    const exports = {};
                    const module = { exports };
                    eval(code);

                    const C = module.exports as React.FunctionComponent;
                    const shadow = current.attachShadow({ mode: 'closed' });
                    current.appendChild(shadow);
                    ReactDOM.render(<C />, shadow);
                });
        }
    }, [containRef]);
    return <div className={$style.cutomComponent} ref={containRef}></div>;
});
