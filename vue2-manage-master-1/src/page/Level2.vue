<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="problemlist"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  label="编号"
                  property="problemid"
                  width="70">
                </el-table-column>
                <el-table-column
                  property="question"
                  label="题目"
                  width="300">
                </el-table-column>
                <el-table-column
                  property="hint"
                  label="提示">
                </el-table-column>
               
                <el-table-column
                  property="reference_code"
                  label="推荐代码">
                  <template slot-scope="scope">
                  <el-button size="small" type="primary" @click="downloadFile(scope.row)">查看</el-button>
                  </template>

                <!-- <a href="reference_code">查看</a> -->
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
                          <el-form-item label="题目ID">
                          <el-input v-model="formLabelAlign.problemid"></el-input>
                          </el-form-item>
                          <el-form-item label="题目">
                            <el-input v-model="formLabelAlign.question"></el-input>
                          </el-form-item>
                          <el-form-item label="提示">
                            <el-input v-model="formLabelAlign.hint"></el-input>
                          </el-form-item>
                          <el-form-item label="等级">
                            <el-input v-model="formLabelAlign.level"></el-input>
                          </el-form-item>
                          <el-form-item label="推荐代码">
                            <el-input v-model="formLabelAlign.referencecode"></el-input>
                          </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit()">提交</el-button>
                        </el-form-item>
                     
                        </el-form>

                        </el-dialog>
                   
                  </template>
                </el-table-column>
            </el-table>
         
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import headTop from '../components/headTop'
    import {getUserList, getUserCount} from '@/api/getData'
    export default {
        data(){
            return {
                dialogVisible_edit:false,
                formLabelAlign: {
                    problemid:'',
                    question: '',
                    hint: '',
                    level:'',
                    referencecode:''
                }, 
                problemlist: [],
               
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
                axios.get("http://124.70.47.51/admin/problem/getlist", )
                .then(res => {
                    // this.problemlist = res.data.data.problemlist;
                    for(var i=0,j=0;i<res.data.data.problemlist.length;i++){
                        if(res.data.data.problemlist[i].level === 2){
                        this.problemlist[j] = res.data.data.problemlist[i];
                        j++;
                        }
                    }
                })
                .catch()
            },
            handleEdit(row){
            this.dialogVisible_edit=true
            this.formLabelAlign.problemid=row.problemid
            this.formLabelAlign.question=row.question
            this.formLabelAlign.hint=row.hint
            this.formLabelAlign.level=row.level
            this.formLabelAlign.referencecode=row.reference_code

            },
            
            submit(){
                var param={
                    problemid:this.formLabelAlign.problemid,
                    question:this.formLabelAlign.question,
                    hint:this.formLabelAlign.hint,
                    level:this.formLabelAlign.level,
                    referencecode:this.formLabelAlign.referencecode
                }
                axios.put("http://124.70.47.51/admin/problem/update",param)
                .then(res=>{
                    if(res.data.status ===0){
                        this.initData();
                    }
                })
                .catch(res=>{
                    console.log(res)
                })
                this.dialogVisible_edit=false


            },
            downloadFile(row){
          var url=row.reference_code
          console.log(url)
          try{
            var elemIF = document.createElement("iframe");    
            elemIF.src = url;   
            elemIF.style.display = "none";   
            document.body.appendChild(elemIF);   
          }catch(e){ 
            zzrw.alert("下载异常！");
          } 

        },
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
