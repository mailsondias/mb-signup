<script>
import Access from './Access.vue'
import Company from './Company.vue'
import Person from './Person.vue'
import Start from './Start.vue'

export default {
  name: 'resume',
  components: {
    Person,
    Company,
    Access,
    Start
  },
  props: {
    step: {
      type: Number
    },
    formData: {
      type: Object
    },
  },
  computed: {
    isPerson() {
      return this.formData.kind_register === 1
    },
    isCompany() {
      return this.formData.kind_register === 2
    },
  },
  data() {
    return {
      localData: this.formData,
      isValid: true
    }
  },
}
</script>

<template>
  <div class="fieldset">
    <Start :form-data="localData" :step="4" />
    <Person v-if="isPerson" :form-data="localData" :step="4" />
    <Company v-if="isCompany" :form-data="localData" :step="4" />
    <Access :form-data="localData" :step="4" />
  </div>
</template>

<style scoped>
</style>