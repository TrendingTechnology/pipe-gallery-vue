<template>
    <div>
        <a-modal
                :visible="visible"
                title="权限设置"
                @cancel="handleCancel"
                @ok="handleSave"
                width="800px"
        >
            <a-tree
                    v-model="checkedKeys"
                    checkable
                    checkStrictly
                    :tree-data="treeData"
                    :replaceFields="treeNames"
                    :defaultCheckedKeys="currentAuth"
                    :default-expanded-keys="['3']"
                    @check="onCheck"
            />
        </a-modal>
    </div>
</template>

<script>
    import {getCasList} from "@/services/system/permission";
    import {getCurrentAuth,setAuth} from "@/services/system/role";

    export default {
        name: "Auth",
        props: ['visible', 'data'],
        data(){
            return{
                autoExpandParent: true,
                expandAll:true,
                checkedKeys: [],
                treeData: [],
                currentAuth: ['3'],
                treeNames:{children:'children', title:'label', key:'value' }
            }
        },
        watch: {
        },
        mounted() {
            this.getCasList()
            this.getCurrentAuth()
        },
        methods: {
            handleCancel() {
                this.$parent.cancelAuthModal()
            },
            handleSave() {
                let finalKeys = []
                if(this.checkedKeys.length > 0){
                    finalKeys = this.checkedKeys
                }else{
                    finalKeys = this.checkedKeys.checked
                }
                let roleAuth = {}
                roleAuth.roleId = this.$props.data.roleId
                roleAuth.permIds = finalKeys
                setAuth(roleAuth).then(res => {
                    if(res.data.code == 200){
                        this.handleCancel()
                        this.$message.success("设置权限成功！",2)
                    }else{
                        this.$message.error("服务器异常！",2)
                    }
                })
            },
            onCheck(checkedKeys) {
                this.checkedKeys = checkedKeys;
            },
            //获取树结点
            getCasList(){
                getCasList().then(res => {
                    if(res.data.code == 200){
                        this.treeData = res.data.data
                    }
                })
            },
            //获取当前用户的权限
            getCurrentAuth(){
                getCurrentAuth(this.$props.data.roleId).then(res => {
                    if(res.data.code == 200){
                        const authList = res.data.data
                        authList.forEach(item => {
                            this.currentAuth.push(item.resourceId)
                        })
                        this.checkedKeys = this.currentAuth
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>