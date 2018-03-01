<template>
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">Environments</h3>
      <div class="box-tools">
        <router-link class="btn btn-block btn-primary btn-sm" :to="{ name: 'environments_new'}">
          New Environment
        </router-link>
      </div>
    </div>
    <table-box :url="url" :pathParams="pathParams">
      <tr slot="ths">
        <th>ID</th>
        <th>Name</th>
        <th>Version</th>
        <th>Fastlane Template</th>
        <th>Git Branch</th>
        <th>Updated Time</th>
        <th style="width:270px">Action</th>
      </tr>
      <template slot="item" scope="props">
        <tr>
          <td>
            {{ props.item.id }}
          </td>
          <td>
            {{ props.item.name }}
          </td>
          <td>
            {{ props.item.current_version }}
          </td>
          <td>
            {{ props.item.fastlane_template.command }}({{ props.item.fastlane_template.name }})
          </td>
          <td>
            {{ props.item.git_branch }}
          </td>
          <td>
            {{ props.item.updated_at }}
          </td>
          <td>
            <router-link
              :to="{ name: 'build_info', params: { id: $route.params.id, env_id: props.item.id }}"
              class="btn btn-primary">
              Build
            </router-link>
            <router-link
              :to="{ name: 'environments_edit', params: { id: $route.params.id, env_id: props.item.id }}"
              class="btn btn-info">
              Edit
            </router-link>
            <router-link
              :to="{ name: 'environments_config', params: { id: $route.params.id, env_id: props.item.id }}"
              class="btn btn-info">
              Config
            </router-link>
            <router-link
              :to="{ name: 'environments_clone', params: { id: $route.params.id, env_id: props.item.id }}"
              class="btn btn-info">
              Clone
            </router-link>
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
        url: API.environments,
        pathParams: {id: this.$route.params.project_id},
        reloadData: false
      }
    }

  }
</script>
