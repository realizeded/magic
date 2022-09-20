import { Project } from './../../models/entity/project';
import { createTemplate, getTemplateList, getTemplateOfId, updateTemplateOfId } from "../../models/services/template";

export const createProjectServices = () => {
    const initTemplateData = {
        stages: [
            {
                id: '1',
                img: '',
                content: [],
                name: '初始场景'
            }
        ],
        controls: {}
    }

    const data = JSON.stringify(initTemplateData);

    return createTemplate('新建项目',data);
};

export const getTemplateOfIfServices = (id: number) => {
    return getTemplateOfId(id);
}

export const updateTemplateOfIdServices = (project: Project) => {
    return updateTemplateOfId(project).then(result => {
        if(result) {
            return result;
        }
        return Promise.reject('更新失败');
    });
}

export const getTemplateListServices = (pageSize: number, pageNum: number) => {
    return getTemplateList(pageSize, pageNum);
};