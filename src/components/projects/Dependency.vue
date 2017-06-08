<template>
  <div class="col-md-8">
    <div class="nav-tabs-custom">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="javascript:">
            Dependencies
          </a>
        </li>
        <li>
          <a data-toggle="tab" href="javascript:">
            Properties
          </a>
        </li>
      </ul>
      <div class="tab-pane">
        <TableBox :url="url" :pathParams="pathParams" :options="options">
          <tr slot="ths">
            <th>Lib</th>
            <th>Current Version</th>
            <th>Latest Version</th>
          </tr>
          <template slot="item" scope="props">
            <tr>
              <td>
                {{ props.item.name }}
              </td>
              <td>
                {{ props.item.current_version }}
              </td>
              <td>
                <div :class="versionClass(props.item.need_update)">
                  {{ props.item.latest_version }}
                </div>
              </td>
            </tr>
          </template>
        </TableBox>
        <div class="tab-pane active" id="properties">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API from '@/constants/api'
  import TableBox from '@/components/global/TableBox'

  export default {
    components: {TableBox},

    data () {
      return {
        url: API.projectDependencies,
        pathParams: {id: this.$route.params.project_id},
        options: null
      }
    },

    methods: {
      versionClass: function (needUpdate) {
        if (needUpdate) {
          return 'text-warning'
        } else {
          return ''
        }
      }
    }
  }
</script>
