import React, { useState } from 'react';
import $style from './style.module.less';
import { Pic, Video, Music, Text, GraphicDesign } from '@icon-park/react';
import classNames from 'classnames';
import { ToolModal } from '../ToolModal';
interface IProps {}

export const ToolBar: React.FC<IProps> = props => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const toolbalList = [
        {
            icon: <Pic size={26} fill="#000" theme="outline" />,
            text: '图片'
        },
        {
            icon: <Video size={26} fill="#000" theme="outline" />,
            text: '视频'
        },
        {
            icon: <Music size={26} fill="#000" theme="outline" />,
            text: '声音'
        },
        {
            icon: <Text size={26} fill="#000" theme="outline" />,
            text: '文字'
        },
        {
            icon: <GraphicDesign size={26} fill="#000" theme="outline" />,
            text: '图形'
        }
    ];

    const handleClick = (i: number) => {
        if (activeIndex === i) {
            setActiveIndex(-1);
            return;
        }
        setActiveIndex(i);
    };
    return (
        <div className={$style.toolBarWrapper}>
            {toolbalList.map((tool, i) => {
                const { icon, text } = tool;

                return (
                    <div
                        key={text}
                        onClick={() => handleClick(i)}
                        className={classNames($style.iconWrapper, activeIndex === i && $style.active)}
                    >
                        {icon}
                        <span className={$style.text}>{text}</span>
                    </div>
                );
            })}
            {activeIndex !== -1 && <ToolModal activeIndex={activeIndex} />}
        </div>
    );
};
