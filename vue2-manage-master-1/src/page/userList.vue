<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column label="编号" type="userid" width="100">
        </el-table-column>
        <el-table-column property="username" label="用户名"> </el-table-column>
        <el-table-column label="头像">
          <template >
　　　　    <img src="avatar" />
　　      </template>
        </el-table-column>
        <el-table-column property="codecount" label="代码提交次数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >加入黑名单</el-button
            >
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
import axios from "axios";
import headTop from "../components/headTop";
//import {getUserList, getUserCount} from '@/api/getData'
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
    };
  },
  components: {
    headTop,
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      axios.get("http://124.70.47.51/admin/user/getlist", )
        .then((res) => {
          this.tableData = res.data.data.userlist;
          console.log(res);
          console.log(res.data.msg);
          console.log(res.data.status);
          console.log(res.data.data.userlist);
          
        });

      // const {data:res} =await this.$http.get('http://{{host}}/user/course',{
      //   params:this.queryInfo
      // })
    },
  },
};
// export default {
//     data(){
//         return {
//             tableData: [{
//               registe_time: '2016-05-02',
//               username: '王小虎',
//               city: '上海市普陀区金沙江路 1518 弄'
//             }, {
//               registe_time: '2016-05-04',
//               username: '王小虎',
//               city: '上海市普陀区金沙江路 1517 弄'
//             }, {
//               registe_time: '2016-05-01',
//               username: '王小虎',
//               city: '上海市普陀区金沙江路 1519 弄'
//             }, {
//               registe_time: '2016-05-03',
//               username: '王小虎',
//               city: '上海市普陀区金沙江路 1516 弄'
//             }],
//             currentRow: null,
//             offset: 0,
//             limit: 20,
//             count: 0,
//             currentPage: 1,
//         }
//     },
// 	components: {
// 		headTop,
// 	},
//     created(){
//         this.initData();
//     },
//     methods: {
//         async initData(){
//             try{
//                 const countData = await getUserCount();
//                 if (countData.status == 1) {
//                     this.count = countData.count;
//                 }else{
//                     throw new Error('获取数据失败');
//                 }
//                 this.getUsers();
//             }catch(err){
//                 console.log('获取数据失败', err);
//             }
//         },
//         handleSizeChange(val) {
//             console.log(`每页 ${val} 条`);
//         },
//         handleCurrentChange(val) {
//             this.currentPage = val;
//             this.offset = (val - 1)*this.limit;
//             this.getUsers()
//         },
//         async getUsers(){
//             const Users = await getUserList({offset: this.offset, limit: this.limit});
//             this.tableData = [];
//             Users.forEach(item => {
//                 const tableData = {};
//                 tableData.username = item.username;
//                 tableData.registe_time = item.registe_time;
//                 tableData.city = item.city;
//                 this.tableData.push(tableData);
//             })
//         }
//     },
// }
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
</style>
