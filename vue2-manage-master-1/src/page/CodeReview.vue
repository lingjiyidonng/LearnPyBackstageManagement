<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <!-- <el-table-column
                  type="index"
                  width="100">
                </el-table-column> -->
                <el-table-column
                  property="dt"
                  label="提交时间"
                  width="200">
                </el-table-column>
                <el-table-column
                  property="codeid"
                  label="代码ID"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="user_id"
                  label="用户ID"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="username"
                  label="用户名"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="pc_id"
                  label="题目/教程 ID"
                  width="140">
                </el-table-column>
                <el-table-column
                  property="detail"
                  label="代码查看"
                  width="300">
                </el-table-column>
                <el-table-column 
                label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">同意</el-button>
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
import axios from 'axios'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods:{
            initData(){
                axios.get("http://124.70.47.51/admin/code/getlist",)
                .then((res)=>{
                    this.tableData = res.data.data.codelist;
                    for(var i=0;i<res.data.data.codelist.length;i++){
                        if(res.data.data.codelist[i].problemid === null){
                            this.tableData[i].pc_id = "课程ID："+String(res.data.data.codelist[i].courseid);
                        }
                        else{
                            this.tableData[i].pc_id = "题目ID："+String(res.data.data.codelist[i].problemid);
                        }
                    }
                })
            },
            handleDelete(index){
                axios.post("http://124.70.47.51/admin/code/check", {
                    codeid:this.tableData[index].codeid
                }).then((res)=>{
                    this.initData()
                }
                )
                
            }
        }
        // methods: {
        //     async initData(){
        //         try{
        //             const countData = await getUserCount();
        //             if (countData.status == 1) {
        //                 this.count = countData.count;
        //             }else{
        //                 throw new Error('获取数据失败');
        //             }
        //             this.getUsers();
        //         }catch(err){
        //             console.log('获取数据失败', err);
        //         }
        //     },
        //     handleSizeChange(val) {
        //         console.log(`每页 ${val} 条`);
        //     },
        //     handleCurrentChange(val) {
        //         this.currentPage = val;
        //         this.offset = (val - 1)*this.limit;
        //         this.getUsers()
        //     },
        //     async getUsers(){
        //         const Users = await getUserList({offset: this.offset, limit: this.limit});
        //         this.tableData = [];
        //         Users.forEach(item => {
        //             const tableData = {};
        //             tableData.username = item.username;
        //             tableData.registe_time = item.registe_time;
        //             tableData.city = item.city;
        //             this.tableData.push(tableData);
        //         })
        //     }
        // },
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
