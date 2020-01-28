import moment  from 'moment'


// 日期参数 格式YYYY-MM-DD
// 传入2017-10-09 月份是10 在函数中会被转换为9，因为从0开始的 
var util = {

	source_url:'http://examlab.cn/img/',

	diffDate:function(a,b){
        if(!a || !b){
            return false;
        }
	    var aArr = a.split('-');
        aArr[1] = parseInt(aArr[1])-1;
        var bArr = b.split('-');
        bArr[1] = parseInt(bArr[1])-1;
	    return moment(bArr).diff(moment(aArr), 'days') // 1
    },

     // 过滤富文本数据
    buildRichData:function(arr){
        for (var i = 0; i < arr.length; i++) {
             if(arr[i].type =='image'){
                arr[i].name = this.source_url + arr[i].name;
             }else if(arr[i].type=='video'){
                // arr[i].source=[];
                // arr[i].source.push({
                //   'url':this.source_url+arr[i].name,
                //   'type':'video/mp4'
                // })
                arr[i].url=this.source_url+arr[i].name;
             }else if(arr[i].type == 'audio'){
                arr[i].source={
                  title: '',
                  author: '',
                  url: this.source_url+arr[i].name,
                  pic: 'http://examlab.cn/wechatClass/static/share.jpg',
                  type:'audio'
                }              
             }else{
                
             }

        }

        return arr;          

     },	

}



export default util;

