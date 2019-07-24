var myChart = echarts.init(document.getElementById('main'));

var geoCoordMap ={
 "节点3":[117.810404,38.56982],
 "节点5":[119.399616,38.802258],
 "节点8":[119.205324,38.912052],
 "节点2":[117.959445,38.977932],
 "节点10":[119.404895,38.247335],
 "节点0":[118.407503,39.076499],
 "节点9":[117.94866,38.674181],
 "节点7":[118.409271,38.876429],
 "节点4":[119.409385,38.379581],
 "节点1":[118.406648,38.182804],
 "节点6":[118.262265,38.323405]

};
var Data =[
  [{name:"节点0"},{name:"节点3",value:60,color:"#4F94CD"}],
  [{name:"节点0"},{name:"节点5",value:80,color:"#4F94CD"}],
  [{name:"节点0"},{name:"节点8",value:90,color:"#4F94CD"}],
  [{name:"节点0"},{name:"节点2",value:30,color:"#4F94CD"}],
  [{name:"节点0"},{name:"节点10",value:50,color:"#4F94CD"}],
  [{name:"节点0"},{name:"节点9",value:40,color:"#4F94CD"}],
  [{name:"节点0"},{name:"节点7",value:30,color:"#4F94CD"}],
  [{name:"节点0"},{name:"节点4",value:80,color:"#4F94CD"}],
  [{name:"节点0"},{name:"节点1",value:60,color:"#4F94CD"}],
  [{name:"节点0"},{name:"节点6",value:70,color:"#4F94CD"}]

]
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[1].name];
        var toCoord = geoCoordMap[dataItem[0].name];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
            });
        }
    }
    return res;
};

var series = [];
[['节点0', Data]].forEach(function (item,i) {
    var color='';
    item[1].map(function (dataItem) {
      // console.log(dataItem[1].color);
    })
    series.push({
            name: item[0],
            type: 'lines',
            coordinateSystem: 'bmap',
            zlevel: 1,
            // 动线样式
            effect: {
                show: true,
                period:5,
                trailLength:1.2,
                color:'#082E54',
                symbolSize:2,
            },
            // 实线样式
            lineStyle: {
                normal: {
                    color:'#4F94CD',
                    width: 1,
                    curveness:0.2
                }
            },
            data: convertData(item[1])
        },
        {
            name: item[0],
            type: 'lines',
            coordinateSystem: 'bmap',
            zlevel: 2,
            effect: {
                show: true,
                period: 5,
                trailLength: 0,

            },
            lineStyle: {
                normal: {
                    color:'#4F94CD',
                    width:1,
                    opacity: 0.4,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        },
        {
            name:'详细信息',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: function (val) {
                return val[2] / 5;
            },
             data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
                     itemStyle: {
                normal:{
                color:dataItem[1].color
                }
            },
                };
            })
        });
});

var option = {
    tooltip : {
        trigger: 'item',
        formatter:function(e){console.log(e);var t=e.name+e.seriesName;return t+="<div  ><span></span>经度 : "+e.value[0]+"</div>",t+="<div  ><span></span>纬度 : "+e.value[1]+"</div>",t+="<div  ><span></span>当前海浪高度 : </div>"}

    },
    bmap: {

        roam: true,
        silent:true,
    },
    series: series
};

myChart.setOption(option);
var map = myChart.getModel().getComponent('bmap').getBMap();
    map.disableDoubleClickZoom();
    map.centerAndZoom(new BMap.Point(119.399616,38.702258),10);  // 初始化地图
window.onresize = myChart.resize;//图表自适应
