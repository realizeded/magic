import React from 'react';

import { Editor } from './pages/Editor';
import { Provider } from 'react-redux';
import { store } from './store';
import { routerConfigs } from './routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import types from './type';
export const App = () => {
    console.log('test');
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    {routerConfigs.map(item => {
                        const { path, component: C } = item;
                        return <Route path={path} key={path} element={<C />} />;
                    })}
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};
