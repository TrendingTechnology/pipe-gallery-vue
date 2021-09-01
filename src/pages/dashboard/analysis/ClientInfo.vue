<template>
  <div>
    <a-row style="margin-top: 0" :gutter="[24, 24]">

      <a-col :sm="24" :md="12" :xl="6" >
        <chart-card :loading="loading" title="添加客户端数" total="0" class="count">
          <a-tooltip title="在系统中添加的设备数量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div slot="footer"><span> 通过设备 -> 设备管理处添加设备</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="在线客户端数" :total="dataInfo.emqClientsInfo.length-1" class="count">
          <a-tooltip title="实际在线的设备数量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>

          </div>
          <div slot="footer"> <span>连接EMQX的设备,可大于添加数	</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="消息确认率" :total="((msgSent/msgRev)*100).toFixed(1)+'%'">
          <a-tooltip title="发送的消息是否被确认收到" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <double-line-mess :rev-msg="msgRev" :sent-msg="msgSent" :timeToChange="dataInfo.emqBrokerInfo[0].uptime"></double-line-mess>
          </div>
          <div slot="footer">
            <a-badge color="rgb(115, 182, 195)" :text="'发送: '+msgRev+' 条'" />
            <pre>  </pre>
            <a-badge color="rgb(255, 227, 135)" :text="'收到: '+msgSent+' 条'" />

          </div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="流量" >
          <a-tooltip title="实时网速" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
           <double-line-net :y-axis1="dataInfo.sysInfo.up" :y-axis2="dataInfo.sysInfo.down" ></double-line-net>
          </div>
          <div slot="footer">
            <a-badge color="rgb(115, 182, 195)" :text="'上行: '+dataInfo.sysInfo.down+' KB/s'" />
            <pre> </pre>
            <a-badge color="rgb(255, 227, 135)" :text="'下行: '+dataInfo.sysInfo.up+' KB/s'" />
          </div>
        </chart-card>
      </a-col>
    </a-row>

      <a-table :columns="columns,pagination" :data-source="dataInfo.emqClientsInfo" size="middle"
               style="margin-top: 24px;background-color: white"
               :rowKey="(record,index)=> index"
      >
        <div
            slot="filterDropdown"
            slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
            style="padding: 8px"
        >
          <a-input
              v-ant-ref="c => (searchInput = c)"
              :placeholder="`搜索 ${column.title}`"
              :value="selectedKeys[0]"
              style="width: 188px; margin-bottom: 8px; display: block;"
              @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
              @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
              type="primary"
              icon="search"
              size="small"
              style="width: 90px; margin-right: 8px"
              @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            搜索
          </a-button>
          <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
            重置
          </a-button>
        </div>
        <a-icon
            slot="filterIcon"
            slot-scope="filtered"
            type="search"
            :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <template slot="customRender" slot-scope="text, record, index, column">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
            v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
          >{{ fragment }}</mark
          >
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
          <template v-else>
            <span v-if="column.dataIndex==='connected'">
              <span v-if="text">
              <a-badge status="processing" text="已连接"
                       color="green"/>
            </span>
              <span v-else>
             <a-badge status="processing" text="连接断开"
                      color="red"/>
            </span>
            </span>
            <span v-else>
              <span v-if="column.dataIndex==='clientid'">
                <a @click="showDeviceOverview" :data-index="index">{{text}}</a>
              </span>
              <span v-else>
                {{text}}
              </span>

            </span>
          </template>
        </template>
      </a-table>
    <device-overview v-bind:visible="isVisible" v-if="messagesDevice,isVisible" :device-over="dataInfo.emqClientsInfo"
    :device-index="Number(msessageIndex)"></device-overview>


  </div>
</template>

<script>

const rankList = []
const columns = [
  {
    title: '客户端id',
    dataIndex: 'clientid',
    key: 'clientid',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) =>
        record.clientid
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    },

  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) =>
        record.username
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    },
    align:'center'
  },
  {
    title: 'IP 地址',
    dataIndex: 'ip_address',
    key: 'ip_address',
    align:'center'
  },
  {
    title: '心跳（秒）',
    dataIndex: 'keepalive',
    key: 'keepalive',
    align:'center'
  },
  {
    title: '会话过期间隔（秒）',
    dataIndex: 'expiry_interval',
    key: 'expiry_interval',
    align:'center'
  },
  {
    title: '当前订阅数量',
    dataIndex: 'subscriptions_cnt',
    key: 'subscriptions_cnt',
    align:'center'
  },
  {
    title: '连接状态',
    dataIndex: 'connected',
    key: 'connected',
    align:'center',
    scopedSlots: {
      customRender: 'customRender',
    },
    filters: [
      {
        text: '已连接',
        value: 'true',
      },
      {
        text: '连接断开',
        value: 'false',
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: '会话创建时间',
    dataIndex: 'connected_at',
    key: 'connected_at',
    align:'center'
  },
];
import ChartCard from '../../../components/card/ChartCard'
import DoubleLineMess from "@/pages/dashboard/analysis/DoubleLineMess";
import DoubleLineNet from "@/pages/dashboard/analysis/DoubleLineNet";
import DeviceOverview from "@/pages/dashboard/analysis/DeviceOverview";
export default {
  name: 'ClientInfo',
  components: { ChartCard,DoubleLineMess,DoubleLineNet,DeviceOverview},
  props:{
    dataInfo:{
      type:Object,
      default:()=>{}
    }
  },
  i18n: require('./i18n'),
  data () {
    return {
      msessageIndex: null,
      messagesDevice:null,
      isVisible:false,
      msgRev:null,
      msgSent:null,
      columns ,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      pagination: {
        pageSize: 8,
        showQuickJumper: true,
        hideOnSinglePage: true,
        size: 'small'
      },


      rankList,
      loading: true
    }
  },
  methods: {
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    showDeviceOverview(e){
      this.msessageIndex=e.target.dataset.index
      // this.messagesDevice=this.dataInfo.emqClientsInfo[e.target.dataset.index]
      this.isVisible=true
    },
    cancelshowDeviceOverview(){
      this.isVisible=false
    }
  },
  beforeCreate() {
    this.msgRev=this.dataInfo.emqMetricsInfo[0].metrics['messages.received'],
        this.msgSent=this.dataInfo.emqMetricsInfo[0].metrics['messages.sent']
  },
  created() {
    setTimeout(() => this.loading = !this.loading, 1000)

    // console.log(this.dataInfo);
  },
  watch: {
    dataInfo: {
      immediate:true,
      handler:function(){
      this.msgRev=this.dataInfo.emqMetricsInfo[0].metrics['messages.received'],
      this.msgSent=this.dataInfo.emqMetricsInfo[0].metrics['messages.sent']
    }}

  },
  mounted() {


  },

}
</script>

<style lang="less" scoped>
.extra-wrap{
  .extra-item{
    display: inline-block;
    margin-right: 24px;
    a:not(:first-child){
      margin-left: 24px;
    }
  }
}
@media screen and (max-width: 992px){
  .extra-wrap .extra-item{
    display: none;
  }
}
@media screen and (max-width: 576px){
  .extra-wrap{
    display: none;
  }
}
pre {
  display: inline;
}
.count /deep/ .total{
  overflow: visible;
  font-size: 70px;
  height: 59px;
  margin-top:30px;
  margin-left: 150px;
}
.count /deep/ .chart-card-content{
  height: 0;

}
</style>
