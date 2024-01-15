<script>
export default {
  name: 'person',
  props: {
    step: {
      type: Number
    },
    formData: {
      type: Object
    }
  },
  computed: {
    resumeStep() {
      return this.step === 4
    }
  },
  data() {
    return {
      name: this.formData.name ?? null,
      register_id: this.formData.register_id ?? null,
      born_date: this.formData.born_date ?? null,
      phone: this.formData.phone ?? null,
      isValid: false
    }
  },
  methods: {
    handleName(el) {
      if (this.validName(el.target.value)) {
        this.name = el.target.value.toUpperCase()
      }
    },
    handleRegisterId(el) {
      if (this.validRegisterId(el.target.value.trim())) {
        this.register_id = el.target.value.trim()
      }
    },
    handleBornDate(el) {
      if (el.target.value.length <= 8 && this.validDate(el.target.value.trim())) {
        this.born_date = el.target.value.trim()
      }
    },
    handlePhone(el) {
      if (el.target.value) {
        if (el.target.value.length <= 14) {
          const x = el.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/)
          this.phone = '(' +x[1] + ') '+ x[2] + x[3]
        }
      }
    },
    validStep() {
      if (this.name && this.register_id && this.born_date && this.phone) {
        if (this.validPhone(this.phone)) {
          this.isValid = true
        }
      }

      const payload = {
        name: this.name,
        register_id: this.register_id,
        born_date: this.born_date,
        phone: this.phone,
        isValid: this.isValid
      }

      this.$emit('valid', payload)
    },
    validName(name) {
      return /^[a-zA-Z]{2,30}$/.test(name)
    },
    validRegisterId(id) {
      return /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(id)
    },
    validDate(date) {
      return /\d{2}[-\/\.]\d{2}[-\/\.]\d{4}|\d{8}/.test(date)
    },
    validPhone(phone) {
      return phone.length >= 11
    },
  }
}
</script>

<template>
  <div class="fieldset">
    <div>
      <label for="name">Nome</label>
      <input
        v-model="name"
        id="name"
        name="name"
        type="text"
        class="input"
        required
        :disabled="resumeStep"
        :maxlength="25"
        @input="handleName"
        @blur="validStep"
      />
    </div>
    <div>
      <label for="register_id">CPF</label>
      <input
        v-model="register_id"
        id="register_id"
        name="register_id"
        type="text"
        class="input"
        required
        :disabled="resumeStep"
        :minlength="10"
        :maxlength="11"
        @input="handleRegisterId"
        @blur="validStep"
      />
    </div>
    <div>
      <label for="born_date">Data de nascimento</label>
      <input
        v-model="born_date"
        id="born_date"
        name="born_date"
        type="text"
        class="input"
        required
        :disabled="resumeStep"
        :minlength="8"
        :maxlength="8"
        @input="handleBornDate"
        @blur="validStep"
      />
    </div>
    <div>
      <label for="phone">Telefone</label>
      <input
        :value="phone"
        id="phone"
        name="phone"
        type="text"
        class="input"
        required
        :disabled="resumeStep"
        :minlength="13"
        :maxlength="14"
        @input="handlePhone"
        @blur="validStep"
      />
    </div>
  </div>
</template>

<style scoped>
.types {
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