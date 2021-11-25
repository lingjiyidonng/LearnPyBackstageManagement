<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="userList"><i class="el-icon-document"></i>用户管理</el-menu-item>
					<el-menu-item index="courseList"><i class="el-icon-document"></i>教程管理</el-menu-item>
					<el-submenu  index="" >
						<template slot="title"><i class="el-icon-document"></i>题目管理</template>
						<el-menu-item index="Level1">Level1</el-menu-item>
						<el-menu-item index="Level2">Level2</el-menu-item>
						<el-menu-item index="Level3">Level3</el-menu-item>
					</el-submenu>
					<el-submenu  >
						<template slot="title" index="RecommendableProjects"><i class="el-icon-document"></i>推荐项目管理</template>
						<el-menu-item index="InternetWrom">网络爬虫</el-menu-item>
						<el-menu-item index="Level1">网络开发</el-menu-item>
						<el-menu-item index="Level1">机器人</el-menu-item>
						<el-menu-item index="Level1">数据科学</el-menu-item>
						<el-menu-item index="Level2">机器学习</el-menu-item>
						<el-menu-item index="Level3">OpenCV</el-menu-item>
						<el-menu-item index="Level3">深度学习</el-menu-item>
						<el-menu-item index="Level3">其他</el-menu-item>
					</el-submenu>
					<el-menu-item index="CodeReview"><i class="el-icon-document"></i>代码审核</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less"  scoped>
	@import '../style/mixin';
	.manage_page{
		
	}
</style>
