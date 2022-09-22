import React, { useEffect, useMemo, useState } from 'react';
import { Upload as AUpload } from 'antd';

import { UploadChangeParam } from 'antd/lib/upload';

import $style from './style.module.less';

interface IProps {
    handleUploadChange: (url: string) => void;
    value: string;
}

export const Upload: React.FC<IProps> = ({ handleUploadChange, value }) => {
    // const dispatch = useDispatch();

    // const editor = useSelector<TRootState, IState>((state) => state.editor);

    // const {
    //   project: { template },
    //   activeIndex,
    //   selectControlId,
    // } = editor;
    // const { stages, controls } = template;

    // const currentStage = stages[Number(activeIndex)] || {};

    // const haveSelectControl = Number(selectControlId) !== -1;

    // const currentControl = controls[Number(selectControlId)] ?? {};

    const [loading, setLoading] = useState(false);

    const [imageUrl, setImageUrl] = useState('');

    // 图片自适应
    const [imgWidthAndHeight, setImgWithAndHeight] = useState(() => ({
        width: 0,
        height: 0
    }));

    useEffect(() => {
        if (imageUrl.length) {
            const image = new Image();
            image.src = imageUrl;

            image.onload = () => {
                const { width, height } = image;
                const isBigWidth = width > height;
                if (isBigWidth) {
                    const scaleHeight = (102 * height) / width;
                    setImgWithAndHeight({
                        width: 102,
                        height: scaleHeight
                    });
                } else {
                    const scaleWidth = (width * 102) / height;
                    setImgWithAndHeight({
                        width: scaleWidth,
                        height: 102
                    });
                }
            };
        }
    }, [imageUrl]);
    const uploadButton = (
        <div>
            {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChange = (info: UploadChangeParam<any>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            const imgUrl = 'http://localhost:8800' + '/static/' + info.file.name;
            // Get this url from response in real world.
            setLoading(false);
            setImageUrl(imgUrl);
            handleUploadChange(imgUrl);
        }
    };

    useEffect(() => {
        if (value) {
            setImageUrl(value);
        }
    }, [value]);

    return (
        <div>
            <AUpload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={handleChange}
                action={`http://localhost:8800/media/template/infor`}
                method="post"
            >
                <div className={$style.uploadWrapper}>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            style={{
                                width: `${imgWidthAndHeight.width}px`,
                                height: `${imgWidthAndHeight.height}px`
                            }}
                        />
                    ) : (
                        uploadButton
                    )}
                </div>
            </AUpload>
        </div>
    );
};
