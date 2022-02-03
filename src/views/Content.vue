<template>
  <a-list class="demo-loadmore-list"  item-layout="horizontal" :data-source="contentList">
    <template #renderItem="{ item }">
        <h1>{{item.title}}</h1>
      <a-list-item>
        <a-comment :author="item.author_id" avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
          <template #content>
            <p>
              {{ item.content }}
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
  </a-list>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import { getContentInfo} from '../request/api.js'
import { message } from 'ant-design-vue'
export default defineComponent({
  props:['id'],
  setup(props, context) {
    let contentList = reactive([])

    //加载所有文章列表
    const loadMore = () => {
        getContentInfo(props.id).then((res) => {
          console.log(res)
          if (res.status !== 0) {
            return message.error(res.message)
          }
          console.log(res)
          contentList.push(...res.data)
        })
    }

    loadMore()
    return {
      contentList,
    }
  },
})
</script>
