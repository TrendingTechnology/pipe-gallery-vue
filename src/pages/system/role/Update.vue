<template>
    <div>
        <a-modal
                :visible="visible"
                title="修改角色"
                @cancel="handleCancel"
                @ok="handleSave"
                width="800px"
        >
            <a-form-model :model="form" ref="ruleForm" :label-col="labelCol" :rules="rules" :wrapper-col="wrapperCol">
                <a-row>
                    <a-col :span="24">
                        <a-form-model-item label="角色名称" prop="roleName">
                            <a-input v-model="form.roleName"/>
                        </a-form-model-item>
                        <a-form-model-item label="角色描述" >
                            <a-input type="textarea" v-model="form.roleDesc"/>
                        </a-form-model-item>
                        <a-form-model-item label="角色状态" prop="roleState">
                            <a-select v-model="form.roleState">
                                <a-select-option :value=1>
                                    有效
                                </a-select-option>
                                <a-select-option :value=0>
                                     禁用
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
    import {updateRole} from "@/services/system/role";
    export default {
        name: "Add",
        props: ['visible','data'],
        watch:{
            data:{
                immediate:true,
                handler:function(value){
                    this.form = value
                }
            }
        },
        data(){
          return{
              labelCol: { span: 6 },
              wrapperCol: { span: 14 },
              form:{
                  roleName: '',
                  roleDesc: '',
                  roleState: null,
              },
              rules:{
                  roleName:[{required: true, message: '请输入', trigger: 'blur'}],
                  roleDesc:[{required: true, message: '请输入', trigger: 'blur'}],
              }
          }
        },
        mounted() {
        },
        methods: {
            handleCancel(){
                this.$parent.cancelUpdateModal()
                this.$refs.ruleForm.resetFields();
            },
            handleSave(){
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        updateRole(this.form).then(res => {
                            if(res.data.code == 200){
                                this.handleCancel()
                                this.$message.success("修改成功！",2)
                                this.$parent.getList()
                            }else{
                                this.$message.error(res.data.msg,2)
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>