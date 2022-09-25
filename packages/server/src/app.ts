import bodyParser = require('body-parser');
import express = require('express');
import path = require('path');
import multer = require('multer');
import cors = require('cors');

import { templateSql } from './models/services/connect';
import { templateRouter } from './route';
import ejs = require('ejs');

const app = express();

app.use(cors());
app.use('/static', express.static(path.resolve(__dirname, '../upload')));
app.use('/project', express.static(path.resolve(__dirname, '../project')));
// 设置模板引擎
app.set('views', path.join(__dirname, '../views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

const storage = multer.diskStorage({
    //设置 上传图片服务器位置
    destination: path.resolve(__dirname, '../upload'),
    //设置 上传文件保存的文件名
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const objMulter = multer({ storage }); //设置上传的的图片保存目录
app.use(objMulter.any());

// createConnection方法会自动读取来自ormconfig文件或环境变量中的连接选项
templateSql.creatConnect();

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/json', limit: '5000000000kb' }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

app.use('/media/template', templateRouter);

app.listen(8800, () => {
    console.log('8800----run');
});
