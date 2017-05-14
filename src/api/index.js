import axios from 'axios'
import 'es6-promise/auto'

import { Resource, Route } from './mcm_sdk'
import conf from '../config'
import { onlyTitle, onlyDate } from '../utils'

const client = new Resource(conf.blogConfig.mcm.appId, conf.blogConfig.mcm.appkey);
const articleModel = client.Factory("article");

/**
 *  获取相应页数的文章标题列表
 */
function getTitleList(index, size, keyword) {

    if (index == undefined || index == 0) {
        index = 1;
    }

    if (size == undefined || size == 0) {
        size = 20;
    }
    var queryObj = {
        "filter": {
            fields: ["createdAt", "hateCount", "id", "likeCount", "name", "readCount", "shortContent", "status", "tagsId", "title"],
            "where": {},
            "skip": (index - 1) * size,
            "limit": size
        }
    };

    return articleModel.query(queryObj);
}



/**
 *  根据文章ID获取文章内容
 */
function getArticleByHash(hash) {
    var queryObj = {
        "filter": {
            fields: ["content", "createdAt", "hateCount", "id", "likeCount", "name", "readCount", "tagsId", "title"],
            "where": { id: hash }
        }
    }
    return articleModel.query(queryObj);
}


// Cache processor
const Cache = {
    get: (key) => {
        if (!window.sessionStorage) return false
        return JSON.parse(window.sessionStorage.getItem(key))
    },
    set: (key, data) => {
        if (!window.sessionStorage) return false
        window.sessionStorage.setItem(key, JSON.stringify(data))
        return true
    },
    has: (key) => {
        return Boolean(window.sessionStorage && window.sessionStorage.hasOwnProperty(key))
    }
}

export default {

    getList(pageIndex, pageSize) {
        if (Cache.has('list')) {
            // Read from cache
            return Promise.resolve(Cache.get('list'))
        } else {
            return new Promise(function(resolve, reject) {

                getTitleList(pageIndex, pageSize)
                    .then(res => res.data)
                    .then(arr => {
                        //debugger;
                        const list = arr.map(({ title, createdAt, id }) => ({
                            title: title,
                            date: createdAt,
                            sha: id,
                            size: 0
                        }));
                        Cache.set('list', list);

                        resolve(list);
                    }, function(err) {
                        reject(err);
                    })

            });
        }
    },

    getDetail(hash) {
        const cacheKey = 'post.' + hash
            //debugger;
        if (Cache.has(cacheKey)) {
            // Read from cache
            return Promise.resolve(Cache.get(cacheKey))
        } else {

            return new Promise(function(resolve, reject) {

                getArticleByHash(hash)
                    .then(res => res.data)
                    .then(data => {
                        // Save into cache
                        Cache.set(cacheKey, data[0]);
                        // ..then return
                        resolve(data[0]);
                    });

            });
        }
    }

}