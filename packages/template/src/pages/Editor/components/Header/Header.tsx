import { Edit, Download, SaveOne, PreviewOpen } from '@icon-park/react';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveTemplate } from '../../../../services/template';
import { changeProjectName, IProject } from '../../../../store/module/template';
import { TRootState } from '../../../../store/type';
import $style from './style.module.less';

interface IProps {}

export const Header: React.FC<IProps> = props => {
    const dispatch = useDispatch();

    const project = useSelector<TRootState, IProject>(state => state.project.project);
    const { template } = project;
    const { name } = template;

    const [toggleInputState, setToggleInputState] = useState(false);

    const handleToggleState = () => {
        setToggleInputState(!toggleInputState);
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        dispatch(changeProjectName(name));
    };

    const handleSaveTemplate = () => {
        saveTemplate(template)
            .then(() => {
                message.success('保存成功');
            })
            .catch(e => {
                message.success('保存失败');
            });
    };
    return (
        <div className={$style.headerWrapper}>
            <div className={$style.left}>
                <div className={$style.projectDesc}>
                    <img src="http://localhost:3000/imgs/logo.svg" />
                </div>
                <div className={$style.projectNameWrappper}>
                    <div className={$style.text}>
                        {toggleInputState ? (
                            <Input value={name} onBlur={handleToggleState} onChange={handleChangeName} />
                        ) : (
                            <div className={$style.projectNameWrapper} onClick={handleToggleState}>
                                <span className={$style.textContent}>{name}</span>
                                <Edit size="14" theme="outline" fill="#000" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={$style.right}>
                <div className={$style.btnGroup}>
                    <Button icon={<PreviewOpen size="14" theme="outline" fill="#000" />} />
                    <div className={$style.btnSave}>预览</div>
                </div>
                <div className={$style.btnGroup} onClick={handleSaveTemplate}>
                    <Button icon={<SaveOne size="14" theme="outline" fill="#000" />} />
                    <div className={$style.btnSave}>保存</div>
                </div>
            </div>
        </div>
    );
};
