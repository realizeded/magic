import React from 'react';

import $style from './style.module.less';
interface IProps {}

export const Home: React.FC<IProps> = props => {
    return (
        <div className={$style.homeWrapper}>
            <div className={$style.pWrapper}>
                <div className={$style.hd}>遠方</div>
                <p>遠方是一个低代码平台，提供给用户快速制作页面的能力。</p>
                <p>
                    用户可以在编辑器提供拖拽组件，生成微页面，当然也还可以给控件添加对应的事件，例如切换场景、播放音效等等。
                </p>
                <p>最后用户可以预览或者发布之后，把二维码分享给朋友,给朋友一个惊喜</p>
            </div>
        </div>
    );
};
