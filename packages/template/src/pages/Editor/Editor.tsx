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
    EControlTypes,
    getCreateControlAction,
    getSetNewTemplateAction,
    ITemplate,
    resetProject,
    setComponentList
} from '../../store/module/template';
import { io } from 'socket.io-client';
import { dep } from '../../util';

interface IProps {}

export const Editor: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const params = useParams<IUrlParams>();

    const [loading, setLoading] = useState(true);

    const [isOpenDebug, setIsOpenDebug] = useState(false);

    const handleOpenDebug = () => {
        handleDebuger();
        setIsOpenDebug(true);
    };

    const handleCloseDebug = () => {
        location.reload();
    };

    const handleDebuger = () => {
        const socket = io('http://localhost:1024');

        socket.on('magicOk', () => {
            dep.emit('magicOk');
        });
        socket.on('ready', ({ name = '', id }) => {
            dep.addIds(id);
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
                        src: 'http://localhost:3001/static/js/bundle.js'
                    }
                })
            );
        });
    };

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
                <EditorHeader
                    isDebug={isOpenDebug}
                    handleOpenDebug={handleOpenDebug}
                    handleCloseDebug={handleCloseDebug}
                />
            </Header>
            <Content>
                <EditorCotent />
            </Content>
        </Layout>
    );
};
