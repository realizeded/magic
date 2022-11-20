import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createAnimate,
    createEvent,
    EControlTypes,
    getChangeControlZindex,
    getDeleteControl,
    IProject
} from '../../../../../../store/module/template';
import { TRootState } from '../../../../../../store/type';
import $style from './style.module.less';
import {
    Pic,
    Video,
    Music,
    Text,
    DeleteOne,
    ArrowUp,
    ArrowDown,
    AddThree,
    Effects,
    Components
} from '@icon-park/react';
import classNames from 'classnames';
import { EAnimateType } from '../../../PropertyPannel/components/AnimateCreateDesc';
import _ from 'lodash';
interface IProps {
    handleChangeControl: (id: string) => void;
}

export const ControlPannel: React.FC<IProps> = ({ handleChangeControl }) => {
    const dispatch = useDispatch();

    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { template, activeIndex, activeStageIndex } = project;

    const { stages, controls } = template;

    const activeStage = stages[activeStageIndex];
    const activeControls = activeStage.value.map(val => controls[val]);

    const typeMapToIcon = {
        [EControlTypes.Img]: Pic,
        [EControlTypes.Video]: Video,
        [EControlTypes.Audio]: Music,
        [EControlTypes.Text]: Text,
        [EControlTypes.Component]: Components
    };

    const handleDeleteControl = (id: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        dispatch(getDeleteControl(id));
        e.preventDefault();
        e.stopPropagation();
    };

    const handleChangeZindex = (isUP: boolean, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        dispatch(getChangeControlZindex(isUP));
        e.preventDefault();
        e.stopPropagation();
    };

    const handleAddEvent = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        dispatch(createEvent());
        e.preventDefault();
        e.stopPropagation();
    };

    const handleAddNimate = (id: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        dispatch(createAnimate(EAnimateType.normal));
        e.preventDefault();
        e.stopPropagation();
    };
    return (
        <div className={$style.ControlPannel}>
            {activeControls.map((control, i) => {
                const { name, type } = control;

                const Icon = typeMapToIcon[type];
                const isActive = activeIndex === activeStage.value[i];

                const controlId = activeStage.value[i];

                const isFirst = i === 0;
                const isLast = i === activeControls.length - 1;

                let isHidden = true;

                if (type !== EControlTypes.Audio) {
                    const opacity = control.style.opacity;
                    isHidden = !_.isUndefined(opacity) && Number(opacity) === 0;
                }

                const hiddenText = isHidden ? '(已隐藏)' : '';
                return (
                    <div
                        key={controlId}
                        className={classNames($style.controlItem, isActive && $style.active)}
                        onClick={() => handleChangeControl(activeStage.value[i])}
                        draggable={true}
                    >
                        <Icon size={14} fill="#000" theme="outline" />
                        <span className={$style.text}>
                            {name}
                            {hiddenText}
                        </span>
                        <div className={classNames($style.oper, isActive && $style.operActive)}>
                            <div>
                                <AddThree
                                    size="16"
                                    theme="outline"
                                    color="#3c3c3c"
                                    onClick={e => handleAddEvent(e)}
                                />
                            </div>
                            <div>
                                <Effects
                                    size="16"
                                    theme="outline"
                                    color="#3c3c3c"
                                    onClick={e => handleAddNimate(controlId, e)}
                                />
                            </div>
                            <div>
                                <DeleteOne
                                    size="16"
                                    theme="outline"
                                    color="#3c3c3c"
                                    onClick={e => handleDeleteControl(controlId, e)}
                                />
                            </div>
                            {!isFirst && (
                                <div>
                                    <ArrowUp
                                        size="16"
                                        theme="outline"
                                        color="#3c3c3c"
                                        onClick={e => handleChangeZindex(true, e)}
                                    />
                                </div>
                            )}
                            {!isLast && (
                                <div>
                                    <ArrowDown
                                        size="16"
                                        theme="outline"
                                        color="#3c3c3c"
                                        onClick={e => handleChangeZindex(false, e)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
