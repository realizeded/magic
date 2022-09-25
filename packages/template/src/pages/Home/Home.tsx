import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { routerConfigs } from '../../routes';
// import { useGetHomeRoutes } from '../../route/hooks/useGetHomeRoutes';
import { Content } from './components/Content';
import { Header } from './components/Header';
// import { Home as CHome } from './components/Home';
import $style from './style.module.less';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

export const Home: React.FC<IProps> = props => {
    return (
        <div className={$style.homeWrapper}>
            <Header />
            <Routes>
                {routerConfigs[0].children?.map(item => {
                    const { path, component: C } = item;
                    return <Route path={path} key={path} element={<C />} />;
                })}
            </Routes>
        </div>
    );
};
