<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">有隻和牛</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link active" to="/about">關於我們</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">登入</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      classList: {
        'bg-color': 'bg-secondary',
        'text-color': 'text-primary',
        'navbar-color': ''
      }
    }
  },
  methods: {
    scrollFunction () {
      const windowY = window.scrollY
      const innerHeight = window.innerHeight
      if (windowY > innerHeight) {
        this.classList = {
          'bg-color': 'bg-primary',
          'navbar-color': 'navbar-dark',
          'text-color': 'text-white'
        }
      } else {
        this.classList = {
          'bg-color': 'bg-secondary',
          'navbar-color': 'navbar-light',
          'text-color': 'text-green-tree'
        }
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollFunction)
  },
  unmounted () {
    window.removeEventListener('scroll', this.scrollFunction)
  }
}
</script>
