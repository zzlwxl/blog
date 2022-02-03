<template>
  <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item ref="name" label="用户名" name="username">
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item label="密码" name="password">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">登录</a-button>
      <a-button type="primary" style="margin-left: 10px" @click="$router.push('/reguser')">注册</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { login } from '../request/api.js'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import { getStore, setStore, removeStore } from '../utils/utils.js'
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const formRef = ref()
    const formState = reactive({
      username: '',
      password: '',
    })
    const rules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 10,
          message: '只允许3-10个字符',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 10,
          message: '只允许3-10个字符',
          trigger: 'blur',
        },
      ],
    }
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          login(formState).then((res) => {
            if (res.status !== 0) {
              return message.error(res.message)
            }
            message.success(res.message)
            console.log(res)
            //token存到本地
            setStore('token', res.token)
            store.commit('SET_TOKEN', res.token)
            store.commit('SET_LOGINSTATE', true)
            console.log(store.state)
            router.back()
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
    }

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
      resetForm,
    }
  },
})
</script>
