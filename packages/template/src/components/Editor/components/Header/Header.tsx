import { Edit, Download, SaveOne, PreviewOpen } from '@icon-park/react';
import { Button } from 'antd';
import React from 'react';
import $style from './style.module.less';

interface IProps {}

export const Header: React.FC<IProps> = props => {
    return (
        <div className={$style.headerWrapper}>
            <div className={$style.left}>
                <div className={$style.projectDesc}>
                    <img src="http://localhost:3000/imgs/logo.svg" />
                </div>
                <div className={$style.projectNameWrappper}>
                    <div className={$style.text}>
                        <span className={$style.textContent}>答题</span>
                        <Edit size="14" theme="outline" fill="#000" />
                    </div>
                </div>
            </div>
            <div className={$style.right}>
                <div className={$style.btnGroup}>
                    <Button icon={<PreviewOpen size="14" theme="outline" fill="#000" />} />
                    <div className={$style.btnSave}>预览</div>
                </div>
                <div className={$style.btnGroup}>
                    <Button icon={<SaveOne size="14" theme="outline" fill="#000" />} />
                    <div className={$style.btnSave}>保存</div>
                </div>
            </div>
        </div>
    );
};
