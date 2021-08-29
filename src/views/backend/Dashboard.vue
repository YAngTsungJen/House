<template>
  <div>
    <div>
      <Navbarbackend></Navbarbackend>
      <ToastMessage></ToastMessage>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessage from '@/components/ToastMessage.vue'
import Navbarbackend from '@/components/backend/Navbarbackend.vue'
export default {
  components: {
    Navbarbackend,
    ToastMessage
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api).then((res) => {
      if (!res.data.success) {
        this.$router.push('/login')
      }
    })
  }
}
</script>
