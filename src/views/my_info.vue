<template>
	<div>
		<Nav></Nav>
		<div class="container content">
			<div class="per_aside">
				<div :class="{ current_tabs: current === 0 }" @click="category(0)">
					<img src="../assets/image/icon_person.png" />
					<div>个人资料</div>
				</div>
				<div :class="{ current_tabs: current === 1 }" @click="category(1)">
					<img src="../assets/image/icon_login_Pwd.png" />
					<div>登录密码</div>
				</div>
				<div :class="{ current_tabs: current === 2 }" @click="category(2)">
					<img src="../assets/image/icon_order.png" />
					<div>订单中心</div>
				</div>
			</div>
			<div class="per_main" v-if="current === 0">
				<div class="tene">
					<div class="lab">头像:</div>
					<img class="ava" src="../assets/image/avator.png" alt="">
				</div>
				<div class="tene">
					<div class="lab">昵称:</div>
					<input class="int" type="text" placeholder="昵称不得超过20个字符以内，允许汉字、英文、字符任意">
				</div>
				<div class="saveinfo">保存</div>
			</div>
			<div class="per_main" v-if="current === 1">
				<div class="login_int"><input type="text" placeholder="手机号码"></div>
				<div class="login_int"><input type="text" placeholder="短信验证码"></div>
				<div class="login_int"><input type="text" placeholder="请输入密码"></div>
				<div class="login_int"><input type="text" placeholder="确认密码"></div>
				<div class="saveinfo">保存</div>
			</div>
			<div class="per_main" v-if="current === 2">
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane label="已购数据" name="first">
						<el-table :data="tableData" style="width: 100%">
							<el-table-column prop="name" label="数据名称" width="150"></el-table-column>
							<el-table-column prop="category" label="所属分类" width="120"></el-table-column>
							<el-table-column prop="price" label="价格" width="120"></el-table-column>
							<el-table-column prop="status" label="交易状态" width="120"></el-table-column>
							<el-table-column prop="times" label="完成时间" width="150"></el-table-column>
							<el-table-column  label="操作">删除</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="待支付订单" name="second">待支付订单</el-tab-pane>
					<el-tab-pane label="已取消订单" name="third">已取消订单</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
import Nav from '../components/nav.vue';
export default {
	name: 'Home',
	data: () => ({
		change: ['最新', '热门'],
		activeName: 'first',
		current: 0,
		tableData: [
			{
				name: 'KSJHD20201516',
				category: '文本',
				price: '5.00¥',
				status:'已完成',
				times:'2020/09/07 14:00'
			},
			{
				name: 'KSJHD20201516',
				category: '文本',
				price: '5.00¥',
				status:'已完成',
				times:'2020/09/07 14:00'
			},
			{
				name: 'KSJHD20201516',
				category: '文本',
				price: '5.00¥',
				status:'已完成',
				times:'2020/09/07 14:00'
			},
			{
				name: 'KSJHD20201516',
				category: '文本',
				price: '5.00¥',
				status:'已完成',
				times:'2020/09/07 14:00'
			},
		]
	}),
	components: {
		Nav
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
		category(index) {
			this.current = index;
		}
	}
};
</script>

<style>
	@import url("../assets/css/index.css");
</style>
