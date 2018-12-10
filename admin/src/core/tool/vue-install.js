
import Q from "q";
import _this from "../../main";

const proxy_key = "/api/";

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
        // else if(value===null){
        //     query += encodeURIComponent(name) + '=null&'
        // }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
};

export default {
    install:function(Vue){
        Vue.prototype.ajax = {
            getFetch:function(url){
                if(!url){
                    return;
                }
                url = proxy_key + url;
                let symbol = url.indexOf('?') == -1?"?":"&";
                url = url + symbol + "ran="+Math.ceil(Math.random()*10000000);
                let defer = Q.defer();
                let headers = {
                    'Content-Type': 'application/json; charset=UTF-8'
                };
                let options = {
                    method:"get",
                    credentials:'include',
                    headers:headers
                };
                fetch(url,options).then(d =>d.json()).then( (data)=> {
                    let code = data.status;
                    let message = data.msg;

                    if(code == "200"){
                        defer.resolve({data:data.data,params:data.params});
                    }else{
                        defer.reject({data: message});
                    }
                }).catch((err)=> {
                    _this.alert.showAlert("error",url + " request server error!");
                });
                return defer.promise;
            },
            postFetch:function(url,data){
                if(!url){
                    return;
                }
                url = proxy_key + url;
                let symbol = url.indexOf('?') == -1?"?":"&";
                url = url + symbol + "ran="+Math.ceil(Math.random()*10000000);
                let defer = Q.defer();
                let headers = {
                    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    'Content-Type': 'application/json; charset=UTF-8'
                };
                let options = {
                    method:"post",
                    credentials:'include',
                    headers:headers
                };
                if(data){
                    // options.body = param(data);
                    options.body = JSON.stringify(data);
                }
                fetch(url,options).then(d =>d.json()).then((data)=> {
                    let code = data.status;
                    let message = data.msg;

                    if(code == "200"){
                        defer.resolve({data:data.data,params:data.params});
                    }else{
                        defer.reject({data: message});
                    }
                }).catch(function(err) {
                    _this.alert.showAlert("error",url + " request server error!");
                });
                return defer.promise;
            },
            uploadFetch:function(url,data){
                if(!url){
                    return;
                }
                url = proxy_key + url;
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
                
                fetch(url,options).then(d =>d.json()).then( (data)=> {  
                    let code = data.status;
                    let message = data.msg;

                    if(code == "200"){
                        defer.resolve({data:data.data,params:data.params});
                    }else{
                        defer.reject({data: message});
                    }
                }).catch(function(err) {
                    throw new Error(url + " request server error!");                    
                });
                return defer.promise;
            },
            fetchAll:function(promises){
                return Q.all(promises);
            }
        }
    }
}