import React from 'react';
import { ImgList } from './components/ImgList';
import $style from './style.module.less';
import { EActiveType } from './type';

interface IProps {
    activeIndex: number;
}

export const ToolModal: React.FC<IProps> = ({ activeIndex }) => {
    const activeIndexMapToC = {
        [EActiveType.Img]: ImgList
    };

    const C = activeIndexMapToC[activeIndex as EActiveType];

    return (
        <div className={$style.toolModalWrapper}>
            <C />
        </div>
    );
};
