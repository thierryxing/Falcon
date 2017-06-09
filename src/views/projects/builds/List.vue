<template>
  <div class="box">
    <div class="box-header with-border">
      <h3 class="box-title">Builds</h3>
    </div>
    <table-box :url="url" :pathParams="pathParams" :options="options">
      <tr slot="ths">
        <th>ID</th>
        <th>Status</th>
        <th>Version</th>
        <th>Operator</th>
        <th>Environment</th>
        <th>Release Notes</th>
        <th>Updated Time</th>
        <th style="width:200px">Action</th>
      </tr>
      <template slot="item" scope="props">
        <tr>
          <td>
            {{ props.item.id }}
          </td>
          <td>
            <span class="label" :class="getStatusText(props.item.status)">{{ props.item.status }}</span>
          </td>
          <td>
            <div>
              {{ props.item.version }}
            </div>
            <div>
              {{ props.item.number }}
            </div>
          </td>
          <td>
            {{ props.item.operator.name }}
          </td>
          <td>
            {{ props.item.environment.name }}
          </td>
          <td>
          </td>
          <td>
            {{ props.item.updated_at }}
          </td>
          <td>
            <div class="btn-group">
              <router-link
                :to="{ name: 'build_detail', params: { id: $route.params.id, env_id:$route.params.env_id, build_id:props.item.id }}"
                class="btn btn-block btn-info">
                Detail
              </router-link>
            </div>
            <div class="btn-group">
              <router-link
                :to="{ name: 'build_detail', params: { id: $route.params.id, env_id:$route.params.env_id, build_id:props.item.id }}"
                class="btn btn-block btn-info">
                Download
              </router-link>
            </div>
          </td>
        </tr>
      </template>
    </table-box>
  </div>
</template>

<script>
  import * as API from '@/constants/api'
  import TableBox from '@/components/global/TableBox'

  export default {
    components: {TableBox},

    data () {
      return {
        url: API.projectBuilds,
        pathParams: {id: this.$route.params.project_id},
        options: null
      }
    },

    methods: {
      getStatusText (status) {
        switch (status) {
          case 'failed': {
            return 'bg-red'
          }
          case 'success': {
            return 'bg-green'
          }
          case 'canceled': {
            return 'bg-yellow'
          }
          case 'processing': {
            return 'bg-blue'
          }
        }
      }
    }

  }
</script>
