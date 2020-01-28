<template>
  <div class="cal-wrapper">
    <div class="cal-header">
      <div class="l" @click="preMonth"><div class="arrow-left icon">&nbsp</div></div>
      <div class="title">{{curYearMonth}}</div>
      <div class="r" @click="nextMonth"><div class="arrow-right icon">&nbsp</div></div>
    </div>
    <div class="cal-body">
      <!-- 周划分 -->
      <div class="weeks">
        <span v-for="dayName in i18n[calendar.options.locale].dayNames" class="item">{{dayName}}</span>
      </div>
      <!--  -->
      <div class="dates" >
        <div v-for="date in dayList" class="item" 
          :class="{
            today: date.status ? (today == date.date) : false,
            today_done: date.readStatus=='done'? true : false,
            today_after: date.readStatus=='after'? true : false,
            today_wait: date.readStatus =='over'? true : false,
            event: date.status ? (date.title != undefined) : false,
            [calendar.options.className] : (date.date == selectedDay)
          }">
          <p class="date-num"
            @click="handleChangeCurday(date)"
            :style="{color: date.title != undefined ? ((date.date == selectedDay) ? '#fff' : '#FFF') : 'inherit'}">
            {{date.status ? date.cont: '&nbsp'}}</p>
            <!-- <span>{{date.diff}}</span> -->
<!--           <span v-if="date.status ? (today == date.date) : false" class="is-today" :style="{backgroundColor: customColor }" ></span>
          <span v-if="date.status ? (date.title != undefined) : false" class="is-event"
            :style="{borderColor: customColor, backgroundColor: (date.date == selectedDay) ? customColor : 'inherit'}"></span> -->
        </div>
      </div>
    </div>
    <toast v-model="showText" type="text" :text="tipText"></toast>
  </div>
</template>

<script>
import i18n from '../i18n.js'
import moment  from 'moment'
import cookies from 'js-cookie'
import { Toast } from 'vux'
import { dateTimeFormatter, isEqualDateStr} from '../tools.js'

const inBrowser = typeof window !== 'undefined'
export default {
  components: {
    Toast
  },
  name: 'cal-panel',
  data () {
    return {
      i18n,
      showText:false,
      tipText:'超出课程长度～'
    }
  },
  // 上层传递下来的数据
  props: {
    // 日历上的数据
    events: {
      type: Array,
      required: true
    },
    start: {
      type: String,
      required:true
    },
    len:{
      type:String,
      required:true
    },
    calendar: {
      type: Object,
      required: true
    },
    selectedDay: {
      type: String,
      required: false
    }
  },

  mounted:function(){
    
    
    
  },
  // 这个生命周期在什么时候
  // let这个作用域如何理解
  computed: {
    dayList () {
        // 本月多少天


        // 本月第一天
        let firstDay = new Date(this.calendar.params.curYear + '/' + (this.calendar.params.curMonth + 1) + '/01');
        
        // 本月最后一天
        //当前月有多少天
        let first_week = firstDay.getDay();
        let end_week = moment(firstDay).endOf('month').format('d');
        let len = moment(firstDay).endOf('month').format("DD");
        len = parseInt(len)+first_week+(6-end_week);
        
        // 日历视图上开始第一天的时间戳
        let startTimestamp = firstDay-1000*60*60*24*firstDay.getDay();

        // 计算时间差 时间格式YYYY,MM,DD 注意，月份从0开始
        var startDate  = this.start.replace(/-/g,',');
        startDate = startDate.split(',');
        startDate[1] = parseInt(startDate[1])-1;
        startDate = startDate.join(',');


        let item, status, tempArr = [], tempItem
        for (let i = 0 ; i < len ; i++) {
            item = new Date(startTimestamp + i*1000*60*60*24)
            
            // 标记变量  是不是当前月
            if (this.calendar.params.curMonth === item.getMonth()) {
              status = 1
            } else {
              status = 0
            }
            var itemDate=item.getFullYear()+'/'+(item.getMonth()+1)+'/'+item.getDate();
            var trueDate=item.getFullYear()+','+item.getMonth()+','+item.getDate();
            var readStatus = '';
            var dateDiff = this.dateDiff(startDate,trueDate);

            
            if(status){
               if( dateDiff<0){
                 readStatus = 'over';
              }else if(dateDiff>=this.len){
                 readStatus = 'over';
              }else{
                 readStatus = '';
              }             
            }


            // 每个日期对象
            tempItem = {
              date:itemDate ,
              cont:item.getDate(),
              diff:dateDiff,
              status: status,
              readStatus:readStatus,
            }

            // 如果是今天，显示文字
            if(item.getDate()== new Date().getDate() && item.getMonth()==new Date().getMonth() ){
              tempItem.cont='今';
            }
            

 
            // 将后台传过来的数据传递给日期对象
            this.events.forEach((event) => {
              // console.log(event);
              if (event.date==tempItem.date && status && dateDiff>=0) {
                tempItem.title = event.title;
                tempItem.readStatus = event.readStatus;
                // tempItem.desc = event.desc || ''
              }
            })

            tempArr.push(tempItem)
        }
        return tempArr
    },

    // 获取系统时间显示的今天日期
    today () {
      let dateObj = new Date();
      return dateObj.getFullYear()+'/'+(dateObj.getMonth()+1)+'/'+dateObj.getDate();
    },
    curYearMonth () {
      let tempDate = Date.parse(new Date(`${this.calendar.params.curYear}/${this.calendar.params.curMonth+1}/01`))
      return dateTimeFormatter(tempDate, this.i18n[this.calendar.options.locale].format)
    },
    customColor () {
      return this.calendar.options.color
    }
  },
  methods: {
    nextMonth () {
      this.$EventCalendar.nextMonth()
      this.$emit('month-changed', this.curYearMonth)
    },
    preMonth () {
      this.$EventCalendar.preMonth()
      this.$emit('month-changed', this.curYearMonth)
    },

    // 点击某个日期
    // 如果不是这个月的日期，灰色不可见，但是dom结构还在，点击的时候忽略
    // 如果点击的日程超过了课程的长度 提示不可点击
    handleChangeCurday (date) {


      
      // 如果点击购买之前的日期，怎么办？
      if(date.diff<0){
         this.tipText = '超出课程长度～';
         this.showText=true;
         return false;

      }

      // 如果点击超过课程长度的日期，怎么办？
      // 这里还要吧课程长度传递过来
      // date.diff从0开始，0代表第一天
      if(date.diff>=parseInt(this.len) ){
         this.tipText = '超出课程长度～';
         this.showText=true;
         return false;
      }


      // 将当前点击的时间设置到cookie中
      cookies.set('home_date', date.date, { expires: 1 });
      
      var now = moment().format('YYYY/MM/DD');
      var isAfter = moment(date.date).isAfter(now);

      if(isAfter){
         this.tipText = '课程未开始';
         this.showText=true;
         return false;        
      }


      if (date.status ) {

        var url = '/index/home/'+this.$route.params.subject+'/'+ date.date.replace(/\//g,'-');
        this.$router.push({path:url})
      }else{
        console.log('status不存在')
      }
    },

     // 使用moment计算两个日期之间的相差的天数
     // 注意，moment计算的时候，月份时从0开始的
     // a 开始时间
     // b 结束时间
     // 时间格式 XXXX,XX,XX
     dateDiff(a,b){
        var aArr = a.split(',');
        var bArr = b.split(',');
        return moment(bArr).diff(moment(aArr), 'days') // 1
     },


  }
}
</script>
