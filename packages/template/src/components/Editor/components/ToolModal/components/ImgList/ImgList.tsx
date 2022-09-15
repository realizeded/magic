import Item from 'antd/lib/list/Item';
import React from 'react';
import { useDispatch } from 'react-redux';
import { EControlTypes, getCreateControlAction } from '../../../../../../store/module/template';
import $style from './style.module.less';

interface IProps {}

export const ImgList: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const imgList = [
        {
            text: '背景图',
            list: [
                {
                    text: '背景1',
                    img: 'http://localhost:3000/imgs/bg1.jpg'
                },
                {
                    text: '背景2',
                    img: 'http://localhost:3000/imgs/bg2.jpg'
                },
                {
                    text: '背景3',
                    img: 'http://localhost:3000/imgs/bg3.jpg'
                },
                {
                    text: '背景4',
                    img: 'http://localhost:3000/imgs/bg4.jpg'
                },
                {
                    text: '背景5',
                    img: 'http://localhost:3000/imgs/bg5.jpg'
                }
            ]
        },
        {
            text: '氛围图',
            list: [
                {
                    text: '奖励1',
                    img: 'http://localhost:3000/imgs/fen1.png'
                },
                {
                    text: '氛围图1',
                    img: 'http://localhost:3000/imgs/fen2.png'
                },
                {
                    text: '氛围图2',
                    img: 'http://localhost:3000/imgs/fen3.png'
                },
                {
                    text: '氛围图3',
                    img: 'http://localhost:3000/imgs/fen4.png'
                }
            ]
        },
        {
            text: '按钮',
            list: [
                {
                    text: '按钮1',
                    img: 'http://localhost:3000/imgs/bt1.png'
                },
                {
                    text: '按钮2',
                    img: 'http://localhost:3000/imgs/bt4.png'
                },
                {
                    text: '按钮3',
                    img: 'http://localhost:3000/imgs/bt6.png'
                },
                {
                    text: '按钮4',
                    img: 'http://localhost:3000/imgs/bt7.png'
                }
            ]
        }
    ];

    const handleClick = (img: { text: string; img: string }) => {
        const { img: imgSrc, text } = img;
        dispatch(
            getCreateControlAction({
                type: EControlTypes.Img,
                name: text,
                box: {
                    width: '200px',
                    height: '200px',
                    top: '20px',
                    left: '0px'
                },
                data: {
                    src: imgSrc
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
