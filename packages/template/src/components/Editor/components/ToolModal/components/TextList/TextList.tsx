import Item from 'antd/lib/list/Item';
import React from 'react';
import { useDispatch } from 'react-redux';
import { EControlTypes, getCreateControlAction } from '../../../../../../store/module/template';
import $style from './style.module.less';

interface IProps {}

export const TextList: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const imgList = [
        {
            text: '普通文字',
            list: [
                {
                    text: '添加标题内容',
                    style: {
                        fontSize: '17px',
                        fontWeight: 'bold',
                        background: 'rgb(245, 245, 245)',
                        padding: '12px',
                        color: 'rgb(51, 51, 51)',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        marginBottom: '8px',
                        textAlign: 'center'
                    }
                }
            ]
        }
    ];

    const handleClickText = (item: { text: string; style: Record<string, string> }) => {
        const { text, style } = item;
        dispatch(
            getCreateControlAction({
                type: EControlTypes.Text,
                name: text,
                box: {
                    width: '200px',
                    height: '200px',
                    top: '20px',
                    left: '0px'
                },
                data: {
                    text
                },
                style
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
                            {list.map((item, i) => {
                                const { text, style } = item;
                                return (
                                    <div
                                        className={$style.textWrapper}
                                        key={i}
                                        onClick={() => handleClickText(item)}
                                        style={style as Record<string, string>}
                                    >
                                        {text}
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
