<template>
  <div class="file-input">
    <div class="file-input__inner">
      <div class="file-input__name">{{ filename.substr(0, 30) || name }}</div>
      <div class="file-input__btn" @click.prevent="onPickFile">UPLOAD</div>
      <input
        type="file"
        style="display: none;"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked"
      >
    </div>
    <div class="file-input__preview" v-if="!disablePreview">
      <img :src="loading || img || fileurl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEVNTU2Ojo5ISEiIiIiSkpJ0dHRHR0dsbGxUVFRhYWFwcHBnZ2eKiopYWFiCgoJOTk56enrGDZ/XAAAC5klEQVR4nO3b65aaMBRAYQwRRW6+/9OOyi0JIVEq9oS1v3+1HZd7OJOQ6mQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPNSe/nfck7rV+V7qm4REddanvegzhb9A4WEKv77ISCvUXfHVXaIotbTC65eflsIfonCjwxWqriwb8zb0YIWqyvVT20xFxyrs2vGmQd/HpGMV1vNdkW6HpiMVqta87dPDgelIhZV9Xzs8UzKFTfzrW+duu7+IqRRedTSxcw8UeUqF6qbrLvL1zeLwlVRhPi+OaxaFOqXC56uPvcqrW1gnVKjur7+qwi+zdgrblAr7yxNebfpvgzGkVTqFatzpwquN84NY94+mUTjudLotQk9ws+5pyv7RJArnNUSfQ4mFMafTD20Khea1Ca82qjoNP7F1mdLZQpmLZGS16S5tXef3an4ohUJnBYk9jcqsd5oSKFR33zb3tgQKMzvw01ebQKFz7Ivf29jkF7rHvuhq45BfuLihPsXubWziC+0blfEifrDayC90TwyfrjbiC0v/26bL1UY1/tGVXugeiVZXm+Ki/Z+3kF6Yrb/zbV+yx3fCv8RKL1xshjNjtVHN63+7c1+G8ELPZmisNuNJ6jGh/SO+ORVe6NsM58RxtZnfj/HMqexC72ZoJD6DhgnteeZUeKF3MzTME3pam1PZhSub4azNWvufLOdUdKF7MvROqvPnxZzKLtzwMbDFnIouDGyGgURnTiUXhjbDAGdOJRcGN8PARbTnVHBhZDMMJFpzKrkwthmusuZUcOHyPd23L6I5p3ILV0+G7yQacyq4cHugNadyCzdthtNFnOdUbOHGzXBKnOZUbOHGzXAyzanYwq2b4XQRxzmVWrh9M5wShzmVWhg9Gcbloj+b+NgM/91Z9KdNLl9wez2T1MLvofCHKNxIXuHhf3ft+L9/uA8Kf4PCQxTuR0Rhpor9iAgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQ5w+Okiu2MiAePgAAAABJRU5ErkJggg=='" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'path', 'img', 'index', 'disablePreview'],
  data() {
    return {
      filename: '',
      fileurl: '',
      loading: '',
      file: null
    }
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click()
    },
    async onFilePicked(event) {
      const files = event.target.files
      const fileReader = new FileReader()
      this.file = files[0]
      this.filename = files[0].name
      if (this.filename.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      fileReader.onload = (e) => {
        this.fileurl = e.target.result
      }
      fileReader.readAsDataURL(files[0])
      try {
        this.loading = 'https://i.pinimg.com/originals/4f/43/2d/4f432d9234988a5f33b26e0ba06bc6fe.gif'
        const snapshot = await this.$fire.storage
          .ref()
          .child(this.path)
          .put(this.file)
        if(this.index !== undefined) {
          this.$emit('uploadFile', await snapshot.ref.getDownloadURL(), this.index)
        } else {
          this.$emit('uploadFile', await snapshot.ref.getDownloadURL())
        }
        this.loading = ''
        this.$toasted.success('File uploaded')
      } catch (e) {
        this.$toast.error(e)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .file-input {
    &__inner {
      display: flex;
      justify-content: space-between;
    }
    &__name {
      border: 2px solid #20252B;
      border-radius: 4px;
      padding: 12px;
      max-width: 340px;
      width: 100%;
      margin-right: 16px;
    }
    &__btn {
      max-width: 160px;
      width: 100%;
      text-align: center;
      background-color: #1A222D;
      color: #F5F5F5;
      font-size: 14px;
      font-weight: 700;
      padding: 16px 0;
      cursor: pointer;
    }
    &__preview {
      margin-top: 5px;
      max-width: 108px;
    }
  }
</style>
