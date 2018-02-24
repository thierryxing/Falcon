<template>
  <div class="box-body">
    <div class="form-group">
      <label for="platform">Platform</label>
      <select class="form-control" id="platform" name="template[platform]" v-model="template.platform">
        <option v-for="option in options" :key="option.name" :value="option.value">{{ option.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="name">Name</label>
      <input class="form-control" id="name" name="template[name]" v-model="template.name"/>
    </div>
    <div class="form-group">
      <label for="command">Fastlane Command</label>
      <div class="input-group">
        <span class="input-group-addon">fastlane</span>
        <input class="form-control" id="command" name="template[command]" v-model="template.command" placeholder="eg: do_publish_beta"/>
      </div>
    </div>
  </div>
</template>

<script>
import Enum from '@/constants/enum'

export default {
  props: ['template'],

  data() {
    return {
      options: []
    };
  },

  created() {
    this.setOptions()
  },

  methods: {
    setOptions() {
      for (let platform in Enum.Platforms) {
        if (Enum.Platforms.hasOwnProperty(platform)) {
          this.options.push({
            name: platform,
            value: Enum.Platforms[platform]
          });
        }
      }
    }
  }
};
</script>

