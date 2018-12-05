/**
 * Created by wupeng5 on 2018/1/7.
 */
/**
 * ajax 处理类，
 * get: return promise
 * post: return promise
 * all: params:PromiseArray, return promise
 * 接口返回格式{code:0,message:"xx",data:object}
 * code:200, 成功, 其他为失败
 * code:701，未登录
 * code失败的情况下，打印message
 * return promise
 * 
 * 
 * 
 * 组件内部请求ajax必须继承此类extends:AjaxUtil
 * 
 **/
let AjaxUtil = function(){

    this.get = function(url){
        let symbol = url.indexOf('?') == -1?"?":"&";
        url = url + symbol + "ran="+Math.ceil(Math.random()*10000000);
        let defer = Q.defer();
        let headers = {
            'Content-Type': 'application/json'
        };
        let options = {
            method:"get",
            credentials:'include',
            headers:headers
        };
        let that = this;
        fetch(url,options).then(d =>d.json()).then(function (data) {
            let code = data.status;
            if(code == "701"){
                that.$router.push({path:"login"});
            }else{
                if(code == "200"){
                    defer.resolve({data:data.data,params:data.params});
                }else{
                    defer.reject({data: data.msg});
                }
            }
        }).catch(function(err) {
            defer.reject({data: "Server Error!"});
            throw new Error(url + " request server error!");
        });
        return defer.promise;
    }

    let param = function(obj) {
        var query = '';
        var name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null) {
                query += encodeURIComponent(name) + '='
                + encodeURIComponent(value) + '&';
            }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };
    this.post = function(url,data){
        let symbol = url.indexOf('?') == -1?"?":"&";
        url = url + symbol + "ran="+Math.ceil(Math.random()*10000000);
        let defer = Q.defer();
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        let options = {
            method:"post",
            credentials:'include',
            headers:headers
        };
        if(data){
            options.body = param(data);
        }
        let that = this;
        fetch(url,options).then(d =>d.json()).then(function (data) {
            let code = data.status;
            if(code == "701"){
                that.$router.push({path:"login"});
            }else{                
                 if(code == "200"){
                    defer.resolve({data:data.data,params:data.params});
                }else{
                    defer.reject({data: data.msg});
                } 
            }
        }).catch(function(err) {
            defer.reject({data: "Server Error!"});
            throw new Error(url + " request server error!");
        });
        return defer.promise;
    }

    this.upload = function(url,data){        
        let symbol = url.indexOf('?') == -1?"?":"&";
        url = url + symbol + "ran="+Math.ceil(Math.random()*10000000);
        
        let defer = Q.defer();
        
        let options = {
            method:"post",
            credentials:'include'
        };
        if(data){
            options.body = data;
        }
        
        let that = this;      
        let isOpenApi = url.toLowerCase().indexOf("openapi")>0   
        fetch(url,options).then(d =>d.json()).then(function (data) {            
            if(isOpenApi){
                if( data.status == "701"){
                    if(self != top)top.location.href='/#/login';
                    else that.$router.push({path:"login"});
                }else{  
                    if( data.status == "200"){
                        if( data.data.status == "200"){
                            defer.resolve({data:data.data.data,params:data.data.params});
                        }
                        else{
                            defer.reject({data: data.data.msg});
                        }
                    }
                    else if(data.status == "403"){
                        alert(data.msg);
                    }
                    else{
                        defer.reject({data: data.msg});
                    }
                }
            }else{
                if( data.status == "701"){
                    if(self != top)top.location.href='/#/login';
                    else that.$router.push({path:"login"});
                }
                else if(data.status == "403"){
                    alert(data.msg);
                }
                else{  
                    if( data.status == "200"){
                        defer.resolve({data:data.data,params:data.params});
                    }else{
                        defer.reject({data: data.msg});
                    }
                }
            }
        }).catch(function(err) {
            defer.reject({data: "Server Error!"});
            throw new Error(url + " request server error!");
        });
        return defer.promise;
    }

    this.all = function(promises){
        return Q.all(promises);
    }
};

// export default new AjaxUtil();

let AjaxService = new AjaxUtil();
export default {
    name: "AjaxUtil",
    methods:{
        getFetch:AjaxService.get,
        postFetch:AjaxService.post,
        uploadFetch:AjaxService.upload
    }
};