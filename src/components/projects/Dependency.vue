<template>
  <div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
      <li class="active">
        <a data-toggle="tab" href="javascript:">
          Dependencies
        </a>
      </li>
    </ul>
    <div class="tab-pane">
      <TableBox :url="url" :pathParams="pathParams">
        <tr slot="ths">
          <th>Lib</th>
          <th>Current Version</th>
          <th>Latest Version</th>
        </tr>
        <template slot="item" slot-scope="props">
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
</template>

<script>
  import * as API from '@/constants/api'
  import TableBox from '@/components/global/TableBox'

  export default {
    components: {TableBox},

    data () {
      return {
        url: API.projectDependencies,
        pathParams: {id: this.$route.params.project_id}
      }
    },

    methods: {
      versionClass (needUpdate) {
        if (needUpdate) {
          return 'text-warning'
        } else {
          return ''
        }
      }
    }
  }
</script>
