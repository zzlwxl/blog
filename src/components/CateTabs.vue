<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" >
    <a-menu-item key="全部" @click="changeCate(0)" >
      <!-- <template #icon>
          后续会对后端进行修改以便匹配组件
        <mail-outlined />
      </template> -->
     全部
    </a-menu-item>
    <a-menu-item v-for="(item,index) in cateList" :key="index" @click="changeCate(item.id)">
      <!-- <template #icon>
          后续会对后端进行修改以便匹配组件
        <mail-outlined />
      </template> -->
     {{item.name}}
    </a-menu-item>

  </a-menu>
</template>
<script>
import { defineComponent, reactive,ref} from 'vue';
import {getCates} from '../request/api.js'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  setup(props,context) {
      const current = ref(['全部']);
    let cateList = reactive([])
    getCates().then((res) => {
            if (res.status !== 0) {
              return message.error(res.message)
            }
            console.log(res.data)
            cateList.push(...res.data)
            console.log(cateList)
          })
          const changeCate=(id)=>{
            context.emit('changeCateByTab',id)
          }
    return {
      changeCate,
        current,
      cateList
    };
  },

  components: {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
});
</script>
