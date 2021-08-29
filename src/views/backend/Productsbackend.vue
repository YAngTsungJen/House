<template>
  <div>
    <Loading :active="isLoading">
      <div class="loadingio-spinner-bean-eater-iiyd8q7jvxl"><div class="ldio-lel05sjhpma">
      <div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
      </div></div>
    </Loading>
    <div class="text-end">
      <button type="button" class="btn btn-primary" @click="openModal(true)">增加一個產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="60">日期</th>
          <th width="200">主圖</th>
          <th width="120">分類</th>
          <th width="120">產品名稱</th>
          <th width="200">地址</th>
          <th width="120">地坪</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>
            {{ $filters.date(item.time) }}
          </td>
          <td>
            <div style="height: 100px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${item.imageUrl})`}">
            </div>
          </td>
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.place }}</td>
          <td class="text-right">
            {{ $filters.currency(item.origin_price) }}
          </td>
          <td class="text-right">
            {{ $filters.currency(item.price) }}
          </td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ProductsModal ref="products" :product="tempProducts" @update-product="updateProduct"></ProductsModal>
    <!-- :product="tempProducts" props前內後外 -->
    <!-- 在此處接收emit事件 -->
    <DelModal ref="del" :product="tempProducts" @del-product="delProduct"></DelModal>
    <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
  </div>
</template>

<script>
import ProductsModal from '../../components/backend/ProductsModal.vue'
import DelModal from '../../components/backend/DelModal.vue'
import Pagination from '../../components/Pagination.vue'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProducts: {},
      isNew: false,
      isLoading: false,
      messageTitle: ''
    }
  },
  components: {
    ProductsModal,
    DelModal,
    Pagination
  },
  inject: ['emitter'],
  methods: {
    delProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProducts.id}`
      this.isLoading = true
      this.$http.delete(url).then((res) => {
        this.isLoading = false
        const del = this.$refs.del
        del.hideModal()
        this.emitter.emit('push-message', {
          style: 'danger',
          title: '刪除產品'
        })
        this.getProducts()
      })
        .catch((error) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '刪除失敗',
            content: error.data.message.join('、')
          })
        })
    },
    openDelModal (item) {
      this.tempProducts = { ...item }
      const del = this.$refs.del
      del.showModal()
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProducts = {}
      } else {
        this.tempProducts = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.products
      productComponent.showModal()
    },
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.axios.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success === true) {
            console.log(res.data)
            this.products = res.data.products
            this.pagination = res.data.pagination
          }
        })
    },
    // 內層透過emit傳過來tempProducts為此 item
    updateProduct (item) {
      this.tempProducts = item
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      this.messageTitle = '新增成功'
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
        this.messageTitle = '編輯成功'
      }
      const productComponent = this.$refs.products
      this.isLoading = true
      this.$http[httpMethod](api, { data: this.tempProducts })
        .then((res) => {
          this.isLoading = false
          productComponent.hideModal()
          this.getProducts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: this.messageTitle
          })
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '編輯失敗',
            content: error.data.message.join('、')
          })
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style type="text/css">
@keyframes ldio-lel05sjhpma-1 {
    0% { transform: rotate(0deg) }
   50% { transform: rotate(-45deg) }
  100% { transform: rotate(0deg) }
}
@keyframes ldio-lel05sjhpma-2 {
    0% { transform: rotate(180deg) }
   50% { transform: rotate(225deg) }
  100% { transform: rotate(180deg) }
}
.ldio-lel05sjhpma > div:nth-child(2) {
  transform: translate(-15px,0);
}
.ldio-lel05sjhpma > div:nth-child(2) div {
  position: absolute;
  top: 40px;
  left: 40px;
  width: 120px;
  height: 60px;
  border-radius: 120px 120px 0 0;
  background: #f8b26a;
  animation: ldio-lel05sjhpma-1 1s linear infinite;
  transform-origin: 60px 60px
}
.ldio-lel05sjhpma > div:nth-child(2) div:nth-child(2) {
  animation: ldio-lel05sjhpma-2 1s linear infinite
}
.ldio-lel05sjhpma > div:nth-child(2) div:nth-child(3) {
  transform: rotate(-90deg);
  animation: none;
}@keyframes ldio-lel05sjhpma-3 {
    0% { transform: translate(190px,0); opacity: 0 }
   20% { opacity: 1 }
  100% { transform: translate(70px,0); opacity: 1 }
}
.ldio-lel05sjhpma > div:nth-child(1) {
  display: block;
}
.ldio-lel05sjhpma > div:nth-child(1) div {
  position: absolute;
  top: 92px;
  left: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e15b64;
  animation: ldio-lel05sjhpma-3 1s linear infinite
}
.ldio-lel05sjhpma > div:nth-child(1) div:nth-child(1) { animation-delay: -0.67s }
.ldio-lel05sjhpma > div:nth-child(1) div:nth-child(2) { animation-delay: -0.33s }
.ldio-lel05sjhpma > div:nth-child(1) div:nth-child(3) { animation-delay: 0s }
.loadingio-spinner-bean-eater-iiyd8q7jvxl {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-lel05sjhpma {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-lel05sjhpma div { box-sizing: content-box; }
/* generated by https://loading.io/ */
</style>
