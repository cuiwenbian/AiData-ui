<template>
	<div>
		<div class="nav_index" >
			<div class="nav_logo"><span><img src="../assets/image/logo.png" /></span><span style="font-size: 30px;font-weight: bold;color: #FFFFFF;">Ai Data</span></div>
			<div class="nav_per nav_pers">
				<img src="../assets/image/avator.png" alt="" @click="toMyPage"/>
				<p>登录</p>
				<p>|</p>
				<p @click="$router.push('/register')" style="cursor: pointer;">注册</p>
				<p>EN</p>
				<p>中文</p>
			</div>
		</div>
		<div class="banner">
			<div class="content">
				<div class="banner_title">
					<h2>欢迎使用 Ai Date </h2>
					<h4>为全球提供免费、优势的数据资源，为人们提供专业的数据信息交流平台。</h4>
					<div class="btns">
						<div class="register">注册</div>
						<div class="contact">联系我们</div>
					</div>
				</div>
				<div class="banner_tight_img"><img src="../assets/image/banner_onimg.png" /></div>
			</div>
		</div>
		<div class="content">
			<div class="cate_list">
				<div class="cate_list_i">
					<div class="cate_lis_title">分类目录:</div>
					<ul class="cate_list_item">
						<li class="all">全部</li>
						<li>智能驾驶</li>
						<li>智慧文娱</li>
						<li>智能教育</li>
						<li>智能医疗</li>
						<li>智能零售</li>
						<li>智慧工业</li>
					</ul>
				</div>
				<div class="cate_list_i">
					<div class="cate_lis_title">数据类型:</div>
					<ul class="cate_list_item">
						<li class="all">全部</li>
						<li>图像和视频数据</li>
						<li>语音数据</li>
						<li>文本数据</li>
					</ul>
				</div>
				<div class="cate_list_i">
					<div class="cate_lis_title">标注筛选:</div>
					<ul class="cate_list_item">
						<li class="all">全部</li>
						<li>已标注</li>
						<li>未标注</li>
					</ul>
				</div>
			</div>
			<div class="main_Date">
				<div class="main_list">
					<div class="tit_img">
						<img class="video_img" src="../assets/image/video_date.png" />
						<div>视频图像数据</div>
					</div>
					<div class="video_data_list">
						<div class="video_data_list_item" @click="go">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="main_list">
					<div class="tit_img">
						<img class="voice_img" src="../assets/image/voice_date.png" />
						<div>语音数据</div>
					</div>
					<div class="video_data_list">
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="main_list">
					<div class="tit_img">
						<img class="text_img" src="../assets/image/text_date.png" />
						<div>文本数据</div>
					</div>
					<div class="video_data_list">
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
						<div class="video_data_list_item">
							<div class="cover"><img src="../assets/image/fengmian.png" alt="" /></div>
							<div class="data_desc">
								<div class="data_desc_title">50小时中国人说英语手机采集语...</div>
								<div class="flex" style="margin-top: 14px;">
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
									<div class="flex up">
										<img src="../assets/image/icon.png" alt="" />
										<p>12.5w</p>
									</div>
								</div>
								<div class="flex up" style="margin-top: 23px;">
									<p>亚洲人</p>
									<p>|</p>
									<p>高清</p>
									<p>|</p>
									<p>大数据</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
	require('../assets/js/index.js');
export default {
	name: 'Home',
	data: () => ({
		change: ['最新', '热门'],
		current: 0
	}),
	mounted() {
		console.log(process.env.NODE_ENV)
	},
	methods: {
		toMyPage() {
			this.$router.push('/my_info');
		},
		go() {
			this.$router.push('/detail_voice');
		},
		category(index) {
			this.current = index;
		}
	}
};
</script>
<style>
@import url("../assets/css/base.css");
@import url('../assets/css/index.css');
</style>
