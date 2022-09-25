import { Collapse, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getChangeActiveStageName, ITemplateState } from '../../../../../../store/module/template';
import $style from './style.module.less';
import { IStagePropertyDesc } from './type';

const Panel = Collapse.Panel;

interface IProps {
    project: ITemplateState;
}

export const StageDesc: React.FC<IProps> = ({ project }) => {
    const dispatch = useDispatch();

    const { project: editorProject } = project;
    const { template, activeStageIndex } = editorProject;
    const { stages } = template;
    const stageOfActive = stages[activeStageIndex];

    const [form] = Form.useForm<IStagePropertyDesc>();

    useEffect(() => {
        if (stageOfActive) {
            const { name = '' } = stageOfActive || {};
            form.setFields([{ name: 'stageName', value: name }]);
            form.validateFields();
        }
    }, [stageOfActive]);

    const handleFormChange = (changeValue: IStagePropertyDesc) => {
        const { stageName } = changeValue;
        if (stageName) {
            dispatch(getChangeActiveStageName(stageName));
        }
    };
    return (
        <div>
            <Collapse accordion>
                <Panel header="素材名称与内容" key="1">
                    <Form form={form} onValuesChange={handleFormChange}>
                        <Form.Item name="stageName" rules={[{ required: true, message: '场景名不能为空' }]}>
                            <Input addonBefore="场景名" />
                        </Form.Item>
                    </Form>
                </Panel>
            </Collapse>
        </div>
    );
};
