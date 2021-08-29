<template>
  <div>
    <ToastMessage></ToastMessage>
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '../components/frontend/Navbar.vue'
import emitter from '@/methods/emitter'
import ToastMessage from '@/components/ToastMessage.vue'
export default {
  components: {
    Navbar,
    ToastMessage
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>
