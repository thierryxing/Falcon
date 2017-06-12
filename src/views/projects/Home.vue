<template>
  <div class="row">
    <div class="col-md-4">
      <info></info>
    </div>
    <div class="col-md-8">
      <dependency></dependency>
    </div>
  </div>
</template>

<script>
  import Info from '@/components/projects/Info'
  import Dependency from '@/components/projects/Dependency'

  export default {
    components: {Info, Dependency}
  }
</script>
