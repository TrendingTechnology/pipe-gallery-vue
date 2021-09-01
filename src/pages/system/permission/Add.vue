<template>
    <div>
        <a-modal
                :visible="visible"
                title="新增菜单"
                @cancel="handleCancel"
                @ok="handleSave"
                width="800px"
        >
            <a-form-model :model="form" ref="ruleForm" :label-col="labelCol" :rules="rules" :wrapper-col="wrapperCol">
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="父级菜单">
                            <a-tree-select
                                    v-model="parent"
                                    show-search
                                    style="width: 100%"
                                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                    placeholder="Please select"
                                    allow-clear
                                    tree-default-expand-all
                                    :tree-data="options"
                                    @select="onSelect"
                            >
                            </a-tree-select>
                        </a-form-model-item>
                        <a-form-model-item label="菜单名称"  prop="resourceName">
                            <a-input v-model="form.resourceName"/>
                        </a-form-model-item>
                        <a-form-model-item label="菜单描述">
                            <a-input type="textarea" v-model="form.resourceDesc"/>
                        </a-form-model-item>
                        <a-form-model-item label="菜单URL"  prop="resourceUrl">
                            <a-input v-model="form.resourceUrl"/>
                        </a-form-model-item>
                        <a-form-model-item label="是否隐藏"  prop="resourceShow">
                            <a-radio-group v-model="form.resourceShow">
                                <a-radio value="0">
                                    是
                                </a-radio>
                                <a-radio value="1">
                                    否
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="菜单图标" prop="resourceIcon" :label-col="rowLabelCol" :wrapper-col="rowWrapperCol">
                            <a-input v-model="form.resourceIcon"/>
                        </a-form-model-item>
                        <a-form-model-item label="菜单类型"  prop="resourceType">
                            <a-radio-group v-model="form.resourceType">
                                <a-radio value="1">
                                    按钮
                                </a-radio>
                                <a-radio value="2">
                                    菜单
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                        <a-form-model-item label="菜单权限" prop="resourceAuth">
                            <a-input v-model="form.resourceAuth"/>
                        </a-form-model-item>
                        <a-form-model-item label="面包屑显示" prop="resourceCrumb">
                            <a-input palceholder="以逗号分隔" v-model="form.resourceCrumb"/>
                        </a-form-model-item>
                        <a-form-model-item label="显示等级" prop="resourceLevel">
                            <a-input type="number" v-model.number="form.resourceLevel"/>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
    import {getCasList,addPermission} from "@/services/system/permission";

    export default {
        name: "Add",
        props: ['visible'],
        data(){
          return{
              labelCol: { span: 6 },
              wrapperCol: { span: 14 },
              options: [],
              parent: [],
              form:{
                  resourceName: '',
                  resourceDesc: '',
                  resourceUrl: '',
                  resourceLevel: 0,
                  resourceShow: '1',
                  resourceIcon: '',
                  resourceType: '2',
                  resourceAuth: '',
                  resourceCrumb: '',
                  resourceParent: [],
              },
              rules:{
                  resourceName:[{required: true, message: '请输入', trigger: 'blur'}],
                  resourceUrl:[{required: true, message: '请输入', trigger: 'blur'}],
                  resourceLevel:[{required: true, message: '请输入', trigger: 'blur'}],
                  resourceShow:[{required: true, message: '请输入', trigger: 'change'}],
                  resourceIcon:[{required: true, message: '请输入', trigger: 'blur'}],
                  resourceType:[{required: true, message: '请输入', trigger: 'change'}],
                  resourceAuth:[{required: true, message: '请输入', trigger: 'blur'}],
                  resourceCrumb:[{required: true, message: '请输入', trigger: 'blur'}]
              }
          }
        },
        mounted() {
            this.getCasList()
        },
        methods: {
            handleCancel(){
                this.$parent.cancelAddModal()
                this.$refs.ruleForm.resetFields();
            },
            onChange(value) {
                this.parent = value;
            },
            getCasList(){
                getCasList().then(res => {
                    if(res.data.code == 200){
                        this.options = res.data.data
                    }
                })
            },
            onSelect(info){
                this.parent = info
            },
            handleSave(){
                if(this.parent === null || this.parent.length == 0){
                    this.$message.error("请选择父级菜单！",2)
                    return false
                }
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        let resource = {}
                        resource.resourceName = this.form.resourceName
                        resource.resourceDesc = this.form.resourceDesc
                        resource.resourceUrl = this.form.resourceUrl
                        resource.resourceLevel = this.form.resourceLevel
                        resource.resourceShow = this.form.resourceShow
                        resource.resourceIcon = this.form.resourceIcon
                        resource.resourceType = this.form.resourceType
                        resource.resourceAuth = this.form.resourceAuth
                        resource.resourceCrumb = this.form.resourceCrumb
                        resource.resourceParentId = this.parent
                        addPermission(resource).then(res => {
                           if(res.data.code == 200){
                               this.handleCancel()
                               this.$message.success("添加成功！",2)
                               this.$parent.getList()
                               this.getCasList()
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
