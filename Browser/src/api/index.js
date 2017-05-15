import axios from 'axios'
import 'es6-promise/auto'

import { Resource, Route } from './mcm_sdk'
import conf from '../config'
import { onlyTitle, onlyDate } from '../utils'

axios.defaults.baseURL = conf.serverUrl;

/**
 *  获取相应页数的文章标题列表
 */
function getTitleList(index, size) {

    return new Promise(function(resolve, reject) {

        axios.post("/articles/getList", { index: index || 1, size: size || 20 }).then(function(data) {
            resolve(data);
        }, function(err) {
            reject(err);
        });
    });

}



/**
 *  根据文章ID获取文章内容
 */
function getArticleByHash(hash) {
    return new Promise(function(resolve, reject) {

        axios.post('/articles/getArticleByHash/' + hash).then(function(data) {
            resolve(data);
        }, function(err) {
            reject(err);
        });
    });
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

                    resolve(list);
                }, function(err) {
                    reject(err);
                })

        });
    },

    getDetail(hash) {
        return new Promise(function(resolve, reject) {

            getArticleByHash(hash)
                .then(res => res.data)
                .then(data => {
                    resolve(data[0]);
                });

        });
    }

}