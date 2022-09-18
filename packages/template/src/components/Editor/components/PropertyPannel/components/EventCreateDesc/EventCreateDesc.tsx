import { Collapse, Form, Input, InputNumber, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    ETargetEventType,
    getChangeControlAction,
    ITemplateState,
    TTargetEvent
} from '../../../../../../store/module/template';
import { animateTypeOptions, EFormEfieldType, targetEventOptions } from './constant';
import $style from './style.module.less';
import { IAnimateCreateDesc } from './type';

const Panel = Collapse.Panel;
const Option = Select.Option;

interface IProps {
    project: ITemplateState;
}

export const EventCreateDesc: React.FC<IProps> = ({ project }) => {
    const dispatch = useDispatch();

    const { project: editorProject } = project;
    const { template, activeStageIndex, selectAnimateId, activeIndex, selectEventId } = editorProject;
    const { stages, controls } = template;
    const stageOfActive = stages[activeStageIndex];

    const [targetEventType, setTargetEventType] = useState<ETargetEventType>(ETargetEventType.jumpPlay);

    const [form] = Form.useForm<IAnimateCreateDesc>();

    useEffect(() => {
        const events = controls[activeIndex].event || [];

        const currentEvent = events.find(item => item.id === selectEventId);

        const { type, targetEvent, start: eventStart } = currentEvent as any;
        const { type: tagetType, start: targetStart } = targetEvent[0] as any;

        setTargetEventType(tagetType);

        form.setFields([
            { name: EFormEfieldType.eventType, value: type },
            { name: EFormEfieldType.targetType, value: tagetType },
            { name: EFormEfieldType.jumpTargetTime, value: targetStart },
            { name: EFormEfieldType.time, value: eventStart }
        ]);
    }, [selectEventId]);

    const handleChangeEventType = () => {
        const eventType = form.getFieldValue(EFormEfieldType.eventType);
        const control = controls[activeIndex];
        const currentEvent = control.event?.find(item => item.id === selectEventId) as any;
        currentEvent.type = eventType;
        dispatch(getChangeControlAction(activeIndex, control));
    };

    const handleChangeTargetType = () => {
        const eventType = form.getFieldValue(EFormEfieldType.targetType);
        const control = controls[activeIndex];
        const currentEvent = control.event?.find(item => item.id === selectEventId) as any;
        currentEvent.targetEvent.type = eventType;
        setTargetEventType(eventType);
        dispatch(getChangeControlAction(activeIndex, control));
    };

    const handleJumpTimeChange = () => {
        const start = form.getFieldValue(EFormEfieldType.jumpTargetTime);
        const control = controls[activeIndex];
        const currentEvent = control.event?.find(item => item.id === selectEventId) as any;
        currentEvent.targetEvent.start = start;
        dispatch(getChangeControlAction(activeIndex, control));
    };

    const handleTimeChange = () => {
        const start = form.getFieldValue(EFormEfieldType.time);
        const control = controls[activeIndex];
        const currentEvent = control.event?.find(item => item.id === selectEventId) as any;
        currentEvent.start = start;
        dispatch(getChangeControlAction(activeIndex, control));
    };
    return (
        <div>
            <Form form={form}>
                <Collapse accordion>
                    <Panel header="互动行为" key="1">
                        <Form.Item name={EFormEfieldType.eventType} label="互动行为">
                            <Select onChange={handleChangeEventType}>
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

                        <Form.Item name={EFormEfieldType.time} label="事件时间">
                            <Input onChange={handleTimeChange} />
                        </Form.Item>
                    </Panel>
                </Collapse>
                <Collapse accordion>
                    <Panel header="响应事件" key="2">
                        <Form.Item name={EFormEfieldType.targetType} label="响应事件">
                            <Select onChange={handleChangeTargetType}>
                                {targetEventOptions.map(item => {
                                    const { label, value } = item;
                                    return (
                                        <Option value={value} key={value}>
                                            {label}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        {targetEventType === ETargetEventType.jumpPlay && (
                            <div>
                                <Form.Item name={EFormEfieldType.jumpTargetTime} label="目标时间">
                                    <Input onChange={handleJumpTimeChange} />
                                </Form.Item>
                            </div>
                        )}
                    </Panel>
                </Collapse>
            </Form>
        </div>
    );
};
