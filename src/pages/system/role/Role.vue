<template>
    <div class="role">
        <a-card class="searchCard">
            <a-divider type="horizontal"/>
            <a-button type="primary" @click="showAddModal">添加</a-button>
        </a-card>
        <a-table
                :columns="columns"
                :data-source="tableData"
                rowKey="roleId"
                bordered
                style="background-color: white"
                size="small"
        >
            <span slot="action" slot-scope="record">
                <a-popconfirm
                        title="确定删除该角色?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="del(record)"
                >
                    <a-button type="danger" size="small">
                      删除
                    </a-button>
                </a-popconfirm>
                <a-divider type="vertical"/>
                <a-button type="primary" @click="update(record)" size="small">
                    修改
                </a-button>
                 <a-divider type="vertical"/>
                <a-button @click="showAuthModal(record)" size="small">
                    权限
                </a-button>
            </span>
            <span slot="roleState" slot-scope="text" :style="{color:text === 1 ? 'green' : 'red'}">
                {{text === 1 ? '有效' : '禁用'}}
            </span>
        </a-table>
        <Add v-bind:visible="addModalVisible" v-if="addModalVisible"></Add>
        <Auth v-bind:visible="authModalVisible" v-bind:data="authData" v-if="authModalVisible"></Auth>
        <Update v-bind:visible="updateModalVisible" v-bind:data="upData" v-if="updateModalVisible"></Update>
    </div>
</template>

<script>

    const columns = [
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: '角色描述',
            dataIndex: 'roleDesc',
            key: 'roleDesc',
        },
        {
            title: '角色状态',
            dataIndex: 'roleState',
            key: 'roleState',
            align: 'center',
            scopedSlots: {customRender: 'roleState'},
        },
        {
            title: '创建时间',
            dataIndex: 'roleCreatetime',
            key: 'roleCreatetime',
        },
        {
            title: '更新时间',
            dataIndex: 'roleUpdatetime',
            key: 'roleUpdatetime',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            scopedSlots: {customRender: 'action'},
        },
    ];

    import {getRoleList,delRole} from "@/services/system/role";
    import Auth from "./Auth";
    import Add from "./Add";
    import Update from './Update';
    export default {
        name: "Permission",
        components:{Auth,Add,Update},
        authorize: {              //权限校验注入设置
            getList: {
                check: 'role',
                type:'permission'
            },
            showAddModal: {
                check: 'role:add',
                type:'permission'
            },
            update: {
                check: 'role:edit',
                type:'permission'
            },
            del: {
                check: 'role:delete',
                type:'permission'
            },
            showAuthModal: {
                check: 'role:auth',
                type:'permission'
            }
        },
        mounted() {
            this.getList()
        },
        data() {
            return {
                tableData: [],
                columns,
                addModalVisible: false,
                updateModalVisible: false,
                authModalVisible: false,
                upData: {},
                authData: {},
            };
        },
        methods: {
            getList() {
                getRoleList().then(res => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data;
                    } else {
                        this.$message.error("获取角色数据失败", 2)
                    }
                })
            },
            del(rec) {
                delRole(rec.roleId).then(res => {
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
            showAuthModal(rec) {
                this.authData = rec
                this.authModalVisible = true
            },
            cancelAuthModal() {
                this.authModalVisible = false
            }
        }
    }
</script>

<style scoped>
    .role {
        height: 100%;
        margin-top: 10px;
    }

    .searchCard {
        width: 100%;
        margin-bottom: 5px;
    }
</style>