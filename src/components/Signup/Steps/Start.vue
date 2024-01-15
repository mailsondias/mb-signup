<script>
export default {
  name: 'start',
  props: {
    step: {
      type: Number
    },
    formData: {
      type: Object
    }
  },
  computed: {
    startStep() {
      return this.step === 0
    },
    resumeStep() {
      return this.step === 4
    }
  },
  data() {
    return {
      email: this.formData.email ?? null,
      kind_register: this.formData.kind_register ?? null,
      isValid: false
    }
  },
  methods: {
    handleInput(el) {
      this.email = el.target.value.trim()
    },
    handleRadio(el) {
      this.kind_register = el.target.value
      this.validStep()
    },
    validStep() {
      if (this.validEmail(this.email) && this.kind_register) {
        this.isValid = true
      }
      const payload = {
        email: this.email,
        kind_register: Number(this.kind_register),
        isValid: this.isValid
      }
      this.$emit('valid', payload)
    },
    validEmail(email) {
      return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
    },
  }
}
</script>

<template>
  <div class="fieldset">
    <div>
      <label for="email">Endereço de email</label>
      <input
        v-model="email"
        id="email"
        name="email"
        type="email"
        class="input"
        required
        :disabled="resumeStep"
        @input="handleInput"
        @blur="validStep"
      />
    </div>
    <div v-if="startStep" class="kind_registers">
      <div class="field">
        <input v-model.number="kind_register" id="1" type="radio" name="kind_register" value="1" :disabled="resumeStep" required @click="handleRadio" />
        <label for="1">Pessoa Física</label>
      </div>
      <div class="field">
        <input v-model.number="kind_register" id="2" type="radio" name="kind_register" value="2" :disabled="resumeStep" required @click="handleRadio" />
        <label for="2">Pessoa Jurídica</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kind_registers {
  display: flex;
  gap: 1rem;
}
.field {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.field label {
  margin: 0;
}
input[type=radio] {
  border: 2px solid #444;
  appearance: none;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  transition: all ease-in 0.05s;
}
input[type=radio]:active,
input[type=radio]:checked {
  background-color: orange;
  border: 2px solid orange;
}

@media (min-width: 768px) {
  .field {
    justify-content: space-between;
  }
}
</style>