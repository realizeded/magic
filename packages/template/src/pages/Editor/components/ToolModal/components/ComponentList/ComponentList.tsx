import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICustomComponent } from '../../../../../../services/template';
import { EControlTypes, getCreateControlAction, IProject } from '../../../../../../store/module/template';
import { TRootState } from '../../../../../../store/type';
import $style from './style.module.less';

interface IProps {}

export const ComponentList: React.FC<IProps> = props => {
    const project = useSelector<TRootState, IProject>(state => state.project.project);
    const dispatch = useDispatch();
    const { customList } = project;

    const handleCreateComponent = (item: ICustomComponent) => {
        const { name, scriptPath, id } = item;
        dispatch(
            getCreateControlAction({
                id,
                type: EControlTypes.Component,
                name: name,
                style: {},
                box: {
                    width: '200px',
                    height: '200px',
                    top: '20px',
                    left: '0px'
                },
                data: {
                    src: scriptPath
                }
            })
        );
    };
    return (
        <div className={$style.componentListWrapper}>
            {customList.map(item => {
                const { img, name, id } = item;
                return (
                    <div
                        key={id}
                        className={$style.componentItem}
                        onClick={() => handleCreateComponent(item)}
                    >
                        <img src={img} />
                        <div className={$style.text}>{name}</div>
                    </div>
                );
            })}
        </div>
    );
};
