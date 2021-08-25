<template>
  <a-table :data-source="data" :columns="columns" >
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
        {{ text }}
      </template>
    </template>
  </a-table>
</template>

<script>
const data = [];
import {getLogInfo} from '@/services/user'
export default {
  name: "Login",
  data() {
    return {
      data,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      filteredInfo: null,
      sortedInfo: null,
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
    loadData() {
      var vm=this;
      getLogInfo().then(res=>{
        if(res.data.code == 200){
          console.log(res.data.data);
          vm.data=res.data.data;
        }else{
          this.$message.error('获取用户登录日志失败！', 3)
        }
      })
    }
  },
  computed:{
    columns() {
      let {sortedInfo, filteredInfo} = this;
      sortedInfo = sortedInfo || {};
      filteredInfo = filteredInfo || {};
      const columns= [
        {
          title: '访问编号',
          dataIndex: 'infoId',
          key: 'infoId',
          sorter: (a, b) => a.age - b.age,
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
          filters: [
            { text: '内网', value: '内网' },
            { text: '外网', value: '外网' },
          ],
          filteredValue: filteredInfo.loginLocation || null,
          onFilter: (value, record) => record.loginLocation.indexOf(value) === 0,
          ellipsis: true,
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
          title: '登录状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.status
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
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.loginTime
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
      ];
      return columns;
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
