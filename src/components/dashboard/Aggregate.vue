<template>
  <div class="row">
    <div class="col-lg-3 col-xs-6" v-for="(aggregate,index) in aggregates" :key="index">
      <div class="small-box" :class="getBg(index)">
        <div class="inner">
          <h3>{{ aggregate.value }}</h3>
          <p>{{ aggregate.name }}</p>
        </div>
        <div class="icon">
          <i class="fa" :class="getIcon(index)"></i>
        </div>
        <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import NetWorking from '@/utils/networking'
import * as API from '@/constants/api';

export default {
  data() {
    return {
      aggregates: []
    };
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      NetWorking.doGet(API.dashboard).then(
        response => {
          this.aggregates = response.data.list
        },
        () => { }
      )
    },

    getBg(index) {
      return ['bg-aqua', 'bg-yellow', 'bg-green', 'bg-red'][index];
    },

    getIcon(index) {
      return ['fa-legal', 'fa-bar-chart', 'fa-cube', 'fa-user'][index];
    }
  }
};
</script>
