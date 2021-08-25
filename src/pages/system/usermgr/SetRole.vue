<template>
    <div>
        <a-modal
                :visible="visible"
                title="设置角色"
                @cancel="handleCancel"
                @ok="handleSave"
                width="500px"
        >
            <a-form-model  :label-col="labelCol"  :wrapper-col="wrapperCol">
                <a-form-model-item label="选择角色">
                    <a-select placeholder="请选择角色" v-model="selectRole">
                        <a-select-option v-for="item in roleList" :key="item.roleId" :value="item.roleId">
                            {{item.roleName}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
    import {getRoleList} from "@/services/system/role";
    import {setRole,getUserRole} from "@/services/system/userMgr";

    export default {
        name: "SetRole",
        props: ['visible', 'data'],
        data() {
            return {
                labelCol: {span: 6},
                wrapperCol: {span: 14},
                roleList: [],
                selectRole: '',
                user: {},
            }
        },
        mounted() {
            this.user = this.data
            this.getRoleList();
            this.getUserRole(this.data.userId);
        },
        methods: {
            handleCancel() {
                this.$parent.cancelSetRoleModal()
            },
            handleSave() {
                let userRole = {}
                userRole.userId = this.user.userId
                userRole.roleId = this.selectRole
                setRole(userRole).then(res => {
                    if(res.data.code == 200){
                        this.handleCancel()
                        this.$message.success("设置成功！",2)
                    }else{
                        this.$message.error("服务异常！",2)
                    }
                })
            },
            getRoleList(){
                getRoleList().then(res => {
                    if(res.data.code == 200){
                        this.roleList = res.data.data
                    }else{
                        this.$message.error("客户端异常！",2)
                    }
                })
            },
            getUserRole(id){
                getUserRole(id).then(res => {
                    if(res.data.code === 200){
                        this.selectRole = res.data.data
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>