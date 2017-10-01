<template>
  <div class="row">
    <section class="col-lg-12">
      <div class="nav-tabs-custom" style="cursor: move;">
        <ul class="nav nav-tabs pull-right ui-sortable-handle">
          <li class="pull-left header"><i class="fa fa-inbox"></i>Weekly Builds</li>
        </ul>
        <div class="tab-content no-padding">
          <div class="chart" ref="chart">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'

  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'

  export default {
    data () {
      return {
        results: [],
        legend: [],
        days: [],
        series: []
      }
    },

    created () {
      this.fetchWeeklyData()
    },

    methods: {

      fetchWeeklyData () {
        NetWorking
          .doGet(API.weeklyData)
          .then(response => {
            this.results = response.data
            this.handleData()
          }, () => {
          })
      },

      handleData () {
        for (let result of this.results) {
          this.legend.push(result['platform'])
          this.days = result['days']
          this.series.push({
            name: result['platform'],
            type: 'line',
            stack: 'Mount',
            data: result['data']
          })
        }
        this.buildCharts()
      },

      buildCharts () {
        let chart = echarts.init(this.$refs.chart)
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: this.legend
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '10',
            right: '15',
            bottom: '10',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: this.days
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: this.series
        }
        chart.setOption(option)
      }
    }
  }
</script>

<style scoped>
  .chart {
    width: 100%;
    height: 500px
  }
</style>
