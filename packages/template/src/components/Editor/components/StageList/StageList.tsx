import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getChangeActiveIndexAction,
    getChangeActiveStageIndexAction,
    getChangeStagePost,
    getDeleteStageAction,
    IProject
} from '../../../../store/module/template';
import { TRootState } from '../../../../store/type';
import $style from './style.module.less';
import { Delete } from '@icon-park/react';
import { captureImg } from '../../utils';

interface IProps {}

export const StageList: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { template, activeStageIndex } = project;

    const { stages, controls } = template;

    const handleClickStage = async (key: number) => {
        if (key === activeStageIndex) {
            return;
        }

        await dispatch(getChangeActiveIndexAction(''));
        const posts = await captureImg();
        dispatch(getChangeStagePost(posts));
        dispatch(getChangeActiveStageIndexAction(key));
    };

    const handleDeleteStage = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, key: number) => {
        dispatch(getDeleteStageAction(key));
        e.stopPropagation();
    };

    return (
        <div className={$style.listWrapper}>
            {stages.map((stage, key) => {
                const { name, posts } = stage;
                return (
                    <div
                        className={classNames(
                            $style.listItemWrapper,
                            activeStageIndex === key && $style.activeStage
                        )}
                        onClick={() => handleClickStage(key)}
                        key={key}
                    >
                        <div className={$style.imgWrapper}>
                            <img src={posts} />
                            <div
                                className={classNames($style.delWrapper, stages.length === 1 && $style.hide)}
                            >
                                <Delete
                                    size={14}
                                    fill="#2980b9"
                                    theme="filled"
                                    onClick={e => handleDeleteStage.bind(this, e)(key)}
                                />
                            </div>
                        </div>
                        <div className={$style.stageText}>{name}</div>
                    </div>
                );
            })}
        </div>
    );
};
