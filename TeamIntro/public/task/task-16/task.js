/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function g(id){
  return document.getElementById(id);
}
function c(type){
	return document.createElement(type)
}
function addAqiData() {
	var city = g('aqi-city-input').value;
	var airQuality = g('aqi-value-input').value;
	if( !/^[\u4e00-\u9fa5a-zA-Z]+$/.test(city) ){
		alert('城市名必须为中英文字符！')
	}else if( !/^[1-9]\d*$/.test(airQuality)){
		alert('空气质量必须为整数!')
	}else{
		aqiData[city] = airQuality;
	}
	console.log(aqiData)
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var tar = g('aqi-table');
	for(  i in aqiData){
		var tr = c('tr'),
			thCity = c('th'),
			thAir = c('th'),
			thEdit = c('th'),
			btn = c('button')
		thCity.innerHTML = i ;
		thAir.innerHTML =  aqiData[i];
		btn.innerHTML = '删除';
		btn.setAttribute('class','btn')
		btn.addEventListener('click',delBtnHandle,false)
		thEdit.appendChild(btn)

		tr.appendChild(thCity)
		tr.appendChild(thAir)
		tr.appendChild(thEdit)
		tar.appendChild(tr)
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  var tar = g('aqi-table')
  tar.innerHTML = ''
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var self = this,
  	  par = self.parentNode,
  		gra = self.parentNode.parentNode,
  		prop = gra.firstChild.textContent,
  		table = g('aqi-table')
  		console.log(prop)
  		table.removeChild(gra)
  		//使用aqiData.prop 无法删除对象属性？
  		delete aqiData[prop]
  		console.log(aqiData)
  // renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var tar = g('add-btn');
  tar.addEventListener('click',addBtnHandle,false)
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
