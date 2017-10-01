<template>
  <div>
    <aggregate></aggregate>
    <weekly-chart></weekly-chart>
  </div>
</template>

<script>
  import Aggregate from '@/components/dashboard/Aggregate'
  import WeeklyChart from '@/components/dashboard/WeeklyChart'

  export default {
    components: {Aggregate, WeeklyChart}
  }
</script>
