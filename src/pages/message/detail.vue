<template>
	<div class="app-container">
		<h5 class="app-crumb"><em class="app-crumb-line"></em>消息详情</h5>
		<div class="app-search ml10 mt5">
			<h2>{{detail.title}}</h2>
            <p>发送日期{{detail.createTime}}</p>
            <div>
                {{detail.content}}
            </div>
		</div>
    </div>
</template>
<script>
export default {
    data() {
        detail:''
    },
    mouted() {

    },
    methods:{
        get() {
            let self = this;
            self.$http.get(self.api.getUnreadMessage, {
                params: {
                    accessToken: self.$store.state.user.token,
                    messageID:self.$route.params.id
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
