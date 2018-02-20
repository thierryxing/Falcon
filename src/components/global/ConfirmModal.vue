<template>
  <div v-show="show" :transition="transition">
    <div class="modal" @click.self="clickMask">
      <div class="modal-dialog">
        <div class="modal-content">
          <!--Header-->
          <div class="modal-header">
            <slot name="header">
              <a type="button" class="close" @click="cancel">x</a>
              <h4 class="modal-title">
                <slot name="title">Are your sure?</slot>
              </h4>
            </slot>
          </div>
          <!--Container-->
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <!--Footer-->
          <div class="modal-footer">
            <button type="button" class="btn btn-default pull-left" @click="cancel">Cancel</button>
            <button type="button" class="btn btn-primary" @click="ok">Confirm</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop in"></div>
  </div>
</template>

<script>
  export default {

    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'Modal'
      },
      // 为true时无法通过点击遮罩层关闭modal
      force: {
        type: Boolean,
        default: false
      },
      // 自定义组件transition
      transition: {
        type: String,
        default: 'modal'
      }
    },

    data () {
      return {
        duration: null
      }
    },

    created () {
      if (this.show) {
        document.body.className += ' modal-open'
      }
    },

    beforeDestroy () {
      document.body.className = document.body.className.replace(/\s?modal-open/, '')
    },

    watch: {
      show (value) {
        // 在显示时去掉body滚动条，防止出现双滚动条
        if (value) {
          document.body.className += ' modal-open'
        } else {
          if (!this.duration) {
            this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000
          }
          window.setTimeout(() => {
            document.body.className = document.body.className.replace(/\s?modal-open/, '')
          }, this.duration || 0)
        }
      }
    },

    methods: {
      ok () {
        this.$emit('ok')
        this.$emit('update:show', false)
      },

      cancel () {
        this.$emit('cancel')
        this.$emit('update:show', false)
      },

      // 点击遮罩层
      clickMask () {
        if (!this.force) {
          this.cancel()
        }
      }
    }
  }
</script>

<style scoped>
.modal {
  display: block;
}

.modal-transition {
  transition: all 0.6s ease;
}

.modal-leave {
  /* 样式没什么用，但可以让根标签的transitionEnd生效，以去掉modal-leave */
  border-radius: 1px !important;
}

.modal-transition .modal-dialog,
.modal-transition .modal-backdrop {
  transition: all 0.5s ease;
}

.modal-enter .modal-dialog,
.modal-leave .modal-dialog {
  opacity: 0;
  transform: translateY(-30%);
}

.modal-enter .modal-backdrop,
.modal-leave .modal-backdrop {
  opacity: 0;
}
</style>
