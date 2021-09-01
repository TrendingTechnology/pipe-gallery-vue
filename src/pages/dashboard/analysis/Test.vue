<template xmlns="">
  <span>
    <sys-info :sys-info="data.sysInfo" :broker-info="data.emqBrokerInfo"></sys-info>
    <client-info :data-info="data" ></client-info>
<!--    <echarts-test></echarts-test>-->
  </span>


</template>
<script>
import ClientInfo from '@/pages/dashboard/analysis/ClientInfo'
import SysInfo from "@/pages/dashboard/analysis/SysInfo";
import EchartsTest from "@/pages/dashboard/analysis/DoubleLineMess";

import {getSysInfo} from "@/services/analysis";


export default {
  components:{SysInfo,ClientInfo,EchartsTest},
  data () {
    return{
      data:{},
      nowTime:null
    }
  },
  methods: {
    loadSysInfo() {
      const vm = this;
      getSysInfo().then(res => {
        if (res.data.code === 200) {
          vm.data = res.data.data;
        } else {
          this.$message.error('获取系统信息失败！', 3)
        }
      })

    }
  },
  created() {
    this.loadSysInfo()

  },
  mounted() {
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.loadSysInfo(); // methods中请求数据的方法
      }, 3000);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }

}


</script>
<style scoped>

</style>
