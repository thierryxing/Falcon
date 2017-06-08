<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Guardian List</h3>
        </div>
        <div class="box-body table-responsive no-padding">
          <table-box :url="url">
            <tr slot="ths">
              <th>ID</th>
              <th>Icon</th>
              <th>Name</th>
              <th>Guard Projects</th>
              <th>Join Time</th>
            </tr>
            <template slot="item" scope="props">
              <tr>
                <td>
                  {{ props.item.id }}
                </td>
                <td>
                  <img class="avatar" :src="props.item.avatar">
                </td>
                <td>
                  {{ props.item.name }}
                </td>
                <td>
                  {{ props.item.guard_projects }}
                </td>
                <td>
                  {{ props.item.created_at }}
                </td>
              </tr>
            </template>
          </table-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import TableBox from '@/components/global/TableBox'

  export default {
    components: {TableBox},

    data () {
      return {
        url: API.users
      }
    }
  }
</script>

