import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import QRcode from 'qrcode';
import $style from './style.module.less';
import { Close } from '@icon-park/react';
import { IProject, ITemplate, ITemplateState } from '../../../../store/module/template';
import { TRootState } from '../../../../store/type';
import { getUrl } from '../../../../util';

interface IProps {
    onClose: () => void;
}

const EditorPreview: React.FC<IProps> = ({ onClose }) => {
    const project = useSelector<TRootState, IProject>(state => state.project.project);

    const { id } = project.template;

    const previewLink = getUrl() + `/media/template/func?id=${id}`;

    const [qrcode, setQrcode] = useState('');

    useEffect(() => {
        if (previewLink) {
            QRcode.toDataURL(previewLink).then((url: string) => {
                setQrcode(url);
            });
        }
    }, [previewLink]);
    return (
        <div className={$style.editorPreviewWrapper}>
            <div className={$style.preViewWrapper}>
                <iframe className={$style.iframeWrapper} src={previewLink} />
                <div className={$style.qrcodeWrapper}>
                    <img src={qrcode} />
                </div>
                <div className={$style.closeWrapper} onClick={onClose}>
                    <Close size="16" theme="filled" fill="#fff" />
                </div>
            </div>
        </div>
    );
};

export default EditorPreview;
