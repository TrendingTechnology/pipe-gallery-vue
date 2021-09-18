<template>
  <div>
    <a-modal
        :visible="true"
        @cancel="handleCancel"
        width="800px"
    >

      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          确定
        </a-button>
      </template>

      <a-tabs default-active-key="1" >
        <a-tab-pane key="1" tab="连接信息">
          <a-descriptions :column="2">
            <a-descriptions-item label="节点">
              {{ deviceOverview.node }}
            </a-descriptions-item>
            <a-descriptions-item label="客户端ID">
              {{ deviceOverview.clientid }}
            </a-descriptions-item>
            <a-descriptions-item label="用户名">
              {{ deviceOverview.username }}
            </a-descriptions-item>
            <a-descriptions-item label="协议类型">
              {{ deviceOverview.proto_name }}
              {{deviceOverview.proto_ver}}
            </a-descriptions-item>
            <a-descriptions-item label="IP地址">
              {{ deviceOverview.ip_address }}
            </a-descriptions-item>
            <a-descriptions-item label="端口">
              {{ deviceOverview.port }}
            </a-descriptions-item>
            <a-descriptions-item label="心跳（秒）">
              {{ deviceOverview.keepalive }}
            </a-descriptions-item>
            <a-descriptions-item label="是否为桥接">
              {{ deviceOverview.is_bridge }}
            </a-descriptions-item>
            <a-descriptions-item label="连接时间">
              {{ deviceOverview.connected_at }}
            </a-descriptions-item>
            <a-descriptions-item label="连接状态">
              <span v-if="deviceOverview.connected" style="color:green;">已连接</span>
             <span v-else style="color:red;">未连接</span>
            </a-descriptions-item>
            <a-descriptions-item label="Zone">
              {{ deviceOverview.zone }}
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="2" tab="会话信息">
          <a-descriptions :column="2">
            <a-descriptions-item label="Clean Session">
              {{ deviceOverview.clean_start }}
            </a-descriptions-item>
            <a-descriptions-item label="会话过期间隔（秒）">
              {{ deviceOverview.expiry_interval }}
            </a-descriptions-item>
            <a-descriptions-item label="会话创建时间">
              {{ deviceOverview.created_at }}
            </a-descriptions-item>
            <a-descriptions-item label="订阅数量">
              {{ deviceOverview.subscriptions_cnt }}
            </a-descriptions-item>
            <a-descriptions-item label="最大 订阅数量">
              {{ deviceOverview.max_subscriptions }}
            </a-descriptions-item>
            <a-descriptions-item label="飞行窗口">
              {{ deviceOverview.inflight }}
            </a-descriptions-item>
            <a-descriptions-item label="最大 飞行窗口">
              {{ deviceOverview.max_inflight }}
            </a-descriptions-item>
            <a-descriptions-item label="消息队列">
              {{ deviceOverview.mqueue_len }}
            </a-descriptions-item>
            <a-descriptions-item label="最大 消息队列">
              {{ deviceOverview.max_mqueue }}
            </a-descriptions-item>
            <a-descriptions-item label="未确认的 PUBREC 数据包计数">
              {{ deviceOverview.awaiting_rel }}
            </a-descriptions-item>
            <a-descriptions-item label="最大 未确认的 PUBREC 数据包计数">
              {{ deviceOverview.max_awaiting_rel }}
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="3" tab="收发信息" >
          <a-descriptions :column="2">
            <a-descriptions-item label="接收的TCP报文数量">
              {{ deviceOverview.recv_cnt }}
            </a-descriptions-item>
              <a-descriptions-item label="发送的TCP报文数量">
                {{ deviceOverview.send_cnt }}
              </a-descriptions-item>
            <a-descriptions-item label="接收的 PUBLISH 报文数量">
              {{ deviceOverview.recv_msg }}
            </a-descriptions-item>
              <a-descriptions-item label="发送的 PUBLISH 报文数量">
                {{ deviceOverview.send_msg }}
              </a-descriptions-item>
            <a-descriptions-item label="接收的字节数量">
              {{ deviceOverview.recv_oct }}
            </a-descriptions-item>
              <a-descriptions-item label="发送的字节数量">
                {{ deviceOverview.send_oct }}
              </a-descriptions-item>
            <a-descriptions-item label="接收的 MQTT 报文数量">
              {{ deviceOverview.recv_pkt }}
            </a-descriptions-item>
            <a-descriptions-item label="发送的 MQTT 报文数量">
              {{ deviceOverview.send_pkt }}
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>

        <a-tab-pane key="4" tab="订阅列表" >
          <a-table :columns="columns,pagination" :data-source="subTop" size="small" :rowKey="(record,index)=> index"/>
        </a-tab-pane>

      </a-tabs>


    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: '主题',
    dataIndex: 'topic',
    key: 'topic',
    },
  {
    title: 'Qos',
    dataIndex: 'qos',
    key: 'qos',
  }
]
import {getSubTop} from "@/services/analysis";
export default {
  name: "DeviceOverview",
  props: {
    deviceOver: {
      type: Array,
      default:()=>[]
    },
    deviceIndex: {
      type: Number,
      default:null
    }
  },
  data(){
    return{
      columns,
      deviceOverview: {},
      subTop:[],
      pagination: {
        pageSize: 4,
        showQuickJumper: true,
        hideOnSinglePage: true,
        size: 'small'
      },
    }
  },
  methods: {
    handleCancel(){
      this.$parent.cancelshowDeviceOverview()
    },
    handleSave(){
     return true;
    },
    loadSubTop(){
      var vm = this;
      getSubTop(this.deviceOverview.clientid).then(res=>{
          vm.subTop =res.data.data

      })
    }

  },
  created(){
    this.loadSubTop()

  },
  watch: {
    deviceOver: {
      immediate: true,
      handler: function () {
        let flag=this.deviceOver[this.deviceIndex];
        if(flag!=null){
          this.deviceOverview=flag
        }else{
          this.deviceOverview=initDeviceInfo
        }
      }
    }
  },
  mounted() {
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.loadSubTop() // methods中请求数据的方法
      }, 3000);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
}
const initDeviceInfo ={
  "clientid": "null",
  "reductions": 0,
  "keepalive": 0,
  "mqueue_len": 0,
  "max_inflight": 0,
  "created_at": "2021-08-30 07:06:07",
  "proto_ver": 0,
  "connected_at": "2021-08-30 07:06:07",
  "mountpoint": "undefined",
  "mailbox_len": 0,
  "send_msg": 0,
  "zone": "null",
  "subscriptions_cnt": 0,
  "heap_size": 0,
  "mqueue_dropped": 0,
  "recv_msg": 0,
  "max_mqueue": 0,
  "is_bridge": false,
  "recv_cnt": 0,
  "proto_name": "null",
  "ip_address": "0.0.0.0",
  "send_cnt": 0,
  "awaiting_rel": 0,
  "max_subscriptions": 0,
  "inflight": 0,
  "connected": false,
  "node": "null",
  "recv_oct": 0,
  "port": 0,
  "recv_pkt": 0,
  "send_oct": 0,
  "expiry_interval": 0,
  "send_pkt": 0,
  "max_awaiting_rel": 0,
  "clean_start": false,
  "username": "null"
}
</script>

<style scoped>

</style>
