import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { AnimateHoc } from '../Animate';
import { BoxHoc } from '../Box/Box';
import { TBoxComponent } from '../Box/type';
import { EventHoc } from '../Event';
import { Render } from '../Render/Render';
import $style from './style.module.less';

interface IProps {}

const Flow = compose(BoxHoc, AnimateHoc, EventHoc)(Render) as TBoxComponent;
export const Layout: React.FC<IProps> = props => {
    const config = window.config;

    const [activeStage, setActiveStage] = useState(0);
    const { stages, controls } = config;

    const { value: stageValues } = stages[activeStage];

    const [currentTime, setCurrentTime] = useState(0);
    const [playState, setPlayState] = useState(true);

    useEffect(() => {
        if (playState) {
            const start = Date.now();
            const fn = () => {
                setCurrentTime((Date.now() - start) / 1000);
                requestAnimationFrame(fn);
            };
            requestAnimationFrame(fn);
        }
    }, [playState]);

    return (
        <div className={$style.layout}>
            {stageValues.map((controlVal, i) => {
                return (
                    <Flow
                        key={i}
                        controlVal={controlVal}
                        controls={controls}
                        currentTime={currentTime}
                        playState={playState}
                        setActiveStage={setActiveStage}
                    />
                );
            })}
        </div>
    );
};
