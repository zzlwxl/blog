<template>
  <div>
    <a-modal title="新增分类" v-model:visible="visibleCate" :confirm-loading="confirmLoading" @ok="addCateOK">
      <a-form :model="formAddCateState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item ref="name" label="分类名" name="name">
          <a-input v-model:value="formAddCateState.name" />
        </a-form-item>
        <a-form-item label="别名" name="alias">
          <a-textarea v-model:value="formAddCateState.alias" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
  <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="分类" name="cate">
      <a-radio-group v-model="formState.cate">
        <a-radio v-for="(item, index) in cateList" :key="index" @click="changeCate(item.id)" :value="item.id">
          {{ item.name }}
        </a-radio>
        <a-button style="margin-left: 10px" type="primary" @click="showModalCate">新增分类</a-button>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import { getCates, addCate } from '../request/api.js'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
export default defineComponent({
  setup(props,context) {
    const visibleCate = ref(false)
    const router = useRouter()
    const confirmLoading = ref(false)
    const formRef = ref()
    let formState = reactive({
      cate: 0,
    })
    
    //选择好分类后传给文章组件
    const changeCate =(id)=>{
      console.log(id)
      context.emit('cateByAdd',id)
    }

    let cateList = reactive([])
    //获取分类
    const onSubmit = () => {
      getCates().then((res) => {
        if (res.status !== 0) {
          return message.error(res.message)
        }
        cateList.length=0
        cateList.push(...res.data)
      })
    }
    onSubmit()
    //新增分类
    const formAddCateState = reactive({
      name: '',
      alias: '',
    })
    const showModalCate = () => {
      visibleCate.value = true
    }
    const addCateOK = () => {
      confirmLoading.value = true
      addCate(formAddCateState).then((res) => {
        if (res.status !== 0) {
          visibleCate.value = false
          return message.error(res.message)
        }
        message.success(res.message)
        console.log(res)
        onSubmit()
        visibleCate.value = false
        confirmLoading.value = false
      })
    }

    const rules = {
      // cate: [{ required: true, message: '请选择文章状态', trigger: 'change' }],
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
      changeCate,
      confirmLoading,
      onSubmit,
      cateList,
      resetForm,
      rules,
      showModalCate,
      visibleCate,
      formAddCateState,
      addCateOK,
    }
  },
})
</script>
