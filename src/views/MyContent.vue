<template>
  <a-list class="demo-loadmore-list" :loading="loading" item-layout="horizontal" :data-source="contentList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-comment :author="item.author_id" avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
          <template #content>
            <p>
              {{ item.content_view }}
            </p>
          </template>
          <template #datetime>
            <a-tooltip>
              <span>{{ item.pub_date }}</span>
            </a-tooltip>
          </template>
        </a-comment>
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
import moment from 'moment'
import { defineComponent, reactive, ref, watch } from 'vue'
import { getContentListByUser} from '../request/api.js'
import { message } from 'ant-design-vue'
export default defineComponent({
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
      moment,
      contentList,
    }
  },
})
</script>
