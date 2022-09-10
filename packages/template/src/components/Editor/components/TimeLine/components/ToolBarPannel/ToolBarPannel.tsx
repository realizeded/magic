import { Delete, PauseOne, PlayOne } from '@icon-park/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTogglePlayState, IProject } from '../../../../../../store/module/template';
import { TRootState } from '../../../../../../store/type';
import $style from './style.module.less';
import { formateTime } from './util';

interface IProps {}

export const ToolBarPannel: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { playState, currentTime } = project;

    const handleChangePlayState = () => {
        dispatch(getTogglePlayState(!playState));
    };

    return (
        <div className={$style.ToolBarPannel}>
            <div className={$style.toolbarItemWrapper}>
                <Delete size={14} fill="#000" theme="outline" />
            </div>
            <div className={$style.toolbarItemWrapper} onClick={handleChangePlayState}>
                {playState ? (
                    <PauseOne size={14} fill="#000" theme="filled" />
                ) : (
                    <PlayOne size={14} fill="#000" theme="filled" />
                )}
            </div>
            <div className={$style.timePannel}>{formateTime(currentTime * 1000)}</div>
        </div>
    );
};
