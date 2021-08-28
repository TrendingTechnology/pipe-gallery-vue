<template>

    <a-row style="margin-top: 0" :gutter="[24, 24]">
      <a-col :sm="24" :md="12" :xl="6" style="width:100%">
        <a-card title="状态" :bordered="true" style="width: 100%">
          <a-space :size="50">
            <span>
              <div style="color:rgb(153, 153, 153);text-align:center;font-size: 16px;margin-bottom: 7px">负载状态</div>
              <a-tooltip autoAdjustOverflow>
                <template slot="title">
                  <span style="font-size:10px">
                    <span v-if="data.load.one">最近1分钟平均负载:  {{ data.load.one }}</span><br/>
                  <span>最近5分钟平均负载:   {{ data.load.five }}</span>  <br/>
                  <span>最近15分钟平均负载:   {{ data.load.fifteen }}</span><br/>
                  <span>user: {{ data.cpu_times.user }}</span><br/>
                  <span>system: {{ data.cpu_times.system }}</span><br/>
                  <span>idle: {{ data.cpu_times.idle }}</span><br/>
                  <span>iowait: {{ data.cpu_times.iowait }}</span><br/>
                  <span>irq: {{ data.cpu_times.irq }}</span><br/>
                  <span>softirq: {{ data.cpu_times.softirq }}</span><br/>
                  <span>steal: {{ data.cpu_times.steal }}</span><br/>
                  <span>guest: {{ data.cpu_times.guest }}</span><br/>
                  <span>总进程数: {{ data.cpu_times.总进程数 }}</span><br/>
                  <span>活动进程数: {{ data.cpu_times.活动进程数 }}</span>
                  </span>

                </template>

              <a-progress type="circle" :percent="(per=data.load.one*100).toFixed(0)"
                          :strokeColor="per<90?'rgb(32, 165, 58)':'rgb(221, 47, 0)'" :width="115"
                          :strokeWidth="7">
              <template #format="percent">
                <span
                    :style="{color: percent<90?'rgb(32, 165, 58)':'rgb(221, 47, 0)',fontSize:'17px',textAlign:'center'}">{{
                    percent
                  }}%</span>
              </template>
            </a-progress>
              </a-tooltip>
            <div
                style="color:rgb(153, 153, 153);text-align:center;font-size: 16px;margin-top: 7px">{{
                data.load.one > 0.9 ? '运行堵塞' : '运行流畅'
              }}</div>
            </span>


            <span>
              <div style="color:rgb(153, 153, 153);text-align:center;font-size: 16px;margin-bottom: 7px">CPU使用率</div>
              <a-tooltip autoAdjustOverflow>
                <template slot="title">
                  <span style="font-size:10px">
                  <span>{{ data.cpu[3] }}</span><br/>
                    <span>{{ data.cpu[5] }}个物理CPU，{{ data.cpu[4] }}个物理核心，{{ data.cpu[1] }}个逻辑核心</span><br/>
                    <span v-for=" (cpu ,i) in data.cpu[2]">
                      <span>CPU-{{ i + 1 }}:    {{ cpu }}% &nbsp;</span>
                      <span v-if="i%2===1"><br/></span>
                      <span v-if="i%2===0"> &nbsp;| &nbsp;</span>
                    </span>

                  </span>

                </template>
            <a-progress type="circle" :percent="per=data.cpu[0]"
                        :strokeColor="per<90?'rgb(32, 165, 58)':'rgb(221, 47, 0)'" :width="115"
                        :strokeWidth="7">
              <template #format="percent">
                <span
                    :style="{color: percent<90?'rgb(32, 165, 58)':'rgb(221, 47, 0)',fontSize:'17px',textAlign:'center'}">{{
                    percent
                  }}%</span>
              </template>
            </a-progress>
              </a-tooltip>
              <div style="color:rgb(153, 153, 153);text-align:center;font-size: 16px;margin-top: 7px">{{ data.cpu[4] }} 核心</div>
              </span>


            <span>
              <div style="color:rgb(153, 153, 153);text-align:center;font-size: 16px;margin-bottom: 7px">内存使用率</div>
            <a-progress type="circle" :percent="per=((data.mem.memRealUsed/data.mem.memTotal)*100).toFixed(1)"
                        :strokeColor="per<90?'rgb(32, 165, 58)':'rgb(221, 47, 0)'" :width="115" :strokeWidth="7">
            <template #format="percent">
              <span
                  :style="{color: percent<90?'rgb(32, 165, 58)':'rgb(221, 47, 0)',fontSize:'17px',textAlign:'center'}">{{
                  percent
                }}%</span>
            </template>
          </a-progress>
              <div
                  style="color:rgb(153, 153, 153);text-align:center;font-size: 16px;margin-top: 7px">{{
                  data.mem.memRealUsed
                }}/{{ data.mem.memTotal }}(MB)</div>
            </span>
            <span v-for="hardDiskInfo in data.disk">
              <div
                  style="color:rgb(153, 153, 153);text-align:center;font-size: 16px;margin-bottom: 7px">{{
                  hardDiskInfo.path
                }}</div>
              <a-tooltip autoAdjustOverflow>
                <template slot="title">
                  <span style="font-size:10px">
                  <span>基础信息</span><br/>
                    <span>文件系统: {{ hardDiskInfo.filesystem }}</span><br/>
                    <span>类型: {{ hardDiskInfo.type }}</span><br/>
                    <span>挂载点: {{ hardDiskInfo.path }}</span><br/>
                    <span>Inode信息:</span><br/>
                    <span>总数: {{ hardDiskInfo.inodes[0] }}</span><br/>
                    <span>已用: {{ hardDiskInfo.inodes[1] }}</span><br/>
                    <span>可用: {{ hardDiskInfo.inodes[2] }}</span><br/>
                    <span>inode使用率: {{ hardDiskInfo.inodes[3] }}</span><br/>
                    <span>容量信息</span><br/>
                    <span>容量: {{ hardDiskInfo.size[0] }}</span><br/>
                    <span>已用: {{ hardDiskInfo.size[1] }}</span><br/>
                    <span>可用: {{ hardDiskInfo.size[2] }}</span><br/>
                    <span>使用率： {{ hardDiskInfo.size[3] }}</span><br/>
                  </span>

                </template>
              <a-progress type="circle" :percent="per=hardDiskInfo.size[3].replace('%','')"
                          :strokeColor="per<90?'rgb(32, 165, 58)':'rgb(221, 47, 0)'"
                          :width="115" :strokeWidth="7">
              <template #format="percent">
                <span
                    :style="{color: percent<90?'rgb(32, 165, 58)':'rgb(221, 47, 0)',fontSize:'17px',textAlign:'center'}">{{
                    percent
                  }}%</span>
              </template>
            </a-progress>
              </a-tooltip>
              <div
                  style="color:rgb(153, 153, 153);text-align:center;font-size: 16px;margin-top: 7px">{{
                  hardDiskInfo.size[1]
                }} / {{ hardDiskInfo.size[0] }}</div>
            </span>
            <span>
                  <a-descriptions title="EMQX服务端" layout="vertical" :column="2">
              <a-descriptions-item label="名称">
               {{ brokerData[0].sysdescr }}
              </a-descriptions-item>
              <a-descriptions-item label="运行时间">
                {{ brokerData[0].uptime.replace(/minutes.*/, 'minutes') }}
              </a-descriptions-item>
              <a-descriptions-item label="节点名称">
                {{ brokerData[0].node }}
              </a-descriptions-item>
              <a-descriptions-item label="状态">
                <span :value="isRunning=(brokerData[0].node_status==='Running')">
                  <a-badge status="processing" :text="brokerData[0].node_status"
                           :color="isRunning?'green':'rgb(255,0,0)'"/>
                </span>

              </a-descriptions-item>

            </a-descriptions>
            </span>

          </a-space>
        </a-card>
      </a-col>

    </a-row>


