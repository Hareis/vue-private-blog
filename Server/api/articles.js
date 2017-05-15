/**
 * Created by li on 2017/5/15.
 */

var Assets = require('./../assets');
var articlesModel = Assets.getMCMInstance().Factory("article");


class articlesService {
    construct() {

    }

    /**
     *  获取博客列表
     * @param req
     * @param res
     */
    static getTitleList(req, res) {
        debugger;
        Assets.myCache.get("articleList", function (err, value) {
            if (!err && value != undefined) {

                return res.status(200).json(value);

            } else {

                var requestObj = req.params;

                if (req.params.index == undefined || req.params.index == 0) {
                    requestObj.index = 1;
                }

                if (req.params.size == undefined || req.params.size == 0) {
                    requestObj.size = 20;
                }

                var queryObj = {
                    "filter": {
                        fields: ["createdAt", "hateCount", "id", "likeCount", "name", "readCount", "shortContent", "status", "tagsId", "title"],
                        "where": {status: true},
                        "skip": (requestObj.index - 1) * requestObj.size,
                        "limit": requestObj.size
                    }
                };

                articlesModel.query(queryObj).then((rsp) => rsp.data)
                    .then((data) => {

                        //存入缓存
                        Assets.myCache.set("articleList", data);

                        return res.status(200).json(data);
                    }, (err) => {
                        return handleError(res, err);
                    });
            }

        });
    }

    /**
     *  根据hash 获取文章详细
     * @param req
     * @param res
     */
    static  getArticleByHash(req, res) {

        const hash = req.params.hash;
        if (hash == undefined || hash.toString().trim().length < 1) {
            return res.status(500).json({isSuccess: false, errMsg: "文章hash不能为空！"});
        }


        Assets.myCache.get("articleDetail-" + hash, function (err, value) {
            if (!err && value != undefined) {

                return res.status(200).json(value);

            } else {

                var queryObj = {
                    "filter": {
                        fields: ["content", "createdAt", "hateCount", "id", "likeCount", "name", "readCount", "tagsId", "title"],
                        "where": {id: hash}
                    }
                };
                articlesModel.query(queryObj).then((rsp) => rsp.data)
                    .then((data) => {
                        //存入缓存
                        Assets.myCache.set("articleDetail-" + hash, data);

                        return res.status(200).json(data);
                    }, (err) => {
                        return handleError(res, err);
                    });
            }

        });


    }
}

function handleError(res, err) {
    return res.status(500).send({isSuccess: false, msg: err});
}
module.exports = articlesService;
