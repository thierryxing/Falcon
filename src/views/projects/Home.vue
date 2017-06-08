<template>
  <div class="row">
    <info></info>
    <dependency></dependency>
  </div>
</template>

<script>
  import Info from '@/components/projects/Info'
  import Dependency from '@/components/projects/Dependency'

  export default {
    components: {Info, Dependency}
  }
</script>
