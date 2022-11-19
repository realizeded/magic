import Item from 'antd/lib/list/Item';
import React from 'react';
import { Link } from 'react-router-dom';
import { topMenuConfig } from '../../../../routes';
// import { useGetHomeRoutes } from '../../../../route/hooks/useGetHomeRoutes';
import $style from './style.module.less';
import logo from '../../../../static/img/logo.jpg';

interface Props {}

export const Header: React.FC<Props> = props => {
    return (
        <div className={$style.headerWrapper}>
            <div className={$style.logo}>
                <h1 className={$style.logoImgWrapper}>
                    <img src={logo} />
                    <span className={$style.logoText}>遠方</span>
                </h1>
            </div>
            <div className={$style.topMenu}>
                {topMenuConfig.map(item => {
                    const path = item.path;
                    return (
                        <div key={path} className={$style.topMenuItem}>
                            <Link to={path}>
                                <span className={$style.text}>{item.title}</span>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
