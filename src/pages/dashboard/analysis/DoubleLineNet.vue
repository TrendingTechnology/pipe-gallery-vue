<template>
  <div style="width: 100%; height: 100px;background-color: rgba(255,255,255,0);margin-bottom: -28px;">
    <v-chart class="chart" :option="option" autoresize />
  </div>

</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import {format} from "date-fns";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

let axis = []
let y1 = []
let y2 = []
const beginDay = new Date().getTime()


export default {
  name: "DoubleLineMess",
  props:{
    yAxis1:{
      type:Number,
      default:0
    },
    yAxis2:{
      type:Number,
      default:0
    }
  },
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
  },
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          show:false,
          data: axis
        },
        yAxis: {
          type: 'value',
          show:false
        },
        series: [{
          name: '上行',
          smooth: true,
          symbol:'circle',
          lineStyle: {
            width: 1
          },
          emphasis: {
            focus: 'series'
          },
          showSymbol: false,
          data: y1,
          type: 'line',
          areaStyle: {},
          z:10
        },
          {
            name: '下行',
            smooth: true,
            symbol:'circle',
            lineStyle: {
              width: 1
            },
            emphasis: {
              focus: 'series'
            },
            showSymbol: false,
            data: y2,
            type: 'line',
            areaStyle: {},
            z:9
          }],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          textStyle:{
            fontSize:1
          },


        },
        grid:{
          show: false,
          height:40,
          width:'96%',
          left:'center',
          bottom:18,
          top:36
        },
      }
    };
  },
  methods: {
    getTime(){
      return format(new Date().getTime(), 'HH:mm:ss');
    }
  }
  ,
  watch:{
    yAxis1:{
      immediate:true,
      handler:function(){
        if(axis.length>9)
        {
          axis.shift()
        }
        if(y1.length>9){
          y1.shift()
        }

        y1.push(this.yAxis1)

        axis.push(
            this.getTime()
        )


      }
    },
    yAxis2:{
      immediate:true,
      handler:function(){
        if(axis.length>9)
        {
          axis.shift()
        }
        if(y2.length>9){
          y2.shift()
        }

        y2.push(this.yAxis2)

      }
    },
    option: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal);
          } else {
            this.chart.setOption(oldVal);
          }
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  },


};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
.mini-chart {
  position: relative;
  width: 100%
}
.mini-chart .chart-content{
  position: absolute;
  bottom: -28px;
  width: 100%;
}
</style>
