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
let dropRates=[]
const beginDay = new Date().getTime()


export default {
  name: "DoubleLineMess",
  props:{
    revMsg:{
      type:Number,
      default:0
    },
    sentMsg: {
      type:Number,
      default:0
    },
    timeToChange:{
      type:String,
      default:''
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
          name: '确认比',
          smooth: true,
          symbol:'circle',
          lineStyle: {
            width: 1,
            color:'green'
          },
          emphasis: {
            focus: 'series'
          },
          showSymbol: false,
          data: dropRates,
          type: 'line',
          areaStyle: {
            color:'green',
          },

        },],
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
    timeToChange:{
      immediate:true,
      handler:function(){
        if(axis.length>9)
        {
          axis.shift()
        }
        if(dropRates.length>9){
          dropRates.shift()
        }

        dropRates.push(Number(((this.sentMsg/this.revMsg)).toFixed(1)))

        axis.push(
            this.getTime()
        )


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

</style>
