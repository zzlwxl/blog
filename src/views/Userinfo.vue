<template>
  <div>
    <a-modal title="编辑信息" v-model:visible="visibleUpdate" :confirm-loading="confirmLoading" @ok="handleOk">
      <a-form ref="formRef" :model="updateForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item ref="name" label="用户名" name="username">
          <a-input v-model:value="updateForm.username" />
        </a-form-item>
        <a-form-item label="别名" name="nickname">
          <a-textarea v-model:value="updateForm.nickname" />
        </a-form-item>
        <a-form-item label="邮箱" name="email">
          <a-textarea v-model:value="updateForm.email" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
  <div>
    <a-modal title="更改密码" v-model:visible="visibleCode"  @ok="handleUpdateCodeOk">
      <a-form ref="formRef" :model="updateCodeForm" :rules="rulesCode" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item ref="name" label="旧密码" name="oldPwd">
          <a-input-password v-model:value="updateCodeForm.oldPwd" />
        </a-form-item>
        <a-form-item label="新密码" name="newPwd">
          <a-input-password v-model:value="updateCodeForm.newPwd" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
  <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">
    <template #icon>
      <AntDesignOutlined />
    </template>
  </a-avatar>
  <a-descriptions title="" bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
    <a-descriptions-item label="用户名">{{ userName }}</a-descriptions-item>
    <a-descriptions-item label="别名">{{ nickName }}</a-descriptions-item>
    <a-descriptions-item label="邮箱">{{ email }}</a-descriptions-item>
  </a-descriptions>
  <a-button type="primary" @click="showModalUpdate">编辑信息</a-button>
  <a-button style="margin-left: 10px" type="primary" @click="loginOut">退出登录</a-button>
  <a-button style="margin-left: 10px" type="primary" @click="showModalUpdateCode">更改密码</a-button>
</template>

<script>
import { AntDesignOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { updateUserinfo, getUserinfo ,updateCode} from '../request/api.js'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import { getStore, setStore, removeStore } from '../utils/utils.js'

export default defineComponent({
  components: {
    AntDesignOutlined,
  },
  setup() {
    const state = useStore()
    const router = useRouter()
    const visibleUpdate = ref(false)
    const visibleCode = ref(false)
    const confirmLoading = ref(false)
    const formRef = ref()

    const updateForm = reactive({
      username: '',
      nickname: '',
      email: '',
    })
    const updateCodeForm = reactive({
      oldPwd: '',
      newPwd: '',
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
      nickname: [
        {
          required: true,
          message: '请输入别名',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 10,
          message: '只允许3-10个字符',
          trigger: 'blur',
        },
      ],
      email: [
        {
          required: true,
          message: '请输入邮箱',
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
    const rulesCode = {
      oldPwd: [
        {
          required: true,
          message: '请输入旧密码',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 10,
          message: '只允许3-10个字符',
          trigger: 'blur',
        },
      ],
      newPwd: [
        {
          required: true,
          message: '请输入新密码',
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

    const resetForm = () => {
      formRef.value.resetFields()
    }

    const showModalUpdate = () => {
      visibleUpdate.value = true
    }
    const showModalUpdateCode = () => {
      visibleCode.value = true
    }

    const handleOk = () => {
      confirmLoading.value = true
      updateUserinfo(updateForm).then((res) => {
        if (res.status !== 0) {
          visibleUpdate.value = false
          return message.error(res.message)
        }
        message.success(res.message)
        updateUser()
        visibleUpdate.value = false
      })
    }
    const handleUpdateCodeOk = () => {
      confirmLoading.value = true
      updateCode(updateCodeForm).then((res) => {
        if (res.status !== 0) {
          visibleCode.value = false
          return message.error(res.message)
        }
        message.success(res.message)
        confirmLoading.value = false
        router.push('/login')
      })
    }

    let userName = ref('')
    let nickName = ref('')
    let email = ref('')

    const updateUser = () => {
      getUserinfo().then((res) => {
        if (res.status !== 0) {
          return message.error(res.message)
        }
        userName.value = res.data.username 
        nickName.value = res.data.nickname ? res.data.nickname : '未设置别名'
        email.value = res.data.email? res.data.email : '未设置邮箱'
      })
    }
    updateUser()
    //退出登录
    const loginOut = () => {
      removeStore('token')
      state.commit('DEL_TOKEN')
      state.commit('SET_LOGINSTATE', false)
      router.push('/')
    }

    return {
        handleUpdateCodeOk,
        rulesCode,
        updateCodeForm,
      userName,
      nickName,
      email,
      loginOut,
      visibleUpdate,
      visibleCode,
      confirmLoading,
      showModalUpdate,
      showModalUpdateCode,
      handleOk,
      formRef,
      updateForm,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      other: '',
      rules,
      resetForm,
    }
  },
})
</script>
