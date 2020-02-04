<template>
    <div class="login">
        <h3>登陆页面</h3>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-button @click="goLogin" type="primary" size="large">登陆</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        goLogin() {
            this.$http.post('/api/party/nologin/v2/user/login?routingPorts=H5',{
                username: this.username,
                password: this.password,
                businessId: "1001"
            })
            .then(res => {
                console.log(res)
                if(res.status == 0) {
                    Toast({
                        message: res.msg,
                        position: 'middle',
                        duration: 2000
                    });
                    this.$store.commit('setToken', res.data.token)
                    if(this.$route.query.redirect) {
                        this.$router.replace({path: this.$route.query.redirect})
                    }
                    else {
                        this.$router.replace({path: '/'})
                    }
                }
                else {
                    Toast({
                        message: res.msg,
                        position: 'middle',
                        duration: 2000
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
.login {
    width: 100%;
    height: 100%;
    background: url('http://mobile.px.hep.edu.cn/static/img/login-bj.3d70d79.png') no-repeat;
    background-size: contain;
    h3 {
        font-size: px2rem(48px);
        font-weight: bold;
        margin: px2rem(120px) 0;
        @include center();
    }
}
</style>