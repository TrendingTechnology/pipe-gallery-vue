<template>
    <div>
        <a-modal
                :visible="visible"
                title="新增用户"
                @cancel="handleCancel"
                @ok="handleSave"
                width="800px"
        >
            <a-form-model :model="form" ref="ruleForm" :label-col="labelCol" :rules="rules" :wrapper-col="wrapperCol">
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="用户账号"  prop="userAccount">
                            <a-input v-model="form.userAccount"/>
                        </a-form-model-item>
                      <a-form-model-item label="用户密码"  prop="userPassword">
                        <a-input type="password" v-model="form.userPassword"/>
                      </a-form-model-item>

                        <a-form-model-item label="用户邮箱"  prop="userMail">
                            <a-input v-model="form.userMail"/>
                        </a-form-model-item>
                        <a-form-model-item label="电话号码"  prop="userMobilePhone">
                            <a-input v-model="form.userMobilePhone"/>
                        </a-form-model-item>
                        <a-form-model-item label="年龄"  prop="userAge">
                            <a-input type="number" v-model.number="form.userAge"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="真实姓名"  prop="userName">
                            <a-input v-model="form.userName"/>
                        </a-form-model-item>
                        <a-form-model-item label="用户昵称"  prop="userNickName">
                            <a-input v-model="form.userNickName"/>
                        </a-form-model-item>
                      <a-form-model-item label="用户描述">
                        <a-input type="textarea" v-model="form.userDesc"/>
                      </a-form-model-item>
                        <a-form-model-item label="用户性别"  prop="userSex">
                            <a-radio-group v-model="form.userSex">
                                <a-radio value="男">
                                    男
                                </a-radio>
                                <a-radio value="女">
                                    女
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                      <a-form-model-item label="是否有效"  prop="userState">
                        <a-radio-group v-model="form.userState">
                          <a-radio :value="1">
                            有效
                          </a-radio>
                          <a-radio :value="0">
                            无效
                          </a-radio>
                        </a-radio-group>
                      </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
    import {addUser} from "@/services/system/userMgr";
    export default {
        name: "Add",
        props: ['visible'],
        data(){
          return{
              labelCol: { span: 6 },
              wrapperCol: { span: 14 },
              labelCol1: { span: 3 },
              wrapperCol1: { span: 11 },
              options: [],
              parent: [],
              form:{
                  userAccount: '',
                  userMail: '',
                  userMobilePhone: '',
                  userName: '',
                  userNickName: '',
                  userPassword: '',
                  userSex: '',
                  userAge: 0,
                  userState: 1
              },
              rules:{
                  userAccount:[{required: true, message: '请输入', trigger: 'blur'}],
                  // userMail:[{required: true, message: '请输入', trigger: 'blur'}],
                  // userMobilePhone:[{required: true, message: '请输入', trigger: 'blur'}],
                  // userName:[{required: true, message: '请输入', trigger: 'blur'}],
                  // userNickName:[{required: true, message: '请输入', trigger: 'blur'}],
                  userPassword:[{required: true, message: '请输入', trigger: 'blur'}],
                  // userAge:[{required: true, message: '请输入', trigger: 'blur'}],
                  // userSex:[{required: true, message: '请选择', trigger: 'change'}],
                  userState:[{required: true, message: '请选择', trigger: 'change'}],
              }
          }
        },
        mounted() {
        },
        methods: {
            handleCancel(){
                this.$parent.cancelAddModal()
                this.$refs.ruleForm.resetFields();
            },
            handleSave(){
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        addUser(this.form).then(res => {
                            if(res.data.code == 200){
                                this.handleCancel()
                                this.$message.success("添加成功！",2)
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
