import React from 'react';
import { ImgList } from './components/ImgList';
import { VideoList } from './components/VideoList';
import { AudioList } from './components/AudioList';
import $style from './style.module.less';
import { EActiveType } from './type';
import { TextList } from './components/TextList';
import { ComponentList } from './components/ComponentList';

interface IProps {
    activeIndex: number;
}

export const ToolModal: React.FC<IProps> = ({ activeIndex }) => {
    const activeIndexMapToC = {
        [EActiveType.Img]: ImgList,
        [EActiveType.Video]: VideoList,
        [EActiveType.Music]: AudioList,
        [EActiveType.Text]: TextList,
        [EActiveType.Component]: ComponentList
    };
    console.log(activeIndex);
    const C = activeIndexMapToC[activeIndex as EActiveType];

    return (
        <div className={$style.toolModalWrapper}>
            <C />
        </div>
    );
};
