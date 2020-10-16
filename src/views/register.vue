<template>
	<div>
		<Nav></Nav>
		<div class="content">
			<div class="reg_con">
				<div class="reg_info">
					<div style="display: flex;align-items: center;">
						<span><img src="../assets/image/logo_nav.png" /></span>
						<span style="font-size: 30px;font-weight: bold;color: #34404e;">Ai Data</span>
					</div>
					<div class="int_data"><input type="text" placeholder="手机号码" /></div>
					<div class="int_data qrcode">
						<input type="text" placeholder="请输入验证码" />
						<div>
							<span>HMMY</span>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<span>换一张</span>
						</div>
					</div>
					<div class="int_data qrcode">
						<input type="text" placeholder="短信验证码" />
						<div class="getcode">获取短信验证码</div>
					</div>
					<div class="int_data"><input type="text" placeholder="请输入密码" /></div>
					<div>
						<button>注册</button>
						<span>
							已有账号？
							<span style="color:#D8271C;cursor: pointer;" @click="login">立即登录</span>
						</span>
					</div>
					<div class="tis">
						点击“立即注册”，即表示您同意并愿意遵守《
						<span style="color:#0055FF;">Ai Data用户协议</span>
						》
					</div>
				</div>
				<div class="reg_img">
					<div class="tip_t">欢迎来到Ai Data</div>
					<img src="../assets/image/reg_img.png" alt="" />
				</div>
			</div>
		</div>
		<div class="pop" v-if="hasLogin">
			<div class="login_box">
				<div class="close" @click="close">X</div>
				<div class="tab_log">
					<div class="cur_log_meth">手机登录</div>
					<div>邮箱登录</div>
				</div>
				<div class="ls_lis">
					<img class="ls_img" src="" alt="" />
					<input class="ls_int" type="text" placeholder="请输入手机号" />
				</div>
				<div class="ls_lis">
					<img class="ls_img" src="" alt="" />
					<input class="ls_int" type="text" placeholder="密码" />
				</div>
				<div class="ls_lis" style="border: none;">
					<input class="code" type="text" placeholder="请输入右侧验证码" />
					<div class="code_img">8d4k</div>
					<div class="change">换一张？</div>
				</div>
				<div class="log_btn">登录</div>
				<div class="log_tips">
					<div>没有账号？<span style="color: #0055FF;">5秒注册></span></div>
					<div>忘记密码</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Nav from '../components/nav.vue';
export default {
	name: 'Home',
	data: () => ({
		hasLogin: false
	}),
	components: {
		Nav
	},
	methods: {
		// 登录
		login() {
			this.hasLogin = true;
		},
		close() {
			this.hasLogin = false;
		}
	}
};
</script>

<style>
@import url('../assets/css/base.css');
.reg_con {
	width: 100%;
	height: auto;
	margin-top: 177px;
	margin-bottom: 265px;
	display: flex;
}
.reg_info {
	width: 50%;
}
.reg_img {
	width: 50%;
}
.tip_t {
	font-size: 24px;
	font-weight: 800;
	color: #34404e;
}
.int_data {
	width: 298px;
	height: 40px;
	background: #ffffff;
	border: 1px solid #dae5e6;
	border-radius: 4px;
	margin-bottom: 22px;
}
.qrcode {
	width: 138px;
	position: relative;
}
.qrcode > div {
	width: 150px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	position: absolute;
	left: 150px;
	top: 0px;
	cursor: pointer;
}
.qrcode > .getcode {
	width: 150px;
	height: 40px;
	background: #0055ff;
	border: 1px solid #dae5e6;
	color: #ffffff;
}
.int_data > input {
	width: 100%;
	height: 100%;
	outline: none;
	border: none;
	padding-left: 20px;
	box-sizing: border-box;
}

button {
	width: 160px;
	height: 44px;
	background: #0055ff;
	border-radius: 2px;
	color: #ffffff;
	border: none;
	margin-right: 19px;
}
.tis {
	font-size: 12px;
	font-weight: 500;
	color: #999999;
	line-height: 50px;
}
/* 登录弹框 */
.pop {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}
.login_box {
	width: 461px;
	height: 561px;
	background-color: #ffffff;
	border-radius: 8px;
	/* padding: 10px;
	box-sizing: border-box; */
}
.close {
	font-size: 24px;
	color: #b4b4b4;
	float: right;
	cursor: pointer;
}
.tab_log {
	height: 72px;
	border-bottom: 1px solid #f0f0f0;
	display: flex;
	align-items: center;
}

.tab_log > div {
	font-size: 18px;
	font-weight: bold;
	color: #34495e;
	margin-left: 48px;
}
.cur_log_meth {
	font-size: 24px;
	color: #0055ff;
}
.ls_lis {
	width: 82%;
	margin: 0 auto;
	padding: 39px 0 18px 0;
	border-bottom: 1px solid #f0f0f0;
	display: flex;
	justify-content: flex-start;
}
.ls_img {
	width: 21px;
	height: 21px;
	display: block;
}
.ls_int {
	font-size: 14px;
	font-weight: 500;
	color: #d1d1d1;
	outline: none;
	border: none;
	margin-left: 10px;
}
.code {
	width: 52%;
	font-size: 14px;
	font-weight: 500;
	color: #d1d1d1;
	outline: none;
	border: none;
	padding: 0px 0 20px;
	box-sizing: border-box;
	border-bottom: 1px solid #f0f0f0;
}
.code_img {
	width: 95px;
	height: 52px;
	text-align: center;
}
.change {
	font-size: 14px;
	font-weight: 500;
	color: #1b9fe4;
	cursor: pointer;
}
.log_btn{
	width:82%;
	height:44px;
	margin:76px auto 15px;
	text-align: center;
	line-height: 44px;
	color:#FFFFFF;
	font-size: 20px;
	background: linear-gradient(-30deg, #0055FF, #479AF8);
	border-radius: 4px;
}
.log_tips{
	width:82%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
}
</style>
