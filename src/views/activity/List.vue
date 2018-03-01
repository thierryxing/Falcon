<template>
  <div class="box">
    <div class="box-header with-border">
      <h3 class="box-title">Activity</h3>
    </div>
    <table-box :url="url">
      <tr slot="ths">
        <th>ID</th>
        <th>Project</th>
        <th>Version</th>
        <th>Operator</th>
        <th>Environment</th>
        <th>Updated Time</th>
        <th style="width:300px">Action</th>
      </tr>
      <template slot="item" scope="props">
        <tr>
          <td>
            {{ props.item.id }}
          </td>
          <td>
            {{ props.item.project.name }}
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
            {{ props.item.updated_at }}
          </td>
          <td>
            <div class="btn-group">
              <router-link
                :to="{ name: 'build_detail', params: { project_id: props.item.project.id, build_id:props.item.id }}"
                class="btn btn-block btn-info">
                Detail
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
  import NetWorking from '@/utils/networking'
  import TableBox from '@/components/global/TableBox'

  export default {
    components: {TableBox},

    data () {
      return {
        url: API.activity
      }
    }

  }
</script>
