import { Project } from '../../models/entity/project';

export interface IGetTemplateReqQuery {
    id: number;
}

export interface IGetTemplateListReqQuery {
    pageSize: number;
    pageNum: number;
}

// 获取项目列表
export interface IGetTemplateListResData {
    pagination: {
        total: number;
        pageNum: number;
    };
    list: Project[];
}

export interface IGetFuncQuery {
    id: number;
}
