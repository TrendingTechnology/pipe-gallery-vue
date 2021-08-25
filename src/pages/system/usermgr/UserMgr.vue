<template>
    <div class="usergmr">
        <a-card class="searchCard">
            <a-divider type="horizontal"/>
            <a-button type="primary" @click="showAddModal">添加</a-button>
        </a-card>
        <a-table
                :columns="columns"
                rowKey="userId"
                :data-source="tableData"
                bordered
                style="background-color: white"
                size="small"
        >
            <span slot="userState" slot-scope="text" :style="{color:text === 1 ? 'green' : 'red'}">
                {{text === 1 ? '有效' : '已禁用'}}
            </span>
            <span slot="action" slot-scope="record">
                <a-popconfirm
                        title="确定删除该用户?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="del(record)"
                >
                    <a-button type="danger" size="small" :disabled="record.userDelFlag == 0">
                      {{record.userDelFlag == 0 ? '已删除' : '删除'}}
                    </a-button>
                </a-popconfirm>
                <a-divider type="vertical"/>
                <a-button type="primary" @click="update(record)" size="small">
                    修改
                </a-button>
                 <a-divider type="vertical"/>
                <a-button  @click="setRole(record)" size="small">
                    设置角色
                </a-button>
            </span>
        </a-table>
        <Add v-bind:visible="addModalVisible" v-if="addModalVisible"></Add>
        <div v-if="updateModalVisible">
            <Update v-bind:visible="updateModalVisible" v-bind:data="upData" v-if="updateModalVisible"></Update>
        </div>
        <div v-if="setRoleModalVisible">
            <SetRole v-bind:visible="setRoleModalVisible" v-bind:data="setRoleData" v-if="setRoleModalVisible"></SetRole>
        </div>
    </div>
</template>

<script>
    const columns = [
        {
            title: '用户账号',
            dataIndex: 'userAccount',
            key: 'userAccount',
        },
        {
            title: '真实姓名',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '用户描述',
            dataIndex: 'userDesc',
            key: 'userDesc',
        },
        {
            title: '创建时间',
            dataIndex: 'userCreatetime',
            key: 'userCreatetime',
        },
        {
            title: '修改时间',
            dataIndex: 'userUpdateTime',
            key: 'userUpdateTime',
        },
        {
            title: '是否有效',
            dataIndex: 'userState',
            key: 'userState',
            align: 'center',
            scopedSlots: {customRender: 'userState'},
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            scopedSlots: {customRender: 'action'},
        },

    ];
    import {getUserList, delUser} from "@/services/system/userMgr";
    import Add from "./Add";
    import Update from "./Update";
    import SetRole from "./SetRole";

    export default {
        name: "UserMgr",
        components: {Add, Update,SetRole},
        data() {
            return {
                columns,
                tableData: [],
                addModalVisible: false,
                updateModalVisible: false,
                setRoleModalVisible: false,
                upData: [],
                setRoleData: [],
            }
        },
        mounted() {
            this.getList()
        },
        authorize: {              //权限校验注入设置
            getList: {
                check: 'user',
                type:'permission'
            },
            showAddModal: {
                check: 'user:add',
                type:'permission'
            },
            update: {
                check: 'user:edit',
                type:'permission'
            },
            del: {
                check: 'user:delete',
                type:'permission'
            },
            setRole: {
                check: 'user:role',
                type:'permission'
            }
        },
        methods: {
            getList() {
                getUserList().then(res => {
                  if (res.data.code == 200) {
                        this.tableData = res.data.data
                    } else {
                        this.$message.error("获取用户数据失败", 2)
                    }
                })
            },
            del(rec) {
                delUser(rec).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success("删除成功！", 2)
                    } else {
                        this.$message.error("系统错误！", 2)
                    }
                    this.getList()
                })
            },
            update(rec) {
                this.upData = rec
                this.updateModalVisible = true
            },
            cancelUpdateModal() {
                this.updateModalVisible = false
            },
            showAddModal() {
                this.addModalVisible = true
            },
            cancelAddModal() {
                this.addModalVisible = false
            },
            setRole(rec){
                this.setRoleData = rec
                this.setRoleModalVisible = true
            },
            cancelSetRoleModal(){
                this.setRoleModalVisible = false
            }
        }
    }
</script>

<style scoped>
    .usergmr {
        height: 100%;
        margin-top: 10px;
    }
</style>
