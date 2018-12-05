
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
        //debugger;
    }

    return query.length ? query.substr(0, query.length - 1) : query;
};

export default {
    install:function(Vue){
        Vue.prototype.alert = {
            showConfirm:(title,cb)=>{
                _this.$confirm(title, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        if(cb){cb()};
                    }).catch(() => {
                        // this.showAlertMsg('info','操作异常!');
                    }
                ); 
            },
            showAlert:function(type,msg){
                if(arguments.length == 1){
                    type = "success";
                    msg = arguments[0];
                }
                _this.$message({
                    type: type?type:'success',
                    message: msg?msg:'操作成功'
                });
            },
            showNotify:function(type,msg,title){
                _this.$notify({
                    title: title?title:'警告',
                    type: type?type:'error',
                    message: msg?msg:"操作成功"
                }); 
            }
        }
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
                    let message = data.message?data.message:data.msg;
                    
                    if(code == "701"){
                        _this.$router.push({path:"/login"});
                    }else{                
                        if(code == "200"){
                            defer.resolve({data:data.data,params:data.params});
                        }else{
                            defer.reject({data: message});
                        } 
                    }
                }).catch((err)=> {
                    defer.reject({data: "Server Error!"});
                    throw new Error(url + " request server error!");
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
                    let message = data.message?data.message:data.msg;
                    
                    if(code == "701"){
                        _this.$router.push({path:"/login"});
                    }else{                
                        if(code == "200"){
                            defer.resolve({data:data.data,params:data.params});
                        }else{
                            defer.reject({data: message});
                        } 
                    }
                }).catch(function(err) {
                    defer.reject({data: "Server Error!"});
                    throw new Error(url + " request server error!");
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
                    let message = data.message?data.message:data.msg;
                    
                    if(code == "701"){
                        _this.$router.push({path:"/login"});
                    }else{                
                        if(code == "200"){
                            defer.resolve({data:data.data,params:data.params});
                        }else{
                            defer.reject({data: message});
                        } 
                    }
                }).catch(function(err) {
                    defer.reject({data: "Server Error!"});
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