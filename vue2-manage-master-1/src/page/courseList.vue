<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="courselist"
                highlight-current-row
                style="width: 100%">
                <!-- <el-table-column
                  type="index"
                  width="100">
                </el-table-column> -->
                <el-table-column
                  label="编号"
                  property="courseid"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="title"
                  label="标题"
                  >
                </el-table-column>
                <el-table-column
                  
                  label="详细信息"
                  >
                  <a href="detail">查看</a>
                </el-table-column>
                <!-- <el-table-column label="操作" >
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column> -->
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
    import axios from 'axios'
    import headTop from '../components/headTop'
    export default{
      data (){
        return{
          //获取课程列表
          
          courselist:[],
          count:0
        }
      },
      components: {
    		headTop,
    	},
      created(){
        this.getCourseList()
      },
      methods:{
        getCourseList(){
        axios.get("http://124.70.47.51/admin/course/getlist", )
        .then((res) => {
          this.courselist = res.data.data.courselist;
      
          
        });
        }
      }
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
