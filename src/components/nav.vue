<template>
	<div>
		<div class="nav">
			<div class="nav_logo"><span><img src="../assets/image/logo_nav.png" /></span><span style="font-size: 30px;font-weight: bold;color: #34404e;">Ai Data</span></div>
			<div class="nav_per">
				<img src="../assets/image/avator.png" alt="" @click="toMyPage">
				<p>登录</p>
				<p>|</p>
				<p  @click="$router.push('/register')" style="cursor: pointer;">注册</p>
				<p>EN</p>
				<p>中文</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			toMyPage() {
				this.$router.push('/my_info');
			},
			
		}
	};
</script>

<style>
	@import url("../assets/css/base.css");
</style>
