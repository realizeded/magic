import { Button, message, Pagination, PaginationProps, Spin } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { createTemplate, getTemplateList, IGetTemplateReqData } from '../../../../services/template';
import { StageCard } from './components/StageCard';
import $style from './style.module.less';
import { useNavigate } from 'react-router-dom';
// import { IProject } from '../../../../store/modules/editor';
import _ from 'lodash';
import { Loading } from '../Loading';
import { createTemplate, getTemplateList } from '../../../../services/template';

interface Props {}

export const Content: React.FC<Props> = props => {
    const history = useNavigate();

    const [loading, setLoading] = useState(true);
    const [templateList, setTemplateList] = useState<any[]>([]);

    const [pagination, setPagination] = useState<{
        pageNum: number;
        total: number;
    }>(() => {
        return {
            pageNum: 1,
            total: 100
        };
    });

    const handleCreateBtnClick = () => {
        createTemplate()
            .then(res => {
                const id = res.id;
                history(`/editor/${id}`);
            })
            .catch(e => {
                message.error(e);
            });
    };

    useEffect(() => {
        setLoading(true);
        const { pageNum } = pagination;
        getTemplateList(10, pageNum).then(res => {
            const {
                pagination: { total },
                list
            } = res;
            setPagination({
                ...pagination,
                total
            });
            setTemplateList(list);

            setLoading(false);
        });
    }, [pagination.pageNum]);

    const handleChange = useCallback(
        (pageNum: number) => {
            const newPagination = _.cloneDeep(pagination);
            newPagination.pageNum = pageNum;

            setPagination(newPagination);
        },
        [pagination]
    );

    if (loading) {
        return <Loading />;
    }
    return (
        <div className={$style.scrollWrapper}>
            <div className={$style.contentWrapper}>
                <div className={$style.cardWrapper}>
                    <div className={$style.cardHdWrapper}>
                        <Button type="primary" size="large" onClick={handleCreateBtnClick}>
                            创建模板
                        </Button>
                    </div>
                    <div className={$style.cardMainWrapper}>
                        {templateList.map((project, i) => {
                            if (!project) {
                                return null;
                            }
                            return <StageCard project={project} key={i} />;
                        })}
                    </div>

                    <div className={$style.footerWrapper}>
                        <Pagination
                            current={pagination.pageNum}
                            total={pagination.total}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
