<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">Environment Services</h3>
        </div>
        <table-box :url="url" :pathParams="pathParams" :reloadData.sync="reloadData">
          <tr slot="ths">
            <th></th>
            <th>Service</th>
            <th>Description</th>
            <th>Last edit</th>
            <th>Action</th>
          </tr>
          <template slot="item" slot-scope="props">
            <tr>
              <td>
                <i class="fa" :class="activeClass(props.item)"></i>
              </td>
              <td>
                {{ props.item.title }}
              </td>
              <td>
                {{ props.item.desc }}
              </td>
              <td>
                {{ props.item.updated_at }}
              </td>
              <td>
                <button class="btn btn-warning" @click="showEditService(props.item)">Edit</button>
              </td>
            </tr>
          </template>
        </table-box>
        <confirm-modal :show.sync="showModal" @ok="doUpdate">
          <div slot="title">Edit Service {{ currentService.title }}</div>
          <div slot="body">
            <div class="box-body">
              <form @submit.prevent="doUpdate" accept-charset="UTF-8" method="post" class="form-horizontal">
                <service-field :field.sync="field" v-for="field in currentService.fields" :key="field.title"></service-field>
              </form>
            </div>
          </div>
        </confirm-modal>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API from '@/constants/api'
  import NetWorking from '@/utils/networking'
  import TableBox from '@/components/global/TableBox'
  import ConfirmModal from '@/components/global/ConfirmModal'
  import ServiceField from '@/components/projects/ServiceField'

  export default {
    components: {
      ServiceField,
      TableBox, ConfirmModal
    },

    data () {
      return {
        currentService: {
          fields: []
        },
        showModal: false,
        url: API.services,
        pathParams: {id: this.$route.params.project_id, env_id: this.$route.params.env_id},
        reloadData: false
      }
    },

    methods: {

      showEditService (service) {
        this.currentService = service
        this.showModal = true
      },

      activeClass (service) {
        return service.active ? 'fa-circle text-green' : 'fa-power-off text-gray'
      },

      doUpdate () {
        let data = {}
        for (let field of this.currentService.fields) {
          data[field.name] = field.value
        }
        data['service_type'] = this.currentService.service_type
        NetWorking
          .doPut(API.service, Object.assign(this.pathParams, {service_id: this.currentService.id}), {service: data})
          .then(() => {
            this.reloadData = true
          })
      }
    }
  }
</script>
