<template>
  <div class="form-group">
    <label :for="fieldName()" class="col-sm-2 control-label" v-if="field.type!=='hidden'">{{ field.title || field.name }}</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" :placeholder="field.placeholder" :name="fieldName()" v-model="field.value" v-if="field.type==='text'"/>
      <input type="hidden" class="form-control" :name="fieldName()" v-model="field.value" v-if="field.type==='hidden'"/>
      <input type="password" class="form-control" :placeholder="field.placeholder" :name="fieldName()" v-model="field.value" v-if="field.type==='password'"/>
      <textarea class="form-control" rows="5" :placeholder="field.placeholder" :name="fieldName()" v-model="field.value" v-if="field.type==='textarea'"/>
      <input type="checkbox" :name="fieldName()" v-if="field.type==='checkbox'" v-model="field.value"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['field'],

    methods: {
      fieldName () {
        return `service[${this.field.name}]`
      }
    }
  }
</script>
