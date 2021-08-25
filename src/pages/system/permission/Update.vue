<template>
    <div>
        <a-modal
                :visible="visible"
                title="修改菜单"
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
                        <a-form-model-item label="菜单名称" prop="resourceName">
                            <a-input v-model="form.resourceName"/>
                        </a-form-model-item>
                        <a-form-model-item label="菜单描述">
                            <a-input type="textarea" v-model="form.resourceDesc"/>
                        </a-form-model-item>
                        <a-form-model-item label="菜单URL" prop="resourceUrl">
                            <a-input v-model="form.resourceUrl"/>
                        </a-form-model-item>
                        <a-form-model-item label="是否隐藏" prop="resourceShow">
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
                        <a-form-model-item label="菜单图标" prop="resourceIcon">
                            <a-input v-model="form.resourceIcon"/>
                        </a-form-model-item>
                        <a-form-model-item label="菜单类型" prop="resourceType">
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
    import {getCasList, updatePermission} from "@/services/system/permission";

    export default {
        name: "Add",
        props: ['visible', 'data'],
        watch: {
            data: {
                immediate: true,
                handler: function (value) {
                    this.formData = value
                }
            }
        },
        data() {
            return {
                labelCol: {span: 6},
                wrapperCol: {span: 14},
                labelCol1: {span: 3},
                wrapperCol1: {span: 11},
                options: [],
                parent: [],
                form: {
                    resourceName: '',
                    resourceDesc: '',
                    resourceUrl: '',
                    resourceLevel: '',
                    resourceShow: '1',
                    resourceIcon: '',
                    resourceType: '',
                    resourceAuth: '',
                    resourceCrumb: '',
                },
                formData: {},
                rules: {
                    resourceName: [{required: true, message: '请输入', trigger: 'blur'}],
                    resourceUrl: [{required: true, message: '请输入', trigger: 'blur'}],
                    resourceLevel: [{required: true, message: '请输入', trigger: 'blur'}],
                    resourceShow: [{required: true, message: '请输入', trigger: 'change'}],
                    resourceIcon: [{required: true, message: '请输入', trigger: 'blur'}],
                    resourceType: [{required: true, message: '请输入', trigger: 'change'}],
                    resourceAuth: [{required: true, message: '请输入', trigger: 'blur'}],
                    resourceCrumb: [{required: true, message: '请输入', trigger: 'blur'}]
                }
            }
        },
        mounted() {
            this.getCasList()
        },
        created() {

        },
        methods: {
            handleCancel() {
                this.$parent.cancelUpdateModal()
            },
            onChange(value) {
                this.parent = value;
            },
            getCasList() {
                getCasList().then(res => {
                    if (res.data.code == 200) {
                        this.options = res.data.data
                        this.$nextTick(function () {
                            this.handleData()
                        })
                    }
                })
            },
            handleData(){
                const value = this.formData
                this.form.resourceName = value.resourceName,
                this.form.resourceDesc = value.resourceDesc,
                this.form.resourceUrl = value.resourceUrl,
                this.form.resourceLevel = value.resourceLevel,
                this.form.resourceShow = value.resourceShow === 1 ? "1" : "0",
                this.form.resourceIcon = value.resourceIcon,
                this.form.resourceType = value.resourceType,
                this.form.resourceAuth = value.resourceAuth,
                this.form.resourceCrumb = value.resourceCrumb
                this.parent = value.resourceParentId
            },
            onSelect(info){
                this.parent = info
            },
            handleSave() {
                if (this.parent === null || this.parent.length == 0) {
                    this.$message.error("请选择父级菜单！", 2)
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
                        resource.resourceDelFlag = this.$props.data.resourceDelFlag
                        resource.resourceId = this.$props.data.resourceId
                        resource.resourceCreatetime = this.$props.data.resourceCreatetime
                        updatePermission(resource).then(res => {
                            if (res.data.code == 200) {
                                this.handleCancel()
                                this.$message.success("修改成功！", 2)
                                this.$parent.getList()
                                this.getCasList()
                            } else {
                                this.$message.error(res.data.msg, 2)
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