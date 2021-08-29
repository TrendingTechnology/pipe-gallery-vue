<template>
  <div style="margin-top: 15px;background-color: white;width:100%;">
    <div style="height:7px"></div>
  <a-table :data-source="data" :columns="columns , pagination" style="width:98%;margin: auto;background-color:white">
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
      <a-range-picker :autoFocus="true"
                      :show-time="{ format: 'HH:mm:ss',
                      allowClear:true}"
                      format="YYYY-MM-DD HH:mm:ss"
                      v-model:value(v-model)="dateRange"
                      @ok="handleOk"
                      @panelChange="handleDateReset"
      />
      <a-button shape="circle" icon="sync" size="small" style="margin-left: 6px;" @click="handleDateReset"/>
      <!--        <a-icon type="sync" style="margin-left: 6px;"/>-->

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
        {{ column.dataIndex === 'loginTime' ? text.replace("T", ' ') : text }}
        <!--        {{record.loginTime}}-->
      </template>
    </template>
  </a-table>
    </div>
</template>
<script>
import {getLogInfo, getLogInfoByDate} from "@/services/user";
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
    onFilter: (value, record) => {
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
    align: "center",
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
      filterIcon: 'calendarIco',
      customRender: 'customRender',
    },

  },
];


var vm = this;

export default {
  data() {
    return {
      data:[],
      columns,
      pagination: {
        pageSize: 8,
        showQuickJumper: true,
        hideOnSinglePage: true,
        size: 'small'
      },
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      dateRange: null,
      beginDate: '123',
      endDate: '',
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
    handleDateChange() {
      let beginDate = this.dateRange[0].format();
      let endDate = this.dateRange[1].format();
      let vm = this;
      getLogInfoByDate(beginDate, endDate).then(res => {
        if (res.data.code === 200) {

          vm.data = res.data.data;
        } else {
          this.$message.error('获取用户登录日志失败！', 3)
        }
      })
    },
    handleOk() {
      this.handleDateChange()
    },
    handleDateReset() {
      this.dateRange = null
      this.loadData()
    },
    loadData() {
      const vm = this;
      getLogInfo().then(res => {
            if (res.data.code === 200) {
              vm.data = res.data.data;
            } else {
              this.$message.error('获取用户登录日志失败！', 3)
            }
          }
      )
    }
  },
  computed: {
  },
  beforeMount() {
    this.loadData()

  }

}
;
</script>
<style scoped>

</style>
