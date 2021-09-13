<template>
  <a-card style="margin-top: 14px">
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" :form="form">
        <div :class="advanced ? null: 'fold'">
          <a-row >
            <a-col :md="8" :sm="24" >
              <a-form-item
                  label="仓端名"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                  label="节点名"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input-number style="width: 100%" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                  label="开关"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-select placeholder="请选择">
                  <a-select-option value="1">全部</a-select-option>
                  <a-select-option value="2">烟感</a-select-option>
                  <a-select-option value="3">照明</a-select-option>
                  <a-select-option value="4">水泵</a-select-option>
                  <a-select-option value="5">风机</a-select-option>
                  <a-select-option value="6">红外</a-select-option>
                  <a-select-option value="7">门禁</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

          </a-row>
          <a-row v-if="advanced">
            <a-col :md="8" :sm="24" >
              <a-form-item
                  label="测量值"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-select placeholder="请选择">
                  <a-select-option value="1">温度</a-select-option>
                  <a-select-option value="2">湿度</a-select-option>
                  <a-select-option value="3">液位值</a-select-option>
                  <a-select-option value="4">可燃气体</a-select-option>
                  <a-select-option value="5">氧气</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                  label="起始值"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                  label="终值"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>
          <a-dropdown style="margin-left: 8px;">
           <a-menu slot="overlay" @click="handleMenuClick">
             <a-menu-item key="1">
               全 开
             </a-menu-item>
             <a-menu-item key="2">
               全 关
             </a-menu-item>
           </a-menu>
          <a-button >操作<a-icon type="down" /></a-button>
        </a-dropdown>

          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{advanced ? '收起' : '展开'}}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </span>
      </a-form>

    </div>
    <div  class="ant-pro-table-wrapper">
      <a-table
          :columns="columns"
          :dataSource="dataSource"
          @clear="onClear"
          @change="onChange"
          @selectedRowChange="onSelectChange"
          :scroll="{ x: true }"
      >
        <div slot="switch" slot-scope="text, record, index, column">
<!--          {{record.key}}-->
<!--          {{index}}-->
          <a-switch checked-children="开" un-checked-children="关" size="small"
                    :checked="text===1||text===true" @click="switchClicked(record.key,column.dataIndex)"/>
        </div>
        <div slot="node" slot-scope="text, record">
          <router-link to="page">{{text}}</router-link>
        </div>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
import {getDCurrentInfo, letStateChange, stateChange} from "@/services/device";

const columns = [
  {
    title: 'id',
    dataIndex: 'wsId',
    align:'center',
  },
  {
    title: '仓端名',
    dataIndex: 'wsName',
    align:'center',
  },
  {
    title: '节点',
    dataIndex: 'node',
    align:'center',
    scopedSlots: { customRender: 'node' }
  },
  {
    title: '温度',
    dataIndex: 'deviceTemp',
    sorter: (a, b) => a.deviceTemp - b.deviceTemp,
    align:'center',
    slots: {title: 'statusTitle'},
    customRender: (text) => text +' ℃'
  },
  {
    title: '湿度',
    dataIndex: 'deviceHumi',
    sorter: (a, b) => a.deviceHumi - b.deviceHumi,
    align:'center',
    slots: {title: 'statusTitle'},
    customRender: (text) => text +' %RH'
  },
  {
    title: '液位值',
    dataIndex: 'deviceLlv',
    sorter: (a, b) => a.deviceLlv - b.deviceLlv,
    align:'center',
    customRender: (text) => text +' 米'
  },
  {
    title: '可燃气体',
    dataIndex: 'deviceGas',
    sorter: (a, b) => a.deviceGas - b.deviceGas,
    align:'center',
    customRender: (text) => text +' %RH'
  },
  {
    title: '氧气',
    dataIndex: 'deviceO2',
    sorter: (a, b) => a.deviceO2 - b.deviceO2,
    align:'center',
    customRender: (text) => text +' %'
  },
  {
    title: '烟感',
    dataIndex: 'deviceSmoke',
    align:'center',
    sorter: (a, b) => a.deviceSmoke - b.deviceSmoke,
    scopedSlots: { customRender: 'switch' }
  },
  {
    title: '照明',
    dataIndex: 'deviceLighting',
    align:'center',
    sorter: (a, b) => a.deviceLighting - b.deviceLighting,
    scopedSlots: { customRender: 'switch' }
  },
  {
    title: '水泵',
    dataIndex: 'deviceWaterpump',
    align:'center',
    sorter: (a, b) => a.deviceWaterpump - b.deviceWaterpump,
    scopedSlots: { customRender: 'switch' }
  },
  {
    title: '风机',
    dataIndex: 'deviceFan',
    align:'center',
    sorter: (a, b) => a.deviceFan - b.deviceFan,
    scopedSlots: { customRender: 'switch' }
  },
  {
    title: '红外',
    dataIndex: 'deviceInfra',
    align:'center',
    sorter: (a, b) => a.deviceInfra - b.deviceInfra,
    scopedSlots: { customRender: 'switch' }
  },
  {
    title: '门禁',
    dataIndex: 'deviceGuard',
    align:'center',
    sorter: (a, b) => a.deviceGuard - b.deviceGuard,
    scopedSlots: { customRender: 'switch' }
  }
]

export default {
  name: 'Test',
  components: {StandardTable},
  data () {
    return {
      advanced: true,
      columns: columns,
      dataSource: [],
      selectedRows: []
    }
  },
  authorize: {
    deleteRecord: 'delete'
  },
  methods: {
    switchClicked(index,dataIndex){
      let temp=this.dataSource[index][dataIndex]
      if (temp===1){
        this.dataSource[index][dataIndex]=0
      }else{
        this.dataSource[index][dataIndex]=1
      }
      letStateChange(this.dataSource[index])
      console.log(this.dataSource);
    },
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.key !== key)
      this.selectedRows = this.selectedRows.filter(item => item.key !== key)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    remove () {
      this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
      this.selectedRows = []
    },
    onClear() {
      this.$message.info('您清空了勾选的所有行')
    },
    onStatusTitleClick() {
      this.$message.info('你点击了状态栏表头')
    },
    onChange() {
      this.$message.info('表格状态改变了')
    },
    onSelectChange() {
      this.$message.info('选中行改变了')
    },
    addNew () {
      this.dataSource.unshift({
        key: this.dataSource.length,
        no: 'NO ' + this.dataSource.length,
        description: '这是一段描述',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: '2018-07-26'
      })
    },
    handleMenuClick (e) {
      if (e.key==='1'){

      }else{

      }

    },
    loadData (){
      let vm = this;
      getDCurrentInfo().then(res => {
        let data=res.data.data;
        data.filter((item,i) =>{item.key = i;})
        vm.dataSource=data;
      })
    },
  },
  created () {
    this.loadData()
  },
  // mounted() {
  //   if (this.timer) {
  //     clearInterval(this.timer);
  //   } else {
  //     this.timer = setInterval(() => {
  //       this.loadData(); // methods中请求数据的方法
  //     }, 3000);
  //   }
  // },
  destroyed() {
    clearInterval(this.timer);
  }
}
</script>

<style lang="less" scoped>
.search{
  margin-bottom: 54px;
}
.fold{
  width: calc(100% - 216px);
  display: inline-block
}
.operator{
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
.table {
  overflow: auto;}

</style>
