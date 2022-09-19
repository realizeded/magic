import { Pic } from '@icon-park/react';
import { Collapse, Form, Input, InputNumber, Radio, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getChangeControlAction, IBox, IText } from '../../../../../../store/module/template';
import { EFormField, fontOptions, textAlignOption, verticalAlignOption } from './constant';
import $style from './style.module.less';
import { ITextForm } from './type';

const Panel = Collapse.Panel;
const Option = Select.Option;

interface IProps {
    control: IText;
    controlId: string;
}

export const TextDesc: React.FC<IProps> = ({ control, controlId }) => {
    const dispatch = useDispatch();

    const [form] = useForm<ITextForm>();
    const [color, setColor] = useState<string>('#000000');

    useEffect(() => {
        form.validateFields();
        const { data, name, style, box } = control;
        const { text } = data || {};
        const {
            [EFormField.fontFamily]: fontFamily,
            [EFormField.fontSize]: fontSize,
            [EFormField.textAlign]: textAlign,
            [EFormField.verticalAlign]: verticalAlign,
            [EFormField.color]: color,
            [EFormField.lineHeight]: lineHeight,
            [EFormField.wordBreak]: wordBreak
        } = style;

        const {
            [EFormField.top]: top = '',
            [EFormField.left]: left = '',
            [EFormField.width]: width,
            [EFormField.height]: height
        } = box;
        setColor(color);
        form.setFields([
            { name: EFormField.name, value: name },
            { name: EFormField.text, value: text },
            { name: EFormField.fontFamily, value: fontFamily },
            { name: EFormField.fontSize, value: parseInt(fontSize) },
            { name: EFormField.textAlign, value: textAlign },
            { name: EFormField.verticalAlign, value: verticalAlign },
            { name: EFormField.color, value: color },
            { name: EFormField.lineHeight, value: parseInt(lineHeight) },
            { name: EFormField.wordBreak, value: wordBreak },
            { name: EFormField.top, value: parseInt(top) },
            { name: EFormField.left, value: parseInt(left) },
            { name: EFormField.width, value: parseInt(width) },
            { name: EFormField.height, value: parseInt(height) }
        ]);
    }, [control]);

    const handleTextChange = () => {
        const name = form.getFieldValue(EFormField.name);
        const newControl = _.cloneDeep(control);
        newControl.name = name;
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handlFontSizeChange = () => {
        const fontSize = form.getFieldValue(EFormField.fontSize);
        const newControl = _.cloneDeep(control);
        newControl.style[EFormField.fontSize] = fontSize + 'px';
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleLineHeightChange = () => {
        const lineHeight = form.getFieldValue(EFormField.lineHeight);
        const newControl = _.cloneDeep(control);
        newControl.style[EFormField.lineHeight] = lineHeight + 'px';
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleTextAreaChange = () => {
        const text = form.getFieldValue(EFormField.text);
        const newControl = _.cloneDeep(control);
        newControl.data.text = text;
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleChangeFontFamily = () => {
        const fontFamily = form.getFieldValue(EFormField.fontFamily);
        const newControl = _.cloneDeep(control);
        newControl.style[EFormField.fontFamily] = fontFamily;
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleChangeTextAlign = () => {
        const textAlign = form.getFieldValue(EFormField.textAlign);
        const newControl = _.cloneDeep(control);
        newControl.style[EFormField.textAlign] = textAlign;
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleChangeVerticalAlign = () => {
        const verticalAlign = form.getFieldValue(EFormField.verticalAlign);
        const newControl = _.cloneDeep(control);
        newControl.style[EFormField.verticalAlign] = verticalAlign;
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value;
        const newControl = _.cloneDeep(control);
        newControl.style[EFormField.color] = color;
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleWordBrakChange = () => {
        const wordBreak = form.getFieldValue(EFormField.wordBreak);
        const newControl = _.cloneDeep(control);
        newControl.style[EFormField.wordBreak] = wordBreak;
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleChangeBoxPosition = (type: any) => {
        const boxItem = form.getFieldValue(type) as number;
        const newControl = _.cloneDeep(control);
        const box = newControl.box as any;
        box[type as any] = boxItem + 'px';
        dispatch(getChangeControlAction(controlId, newControl));
    };

    return (
        <div>
            <Form form={form}>
                <Collapse accordion>
                    <Panel header="素材名称与内容" key="1">
                        <Form.Item name={EFormField.name}>
                            <Input
                                prefix={
                                    <div className={$style.controlDescPrefix}>
                                        <Pic size={14} fill="#999" theme="outline" />
                                        <span className={$style.controlName}>文字</span>
                                    </div>
                                }
                                onChange={handleTextChange}
                            />
                        </Form.Item>
                    </Panel>
                    <Panel header="文字内容及样式" key="2">
                        <Form.Item name={EFormField.text} label="文本">
                            <TextArea showCount maxLength={100} onChange={handleTextAreaChange} />
                        </Form.Item>
                        <Form.Item name={EFormField.fontFamily} label="字体">
                            <Select onChange={handleChangeFontFamily}>
                                {fontOptions.map(item => {
                                    const { value, label } = item;
                                    return (
                                        <Option value={value} key={label}>
                                            {label}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name={EFormField.fontSize} label="字号">
                            <InputNumber onChange={handlFontSizeChange} />
                        </Form.Item>
                        <Form.Item name={EFormField.color} label="字体颜色">
                            <input type="color" name="color" value={color} onChange={handleColorChange} />
                        </Form.Item>

                        <Form.Item name={EFormField.lineHeight} label="行高">
                            <InputNumber onChange={handleLineHeightChange} />
                        </Form.Item>

                        <Form.Item name={EFormField.textAlign} label="水平对齐">
                            <Select onChange={handleChangeTextAlign}>
                                {textAlignOption.map(item => {
                                    const { value, label } = item;
                                    return (
                                        <Option value={value} key={label}>
                                            {label}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item name={EFormField.verticalAlign} label="垂直对齐">
                            <Select onChange={handleChangeVerticalAlign}>
                                {verticalAlignOption.map(item => {
                                    const { value, label } = item;
                                    return (
                                        <Option value={value} key={label}>
                                            {label}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item name={EFormField.wordBreak} label="是否换行">
                            <Radio.Group onChange={handleWordBrakChange}>
                                <Radio value="break-all">是</Radio>
                                <Radio value="inherit">否</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Panel>
                </Collapse>
                <Collapse accordion>
                    <Panel header="变换" key="2">
                        <div className={$style.boxFormWrapper}>
                            <Form.Item name={EFormField.left}>
                                <InputNumber
                                    prefix="X"
                                    onChange={handleChangeBoxPosition.bind(this, EFormField.left)}
                                    defaultValue={0}
                                />
                            </Form.Item>
                            <Form.Item name={EFormField.top}>
                                <InputNumber
                                    prefix="Y"
                                    defaultValue={0}
                                    onChange={handleChangeBoxPosition.bind(this, EFormField.top)}
                                />
                            </Form.Item>
                            <Form.Item name={EFormField.width}>
                                <InputNumber
                                    prefix="宽"
                                    defaultValue={0}
                                    onChange={handleChangeBoxPosition.bind(this, EFormField.width)}
                                />
                            </Form.Item>
                            <Form.Item name={EFormField.height}>
                                <InputNumber
                                    prefix="高"
                                    defaultValue={0}
                                    onChange={handleChangeBoxPosition.bind(this, EFormField.height)}
                                />
                            </Form.Item>
                        </div>
                        {/* <Form.Item className={$style.fullWidth} name={EFormField.lineHeight}>
                            <InputNumber
                                prefix="旋转角度"
                                onChange={handleLineHeightChange}
                                defaultValue={0}
                            />
                        </Form.Item> */}
                    </Panel>
                </Collapse>
            </Form>
        </div>
    );
};
