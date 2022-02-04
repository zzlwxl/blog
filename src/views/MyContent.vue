<template>
<a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    sub-title="返回"
    @back="$router.back"
  />
  <a-list item-layout="vertical" size="large" :loading="loading" :data-source="contentList">
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span v-for="{ type, text } in actions" :key="type">
            <component v-bind:is="type" style="margin-right: 8px" />
            {{ text }}
          </span>
          <a @click="$router.push(`/article/edit/${item.id}`)">
            <FormOutlined />
            编辑文章
            </a>
        </template>
        <template #extra>
          <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
        </template>
        <a-list-item-meta>
          <template #title>
            <a>{{ item.title }}</a>
          </template>
          <template #avatar><a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></template>
        </a-list-item-meta>
        {{ item.content_view }}
      </a-list-item>
    </template>
    <template #loadMore>
      <div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-spin v-if="loadingMore" />
        <a-button v-else @click="loadMore">加载更多</a-button>
      </div>
    </template>
  </a-list>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import { getContentListByUser } from '../request/api.js'
import { StarOutlined, LikeOutlined, MessageOutlined ,FormOutlined} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined,
    FormOutlined
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
    let loadingMore = ref(false)
    let contentList = reactive([])
     const router = useRouter()
    

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
    ]

    //加载所有文章列表
    const loadMore = () => {
      getContentListByUser(offset, limit).then((res) => {
        console.log(res)
        if (res.status !== 0) {
          return message.error(res.message)
        }
        message.success(res.message)
        console.log(res)
        offset += limit
        if (!res.data.length) {
          message.info('所有文章加载完毕')
          loadingMore.value = true
        }
        contentList.push(...res.data)
      })
    }
    loadMore()
    return {
      loading,
      loadingMore,
      loadMore,
      contentList,
      actions,
    }
  },
})
</script>
