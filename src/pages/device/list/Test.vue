<template>
  <a-card style="margin-top: 14px">
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" :form="form" @submit="handleSubmit">
        <div :class="advanced ? null: 'fold'">
          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-item
                  label="仓端名"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input placeholder="请输入"
                         v-decorator="['condition.wsName']"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                  label="节点名"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input style="width: 100%" placeholder="请输入"
                         v-decorator="['condition.node']"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                  label="开关(开)"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-select placeholder="请选择" v-decorator="['condition.sw']">
                  <a-select-option value="all">全部</a-select-option>
                  <a-select-option value="smoke">烟感</a-select-option>
                  <a-select-option value="light">照明</a-select-option>
                  <a-select-option value="waterpump">水泵</a-select-option>
                  <a-select-option value="fan">风机</a-select-option>
                  <a-select-option value="infra">红外</a-select-option>
                  <a-select-option value="guard">门禁</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item
                  label="测量值"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-select placeholder="请选择" v-decorator="['condition.measure']">
                  <a-select-option value="temp">温度</a-select-option>
                  <a-select-option value="humi">湿度</a-select-option>
                  <a-select-option value="llv">液位值</a-select-option>
                  <a-select-option value="gas">可燃气体</a-select-option>
                  <a-select-option value="O2">氧气</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                  label="起始值"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input-number style="width: 100%" placeholder="请输入" v-decorator="['condition.start']"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                  label="终值"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input-number style="width: 100%" placeholder="请输入" v-decorator="['condition.end']"/>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" htmlType="submit">查询</a-button>
          <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
          <!--          <a-dropdown style="margin-left: 8px;">-->
          <!--           <a-menu slot="overlay" @click="handleMenuClick">-->
          <!--             <a-menu-item key="0">-->
          <!--               全 关-->
          <!--             </a-menu-item>-->
          <!--             <a-menu-item key="1">-->
          <!--               全 开-->
          <!--             </a-menu-item>-->
          <!--           </a-menu>-->
          <!--          <a-button >操作<a-icon type="down" /></a-button>-->
          <!--        </a-dropdown>-->

        </span>
        <span style="float: left; margin-top: 3px;">
           <a-button type="primary" @click="handleQuery">询问</a-button>
           <a-modal
               :visible="isVisible"
               @cancel="handleQueryCancel"
               @ok="handleQueryOk"
               width="800px"
               title="询问条件"
           >

             <a-form class="ant-advanced-search-form"  >
      <a-row :gutter="24">
        <a-col
            :span="12"
        >
          <a-form-item label="仓端名">
            <a-input
                placeholder="请输入仓端名"
                v-model="query.wsName"
            />
          </a-form-item>
        </a-col>
         <a-col
             :span="12"
         >
          <a-form-item label="节点名 ">
            <a-input
                placeholder="请输入节点名"
                v-model="query.node"
            />
          </a-form-item>
        </a-col>
      </a-row>
               <a-row :gutter="24">
<a-form-item label="查询选项" >
<div style="margin-top: 10px"> </div>
  <a-checkbox-group  v-model:value="query.options">

    <a-col :span="6">
        <a-checkbox value="deviceTemp" >
         温度
        </a-checkbox>
    </a-col>
    <a-col :span="6">
        <a-checkbox value="deviceHumi" name="type">
          湿度
        </a-checkbox>
       </a-col>
    <a-col :span="6">
        <a-checkbox value="deviceLlv" name="type">
          液位值
        </a-checkbox>
       </a-col>
    <a-col :span="6">
    <a-checkbox value="deviceGas" name="type">
          可燃气体
        </a-checkbox>
       </a-col>
    <a-col :span="6">
    <a-checkbox value="deviceO2" name="type">
          氧气
        </a-checkbox>
       </a-col>
    <a-col :span="6">
    <a-checkbox value="deviceSmoke" name="type">
          烟感
        </a-checkbox>
       </a-col>
    <a-col :span="6">
    <a-checkbox value="deviceLighting" name="type">
          照明
        </a-checkbox>
       </a-col>
    <a-col :span="6">
    <a-checkbox value="deviceWaterpump" name="type">
          水泵
        </a-checkbox>
       </a-col>
    <a-col :span="6">
    <a-checkbox value="deviceFan" name="type">
          风机
        </a-checkbox>
       </a-col>
    <a-col :span="6">
    <a-checkbox value="deviceInfra" name="type">
          红外
        </a-checkbox>
       </a-col>
    <a-col :span="6">
    <a-checkbox value="deviceGuard" name="type">
          门禁
        </a-checkbox>
    </a-col>

      </a-checkbox-group>
</a-form-item>

               </a-row>

    </a-form>
           </a-modal>

        </span>

      </a-form>

    </div>
    <div class="ant-pro-table-wrapper">

      <a-table
          :columns="columns"
          :dataSource="dataSource"
          :scroll="{ x: true }"
      >
        <div slot="switch" slot-scope="text, record, index, column">
          <a-switch checked-children="开" un-checked-children="关" size="small"
                    :checked="text===1||text===true" @click="switchClicked(record.key,column.dataIndex)"/>
        </div>
        <div slot="node" slot-scope="text, record">
          <router-link tag="a" :to="{path:'/device/detail',query:{wsName:record.wsName,node:text}}">{{ text }}
          </router-link>
        </div>
        <div slot="status" slot-scope="text, record, index, column">
          <span v-if="text===1">
            <span style="color:green">在线</span>
          </span>
          <span v-else>
            <span style="color:red">离线</span>
          </span>
        </div>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
import {getDCurrentInfo, letQuery, letStateChange} from "@/services/device";

