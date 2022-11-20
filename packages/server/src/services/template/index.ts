import { Project } from './../../models/entity/project';
import {
    createComponent,
    createTemplate,
    getComponentList,
    getTemplateList,
    getTemplateOfId,
    updateTemplateOfId
} from '../../models/services/template';

export const createProjectServices = () => {
    const initTemplateData = {
        name: '空白场景',
        stages: [
            {
                posts: '',
                name: '初始场景',
                value: []
            }
        ],
        controls: {}
    };

    const data = JSON.stringify(initTemplateData);

    return createTemplate('新建项目', data);
};

export const createComponentServices = (id: number, name: string, scriptPath: string, img: string) => {
    return createComponent(id, name, scriptPath, img);
};

export const getTemplateOfIfServices = (id: number) => {
    return getTemplateOfId(id);
};

export const updateTemplateOfIdServices = (project: Project) => {
    return updateTemplateOfId(project).then(result => {
        if (result) {
            return result;
        }
        return Promise.reject('更新失败');
    });
};

export const getTemplateListServices = (pageSize: number, pageNum: number) => {
    return getTemplateList(pageSize, pageNum);
};

export const getCustomComponentList = () => {
    return getComponentList();
};
