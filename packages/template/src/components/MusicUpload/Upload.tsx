import React, { useEffect, useMemo, useState } from 'react';
import { Upload as AUpload } from 'antd';

import { UploadChangeParam } from 'antd/lib/upload';

import $style from './style.module.less';

interface IProps {
    handleUploadChange: (name: string, url: string) => void;
    children?: JSX.Element;
}

export const MusicUpload: React.FC<IProps> = ({ handleUploadChange, children }) => {
    const [loading, setLoading] = useState(false);

    const handleChange = (info: UploadChangeParam<any>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            const name = info.file.name;
            // Get this url from response in real world.
            const path = 'http://localhost:8800' + '/static/' + info.file.name;
            // Get this url from response in real world.
            setLoading(false);
            handleUploadChange(name, path);
        }
    };

    return (
        <div>
            <AUpload
                name="avatar"
                listType="picture-card"
                className={$style.uploadWrapper}
                showUploadList={false}
                onChange={handleChange}
                action={`http://localhost:8800/media/template/infor`}
                method="post"
            >
                <div className={$style.posts}>{children}</div>
                <div className={$style.uploadWrapper}>替换资源</div>
            </AUpload>
        </div>
    );
};
