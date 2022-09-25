import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { ITemplate, TControls } from '../../types';
import { AnimateHoc } from '../Animate';
import { BoxHoc } from '../Box/Box';
import { TBoxComponent } from '../Box/type';
import { EventHoc } from '../Event';
import { Render } from '../Render/Render';
import $style from './style.module.less';

interface IProps {}

const Flow = compose(BoxHoc, AnimateHoc, EventHoc)(Render) as TBoxComponent;
export const Layout: React.FC<IProps> = props => {
    const templateConfig = window.config;

    const [config, setConfig] = useState<ITemplate>({ id: '0', name: '', stages: [], controls: {} });

    const [activeStage, setActiveStage] = useState(-1);

    const [currentTime, setCurrentTime] = useState(0);
    const [playState, setPlayState] = useState(true);

    useEffect(() => {
        setConfig(templateConfig);
        setActiveStage(0);
        const start = Date.now();
        const fn = () => {
            setCurrentTime((Date.now() - start) / 1000);
            if (playState) {
                requestAnimationFrame(fn);
            }
        };
        requestAnimationFrame(fn);
    }, []);

    if (activeStage === -1) {
        return null;
    }
    const { stages, controls } = config;

    const { value: stageValues } = stages[activeStage];

    const handleChangeControl = (controlId: string, control: TControls) => {
        controls[controlId] = control;
        setConfig({ ...config });
    };

    const handleChangeCurrentTime = () => {
        setCurrentTime(0);
    };
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
                        handleChangeControl={handleChangeControl}
                        setPlayState={setPlayState}
                        handleChangeCurrentTime={handleChangeCurrentTime}
                    />
                );
            })}
        </div>
    );
};
