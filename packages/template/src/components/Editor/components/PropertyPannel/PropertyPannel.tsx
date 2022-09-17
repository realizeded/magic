import Form, { useForm } from 'antd/es/form/Form';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { EControlTypes, IImg, ITemplateState, IText, IVideo } from '../../../../store/module/template';
import { TRootState } from '../../../../store/type';
import { AudioDesc } from './components/AudioDesc';
import { ImgDesc } from './components/ImgDesc';
import { StageDesc } from './components/StageDesc';
import { TextDesc } from './components/TextDesc';
import { VideoDesc } from './components/VideoDesc';
import $style from './style.module.less';
import { IStagePropertyDesc } from './type';

interface IProps {}

export const PropertyPannel: React.FC<IProps> = props => {
    const project = useSelector<TRootState, ITemplateState>(state => state.project);
    const { project: editorProject } = project;
    const { activeStageIndex, activeIndex, template } = editorProject;
    const { controls } = template;
    const activeControl = controls[activeIndex];
    const { type } = activeControl || {};
    const controlTypeMapToComponent = {
        [EControlTypes.Text]() {
            return <TextDesc control={activeControl as IText} controlId={activeIndex} />;
        },
        [EControlTypes.Audio]() {
            return <AudioDesc control={activeControl as IVideo} controlId={activeIndex} />;
        },
        [EControlTypes.Video]() {
            return <VideoDesc control={activeControl as IVideo} controlId={activeIndex} />;
        },
        [EControlTypes.Img]() {
            return <ImgDesc control={activeControl as IImg} controlId={activeIndex} />;
        }
    };

    const processFn = controlTypeMapToComponent[type];

    return (
        <div className={$style.propertyPannelWrapper}>
            {!activeIndex && !_.isUndefined(activeStageIndex) && <StageDesc project={project} />}
            {processFn && processFn()}
        </div>
    );
};
