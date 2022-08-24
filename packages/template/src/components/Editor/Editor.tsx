import { Layout } from 'antd';
import React from 'react';
import $style from './style.module.less';
import { Content as EditorCotent } from './components/Content';

const { Header, Content } = Layout;

interface IProps {}

export const Editor: React.FC<IProps> = props => {
    return (
        <Layout className={$style.editorPage}>
            <Header className={$style.editorHeader}>Header</Header>
            <Content>
                <EditorCotent />
            </Content>
        </Layout>
    );
};
