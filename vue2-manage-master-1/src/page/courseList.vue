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
                  width="600">
                </el-table-column>
                <el-table-column
                  property="detail"
                  label="详细信息">

                  <template slot-scope="scope">
                  <el-button size="small" @click="downloadFile(scope.row)">查看</el-button>
                  <el-dialog
                         title="编辑"
                         :visible.sync="dialogVisible_edit"
                         width="100%">
                         <mavon-editor
                          style="height: 100%"
                          v-model="editorContent"
                          :ishljs="true"
                          ref=md
                          @imgAdd="imgAdd"
                          @imgDel="imgDel">
                          </mavon-editor>
                        <el-button type="primary" @click="submit()">提交</el-button>

                        <!-- <button @click="submit">提交</button> -->
                  </el-dialog>
                  </template>

                  <!-- <a href="detail">查看</a> -->
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
    <!-- <vue-markdown>{{input}}</vue-markdown> -->

    </div>
   
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import VueMarkdown from 'vue-markdown' 

    import 'mavon-editor/dist/css/index.css'  
    // import first from '../md/first.md'

    import axios from 'axios'
    import headTop from '../components/headTop'
    export default{
      data (){
        return{
          dialogVisible_edit:false,
          editorContent:'' ,
          html:'', 
          //获取课程列表
          courselist:[],
          count:0
        }
      },
      components: {
        // first,
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
        },
        downloadFile(row){
          this.dialogVisible_edit=true
          console.log(row.detail)
          var url=row.detail
          console.log("111")
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
        submit(){
            this.dialogVisible_edit=false
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
