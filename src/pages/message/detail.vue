<template>
	<div class="app-container">
		<h5 class="app-crumb"><em class="app-crumb-line"></em>消息详情</h5>
		<div class="app-search ml10 mt5 detail-container">
			<h2 class="detailTitle">{{detail.title}}</h2>
            
            <div class="detailContent">
                {{detail.content}}
            </div>
            <p class="postTime">{{detail.createTime}}</p>
		</div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            detail:''
        }
    },
    created(){
        this.getDetail()
    },
    methods:{
        getDetail() {
            let self = this;
            self.$http.get(self.api.getUnreadMessage, {
                params: {
                    accessToken: self.$store.state.user.token,
                    messageID:self.$route.query.messageID
                }
            }, function(response) {
                if(response.data) {
                    self.detail = response.data;
                } else {
                   
                }
            }, function(response) {
                //失败回调
            })
        }
    }
}
</script>
<style>
.detail-container{
    width: 820px;
    margin: 20px auto;
}
.detailTitle{
    text-align: center;
    margin: 50px;
}
.detailContent{
    font-size: 16px;
}
.postTime{
    text-align: right;
    margin-top: 80px;
    font-size: 14px;
}
</style>
