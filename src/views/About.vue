<template>
  <div class="about">
    <a-button @click="get" type="primary"> Primary </a-button>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { test } from '../request/api.js'
export default {
  setup() {
    function get() {
      test().then((res) => {
        console.log(res)
      })
    }
    return {
      get,
    }
  },
}
</script>

<style></style>
