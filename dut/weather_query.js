
let Weather_box_Node = document.body.querySelector(".Weather_box")
let Weather_now_Node = Weather_box_Node.querySelector(".Weather_now")
let hours_Weather_Node = Weather_box_Node.querySelector(".hours_Weather")
let Future_Weather_Node = Weather_box_Node.querySelector(".Future_Weather")
let ispc = true
var cid=" "
function get(url, callback) {
  let xhr = new XMLHttpRequest()
  xhr.open("GET", url)
  xhr.onload = () => {
    let data = JSON.parse(xhr.responseText).HeWeather6
    callback(data[0])
  }
  xhr.send()
}
var map = new BMap.Map('map');
var myCity = new BMap.LocalCity();
var cityName;
myCity.get(myFun); //异步获得当前城市
function myFun(result){
  cityName = result.name.replace('市', '');
}

function jsonp(url){
    var script = document.createElement('script');
    script.src = url;
    document.body.append(script);
    document.body.removeChild(script);
}

//设置延时，因为获得当前城市所在地是异步的
setTimeout(function(){
  var urls = [];
    urls[1] = 'https://api.map.baidu.com/telematics/v3/weather?output=json&ak=FK9mkfdQsloEngodbFl4FeY3&callback=getTodayWeather&location=' + encodeURI(cityName);
  jsonp(urls[1]);
  let url = "https://search.heweather.com/find?location=" +cityName+ "&key=42a2e74944864db5aec770a991481f7b"
  url += "&mode=match&number=10&group=cn"
  get(url,tmp)


}, 1000);



function tmp(data){
  cid=data.basic[0].cid
console.log(cid)
let url1 = "https://free-api.heweather.com/s6/weather/now?location=" +cid + "&key=42a2e74944864db5aec770a991481f7b"
let url2 = "https://free-api.heweather.com/s6/weather/hourly?location=" +cid + "&key=42a2e74944864db5aec770a991481f7b"
let url3 = "https://free-api.heweather.com/s6/weather/forecast?location=" +cid + "&key=42a2e74944864db5aec770a991481f7b"
get(url1,Weather_now)
get(url2,hours_Weather)
get(url3,Future_Weather)

}

function Weather_now(data) {
 Weather_now_Node.querySelector("img").src = `./weather_icon/${data.now["cond_code"]}.png`
 Weather_now_Node.querySelector("div span:nth-of-type(1)").innerHTML = data.basic.location 
 Weather_now_Node.querySelector("div span:nth-of-type(2)").innerHTML = "天气：" + data.now.cond_txt
 Weather_now_Node.querySelector("div span:nth-of-type(3)").innerHTML = "温度：" + data.now.tmp + "℃"
}

function hours_Weather(data) {
  for (let i = 0; i < 8; i++) {
    let node = hours_Weather_Node.querySelector(`div:nth-of-type(${i + 1})`)
    node.querySelector("img").src = `./weather_icon/${data.hourly[i]["cond_code"]}.png`
    node.querySelector("div span:nth-of-type(1)").innerHTML = data.hourly[i].time
    node.querySelector("div span:nth-of-type(2)").innerHTML = "天气：" + data.hourly[i].cond_txt
    node.querySelector("div span:nth-of-type(3)").innerHTML = "温度：" + data.hourly[i].tmp + "℃"
  }
}

function Future_Weather(data) {
 for (let i = 0; i < 3; i++) {
  let node = Future_Weather_Node.querySelector(`div:nth-of-type(${i + 1})`)
  node.querySelector("img").src = `./weather_icon/${data["daily_forecast"][i]["cond_code_d"]}.png`
  node.querySelector("div span:nth-of-type(1)").innerHTML = data["daily_forecast"][i].date
  node.querySelector("div span:nth-of-type(2)").innerHTML = "天气：" + data["daily_forecast"][i].cond_txt_d
  node.querySelector("div span:nth-of-type(3)").innerHTML = "白天气温：" + data["daily_forecast"][i].tmp_max + "℃"
  node.querySelector("div span:nth-of-type(4)").innerHTML = "夜间气温：" + data["daily_forecast"][i].tmp_min + "℃"

 }
 Weather_box_Node.style.display = "block"
}

document.addEventListener('DOMContentLoaded',() => Ispc())

function Ispc(){
   let userAgentInfo = navigator.userAgent;
   let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
   for (let v = 0; v < Agents.length; v++) {
       if (userAgentInfo.indexOf(Agents[v]) > 0) {
        Weather_box_Node.style.bottom = "10%"
        Weather_box_Node.style.right = 0
        Weather_box_Node.style.left = 0
        Weather_box_Node.style.margin = "auto"
        ispc = false
        return
      }
   }
   Weather_box_Node.style.right = 0
   Weather_box_Node.style.top = 0
   Weather_box_Node.style.bottom = 0
}
