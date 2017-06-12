<template>
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">Environments</h3>
      <div class="box-tools">
        <router-link class="btn btn-block btn-primary btn-sm" :to="{ name: 'environments_new'}">
          New
        </router-link>
      </div>
    </div>
    <table-box :url="url" :pathParams="pathParams">
      <tr slot="ths">
        <th>ID</th>
        <th>Name</th>
        <th>Version</th>
        <th>Template</th>
        <th>Git Branch</th>
        <th>Updated Time</th>
        <th style="width:200px">Action</th>
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
            {{ props.item.build_template }}
          </td>
          <td>
            {{ props.item.git_branch }}
          </td>
          <td>
            {{ props.item.updated_at }}
          </td>
          <td>
            <router-link
              :to="{ name: 'environment_configs', params: { id: $route.params.id, env_id: props.item.id }}"
              class="btn btn-info">
              Config
            </router-link>
            <button type="button" class="btn btn-info" @click="doBuild(props.item.id, props.item.build_template)" v-show="props.item.can_build">
              Build
            </button>
          </td>
        </tr>
      </template>
    </table-box>
  </div>
</template>

<script>
  import * as API from '@/constants/api'
  import TableBox from '@/components/global/TableBox'
  import Enum from '@/constants/enum'

  export default {
    components: {TableBox},

    data () {
      return {
        url: API.environments,
        pathParams: {id: this.$route.params.project_id},
        reloadData: false
      }
    },

    methods: {
      doBuild (envId, template) {
        switch (template) {
          case Enum.Templates.PROD: {
            this.$router.push({name: 'check_dependency', params: {env_id: envId}})
            break
          }
          case Enum.Templates.TEST: {
            break
          }
          case Enum.Templates.BETA: {
            break
          }
          case Enum.Templates.LIB: {
            this.$router.push({name: 'pre_build_lib', params: {env_id: envId}})
            break
          }
        }
      }
    }

  }
</script>
