<template>
  <a-list item-layout="vertical" size="large" :loading="loading"  :data-source="contentList">
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <!-- <span v-for="{ type, text } in actions" :key="type">
            <component v-bind:is="type" style="margin-right: 8px" />
            {{ text }}
          </span> -->
          <!-- <UserOutlined /> -->
          <!-- <span>{{getAuthor(item.author_id)}}</span> -->
          <a>
          <router-link target="_blank" :to="{path:`/article/info/${item.id}`}">阅读文章</router-link>
            <SendOutlined />
            </a>
        </template>
        <template #extra>
          <!-- <img
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          /> -->
        </template>
        <a-list-item-meta>
          <template #title>
            <h4>{{ item.title }}</h4>
          </template>
          <!-- <template #avatar><a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></template> -->
        </a-list-item-meta>
        {{ item.content_view }}
      </a-list-item>
    </template>
    <template #loadMore>
      <div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-spin v-if="loadingMore" size="large" />
        <a-button v-else @click="loadMore">加载更多</a-button>
      </div>
    </template>
  </a-list>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import { StarOutlined, LikeOutlined, MessageOutlined ,SendOutlined,UserOutlined} from '@ant-design/icons-vue';
import { getContentList ,getContentListByCate,getAuthorName} from '../request/api.js'
import { message } from 'ant-design-vue'
export default defineComponent({
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined,
    SendOutlined,
    UserOutlined
  },
  props: {
    cate_id: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    let offset = 0
    let limit = 10
    let loading = ref(false)
    let flag = ref(true)
    let loadingMore = ref(false)
    let contentList = reactive([])
    //分类ID
    let cateId = ref(0)

    const actions = [
      {
        type: 'StarOutlined',
        text: '156',
      },
      {
        type: 'LikeOutlined',
        text: '156',
      },
      {
        type: 'MessageOutlined',
        text: '2',
      },
    ];

    //接收父组件传过来的分类ID
    // const cate_id = inject('cate_id')
    const { cate_id } = props
    watch(
      () => props.cate_id,
      (newVal, oldVal) => {
        init()
        console.log(newVal)
        if(newVal ===0){
          console.log('加载全部')
          flag.value=true
          loadMore()
        }else{
          console.log('fsdafasdfeaswfew')
          cateId.value=newVal
          flag.value=false
          loadMoreByCate(newVal,offset,limit)
        }
      }
    )
    // 获取文章作者名字
    const getAuthor=(id)=>{
      getAuthorName(id).then((res) => {
          if (res.status !== 0) {
            return message.error(res.message)
          }
          console.log(res.data.username)
          return refres.data.username
        })
    }
    //初始化加载数据
    const init = () => {
      offset = 0
      limit = 10
      loading.value = false
      loadingMore.value = false
      contentList.length = 0
    }
    //加载所有文章列表
    const loadMore = () => {
      loadingMore.value=true
      if(flag.value){
        getContentList(offset, limit).then((res) => {
          console.log(res)
          if (res.status !== 0) {
            return message.error(res.message)
          }
          message.success(res.message)
          console.log(res)
          offset += limit
          if (!res.data.length) {
            message.info('所有文章加载完毕')
            return loadingMore.value = false
          }
            contentList.push(...res.data)
            loadingMore.value=false
        })
      }else{
        console.log('大喊大叫好')
        loadMoreByCate(cateId.value)
      }
    }
    //加载分类下所有文章列表
    const loadMoreByCate = (id) => {
      loadingMore.value=true
      getContentListByCate(id,offset, limit).then((res) => {
        console.log(res)
        if (res.status !== 0) {
          return message.error(res.message)
        }
        message.success(res.message)
        console.log(res)
        offset += limit
        if (!res.data.length) {
          message.info('所有文章加载完毕')
            return loadingMore.value = false
        }
        contentList.push(...res.data)
        loadingMore.value=false
      })
    }
    loadMore()
    return {
      loading,
      loadingMore,
      loadMore,
      contentList,
      actions,
      getAuthor,
    }
  },
})
</script>
<style>
.example {
  text-align: center;
}
</style>