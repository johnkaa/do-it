<template>
  <div class="error__wrapper">
    <div class="container">
      <div v-if="error.statusCode === 404" class="error">
        <div class="error__text">
          <span>Are you lost?</span>
          Please back to the game!
        </div>
        <div class="error__code">
          {{ error.statusCode }}
        </div>
      </div>
      <div v-else class="error">
        <div class="error__text">
          {{ error.message }}
        </div>
        <div class="error__code">
          {{ error.statusCode }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style lang="scss" scoped>
  .error__wrapper {
    height: 100%;
  }
  .container {
    //max-width: 1500px;
  }
  .error {
    font-family: 'Roboto', sans-serif;
    height: 334px;
    display: flex;
    margin-top: 250px;
    max-width: 1170px;
    &__text {
      font-size: 30px;
      line-height: 39px;
      border: 1px solid;
      border-image: linear-gradient(90deg, #1472FF 0%, rgba(20, 114, 255, 0) 94.79%);
      border-image-slice: 1;
      height: 100%;
      padding-left: 84px;
      padding-right: 147px;
      max-width: 580px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        display: block;
      }
    }
    &__code {
      padding: 0 84px;
      height: 100%;
      font-size: 116px;
      line-height: 116px;
      font-weight: 700;
      color: #0F1215;
      max-width: 600px;
      width: 100%;
      display: flex;
      align-items: center;
      background: linear-gradient(90deg, #1472FF 0%, rgba(20, 114, 255, 0) 94.79%);
    }
  }
  @media (max-width: 1100px) {
    .container {
      padding: 0;
    }
    .error {
      flex-direction: column;
      align-items: center;
      height: calc(100vh - 231px);
      text-align: center;
      background: linear-gradient(to bottom, rgba(20, 114, 255, 0), #1472FF 50%);
      margin-top: 120px;
      margin-bottom: 0;
      &__text {
        order: 2;
        border: none;
        padding: 0;
        height: auto;
        color: #0F1215;
        margin-top: 100px;
        line-height: 120%;
      }
      &__code {
        display: inline-block;
        padding: 0;
        color: #fff;
        order: 1;
        background: none;
        height: auto;
      }
    }
  }
  @media (max-height: 650px) {
    .error {
      margin-top: 50px;
      &__text {
        margin-top: 20px;
      }
    }
  }
</style>
