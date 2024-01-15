<script>
export default {
  name: 'company',
  props: {
    step: {
      type: Number
    },
    formData: {
      type: Object,
      default: {}
    }
  },
  compputed: {
    resumeStep() {
      return this.step === 4
    }
  },
  data() {
    return {
      company: this.formData.company ?? null,
      employer_number: this.formData.employer_number ?? null,
      created_at: this.formData.created_at ?? null,
      corporate_phone: this.formData.corporate_phone ?? null
    }
  },
  methods: {
    handleCompany(el) {
      if (this.validCompany(el.target.value)) {
        this.company = el.target.value.toUpperCase()
        return true
      }
    },
    handleEmployeerId(el) {
      if (this.validEmployerNumber(el.target.value.trim())) {
        this.employer_number = el.target.value.trim()
        return true
      }
    },
    handleDate(el) {
      if (this.validDate(el.target.value.trim())) {
        this.created_at = el.target.value.trim()
        return true
      }
    },
    handlePhone(el) {
      if (el.target.value) {
        if (el.target.value.length <= 14) {
          const aux = el.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/)
          this.corporate_phone = '(' +aux[1] + ') '+ aux[2] + aux[3]
        }
      }
    },
    validStep() {
      if (this.company && this.employer_number && this.created_at && this.corporate_phone) {
        const payload = {
          company: this.company,
          employer_number: this.employer_number,
          created_at: this.created_at,
          corporate_phone: this.corporate_phone
        }
  
        this.$emit('valid', payload)
      }
    },
    validCompany(name) {
      return /^[a-zA-Z ]{2,30}$/.test(name)
    },
    validEmployerNumber(id) {
      return true
      // return /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(id)
    },
    validDate(date) {
      return /\d{2}[-\/\.]\d{2}[-\/\.]\d{4}|\d{8}/.test(date)
    },
    validPhone(phone) {
      return phone.length >= 13
    },
  }
}
</script>

<template>
  <div class="fieldset">
    <div>
      <label for="name">Razão Social</label>
      <input
        v-model="company"
        id="company"
        name="company"
        type="text"
        class="input"
        required
        :disabled="resumeStep"
        :maxlength="25"
        @keyup="handleCompany"
        @blur="validStep"
      />
    </div>
    <div>
      <label for="employer_number">CNPJ</label>
      <input
        v-model="employer_number"
        id="employer_number"
        name="employer_number"
        type="text"
        class="input"
        required
        :disabled="resumeStep"
        :minlength="14"
        :maxlength="14"
        @keyup="handleEmployeerId"
        @blur="validStep"
      />
    </div>
    <div>
      <label for="created_at">Data de abertura</label>
      <input
        v-model="created_at"
        id="created_at"
        name="created_at"
        type="text"
        class="input"
        required
        :disabled="resumeStep"
        :minlength="8"
        :maxlength="8"
        @keyup="handleCreatedAt"
        @blur="validStep"
      />
    </div>
    <div>
      <label for="phone">Telefone</label>
      <input
        :value="corporate_phone"
        id="phone"
        name="phone"
        type="text"
        class="input"
        required
        :disabled="resumeStep"
        :minlength="13"
        :maxlength="14"
        @keyup="handlePhone"
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