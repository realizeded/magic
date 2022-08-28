import React from 'react';

import 'antd/dist/antd.min.css';
import { Editor } from './components/Editor';
import { Provider } from 'react-redux';
import { store } from './store';
export const App = () => {
    return (
        <Provider store={store}>
            <Editor />;
        </Provider>
    );
};
