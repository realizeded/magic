import React from 'react';

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