const columns = [
  {
    title: 'id',
    dataIndex: 'wsId',
    align: 'center',
  },
  {
    title: '仓端名',
    dataIndex: 'wsName',
    align: 'center',
  },
  {
    title: '节点',
    dataIndex: 'node',
    align: 'center',
    scopedSlots: {customRender: 'node'}
  }, {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: {customRender: 'status'}
  },
  {
    title: '温度',
    dataIndex: 'deviceTemp',
    sorter: (a, b) => a.deviceTemp - b.deviceTemp,
    align: 'center',
    slots: {title: 'statusTitle'},
    customRender: (text) => text + ' ℃'
  },
  {
    title: '湿度',
    dataIndex: 'deviceHumi',
    sorter: (a, b) => a.deviceHumi - b.deviceHumi,
    align: 'center',
    slots: {title: 'statusTitle'},
    customRender: (text) => text + ' %RH'
  },
  {
    title: '液位值',
    dataIndex: 'deviceLlv',
    sorter: (a, b) => a.deviceLlv - b.deviceLlv,
    align: 'center',
    customRender: (text) => text + ' 米'
  },
  {
    title: '可燃气体',
    dataIndex: 'deviceGas',
    sorter: (a, b) => a.deviceGas - b.deviceGas,
    align: 'center',
    customRender: (text) => text + ' %RH'
  },
  {
    title: '氧气',
    dataIndex: 'deviceO2',
    sorter: (a, b) => a.deviceO2 - b.deviceO2,
    align: 'center',
    customRender: (text) => text + ' %'
  },
  {
    title: '烟感',
    dataIndex: 'deviceSmoke',
    align: 'center',
    sorter: (a, b) => a.deviceSmoke - b.deviceSmoke,
    scopedSlots: {customRender: 'switch'}
  },
  {
    title: '照明',
    dataIndex: 'deviceLighting',
    align: 'center',
    sorter: (a, b) => a.deviceLighting - b.deviceLighting,
    scopedSlots: {customRender: 'switch'}
  },
  {
    title: '水泵',
    dataIndex: 'deviceWaterpump',
    align: 'center',
    sorter: (a, b) => a.deviceWaterpump - b.deviceWaterpump,
    scopedSlots: {customRender: 'switch'}
  },
  {
    title: '风机',
    dataIndex: 'deviceFan',
    align: 'center',
    sorter: (a, b) => a.deviceFan - b.deviceFan,
    scopedSlots: {customRender: 'switch'}
  },
  {
    title: '红外',
    dataIndex: 'deviceInfra',
    align: 'center',
    sorter: (a, b) => a.deviceInfra - b.deviceInfra,
    scopedSlots: {customRender: 'switch'}
  },
  {
    title: '门禁',
    dataIndex: 'deviceGuard',
    align: 'center',
    sorter: (a, b) => a.deviceGuard - b.deviceGuard,
    scopedSlots: {customRender: 'switch'}
  }
]

export default {
  name: 'Test',
  components: {StandardTable},
  data() {
    return {
      query: {


      },
      isVisible: false,
      advanced: true,
      columns: columns,
      dataSource: [],
      selectedRows: [],
      queryDevice: {},
      form: this.$form.createForm(this),
    }
  },
  authorize: {
    deleteRecord: 'delete'
  },
  methods: {
    handleQuery() {
      this.isVisible = true
    },
    handleQueryCancel() {
      this.isVisible = false
    },
    handleQueryOk(){
     letQuery(this.query).then(res => {
       if (res.data.code === 500) {
         this.$message.error(res.data.data)
       }
       if (res.data.code === 200) {

         this.$message.success(res.data.data)
       }
     })
    },
    handleReset() {
      this.form.resetFields();
      this.queryDevice = {}
      this.loadData()
    },
    handleSubmit(e) {
      let condition = this.form.getFieldValue('condition');
      if (condition === null) {
        condition = {}
      }
      this.queryDevice = condition;
      this.loadData()
    },
    switchClicked(index, dataIndex) {
      let temp = this.dataSource[index][dataIndex]
      this.dataSource[index].changeSw = dataIndex;
      if (temp === 1) {
        this.dataSource[index][dataIndex] = 0
        this.dataSource[index].changeValue = 0
      } else {
        this.dataSource[index][dataIndex] = 1
        this.dataSource[index].changeValue = 1
      }
      letStateChange(this.dataSource[index])
          .then(res => {
            if (res.data.code === 500) {
              console.log(res.data);
              this.$message.error(res.data.data)
            }
          })
      console.log(this.dataSource);
    },
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.key !== key)
      this.selectedRows = this.selectedRows.filter(item => item.key !== key)
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
      console.log(this.advanced);
    },
    remove() {
      this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
      this.selectedRows = []
    },
    handleMenuClick(e) {

      this.dataSource.forEach((value) => {
        let sw = Number(e.key);
        value.deviceSmoke = sw
        value.deviceLighting = sw
        value.deviceWaterpump = sw
        value.deviceFan = sw
        value.deviceInfra = sw
        value.deviceGuard = sw
        letStateChange(value)
      })
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.loadData();
      }, 1000);

    },
    loadData() {
      let vm = this;
      getDCurrentInfo(this.queryDevice).then(res => {
        let data = res.data.data;
        data.filter((item, i) => {
          item.key = i;
        })
        vm.dataSource = data;
      })
    },
  },
  created() {
    this.loadData()
  },
  mounted() {
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.loadData(); // methods中请求数据的方法
      }, 1000);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
}
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}

.fold {
  width: calc(100% - 216px);
  display: inline-block
}

.operator {
  margin-bottom: 18px;
}

@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}

.table {
  overflow: auto;
}
.ant-advanced-search-form .ant-form-item {
  display: flex;
}
</style>
