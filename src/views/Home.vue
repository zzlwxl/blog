<template>
  <a-space> </a-space>
  <a-layout :style="{ overflow: 'hidden' }">
    <a-layout-sider breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
      <div class="logo">渣渣龙博客</div>
      <a-menu theme="dark" mode="inline">
        <a-menu-item @click="userInfoFun" key="1">
          <user-outlined />
          <span class="nav-text">{{ userName }}</span>
        </a-menu-item>
        <a-menu-item key="2">
          <FormOutlined />
          <span @click="$router.push('/article/add')" class="nav-text">发布文章</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span class="nav-text" @click="$router.push('/article/my')">我的文章</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0, height: '10vh' }">
        <CateTabs @changeCateByTab="changeCateID"></CateTabs>
      </a-layout-header>
      <a-layout-content :style="{ overflow: 'auto', height: '90vh' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">

          <ContentCard :cate_id="cate_id"></ContentCard>
          <a-layout-footer style="text-align: center"> 底部 </a-layout-footer>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getUserinfo } from '../request/api.js'
import { message } from 'ant-design-vue'
import { getStore, setStore, removeStore } from '../utils/utils.js'
import { UserOutlined, FormOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref, reactive, provide } from 'vue'
import ContentCard from '../components/ContentCard.vue'
import CateTabs from '../components/CateTabs.vue'
export default defineComponent({
  components: {
    UserOutlined,
    FormOutlined,
    UploadOutlined,
    CateTabs,
    ContentCard,
  },

  setup() {
    //切换为我的文章
    const toggleMyContent = ref(true)
    const router = useRouter()
    const store = useStore()
    let cate_id = ref(0)
    let userName = ref('未登录')
    //已登录就获取用户信息
    if (getStore('token')) {
      getUserinfo().then((res) => {
        console.log('5555', res)
        if (res.status !== 0) {
          return message.error(res.message)
        }
        userName.value = res.data.username
        store.commit('SET_LOGINSTATE', true)
        console.log('username', userName)
      })
    }

    const onCollapse = (collapsed, type) => {
      console.log(collapsed, type)
    }

    const onBreakpoint = (broken) => {
      console.log(broken)
    }
    //用户详情页：/详情/登录
    const userInfoFun = () => {
      if (store.state.loginState) {
        return router.push('/userinfo')
      }
      router.push('/login')
    }
    //从子组件接收过来的分类ID 再传给父组件文章列表使用
    const changeCateID = (id) => {
      cate_id.value = id
    }
    return {
      onCollapse,
      onBreakpoint,
      userInfoFun,
      userName,
      changeCateID,
      cate_id,
      toggleMyContent,
    }
  },
})
</script>
<style>

.logo {
  text-align: center;
  height: 32px;
  color: rgb(255, 255, 255);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
}
</style>
