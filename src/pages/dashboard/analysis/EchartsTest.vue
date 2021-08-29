<template>

  <div style="width: 100%; height: 180.4px;background-color: white">
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

const datax = []
const beginDay = new Date().getTime()
for (let i = 0; i < 7; i += 1) {
  datax.push(
      format(new Date(beginDay+ 3000 * i), 'HH:mm:ss')
  )
}

export default {
  name: "EchartsTest",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
  },
  data() {
    return {
      datax,
      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          show:false,
          data: datax
        },
        yAxis: {
          type: 'value',
          show:false
        },
        series: [{
          name: '收到的消息',
          smooth: true,
          symbol:'circle',
          lineStyle: {
            width: 1
          },
          showSymbol: false,
          data: [820, 932, 901, 934, 1290, 1330, 12,625],
          type: 'line',
          areaStyle: {}
        },
          {
            name: '发送的消息',
            smooth: true,
            symbol:'circle',
            lineStyle: {
              width: 1
            },
            showSymbol: false,
            data: [20, 832, 701, 134, 1290, 1330, 12,752],
            type: 'line',
            areaStyle: {}
          }],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: 'cross'
          },
          textStyle:{
            fontSize:1
          },

        },
        grid:{
          show: false,
          height:68
        },
      }
  };
  },
  beforeMount() {

  }
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
