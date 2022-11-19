import { Layout, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import $style from './style.module.less';
import { Content as EditorCotent } from './components/Content';

const { Header, Content } = Layout;

import { Header as EditorHeader } from './components/Header';
import { Provider, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IUrlParams } from './type';
import { getComponentList, getTemplate } from '../../services/template';
import {
    getSetNewTemplateAction,
    ITemplate,
    resetProject,
    setComponentList
} from '../../store/module/template';
import { store } from '../../store';
import EditorPreview from './components/EditorPreview/EditorPreview';

interface IProps {}

export const Editor: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const params = useParams<IUrlParams>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = params.id;
        if (!id) return;
        getTemplate(id).then(res => {
            const { name, template } = res;

            const newTemplate = JSON.parse(template);
            const newProject = {
                name,
                ...newTemplate,
                id
            } as unknown as ITemplate;
            dispatch(getSetNewTemplateAction(newProject));
            setLoading(false);
        });

        getComponentList().then(res => {
            dispatch(setComponentList(res || []));
        });
        return () => {
            dispatch(resetProject());
        };
    }, [params]);

    return (
        <Layout className={$style.editorPage}>
            {loading && (
                <div className={$style.loadingWrapper}>
                    <Spin spinning={loading} />
                </div>
            )}
            <Header className={$style.editorHeader}>
                <EditorHeader />
            </Header>
            <Content>
                <EditorCotent />
            </Content>
        </Layout>
    );
};
