<template xmlns="">
  <div>
    <sys-info></sys-info>
    <client-info></client-info>

  </div>


</template>
<script>
import ClientInfo from '@/pages/dashboard/analysis/ClientInfo'
import SysInfo from "@/pages/dashboard/analysis/SysInfo";


export default {
  components:{SysInfo,ClientInfo},

}


</script>
<style scoped>

</style>
