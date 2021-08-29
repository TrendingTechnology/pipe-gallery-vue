<template>
 <span>
                  <a-descriptions title="EMQX服务端" layout="vertical" :column="2">
              <a-descriptions-item label="名称">
               {{ emqBrokerInfo[0].sysdescr }}
              </a-descriptions-item>

                     <a-descriptions-item label="运行时间">
                {{ emqBrokerInfo[0].uptime.replace(/minutes.*/, 'minutes') }}
              </a-descriptions-item>
              <a-descriptions-item label="节点名称">
                {{ emqBrokerInfo[0].node.replace('@', ' @') }}
              </a-descriptions-item>

              <a-descriptions-item label="状态">
                <span :value="isRunning=(emqBrokerInfo[0].node_status==='Running')">
                  <a-badge status="processing" :text="emqBrokerInfo[0].node_status"
                           :color="isRunning?'green':'rgb(255,0,0)'"/>
                </span>

              </a-descriptions-item>

            </a-descriptions>
            </span>
</template>

<script>


export default {
  name: "BrokerInfo",
  props: {
    emqBrokerInfo: {
      type: Array,
      defaultValue: () => []
    }
  },

}
</script>

<style scoped>

</style>
