var express = require('express');
var router = express.Router();

var articleService=require('./articles');


router.post('/articles/getList', articleService.getTitleList);
router.post('/articles/getArticleByHash/:hash', articleService.getArticleByHash);

module.exports = router;