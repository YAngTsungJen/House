<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a href="#" class="navbar-brand">後台</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link active" to="/productsbackend">產品列表</router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click="logout">登出</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  inject: ['emitter'],
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/login')
            this.emitter.emit('push-message', {
              style: 'success',
              title: '登出囉'
            })
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '登出失敗誒',
              content: res.data.message.join('、')
            })
          }
        })
    }
  }
}
</script>
