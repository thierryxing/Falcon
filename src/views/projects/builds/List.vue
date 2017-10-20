<template>
  <div class="box">
    <div class="box-header with-border">
      <h3 class="box-title">Builds</h3>
    </div>
    <div class="box-body">
      <div class="dataTables_wrapper form-inline dt-bootstrap">
        <div class="row">
          <div class="col-sm-6">
            <div class="dataTables_length">
              <label>
                Choose Environment
                <select name="environments" class="form-control input-sm" v-model="currentEnvironment">
                  <option v-for="environment in environments" :value="environment.id">{{ environment.name }}</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div>
          <table-box :url="url" :pathParams="pathParams" :options="options" :reloadData.sync="reloadData">
            <tr slot="ths">
              <th>ID</th>
              <th>Status</th>
              <th>Version</th>
              <th>Operator</th>
              <th>Environment</th>
              <th>Release Notes</th>
              <th>Updated Time</th>
              <th style="width:300px">Action</th>
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
                    <ul v-for="note in props.item.release_notes">
                      <li>{{ note.content }}</li>
                    </ul>
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
                  <div class="btn-group" v-show="canDownload(props.item)">
                    <button class="btn btn-block btn-info" @click="download(props.item.id)">Download</button>
                  </div>
                  <div class="btn-group">
                    <button class="btn btn-block btn-danger" @click="remove(props.item.id)">Remove</button>
                  </div>
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
  import * as API from '@/constants/api'
  import NetWorking from '@/utils/networking'
  import TableBox from '@/components/global/TableBox'
  import Enum from '@/constants/enum'

  export default {
    components: {TableBox},

    data () {
      return {
        currentEnvironment: '',
        environments: [],
        url: API.projectBuilds,
        pathParams: {id: this.$route.params.project_id},
        options: {params: {environment_id: this.currentEnvironment}},
        reloadData: false
      }
    },

    created () {
      this.fetchEnvironments()
    },

    watch: {
      currentEnvironment (value) {
        this.options.params.environment_id = value
        this.reloadData = true
      }
    },

    methods: {
      fetchEnvironments () {
        NetWorking.doGet(API.environments, {id: this.$route.params.project_id})
          .then(response => {
            this.environments = [{'id': '', name: 'All'}].concat(response.data.list)
          })
      },

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
      },

      download (buildId) {
        NetWorking
          .doDownload(API.buildDownload, {id: this.$route.params.project_id, build_id: buildId})
      },

      remove (buildId) {
        NetWorking
          .doDelete(API.build, {id: this.$route.params.project_id, build_id: buildId})
          .then(() => {
            this.reloadData = true
          })
      },

      canDownload (build) {
        return build.status === Enum.BuildStatus.Success
      }
    }

  }
</script>
