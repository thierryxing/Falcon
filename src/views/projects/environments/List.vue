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
        <th style="width:220px">Action</th>
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
            {{ props.item.build_template_name }}
          </td>
          <td>
            {{ props.item.git_branch }}
          </td>
          <td>
            {{ props.item.updated_at }}
          </td>
          <td>
            <button type="button" class="btn btn-primary" @click="doBuild(props.item.id, props.item.build_template)" v-show="props.item.can_build">
              Build
            </button>
            <router-link
              :to="{ name: 'environment_configs', params: { id: $route.params.id, env_id: props.item.id }}"
              class="btn btn-warning">
              Config
            </router-link>
            <router-link
              :to="{ name: 'environment_clone', params: { id: $route.params.id, env_id: props.item.id }}"
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
        let templateName = ''
        switch (template) {
          case Enum.Templates.Prod: {
            templateName = 'pre_build_prod'
            break
          }
          case Enum.Templates.Test: {
            templateName = 'pre_build_test'
            break
          }
          case Enum.Templates.Beta: {
            templateName = 'pre_build_beta'
            break
          }
          case Enum.Templates.Lib: {
            templateName = 'pre_build_lib'
            break
          }
        }
        this.$router.push({name: templateName, params: {env_id: envId}})
      }
    }

  }
</script>
