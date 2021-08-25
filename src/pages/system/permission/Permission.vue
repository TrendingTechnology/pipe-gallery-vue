<template>
    <div class="permission">
        <a-card class="searchCard">
            <a-divider type="horizontal"/>
            <a-button type="primary" @click="showAddModal">添加</a-button>
        </a-card>
        <a-table
                :columns="columns"
                :data-source="tableData"
                rowKey="resourceId"
                bordered
                style="background-color: white"
                size="small"
        >
            <span slot="action" slot-scope="record">
                <a-popconfirm
                        title="确定删除该菜单?"
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
            </span>
        </a-table>
        <Add v-bind:visible="addModalVisible" v-if="addModalVisible"></Add>
        <Update v-bind:visible="updateModalVisible" v-bind:data="upData" v-if="updateModalVisible"></Update>
    </div>
</template>

<script>

    const columns = [
        {
            title: '菜单名称',
            dataIndex: 'resourceName',
            key: 'resourceName',
        },
        {
            title: '菜单描述',
            dataIndex: 'resourceDesc',
            key: 'resourceDesc',
        },
        {
            title: '菜单图标',
            dataIndex: 'resourceIcon',
            key: 'resourceIcon',
        },
        {
            title: '菜单URI',
            dataIndex: 'resourceUrl',
            key: 'resourceUrl',
        },
        {
            title: '菜单权限',
            dataIndex: 'resourceAuth',
            key: 'resourceAuth',
        },
        {
            title: '显示优先级',
            dataIndex: 'resourceLevel',
            key: 'resourceLevel',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            scopedSlots: {customRender: 'action'},
        },
    ];

    import {getPermissionList, delPermission} from "@/services/system/permission";
    import Add from "./Add";
    import Update from "./Update";

    export default {
        name: "Permission",
        components: {Add, Update},
        authorize: {              //权限校验注入设置
            getList: {
                check: 'welcome',
                type:'permission'
            },
            showAddModal: {
                check: 'menu:add',
                type:'permission'
            },
            update: {
                check: 'menu:edit',
                type:'permission'
            },
            del: {
                check: 'menu:delete',
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
                upData: {},
            };
        },
        methods: {
            getList() {
                getPermissionList().then(res => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data;
                    } else {
                        this.$message.error("获取菜单数据失败", 2)
                    }
                })
            },
            del(rec) {
                delPermission(rec.resourceId).then(res => {
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
            showAddModal() {
                this.addModalVisible = true
            },
            cancelAddModal() {
                this.addModalVisible = false
            },
            cancelUpdateModal() {
                this.updateModalVisible = false
            }
        }
    }
</script>

<style scoped>
    .permission {
        height: 100%;
        margin-top: 10px;
    }

    .searchCard {
        width: 100%;
        margin-bottom: 5px;
    }
</style>