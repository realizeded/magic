import { Layout } from 'antd';
import React from 'react';
import $style from './style.module.less';
import { Content as EditorCotent } from './components/Content';

const { Header, Content } = Layout;

import { Header as EditorHeader } from './components/Header';

interface IProps {}

export const Editor: React.FC<IProps> = props => {
    return (
        <Layout className={$style.editorPage}>
            <Header className={$style.editorHeader}>
                <EditorHeader />
            </Header>
            <Content>
                <EditorCotent />
            </Content>
        </Layout>
    );
};
