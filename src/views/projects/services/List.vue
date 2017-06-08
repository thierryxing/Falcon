<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">Project Services</h3>
        </div>
        <div class="box-body">
          <table class="table table-hover table-bordered">
            <tbody>
            <tr>
              <th></th>
              <th>Service</th>
              <th>Description</th>
              <th>Last edit</th>
            </tr>
            <tr v-for="service in services">
              <td>
                <i class="fa" :class="activeClass(service)"></i>
              </td>
              <td>
                <router-link :to="{name:'service_edit', params:{'service_id':service.id}}">
                  <strong>
                    {{ service.name }}
                  </strong>
                </router-link>
              </td>
              <td>
                {{ service.desc }}
              </td>
              <td>
                {{ service.updated_at }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'

  export default {
    name: '',
    data () {
      return {
        services: []
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData: function () {
        NetWorking.doGet(API.services,
          {
            id: this.$route.params.project_id
          },
          null,
          response => {
            this.services = response.data
          },
          response => {
          })
      },

      activeClass: function (service) {
        if (service.active) {
          return 'fa-circle text-green'
        } else {
          return 'fa-power-off text-gray'
        }
      }
    }
  }
</script>
