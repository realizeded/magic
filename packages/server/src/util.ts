import fs = require('fs');

export const hasOpacity = (pngPath, limit = 255, isToJpg = false) => {
    // const buffer = fs.readFileSync(pngPath);
    // const width = buffer.readUInt32BE(16);
    // const height = buffer.readUInt32BE(20);
    // const pngCanvas = canvas.createCanvas(width, height);
    // const context = pngCanvas.getContext('2d');
    // const img = new canvas.Image();
    // img.src = buffer;
    // context.drawImage(img, 0, 0, width, height);
    // const res = context.getImageData(0, 0, width, height);
    // const imgData = res.data;
    // const piexCount = imgData.length / 4;
    // let isOpacity = false;
    // for (let i = 0; i < piexCount; i++) {
    //     // 遍历每个像素点，找透明通道
    //     const opacity = imgData[i * 4 + 3];
    //     if (opacity < limit) {
    //         // 如果小于limit，则存在透明像素，退出
    //         isOpacity = true;
    //         break;
    //     }
    // }
    // // 返回
    // return isOpacity || isToJpg;
};
