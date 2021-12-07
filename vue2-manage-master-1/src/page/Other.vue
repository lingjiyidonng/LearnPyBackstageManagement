<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  property="project"
                  label="编号"
                  width=100>
                </el-table-column>
                <el-table-column
                  property="projectname"
                  label="项目">
                </el-table-column>
                <el-table-column
                  property="projecturl"
                  label="项目链接">
                </el-table-column>

                <el-table-column label="操作" >
                  <template slot-scope="scope">
                    <el-button
                    size="small"
                    @click="handleEdit(scope.row)">编辑</el-button>
                        <el-dialog
                        title="编辑"
                        :visible.sync="dialogVisible_edit"
                        width="100%">
                        <el-form :label-position="top" label-width="80px" :model="formLabelAlign">
                          <el-form-item label="项目名称">
                            <el-input v-model="formLabelAlign.name"></el-input>
                          </el-form-item>
                          <el-form-item label="项目链接">
                            <el-input v-model="formLabelAlign.url"></el-input>
                          </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit()">提交</el-button>
                        </el-form-item>
                        <!-- <el-button type="primary" @click="submit()">提交</el-button> -->
                        <!-- <button @click="submit">提交</button> -->
                        </el-form>

                        </el-dialog>
                   
                  </template>
                </el-table-column>
            </el-table>
            <!-- <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getUserList, getUserCount} from '@/api/getData'
    import axios from "axios"
    export default {
        data(){
            return {
                dialogVisible_edit:false,
                editorContent:'',
                html:'', 
                tableData: [],
                formLabelAlign: {
                    id:'',
                    name: '',
                    url: ''
                }       
                // currentRow: null,
                // offset: 0,
                // limit: 20,
                // count: 0,
                // currentPage: 1,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            initData(){
                axios.get("http://124.70.47.51/admin/project/getlist",)
                .then((res)=>{

                    this.tableData=res.data.msg.其他;
                    console.log(res)
                })
            },
            handleEdit(row){
            this.dialogVisible_edit=true
            this.formLabelAlign.id=row.project
            this.formLabelAlign.name=row.projectname
            this.formLabelAlign.url=row.projecturl
            },
             // 所有操作都会被解析重新渲染
           
            submit(){
                var param={
                    projectid:this.formLabelAlign.id,
                    name:this.formLabelAlign.name,
                    url:this.formLabelAlign.url
                }
                axios.put("http://124.70.47.51/admin/project/update",param)
                .then(res=>{
                    if(res.data.status ===0){
                        this.initData();
                    }
                })
                .catch(res=>{
                    console.log(res)
                })
                this.dialogVisible_edit=false


            }
            
        },
    }
</script>
<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
