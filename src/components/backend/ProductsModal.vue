<template>
  <!-- Modal -->
  <div ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <!-- 自行新增 v-model -->
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" id="image"
                  placeholder="請輸入圖片連結" v-model="tempProducts.imageUrl">
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input type="file" id="customFile" class="form-control" ref="fileInput" @change="uploadFile">
              </div>
              <img class="img-fluid" :src="tempProducts.imageUrl" alt="">
              <!-- 延伸技巧，多圖 -->
              <div class="mt-5" v-if="tempProducts.images">
                <div v-for="(image, key) in tempProducts.images" :key="key" class="mb-3 input-group" >
                  <input type="url" class="form-control form-control"
                          placeholder="請輸入連結" v-model="tempProducts.images[key]">
                  <button type="button" class="btn btn-outline-danger" @click="tempProducts.images.splice(key, 1)">
                    移除
                  </button>
                </div>
                <div v-if="tempProducts.images[tempProducts.images.length - 1] || !tempProducts.images.length">
                  <button @click="tempProducts.images.push('')" class="btn btn-outline-primary btn-sm d-block w-100">
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control" id="title"
                        placeholder="請輸入標題" v-model="tempProducts.title">
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input type="text" class="form-control" id="category"
                          placeholder="請輸入分類" v-model="tempProducts.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input type="text" class="form-control" id="unit"
                          placeholder="請輸入單位" v-model="tempProducts.unit">
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input type="number" class="form-control" id="origin_price"
                          placeholder="請輸入原價" v-model.number="tempProducts.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input type="number" class="form-control" id="price"
                          placeholder="請輸入售價" v-model.number="tempProducts.price">
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="address" class="form-label">地址</label>
                  <input type="text" class="form-control" id="address"
                          placeholder="請輸入地址" v-model="tempProducts.address">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="place" class="form-label">地坪</label>
                  <input type="text" class="form-control" id="place"
                          placeholder="請輸入地坪" v-model="tempProducts.place">
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label :time="tempProducts.time" for="time" class="form-label">建立時間：{{ time }}</label>
                  <input type="number" class="form-control" id="time"
                          placeholder="請複製上方號碼" v-model.number="tempProducts.time">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea type="text" class="form-control" id="description"
                          placeholder="請輸入產品描述" v-model="tempProducts.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea type="text" class="form-control" id="content"
                          placeholder="請輸入產品說明內容" v-model="tempProducts.content"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"
                          :true-value="1"
                          :false-value="0"
                          id="is_enabled" v-model="tempProducts.is_enabled">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-product',tempProducts)">確認</button>
          <!-- 在此處觸發emit事件 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  data () {
    return {
      modal: {},
      tempProducts: {},
      time: Math.floor(new Date().getTime() / 1000)
    }
    // 將 modal 進行實體化
  },
  mixins: [
    modalMixin
  ],
  props: {
    product: {
      type: Object,
      default () { return {} }
    }
  },
  // 使用 watch 監聽props的 product，當product有變動時，觸發watch功能
  watch: {
    product () {
      this.tempProducts = this.product
      if (!this.tempProducts.images) {
        this.tempProducts.images = []
      }
    }
  },
  methods: {
    uploadFile () {
      const uploadfile = this.$refs.fileInput.files[0]
      const fileName = this.$refs.fileInput.id
      const formData = new FormData()
      formData.append('file-to-upload', uploadfile)
      // append 增加一個欄位到表單內，其中一個 file-to-upload
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(url, formData).then((res) => {
        if (res.data.success) {
          this.tempProducts.imageUrl = res.data.imageUrl
          document.getElementById(fileName).value = ''
        }
      })
    }
  }
}
</script>
