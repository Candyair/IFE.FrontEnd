(function(){
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
"use strict";
var radio = g("form-gra-time");
var city = g('city-select')
var defCity = '北京';
var defTime = 'day';
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var   dat = new Date("2016-01-01"),
     datStr = '';
  for(var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
function randomColor(){
  var colorValue = ["0","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],
    colorprefix = '#';
  for(var i=0;i<6;i+=1){
    var index = Math.round(Math.random()*14);
    colorprefix+=colorValue[index]
  }
  return colorprefix;
}

/**
 * 渲染图表
 */
function renderChart() {
  var data = initAqiChartData(defCity);
  dataToChart(defCity,defTime)
  function dataToChart(city,time){
    var dataWeek = {},
        dataMonth = {},
        arr = [],
        arrTime = [];
    if('day' == time){
      data = data;
    }else if('week' == time){
      //自然周 getWeek
      var temp = {};
      for(i in data){
        arr.push(data[i]);
        arrTime.push(i)
      }
      for(var i=0;i<(Math.ceil(arr.length/7))+1;i++){
        var sum = 0;
        var timeWeek = arrTime[i*7]
        for(var j=1;j<8;j++){
          sum+= arr[i*7+j]
        }
        temp[timeWeek] = Math.ceil(sum/7)
      }
      data = temp;
    }else if('month' == time){
      var month = '',count = 0,sum = 0,mounthNum=0;
      //获取月数
      for(var i in data){
        if( data.hasOwnProperty(i)){
          var temp = i.substring(i.indexOf('-')+1,i.lastIndexOf('-'))
            if(month != temp){
               mounthNum ++
            } 
            month = temp
        }
      }
      //获取每月的数据
      for(var i=1;i<=mounthNum;i++){
        for(var j in data){
          if(data.hasOwnProperty(j)){
            var temp = j.substring(j.indexOf('-')+1,j.lastIndexOf('-'))
            //获取当月天数及污染总指数
            if(month == temp){
              console.log(sum)
              console.log(data[j])
              sum += data[j]
              count++;
            } else{
              dataMonth[j] = Math.ceil(sum/count)
              sum = 0;
              count = 0;
            }
            month = temp
            
          }
        }
      }
      data = dataMonth;
    }
    var tar = document.getElementsByTagName('div')[0],
      width = ''
    tar.innerHTML = '';
    switch(time){
      case 'day':
        width = 5;
        break;
      case 'week':
        width = 20;
        break;
      case 'month':
        width = 40;
        break;
      default:
        break;

    }
    console.log(data)
    for(i in data){
      var div = c('div');
      div.style = 'width:'+width+'px;height:'+data[i]+'px;background-color:'+randomColor()+'';
      div.setAttribute('class','div_day');
      // div.addEventListener('mouseover',function (){
      // })
      div.setAttribute('title',i+':'+data[i])
      tar.appendChild(div)
    }
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */

function graTimeChange() {
  // 确定是否选项发生了变化
  var current = selectRadio();
  defTime = current;
   if (current !== pageState.nowGraTime) {
      pageState.nowGraTime = current;
      var city = g('city-select'),
        index = city.selectedIndex,
        cit = city.options[index].text 
      renderChart();
  }
  // 设置对应数据

  // 调用图表渲染函数
}
function selectRadio(){
  var input = radio.getElementsByTagName('input');
  var i=0,len = input.length;
  for (; i < len; i++) {
    if (input[i].checked) {
        return input[i].value;
    }
  }

}
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  var self = this,
    index = self.selectedIndex;
  if(pageState.nowSelectCity != index ){
    pageState.nowSelectCity = self.selectedIndex;
    // 设置对应数据
    var text = self.options[pageState.nowSelectCity].text
    defCity = text;
    // 调用图表渲染函数
    renderChart();
    return text
  }else{
    return false
  }
}
function selectedCity(){

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var fieldset = g('form-gra-time'),
      radio = fieldset.getElementsByTagName('input'),
      len = radio.length;
  for(var i=0;i<len;i+=1){
    if('day' == radio[i].value ){
      radio[i].setAttribute('checked','checked');
    }
    radio[i].addEventListener('click',graTimeChange,false)
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var tar = document.getElementById("city-select");
  for( var i in aqiSourceData){
    var option = document.createElement('option')
    option.innerHTML = i;
    tar.appendChild(option)
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  tar.addEventListener('change',citySelectChange,false)
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData(city) {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData = aqiSourceData[city]
  return aqiSourceData[city]
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();

function g(id){ return document.getElementById(id)}
function c(type){ return document.createElement(type)}
})();