import html2canvas from 'html2canvas';

export const captureImg = () => {
    return html2canvas(document.querySelector('#phone') as HTMLDivElement, {
        useCORS: true,
        scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
        allowTaint: true
    }).then(canvas => {
        const posts = canvas.toDataURL('image/jpeg');
        return posts;
    });
};
