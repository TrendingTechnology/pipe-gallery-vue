<template>
    <div class="personal">
        <a-tabs default-active-key="1" tab-position="left">
            <a-tab-pane key="1" tab="个人资料">
                <div class="form-content">
                    <a-form-model :model="form" ref="ruleForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <a-form-model-item label="头像">
                            <a-avatar shape="square" :size="100" icon="user" :src="form.userImg"/>
                            <a-upload
                                    name="file"
                                    :multiple="true"
                                    action="http://192.168.2.121:9999/userMgr/setAvatar"
                                    :headers="headers"
                                    :showUploadList="false"
                                    @change="handleChange"
                            >
                                <a-button type="primary" size="small" style="margin-left: 30px"> <a-icon type="upload" /> 上传 </a-button>
                            </a-upload>
                        </a-form-model-item>
                        <a-form-model-item label="账号">
                            <a-input v-model="form.userAccount" :disabled="true"/>
                        </a-form-model-item>
                        <a-form-model-item label="昵称"  prop="userNickName">
                            <a-input v-model="form.userNickName"/>
                        </a-form-model-item>
                        <a-form-model-item label="真实姓名" prop="userName">
                            <a-input v-model="form.userName" />
                        </a-form-model-item>
                        <a-form-model-item label="年龄"  prop="userAge">
                            <a-input v-model="form.userAge" type="number"/>
                        </a-form-model-item>
                        <a-form-model-item label="性别" prop="userSex">
                            <a-radio-group v-model="form.userSex">
                                <a-radio value="男">
                                    男
                                </a-radio>
                                <a-radio value="女">
                                    女
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                        <a-form-model-item label="电话" prop="userMobilePhone">
                            <a-input v-model="form.userMobilePhone"/>
                        </a-form-model-item>
                        <a-form-model-item label="电子邮箱" prop="userMail">
                            <a-input v-model="form.userMail"/>
                        </a-form-model-item>
                        <a-form-model-item label="描述" >
                            <a-input v-model="form.userDesc" type="textarea" />
                        </a-form-model-item>
                        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                            <a-button type="primary" @click="onSubmit">
                                修改
                            </a-button>
                            <a-button style="margin-left: 10px;" @click="resetUser">
                                重置
                            </a-button>
                        </a-form-model-item>
                    </a-form-model>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="密码邮箱" force-render>
                <div class="form-content">
                    <a-form-model :model="passForm" ref="passForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <a-form-model-item  label="当前密码"  prop="oldPass">
                            <a-input-password v-model="passForm.oldPass"/>
                        </a-form-model-item>
                        <a-form-model-item  label="新密码"  prop="newPass">
                            <a-input-password v-model="passForm.newPass"/>
                        </a-form-model-item>
                        <a-form-model-item  label="重复密码"  prop="repeatPass">
                            <a-input-password v-model="passForm.repeatPass"/>
                        </a-form-model-item>
                        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                            <a-button type="primary" @click="onSubmitToPass">
                                修改
                            </a-button>
                            <a-button style="margin-left: 10px;" @click="resetUserPass">
                                重置
                            </a-button>
                        </a-form-model-item>
                    </a-form-model>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import {setPersonal,setPass} from "@/services/system/personal";

    export default {
        name: "Personal",
        computed: {
            ...mapGetters('account', ['user','token']),
        },
        mounted() {
            this.initInfo = this.user
            this.form = this.user
            this.headers.authorization = this.token
        },
        data(){
            return{
                headers: {
                    authorization: '',
                },
                labelCol: { span: 4 },
                wrapperCol: { span: 18 },
                form:{
                    userId:'',
                    userNickName:'',
                    userName:'',
                    userAge:0,
                    userSex:'',
                    userMail:'',
                    userDesc:'',
                    userCreatetime:'',
                    userDelFlag:0,
                    userAccount:'',
                    userState:0,
                    userPassword:'',
                },
                rules:{
                    userAccount:[{required: true, message: '请输入', trigger: 'blur'}],
                    userMail:[{required: true, message: '请输入', trigger: 'blur'}],
                    userMobilePhone:[{required: true, message: '请输入', trigger: 'blur'}],
                    userName:[{required: true, message: '请输入', trigger: 'blur'}],
                    userNickName:[{required: true, message: '请输入', trigger: 'blur'}],
                    userPassword:[{required: true, message: '请输入', trigger: 'blur'}],
                    userAge:[{required: true, message: '请输入', trigger: 'blur'}],
                    userSex:[{required: true, message: '请选择', trigger: 'change'}],
                    oldPass:[{required: true, message: '请输入', trigger: 'blur'}],
                    newPass:[{required: true, message: '请输入', trigger: 'blur'}],
                    repeatPass:[{required: true, message: '请输入', trigger: 'blur'}],
                },
                passForm:{
                    oldPass:'',
                    newPass:'',
                    repeatPass:'',
                }
            }
        },
        methods:{
            ...mapMutations('account', ['setUser']),
            resetUser(){
            },
            resetUserPass(){
                this.passForm = {}
            },
            handleChange(info) {
                if (info.file.status === 'done') {
                    this.setUser(info.file.response.data)
                    this.form.userImg = info.file.response.data.userImg
                    this.$message.success("头像上传成功！");
                } else if (info.file.status === 'error') {
                    this.$message.error("上传失败！");
                }
            },
            onSubmit(){
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        setPersonal(this.form).then(res => {
                            if(res.data.code == 200){
                                this.setUser(res.data.data)
                                this.$message.success("修改成功！")
                            }else{
                                this.$message.error("服务器异常！")
                            }

                        })
                    } else {
                        return false;
                    }
                });
            },
            onSubmitToPass(){
                this.$refs.passForm.validate(valid => {
                    if (valid) {
                        if(this.passForm.newPass !== this.passForm.repeatPass){
                            this.$message.error("两次输入密码不一致!")
                            return false
                        }else{
                            setPass(this.passForm.oldPass,this.passForm.newPass).then(res => {
                                if(res.data.code === 200){
                                    this.$message.success("用户密码修改成功!")
                                    this.$router.push('/login')
                                    this.$message.info("修改密码后需重新登陆")
                                }else{
                                    this.$message.error(res.data.message)
                                }
                            })
                        }
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .personal{
        margin-top: 20px;
    }
    .form-content{
        width: 40%;
        margin-left:5%;
        margin-top: 30px;
    }
</style>
