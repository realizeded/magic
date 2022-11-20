import { Component } from './../../models/entity/component';
import {
    createComponentServices,
    getCustomComponentList,
    getTemplateListServices
} from './../../services/template/index';
import express = require('express');
import { FailModel } from './../../responseModel/failModel';
import { Project } from './../../models/entity/project';
import {
    createProjectServices,
    getTemplateOfIfServices,
    updateTemplateOfIdServices
} from '../../services/template';
import { SuccessModel } from './../../responseModel/successModel';
import {
    IGetFuncQuery,
    IGetTemplateListReqQuery,
    IGetTemplateListResData,
    IGetTemplateReqQuery
} from '../../types/template';
import path = require('path');
import { getComponentList } from '../../models/services/template';

const router = express.Router();

// 上传自定义组件信息
router.get<string, unknown, SuccessModel<Component[]> | FailModel>('/postcomponent', (req, res) => {
    getCustomComponentList().then(result => {
        if (!result) {
            return res.send(new FailModel('2', '获取列表失败'));
        }
        res.send(new SuccessModel('0', result));
    });
});

// 获取所有自定义组件列表
router.use<string, unknown, SuccessModel<Component[]> | FailModel>('/getComponentList', (req, res) => {
    getComponentList().then(result => {
        if (!result) {
            return res.send(new FailModel('2', '获取失败'));
        }
        res.send(new SuccessModel('0', result));
    });
});

// 创建项目
router.get<string, unknown, SuccessModel<{ id: number }> | FailModel>('/create', (req, res) => {
    createProjectServices().then(result => {
        if (!result) {
            return res.send(new FailModel('2', '创建失败'));
        }
        res.send(new SuccessModel('0', result));
    });
});

// 获取项目详情
router.get<string, unknown, SuccessModel<Project> | FailModel, unknown, IGetTemplateReqQuery>(
    '/get_template',
    (req, res) => {
        const id = req.query.id;
        getTemplateOfIfServices(id).then(result => {
            if (!result) {
                res.send(new FailModel('1', `没有项目- ${id}`));
                return;
            }
            res.send(new SuccessModel<Project>('0', result));
        });
    }
);

// 保存项目
router.post<string, unknown, SuccessModel | FailModel, Omit<Project, 'id'> & { id: string }>(
    '/save_template',
    (req, res) => {
        const { id, name, template } = req.body;

        const parsedProject = {
            id: Number(id),
            name,
            template: JSON.stringify(template)
        };

        updateTemplateOfIdServices(parsedProject)
            .then(() => {
                res.send(new SuccessModel('0', new SuccessModel('0')));
            })
            .catch(e => {
                res.send(new FailModel('3', e));
            });
    }
);

router.get<
    string,
    Project[],
    SuccessModel<IGetTemplateListResData> | FailModel,
    unknown,
    IGetTemplateListReqQuery
>('/get_template_list', (req, res) => {
    const { pageNum, pageSize } = req.query;
    getTemplateListServices(pageSize, pageNum)
        .then(([total, result]) => {
            const newPageNum = Number(pageNum) + 1;

            const data = {
                pagination: {
                    total,
                    pageNum: newPageNum
                },
                list: result
            };

            res.send(new SuccessModel('0', data));
        })
        .catch(e => {
            res.send(new FailModel('4', e));
        });
});

router.get<string, string, string, unknown, IGetFuncQuery>('/func', (req, res) => {
    const id = req.query.id;
    getTemplateOfIfServices(id).then(result => {
        const { id, name, template } = result;
        const config = {
            id,
            name,
            template: JSON.parse(template)
        };
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.render('template', { config12: JSON.stringify(config) });
        return;
    });
});

router.post('/infor', function (req, res) {
    res.send({
        code: 1,
        msg: '成功'
    });
});

export const templateRouter = router;
