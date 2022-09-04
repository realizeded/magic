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
            type: 'img',
            name: '背景1',
            src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fdfdb344e89c70ce3cc0db030f61c45555f82e640.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664864710&t=efea8e64bd411cf4dec2a256c8963072'
        }
    ];

    const handleClick = (img: any) => {
        const { type, name, src } = img;
        dispatch(
            getCreateControlAction({
                type: type,
                name,
                box: {
                    width: '200px',
                    height: '200px',
                    top: '20px',
                    left: '-100px'
                },
                data: {
                    src
                }
            })
        );
    };

    return (
        <div>
            {imgList.map(img => {
                return (
                    <div className={$style.imgWrapper} key={img.name} onClick={() => handleClick(img)}>
                        <div>
                            <img src={img.src} />
                        </div>
                        <div>{img.name}</div>
                    </div>
                );
            })}
        </div>
    );
};
