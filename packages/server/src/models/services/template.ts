import { Project } from './../entity/project';
import { templateSql } from './connect';

export const  createTemplate = (name: string, template: string) => {
    return templateSql.createQueryBuilder().insert().into(Project).values([{id: null, name, template}]).execute().then<{ id: number}>(res => {
       const id = res.raw?.insertId;
       return { id };
    });
}

export const getTemplateOfId = (id: number) => {
    return templateSql.connect.getRepository(Project).createQueryBuilder('project')
    .where("project.id = :id", { id })
    .getOne();
}

export const updateTemplateOfId = (project: Project) => {
    const id = project.id;
    return templateSql.createQueryBuilder().update(Project).set(project).where('id = :id', {  id}).execute().then(res => {
        return res.affected;
    }); 
}

export const getTemplateList = (pageSize: number, pageNum: number) => {

    const skipColumn = ((pageNum - 1) * pageSize);

    const projectLen = templateSql.connect.getRepository(Project).count();
    const projectList = templateSql.connect.getRepository(Project).createQueryBuilder().skip(skipColumn).take(pageSize).getMany();
    return Promise.all([projectLen, projectList]);
};