import { Music, Switch, Video } from '@icon-park/react';
import { Collapse, Form, Input, InputNumber, Radio, Select, Slider } from 'antd';
import { useForm } from 'antd/es/form/Form';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getChangeControlAction, IVideo } from '../../../../../../store/module/template';
import { MediaUpload } from '../../../../../../components/MediaUpload';
import { EFormField, objectFitOptions } from './constant';
import $style from './style.module.less';
import { ITextForm } from './type';

const Panel = Collapse.Panel;
const Option = Select.Option;

interface IProps {
    control: IVideo;
    controlId: string;
}

export const AudioDesc: React.FC<IProps> = ({ control, controlId }) => {
    const dispatch = useDispatch();

    const [form] = useForm<ITextForm>();

    useEffect(() => {
        form.validateFields();
        const { name, box, config, style } = control;
        // const { text } = data || {};

        const {
            [EFormField.top]: top = '',
            [EFormField.left]: left = '',
            [EFormField.width]: width,
            [EFormField.height]: height
        } = box;

        const { [EFormField.volume]: volume } = config;

        form.setFields([
            { name: EFormField.name, value: name },
            { name: EFormField.top, value: parseInt(top) },
            { name: EFormField.left, value: parseInt(left) },
            { name: EFormField.width, value: parseInt(width) },
            { name: EFormField.height, value: parseInt(height) },
            { name: EFormField.volume, value: volume }
        ]);
    }, [control]);

    const handleTextChange = () => {
        const name = form.getFieldValue(EFormField.name);
        const newControl = _.cloneDeep(control);
        newControl.name = name;
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleChangeVideoVolume = () => {
        const volume = form.getFieldValue(EFormField.volume);
        const newControl = _.cloneDeep(control);
        const config = newControl.config;
        config.volume = volume;
        dispatch(getChangeControlAction(controlId, newControl));
    };

    const handleMusicUpload = (name: string, url: string) => {
        const newControl = _.cloneDeep(control);
        newControl.data.src = url;
        newControl.name = name;
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
                                        <Music size={14} fill="#999" theme="outline" />
                                        <span className={$style.controlName}>音乐</span>
                                    </div>
                                }
                                onChange={handleTextChange}
                            />
                        </Form.Item>

                        <MediaUpload handleUploadChange={handleMusicUpload}>
                            <div className={$style.music}>
                                <Switch size={24} fill="#000" theme="filled" />
                            </div>
                        </MediaUpload>
                        <Form.Item name={EFormField.volume}>
                            <Slider min={0} max={100} onChange={handleChangeVideoVolume} />
                        </Form.Item>
                    </Panel>
                </Collapse>
            </Form>
        </div>
    );
};
