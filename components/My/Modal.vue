<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">

        <div class="modal-container">
        <img class="modal-close" src="/images/icons/exit.svg" alt="" @click="$emit('close')">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <my-button class="modal-default-button">Send</my-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal"
}
</script>

<style lang="scss" scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 700px;
    margin: 0 auto;
    background-color: #0B1729;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(#0B1729, 0.33);
    transition: all 0.3s ease;
    position: relative;
    padding: 50px 150px;
  }
  .modal-close {
    width: 32px;
    height: 32px;
    right: 16px;
    top: 16px;
    cursor: pointer;
    position: absolute;
  }

  .modal-header {
    margin-top: 0;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 20px;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>
