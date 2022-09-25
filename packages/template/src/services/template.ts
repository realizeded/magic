import { ITemplate } from './../store/module/template/type';
import { templateRequest } from '../api';

export interface ICreateTemplateReqData {
    id: number;
}
export const createTemplate = (): Promise<ICreateTemplateReqData> => {
    return templateRequest.get<ICreateTemplateReqData, null>('/media/template/create');
};

export interface IGetTemplateReqData {
    id: string;
    name: string;
    template: string;
}

export const getTemplate = (id: string): Promise<IGetTemplateReqData> => {
    return templateRequest.get<IGetTemplateReqData>(`/media/template/get_template?id=${id}`);
};

interface ISaveTemplate {
    id: string;
    name: string;
    template: ITemplate;
}
export const saveTemplate = (project: ITemplate): Promise<null> => {
    const { id, name } = project;
    const params = { id, name, template: project };
    return templateRequest.post<null, ISaveTemplate>('/media/template/save_template', params);
};

interface IGetTemplateListResData {
    pagination: {
        total: number;
        pageNum: number;
    };
    list: IGetTemplateReqData[];
}
export const getTemplateList = (pageSize: number, pageNum: number): Promise<IGetTemplateListResData> => {
    return templateRequest.get<IGetTemplateListResData, { pageSize: number; pageNum: number }>(
        '/media/template/get_template_list',
        { params: { pageNum, pageSize } }
    );
};
