<template>
  <div class="box box-primary">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header with-border">
      <h3 class="box-title">Edit Project</h3>
    </div>
    <form @submit.prevent="doCreate" accept-charset="UTF-8" method="post">
      <div class="box-body">
        <div class="form-group">
          <label for="title">ITC Team ID</label>
          <input id="title" placeholder="" class="form-control" name="project[title]" v-model="project.title" :disabled="edit">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import LoadingOverlay from '@/components/global/LoadingOverlay'
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'

  export default {
    components: {LoadingOverlay},

    props: ['project', 'edit'],

    data () {
      return {}
    }
  }
</script>
