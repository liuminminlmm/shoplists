 //动态创建script
 //利用src,callback回掉
//jsonp请求的地址参数有callback
//http://textlink.simba.taobao.com/lk?_ksTS=1528889987611_118&callback=jsonp119&pid=430709_1007&refpid=mm_26632258_3504122_32538762
 function jsonp(url,callbackName,callback){
   //在全局挂载callName全局可以访问，不报错
    window[callbackName] = function(data){
        callback(data)
    }
     let script = document.createElement('script');
     script.src = url;
     document.body.appendChild(script);
 }

export default jsonp;



//jsonp的形式
//  jsonp('',(data)=>{

//  })
 
 
