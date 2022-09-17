import Item from 'antd/lib/list/Item';
import React from 'react';
import { useDispatch } from 'react-redux';
import { EControlTypes, getCreateControlAction } from '../../../../../../store/module/template';
import $style from './style.module.less';

interface IProps {}

export const VideoList: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const imgList = [
        {
            text: '视频',
            list: [
                {
                    text: '第二屏boss',
                    img: 'http://localhost:3000/imgs/videoPost.jpg',
                    src: 'http://localhost:3000/video/jinggao.mp4'
                }
            ]
        }
    ];

    const handleClick = (img: { text: string; img: string; src: string }) => {
        const { src, text, img: imgsrc } = img;
        dispatch(
            getCreateControlAction({
                type: EControlTypes.Video,
                name: text,
                box: {
                    width: '200px',
                    height: '200px',
                    top: '20px',
                    left: '0px'
                },
                config: {
                    volume: 100
                },
                data: {
                    src,
                    posts: imgsrc
                },
                style: {
                    objectFit: 'contain'
                }
            })
        );
    };

    return (
        <div className={$style.dialog}>
            {imgList.map((item, i) => {
                const { text, list } = item;
                return (
                    <div key={i} className={$style.subItemWrapper}>
                        <div className={$style.bgTitle}>{text}</div>
                        <div className={$style.listItems}>
                            {list.map(item => {
                                const { text, img } = item;
                                return (
                                    <div key={text} onClick={() => handleClick(item)}>
                                        <div
                                            className={$style.imgWrapper}
                                            style={{ backgroundImage: `url(${img})` }}
                                        >
                                            <div className={$style.imgContent} />
                                        </div>
                                        <div className={$style.textWrapper}>{text}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
