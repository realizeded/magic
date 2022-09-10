import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { IProject } from '../../../../store/module/template';
import { TRootState } from '../../../../store/type';
import { Phone } from '../Phone';
import $style from './style.module.less';

interface IProps {}

export const Layout: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const project = useSelector<TRootState, IProject>(state => state.project.project);
    const { template, scaleCanvas } = project;

    return (
        <div className={$style.layoutWrapper} id="layoutCanvas">
            <Phone />
        </div>
    );
};
