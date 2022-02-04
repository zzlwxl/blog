<template>
<a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    sub-title="返回"
    @back="$router.back"
  />
  <div class="box">
  <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item ref="name" label="标题" name="title">
      <a-input v-model:value="formState.title" />
    </a-form-item>
    <a-form-item label="内容" name="content">
      <a-textarea v-model:value="formState.content" placeholder="暂时当作富文本编辑器" auto-size />
    </a-form-item>
    <Cate @cateByAdd="changeCateByAdd"></Cate>
    <a-form-item label="状态" name="state">
      <a-radio-group v-model="formState.state">
        <a-radio value="已发布"> 已发布 </a-radio>
        <a-radio value="草稿"> 草稿 </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">更新</a-button>
      <a-button type="primary" style="margin-left: 10px" @click="delSubmit">删除文章</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { getContentInfo,updataContent,delContent} from '../request/api.js'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import Cate from '../components/Cate.vue'
export default defineComponent({
    props:['id'],
  components: {
    Cate,
  },
  setup(props,context) {
    const router = useRouter()
    const formRef = ref()
    const formState = reactive({
      title: '',
      cate_id: 5,
      content: '',
      state: '已发布',
    })
    const rules = {
      title: [
        {
          required: true,
          message: '请输入标题',
          trigger: 'blur',
        },
      ],
      content: [
        {
          required: true,
          message: '请输入文章内容',
          trigger: 'blur',
        },
        {
          min: 10,
          message: '文章内容太少了',
          trigger: 'blur',
        },
      ],
      state: [{ required: true, message: '请选择文章状态', trigger: 'change' }],
    }
    // 接收子组件的值
    const changeCateByAdd = (id) => {
      console.log('接收的值', id)
      formState.cate_id = id
    }
    //更新文章
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          updataContent(props.id,formState).then((res) => {
            if (res.status !== 0) {
              return message.error(res.message)
            }
            message.success(res.message)
            router.back()
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
    //删除文章
    const delSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          delContent(props.id).then((res) => {
            if (res.status !== 0) {
              return message.error(res.message)
            }
            message.success(res.message)
            router.back()
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
    //获取文章信息
    const getContent = () => {
          getContentInfo(props.id).then((res) => {
            if (res.status !== 0) {
              return message.error(res.message)
            }
            console.log(res)
            formState.title=res.data[0].title
            formState.content=res.data[0].content
          })
        }
    getContent()

    const resetForm = () => {
      formRef.value.resetFields()
    }

    return {
      formRef,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      other: '',
      formState,
      rules,
      onSubmit,
      delSubmit,
      changeCateByAdd,
      resetForm,
    }
  },
})
</script>
<style>
.box{
  width: 80%;
  margin: 10px auto;
}
</style>