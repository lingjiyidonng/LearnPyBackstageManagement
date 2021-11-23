<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" >
		  		<div class="manage_tip">
		  			<p>学派后台管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<!-- 在el-form-item中通过prop来指定不同的验证规则 -->
					<el-form-item prop="username">
						<el-input placeholder="用户名" v-model="loginForm.username"><span></span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
				  	</el-form-item>
				</el-form>
				<p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
    import { mapMutations } from 'vuex';
	import axios from 'axios'
	export default {
	    data(){
			return {
				//登录表单的数据绑定对象
				loginForm: {
					username: '',
					password: '',
				},
				//表单的验证规则对象
				rules: {
					//这里的username与上面的prop相对应，来指定不同的验证规则
					username: [
						//requires:必填  blur(鼠标失去焦点)时触发，输出message消息 
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		
		methods: {
			...mapMutations(['setToken']),
			async submitForm(formName) {
				let _this = this;
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						//post请求传递三个参数
						//请求地址
						//传递的数据在请求体中传递
						//axios默认发送的数据是json格式的
						// get中params 是即将与请求一起发送的 URL 参数
						//配置信息
						//   headers
						//      conttent-type：'application/json' 默认
						//登录
						
						this.$axios.post('http://124.70.47.51/admin/login',{
							name: "admin",
							password: "123456"
						},{
							
						})
						.then(
							function(respond){
							
								console.log( respond.data.data.token);
								
								_this.$store.commit('setToken', respond.data.data.token)
								_this.$router.push('userList')
								//  axios.defaults.headers.common['Authorization'] = res.headers.authorization

							}
						)
						.catch(err => console.log(err));
						// if (res.status == 1) {
						// 	this.$message({
		                //         type: 'success',
		                //         message: '登录成功'
		                //     });
						// 	this.$router.push('userList')
						// }else{
						// 	this.$message({
		                //         type: 'error',
		                //         message: res.msg
		                //     });
						// }
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
		},
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
