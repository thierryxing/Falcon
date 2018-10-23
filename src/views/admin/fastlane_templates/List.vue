<template>
  <div class="box">
    <div class="box-header with-border">
      <h3 class="box-title">Fastlane Templates</h3>
      <div class="box-tools">
        <router-link class="btn btn-block btn-primary btn-sm" :to="{ name: 'fastlane_templates_new'}">
          New Template
        </router-link>
      </div>
    </div>
    <div class="box-body">
      <div class="dataTables_wrapper form-inline dt-bootstrap">
        <div class="row">
        </div>
        <div>
          <table-box :url="url" :reloadData="reloadData">
            <tr slot="ths">
              <th>ID</th>
              <th>Name</th>
              <th>Command</th>
              <th>Platform</th>
              <th>Updated Time</th>
              <th style="width:300px">Action</th>
            </tr>
            <template slot="item" slot-scope="props">
              <tr>
                <td>
                  {{ props.item.id }}
                </td>
                <td>
                  {{ props.item.name }}
                </td>
                <td>
                  {{ props.item.command }}
                </td>
                <td>
                  {{ props.item.platform }}
                </td>
                <td>
                  {{ props.item.created_at }}
                </td>
                <td>
                  <router-link
                    :to="{ name: 'fastlane_templates_edit', params: { id: props.item.id }}"
                    class="btn btn-info">
                    Edit
                  </router-link>
                  <a href="javascript:" @click="confirmDelete(props.item.id)" class="btn btn-danger">Delete</a>
                </td>
              </tr>
            </template>
          </table-box>
        </div>
      </div>
    </div>
    <confirm-modal :show.sync="showModal" @ok="doDelete">
                      <span slot="body">This action CANNOT be undone.
                        This will permanently delete the template and remove all collaborator associations.
                      </span>
    </confirm-modal>
  </div>
</template>

<script>
  import LoadingOverlay from '@/components/global/LoadingOverlay'
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import TableBox from '@/components/global/TableBox'
  import ConfirmModal from '@/components/global/ConfirmModal'

  export default {
    components: {LoadingOverlay, TableBox, ConfirmModal},

    data () {
      return {
        showOverlay: false,
        showModal: false,
        currentEnvironment: '',
        currentTemplateId: '',
        fastlaneTemplates: [],
        url: API.fastlaneTemplates,
        reloadData: false
      }
    },

    methods: {
      doDelete () {
        this.showLoading()
        NetWorking
          .doDelete(API.fastlaneTemplate, {id: this.currentTemplateId})
          .then(() => {
            this.hideLoading()
            this.reloadData = true
          }, () => {
            this.hideLoading()
          })
      },

      showLoading () {
        this.showOverlay = true
      },

      hideLoading () {
        this.showOverlay = false
      },

      confirmDelete (id) {
        this.currentTemplateId = id
        this.showModal = true
      }
    }
  }
</script>
