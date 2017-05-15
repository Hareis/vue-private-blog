/**
 * Created by li on 2017/5/15.
 */

const Resource= require('./mcm_sdk').Resource;
const Conf=require('./../config/blogConf');
const NodeCache = require( "node-cache" );

const myCache = new NodeCache( { stdTTL: 10*60 } ); //缓存时间为10 分钟

let _resource=undefined;
module.exports=  {

    /**
     * 获取MCM对象的实例
     * @returns {undefined}
     */
    getMCMInstance () {
        if(_resource==undefined){
            _resource=new Resource(Conf.blogConfig.mcm.appId,Conf.blogConfig.mcm.appkey);
        }
        return _resource;
    },
    myCache:myCache
}