</template>

<script>
import {getBrokerInfo, getSysInfo} from '@/services/analysis'

const data = {
  cpu: [
    100,
    0,
    [
      0,
      0,
      0,
      0
    ],
    "数据加载出错",
    4,
    0
  ],
  cpu_times: {
    idle: 0,
    steal: 0,
    irq: 0,
    总进程数: 0,
    活动进程数: 0,
    nice: 0,
    system: 0,
    guest_nice: 0,
    softirq: 0,
    guest: 0,
    iowait: 0,
    user: 0
  },
  disk: [
    {
      inodes: [
        0,
        0,
        0,
        '0%'
      ],
      type: 'xfs',
      filesystem: "/",
      path: '数据加载出错,请检查网络',
      size: [
        '0G',
        '0G',
        '0G',
        '0%'
      ]
    }
  ],
  load: {
    fifteen: 0,
    one: 1,
    five: 0
  },
  mem: {
    memFree: 0,
    memRealUsed: 0,
    memTotal: 0,
    memBuffers: 0,
    memCached: 0
  }
};
const brokerData = [
  {
    node_status: "Error",
    uptime: "null",
    node: "数据加载出错,请检查网络",
    sysdescr: "数据加载出错,请检查网络"
  }
];


export default {
  name: "SysInfo",
  data() {
    return {
      data,
      brokerData
    };
  },
  methods: {

    loadSysInfo() {
      const vm = this;
      getSysInfo().then(res => {
        if (res.data.code === 200) {
          vm.data = res.data.data;
        } else {
          this.$message.error('获取系统信息失败！', 3)
        }
      })

    },
    loadBrokerInfo() {
      const vm = this;
      getBrokerInfo().then(res => {
        if (res.data.code === 200) {
          vm.brokerData = res.data.data;
        } else {
          this.$message.error('获取EMQ服务端信息失败！', 3)
        }
      })
    }

  },
  created() {
    this.loadSysInfo()
    this.loadBrokerInfo()

  },

  mounted() {
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.loadSysInfo(); // methods中请求数据的方法
        this.loadBrokerInfo()
      }, 3000);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }

}
</script>

<style scoped>

</style>
