import { Collapse, Form, Input, InputNumber, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getChangeControlAction, ITemplateState } from '../../../../../../store/module/template';
import { animateTypeOptions, EAnimateType, EFormEfieldType } from './constant';
import $style from './style.module.less';
import { IAnimateCreateDesc } from './type';

const Panel = Collapse.Panel;
const Option = Select.Option;

interface IProps {
    project: ITemplateState;
}

export const AnimateCreateDesc: React.FC<IProps> = ({ project }) => {
    const dispatch = useDispatch();

    const { project: editorProject } = project;
    const { template, activeStageIndex, selectAnimateId, activeIndex } = editorProject;
    const { stages, controls } = template;
    const stageOfActive = stages[activeStageIndex];

    const [animateType, setAnimateType] = useState<EAnimateType>(EAnimateType.normal);

    const [form] = Form.useForm<IAnimateCreateDesc>();

    useEffect(() => {
        const control = controls[activeIndex];
        const currentAnimate = control.animate?.find(item => item.id === selectAnimateId);

        const { type, to, from, start, end, duration } = currentAnimate as any;
        setAnimateType(type);

        form.setFields([
            { name: EFormEfieldType.animateType, value: type },
            { name: EFormEfieldType.to, value: to },
            { name: EFormEfieldType.from, value: from },
            { name: EFormEfieldType.start, value: start },
            { name: EFormEfieldType.end, value: end },
            { name: EFormEfieldType.duration, value: duration }
        ]);
    }, [selectAnimateId]);
    const handleAnimateTypeChange = () => {
        const animateType = form.getFieldValue(EFormEfieldType.animateType);
        const control = controls[activeIndex];
        const currentAnimate = control.animate?.find(item => item.id === selectAnimateId);
        (currentAnimate as any)[EFormEfieldType.animateType] = animateType;
        dispatch(getChangeControlAction(activeIndex, control));
        setAnimateType(animateType);
    };

    const handleAnimateConfigChange = (type: EFormEfieldType) => {
        const val = form.getFieldValue(type);
        const control = controls[activeIndex];
        const currentAnimate = control.animate?.find(item => item.id === selectAnimateId);
        (currentAnimate as any)[type] = val;

        dispatch(getChangeControlAction(activeIndex, control));
    };
    return (
        <div>
            <Form form={form}>
                <Collapse accordion>
                    <Panel header="动画效果" key="1">
                        <Form.Item name={EFormEfieldType.animateType} label="动画效果">
                            <Select onChange={handleAnimateTypeChange}>
                                {animateTypeOptions.map(item => {
                                    const { label, value } = item;
                                    return (
                                        <Option value={value} key={value}>
                                            {label}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Panel>
                </Collapse>
                <Collapse accordion>
                    <Panel header="动画配置" key="2">
                        <div className={$style.animateConfig}>
                            <Form.Item name={EFormEfieldType.from}>
                                <InputNumber
                                    placeholder="开始值"
                                    prefix="开始值"
                                    onChange={() => handleAnimateConfigChange(EFormEfieldType.from)}
                                />
                            </Form.Item>
                            <Form.Item name={EFormEfieldType.to}>
                                <InputNumber
                                    placeholder="结尾值"
                                    prefix="结尾值"
                                    onChange={() => handleAnimateConfigChange(EFormEfieldType.to)}
                                />
                            </Form.Item>
                            <Form.Item name={EFormEfieldType.start}>
                                <InputNumber
                                    placeholder="开始时间"
                                    prefix="开始时间"
                                    onChange={() => handleAnimateConfigChange(EFormEfieldType.start)}
                                />
                            </Form.Item>
                            <Form.Item name={EFormEfieldType.end}>
                                <InputNumber
                                    placeholder="结束时间"
                                    prefix="结束时间"
                                    onChange={() => handleAnimateConfigChange(EFormEfieldType.end)}
                                />
                            </Form.Item>
                            <Form.Item name={EFormEfieldType.duration}>
                                <InputNumber
                                    placeholder="动画时间"
                                    prefix="动画时间"
                                    onChange={() => handleAnimateConfigChange(EFormEfieldType.duration)}
                                />
                            </Form.Item>
                        </div>
                    </Panel>
                </Collapse>
            </Form>
        </div>
    );
};
