<template>
  <a-card style="margin-top: 14px">
    <a-tabs default-active-key="1" >
      <a-tab-pane key="1" tab="Tab 1">
        <p>query: {{this.$route.query}} </p>
        <p>params: {{this.$route.params.id}}</p>
        <p>{{this.deviceCurrent}}</p>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render>
        <p>{{this.device7LogInfo}}</p>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">
        <p>{{this.deviceMonthLogInfo}}</p>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import device, {getDCurrentInfo, getDLogInfo} from "@/services/device";

export default {
  name: "Detail",
 data(){
    return{
      queryDevice:{},
      deviceCurrent: [],
      device7LogInfo: [],
      deviceMonthLogInfo:[]
    }
 },
  methods:{
    loadData ()
    {
      let vm = this;
      getDCurrentInfo(this.queryDevice).then(res => {
        vm.deviceCurrent = res.data.data;
      })
      getDLogInfo(7,this.queryDevice).then(res => {
        vm.device7LogInfo=res.data.data
      })
      getDLogInfo(31,this.queryDevice).then(res => {
        vm.deviceMonthLogInfo=res.data.data
      })
    },

  },
  beforeMount(){
    this.queryDevice.wsName=this.$route.query.wsName;
    this.queryDevice.node=this.$route.query.node;
    this.loadData()
  },


}
</script>

<style scoped>

</style>
