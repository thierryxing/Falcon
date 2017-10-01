<template>
  <div>
    <iframe :src="url" width="100%" height="1000px"></iframe>
  </div>
</template>

<script>
  export default {

    data () {
      return {
        url: `${process.env.JAGUAR_HOST}/sidekiq`
      }
    }

  }
</script>
