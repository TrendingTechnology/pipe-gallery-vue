<template>
  <a-table :data-source="data" :columns="columns,pagination" >
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
    <div
        slot="filterByCal"
        slot-scope="{ beginDate,endDate }"
        style="padding: 8px"

        >
      <a-range-picker :allowClear="true"
                      :autoFocus="true"
                      :show-time="{ format: 'HH:mm:ss' }"
                      :value="dateRange"
                      format="YYYY-MM-DD HH:mm:ss"
                      @change="() => handleOk(this.beginDate,endDate)"/>
    </div>
    <a-icon
        slot="calendarIco"
        slot-scope="filtered"
        type="calendar"
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
        {{ column.dataIndex==='loginTime'?text.replace("T",' '):text }}
<!--        {{record.loginTime}}-->
      </template>
    </template>
  </a-table>
</template>
<script>
import {getLogInfo} from "@/services/user";
import moment from 'moment'
import 'moment/locale/zh-cn';
const columns = [
  {
    title: '访问编号',
    dataIndex: 'infoId',
    sorter: (a, b) => a.infoId - b.infoId,
    defaultSortOrder: "descend"
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    key: 'userAccount',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) =>
        record.userAccount
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        });
      }
    },
  },
  {
    title: '用户名称',
    dataIndex: 'userNickName',
    key: 'userNickName',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) =>
        record.userNickName
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        });
      }
    },
  },
  {
    title: 'IP地址',
    dataIndex: 'ipaddr',
    key: 'ipaddr',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) =>
        record.ipaddr
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        });
      }
    },
  },
  {
    title: '登录地点',
    dataIndex: 'loginLocation',
    key: 'loginLocation',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) =>{
      console.log(record);
      record.loginLocation
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        });
      }
    },
  },
  {
    title: '浏览器类型',
    dataIndex: 'browser',
    key: 'browser',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) =>
        record.browser
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        });
      }
    },
  },
  {
    title: '操作系统',
    dataIndex: 'os',
    key: 'os',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    align:"center",
    onFilter: (value, record) =>
        record.os
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        });
      }
    },
  },
  {
    title: '提示消息',
    dataIndex: 'msg',
    key: 'msg',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) =>
        record.msg
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        });
      }
    },
  },
  {
    title: '访问时间',
    dataIndex: 'loginTime',
    key: 'loginTime',
    scopedSlots: {
      filterDropdown: 'filterByCal',
      filterIcon: 'calendarIco'
    },

  },
];




export default {
  data() {
    return {
      data:[],
      columns,
      pagination:{
        pageSize:9,
        showQuickJumper:true
      },
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      beginDate:'123',
      endDate:'',
      dateRange:[],
      moment
    };
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
    handleOk( beginDate,endDate) {
      console.log(beginDate);
      console.log(beginDate.format('YYYY-MM-DD HH:mm:ss'));
      console.log(this.beginDate);
      this.beginDate = beginDate.format('YYYY-MM-DD HH:mm:ss')
      console.log(this.beginDate);
      this.endDate = endDate.format('YYYY-MM-DD HH:mm:ss')
      var vm=this;
      getLogInfo(this.beginDate,this.endDate).then(res=>{
        if(res.data.code === 200){
          vm.data=res.data.data;
        }else{
          this.$message.error('获取用户登录日志失败！', 3)
        }
      })
    },
  },
  computed:{
    loadData: function() {
      var vm=this;
      getLogInfo(this.beginDate,this.endDate).then(res=>{
        if(res.data.code === 200){
          vm.data=res.data.data;
        }else{
          this.$message.error('获取用户登录日志失败！', 3)
        }
      })
    },

  },
  beforeMount() {
    this.loadData
    // this.nowTime=[moment(),moment()]
  }

};
</script>
<style scoped>

</style>
