<template>
	<div>
		<Nav></Nav>
		<div class="banner_img">
			<div class="content">
				<div class="banner_card">
					<div class="banner_card_left"></div>
					<div class="banner_card_right">
						<div class="de_infomation">
							<div class="de_info_list"><h3>50小时中国人说英语手机采集语音数据</h3></div>
							<div class="de_info_list info_list_desc">
								<div class="info_list_desc_i">
									<div>下载次数：2500</div>
									<div>
										大小：
										<span>32.2M</span>
									</div>
								</div>
								<div class="info_list_desc_i"><div style="color:#6C6C6C;font-size: 14px;">汉语 | 高清 | 免费试用</div></div>
							</div>
							<div class="de_info_list">
								<button class="down" type="button">付费下载</button>
								<button class="down_free" type="button">免费试用</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="content mt">
			<h2>数据简介</h2>
			<div class="text margin">
				<p>
					《最后的审判》比以前的壁画简单，它描绘了基督来临的那一刻，他要审判生者和死者，被他免罪的人将得到永
					生。由于墙壁面积广大，艺术家面临着一个难题:如何将大约四百个人物安排在这个空间中?必须有一种像旋风一样的
					主要力量将整个空间结合成一体。最后，画面构图采用了水平线与垂直线交叉的复杂结构量将整个空间结合成一体。最后，画面构图采用了水平线与垂直
					线交叉的复杂结构。量将整个空间结合成一体。最后，画面构图采用了水平线与垂直线交叉的复杂结构。量将整个空
					间结合成一体。最后，画面构图采用了水平线与垂直线交叉的复杂结构。
				</p>
			</div>
			<h2>数据规格</h2>
			<div class="date_rule">
				<div class="on">
					<div class="l"><img src="../assets/image/img_MP4.png" /></div>
					<div class="r">
						<p>格式</p>
						<p>视频mp4格式</p>
					</div>
				</div>
				<div class="on">
					<div class="l"><img style="width:75px;height:91px;" src="../assets/image/img_file.png" /></div>
					<div class="r">
						<p>格式</p>
						<p>视频mp4格式</p>
					</div>
				</div>
				<div class="on">
					<div class="l"><img style="width:80px;height:87px;" src="../assets/image/img_dev.png" /></div>
					<div class="r">
						<p>格式</p>
						<p>视频mp4格式</p>
					</div>
				</div>
				<div class="on">
					<div class="l"><img style="width:80px;height:87px;" src="../assets/image/img_env.png" /></div>
					<div class="r">
						<p>格式</p>
						<p>视频mp4格式</p>
					</div>
				</div>
			</div>
			<h2>使用分享</h2>
			<div class="text_area"><textarea rows="" cols=""></textarea></div>
			<div class="tx_b">
				<button class="share_btn" type="button">提交分享</button>
				<div class="share_tip">分享后，将会返回下载支付费用。</div>
			</div>
			<h2>分享区</h2>
			<div class="share_content">
				<div class="comments_list">
					<div class="critics"><img src="../assets/image/avator.png" /></div>
					<div class="critics_info">
						<div class="username">不爱洗澡的鱼泡泡</div>
						<div class="createtime">2020-09-22 10:50</div>
						<div class="comment">
							2017年国务院、中央军委颁布实施新《条例》，这是贯彻习近平强军思想，健全完善军事人力资源政策制度的重大
							创新成果，是建立统一的文职人员制度的重要基础法规，对军队现代化建设和长远发展具有十分重要
							的意义。一是重塑我军军事力量体系的内在要求。大量使用文职人员是现代军队的通行做法，从世界发达国家军队看，文 职人员数量规模一般达到现役员额的一半以上。
						</div>
					</div>
				</div>
				<div class="comments_list">
					<div class="critics"><img src="../assets/image/avator.png" /></div>
					<div class="critics_info">
						<div class="username">不爱洗澡的鱼泡泡</div>
						<div class="createtime">2020-09-22 10:50</div>
						<div class="comment">
							2017年国务院、中央军委颁布实施新《条例》，这是贯彻习近平强军思想，健全完善军事人力资源政策制度的重大
							创新成果，是建立统一的文职人员制度的重要基础法规，对军队现代化建设和长远发展具有十分重要
							的意义。一是重塑我军军事力量体系的内在要求。大量使用文职人员是现代军队的通行做法，从世界发达国家军队看，文 职人员数量规模一般达到现役员额的一半以上。
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Nav from '../components/nav.vue'
export default {
	name: 'Home',
	data: () => ({
		change: ['最新', '热门'],
		current: 0
	}),
	components:{
		Nav,
	},
	methods: {
		go() {
		},
		category(index) {
			this.current = index;
		}
	}
};
</script>
<style>
	@import url("../assets/css/voice_detail.css");
</style>