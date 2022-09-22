import React from 'react';
import $style from './style.module.less';
import { useNavigate } from 'react-router-dom';
// import { IProject } from "../../../../../../store/modules/editor";
// import { IGetTemplateReqData } from "../../../../../../services/template";
interface IProps {
    project: any;
}

export const StageCard: React.FC<IProps> = props => {
    const { project } = props;
    const { id, name, template } = project;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/editor/${id}`);
    };

    const img = JSON.parse(template).stages[0]?.posts;
    return (
        <div className={$style.stageCardWrapper} onClick={handleClick}>
            <div className={$style.imgWrapper}>
                <img src={img} alt="暂不背景" />
            </div>
            <div className={$style.text}>模板名称: {name}</div>
        </div>
    );
};
