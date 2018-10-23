<template>
  <div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
      <li id="tab-apps" :class="{ active: type === 'app' }">
        <a href="javascript:" @click="switchTab('app')">
          Apps
        </a>
      </li>
      <li id="tab-libs" :class="{ active: type === 'lib' }">
        <a href="javascript:" @click="switchTab('lib')">
          Libs
        </a>
      </li>
      <li class="pull-right">
        <div class="box-tools">
          <router-link class="btn btn-block btn-primary btn-sm" :to="{ name: 'project_new'}">
            New Project
          </router-link>
        </div>
      </li>
    </ul>
    <div class="active tab-pane" id="deliveries">
      <table-box :url="url" :options="options">
        <tr slot="ths">
          <th>ID</th>
          <th>Icon</th>
          <th>Project</th>
          <th>Guardian</th>
          <th>Desc</th>
          <th>Updated Time</th>
        </tr>
        <template slot="item" slot-scope="props">
          <tr>
            <td>
              {{ props.item.id }}
            </td>
            <td>
              <img class="avatar" :src="props.item.icon" v-if="props.item.icon !== null">
              <div class="avatar" v-else>
                G
              </div>
            </td>
            <td>
              <router-link :to="{name:'home', params:{project_id:props.item.id}}">
                {{ props.item.title }}
              </router-link>
            </td>
            <td>
              {{ props.item.guardian.name }}
            </td>
            <td>
              {{ props.item.desc }}
            </td>
            <td>
              {{ props.item.updated_at }}
            </td>
          </tr>
        </template>
      </table-box>
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
        type: '',
        url: API.projects,
        options: null
      }
    },

    created () {
      this.switchTab('app')
    },

    methods: {
      switchTab (type) {
        this.type = type
        this.options = {'type': this.type}
      }
    }
  }
</script>

<style scoped>
  img.avatar, div.avatar {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    line-height: 35px;
  }

  div.avatar {
    background-color: #FFEBEE;
    color: #555;
    font-size: 16px;
    margin-right: 10px;
    text-align: center;
    vertical-align: top;
  }
</style>
