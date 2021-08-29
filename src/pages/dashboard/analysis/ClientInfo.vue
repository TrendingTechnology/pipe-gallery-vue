<template>
  <div>
    <a-row style="margin-top: 0" :gutter="[24, 24]">
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="在线设备" :total="1">
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend style="margin-right: 16px" :term="$t('wow')" :percent="12" :is-increase="true" :scale="0" />
            <trend :term="$t('dod')" :target="100" :value="89" :scale="0" />
          </div>
          <div slot="footer">在线设备数量可以超过已添加设备数量</div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="已添加设备" :total="emqClientsInfo.length">
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-area />
          </div>

        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" :title="$t('payments')" total="￥ 189,345">
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar />
          </div>
          <div slot="footer">{{$t('conversion')}} <span>60%</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" :title="$t('operating')" total="73%">
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-progress target="90" percent="78" color="#13C2C2" height="8px"/>
          </div>
          <div slot="footer" style="white-space: nowrap;overflow: hidden">
            <trend style="margin-right: 16px" :term="$t('wow')" :percent="12" :is-increase="true" :scale="0" />
            <trend :term="$t('dod')" :target="100" :value="89" :scale="0" />
          </div>
        </chart-card>
      </a-col>
    </a-row>

      <a-table :columns="columns,pagination" :data-source="emqClientsInfo" size="middle"
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
            <span v-else>{{text}}</span>
          </template>

        </template>

      </a-table>








  </div>
</template>

<script>
import ChartCard from '../../../components/card/ChartCard'
import MiniArea from '../../../components/chart/MiniArea'
import MiniBar from '../../../components/chart/MiniBar'
import MiniProgress from '../../../components/chart/MiniProgress'
import Bar from '../../../components/chart/Bar'
import RankingList from '../../../components/chart/RankingList'
import HotSearch from './HotSearch'
import SalesData from './SalesData'
import Trend from '../../../components/chart/Trend'

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
for (let i = 0; i < 8; i++) {
  rankList.push({
    name: '桃源村' + i + '号店',
    total: 1234.56 - i * 100
  })
}

export default {
  name: 'ClientInfo',
  props:{
    emqClientsInfo: {
      type: Array,
      default:()=>[]
    }
  },
  i18n: require('./i18n'),
  data () {

    return {
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
  },
  created() {
    setTimeout(() => this.loading = !this.loading, 1000)
  },
  mounted() {
    this.emqClientsInfo[0].connected = false;
  },
  components: {Trend, SalesData, HotSearch, RankingList, Bar, MiniProgress, MiniBar, MiniArea, ChartCard}
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

</style>
