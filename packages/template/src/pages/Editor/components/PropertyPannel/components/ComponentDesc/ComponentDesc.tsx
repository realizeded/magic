import { Components, Pic, Video } from '@icon-park/react';
import { Collapse, Form, Input, InputNumber, Radio, Select, Slider } from 'antd';
import { useForm } from 'antd/es/form/Form';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getChangeControlAction, IImg, IVideo } from '../../../../../../store/module/template';
import { Upload } from '../../../../../../components/Upload';
import { EFormField, objectFitOptions } from './constant';
import $style from './style.module.less';
import { ITextForm } from './type';

const Panel = Collapse.Panel;
const Option = Select.Option;

interface IProps {
    control: IImg;
    controlId: string;
}

export const ComponentDesc: React.FC<IProps> = ({ control, controlId }) => {
    const dispatch = useDispatch();

    const [form] = useForm<ITextForm>();

    useEffect(() => {
        form.validateFields();
        const { name, box, style } = control;
        // const { text } = data || {};
        const {
            [EFormField.top]: top = '',
            [EFormField.left]: left = '',
            [EFormField.width]: width,
            [EFormField.height]: height
        } = box;
        const { [EFormField.objectFit]: objectFit, [EFormField.Opacity]: opacity } = style;
        form.setFields([
            { name: EFormField.name, value: name },
            { name: EFormField.top, value: parseInt(top) },
            { name: EFormField.left, value: parseInt(left) },
            { name: EFormField.width, value: parseInt(width) },
            { name: EFormField.height, value: parseInt(height) },
            { name: EFormField.objectFit, value: objectFit },
            { name: EFormField.Opacity, value: opacity }
        ]);
    }, [control]);

    const handleTextChange = () => {
        const name = form.getFieldValue(EFormField.name);
        const newControl = _.cloneDeep(control);
        newControl.name = name;
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleChangeBoxPosition = (type: any) => {
        const boxItem = form.getFieldValue(type) as number;
        const newControl = _.cloneDeep(control);
        const box = newControl.box as any;
        box[type as any] = boxItem + 'px';
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleChangeObjectFit = () => {
        const objectFit = form.getFieldValue(EFormField.objectFit);
        const newControl = _.cloneDeep(control);
        const style = newControl.style;
        style[EFormField.objectFit] = objectFit;
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const imgUrl = control.data.src;

    const handleUploadChange = (url: string) => {
        const newControl = _.cloneDeep(control);
        newControl.data.src = url;
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleChangeOpacity = () => {
        const opacity = form.getFieldValue(EFormField.Opacity);
        const newControl = _.cloneDeep(control);
        const style = newControl.style;
        style[EFormField.Opacity] = opacity;
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
                                        <Components size={14} fill="#999" theme="outline" />
                                        <span className={$style.controlName}>组件</span>
                                    </div>
                                }
                                onChange={handleTextChange}
                            />
                        </Form.Item>
                        {/* <Upload value={imgUrl} handleUploadChange={handleUploadChange} />

                        <Form.Item name={EFormField.objectFit} label="图片填充">
                            <Select onChange={handleChangeObjectFit}>
                                {objectFitOptions.map(item => {
                                    const { value, label } = item;
                                    return (
                                        <Option value={value} key={label}>
                                            {label}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item> */}
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

                <Collapse accordion>
                    <Panel header="其他" key="3">
                        <Form.Item label="内容可见度" name={EFormField.Opacity}>
                            <InputNumber max={1} min={0} defaultValue={1} onChange={handleChangeOpacity} />
                        </Form.Item>
                    </Panel>
                </Collapse>
            </Form>
        </div>
    );
};
