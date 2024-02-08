const express = require('express');
const { afterBulkCreate } = require('../models/user');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('paht');

try {
    fs.readFileSync('uploads');
} catch (error) {
    fs.mkdirSync('uploads');
}

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const upload = multer({
    storage: multer.diskStorage({
        //파일을 저장할 위치 
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        // 파일 정보 추출 
        filename(req, file, cb) {
            //한번씩 찍어서 어떤 구조인지확인 
            console.log(file);
            const ext = path.extname(file.originalname); //test.png 이면 test20230814.png 로 변경 
            cb(null, path.basename(file.originalname, ext) + Date.now(), +ext);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, //5mb
})

//main.html 에서 append('img') 안에 img와 같아야한다 
router.post("/img", isLoggedIn, upload.single('image'), afterUploadImage);
router.post('/', isLoggedIn, uploadPost);

module.exports = router;