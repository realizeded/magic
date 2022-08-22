import React from 'react';
import $style from './style.module.less';
import { Button } from 'antd';

import 'antd/dist/antd.min.css';

interface IProps {}

export const App: React.FC<IProps> = (props) => {
    return (
        <div>
            <Button type="primary">Primary Button</Button>
        </div>
    );
};
