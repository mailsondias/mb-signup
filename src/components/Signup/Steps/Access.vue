<script>
export default {
  name: 'access',
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
      passcode: this.formData.password ?? null,
      confirm: this.formData.password ?? null,
      isValid: false
    }
  },
  methods: {
    handlePasscode(el) {
      this.confirm = ''
      if (this.validPassword(el.target.value.trim())) {
        this.passcode = el.target.value.trim()
        return true
      }
    },
    handleConfirm(el) {
      if (this.validPassword(el.target.value.trim())) {
        this.confirm = el.target.value.trim()
        return true
      }
    },
    validStep() {
      if (this.validPassword(this.passcode) && this.validPassword(this.confirm)) {
        if (this.passcode === this.confirm) {
          this.isValid = true
        } else {
          this.isValid = false
        }
      }

      const payload = {
        password: this.passcode,
        isValid: this.isValid,
      }

      this.$emit('valid', payload)
    },
    validPassword(passcode) {
      return passcode !== null && passcode.length >= 6
    }
  }
}
</script>

<template>
  <div class="fieldset">
    <div>
      <label for="passcode">Senha de acesso</label>
      <input
        v-model="passcode"
        id="passcode"
        name="passcode"
        type="password"
        class="input"
        :disabled="resumeStep"
        @input="handlePasscode"
        @blur="validStep"
      />
    </div>
    <div>
      <label for="register_id">Confirmação de senha</label>
      <input
        v-model="confirm"
        id="confirm"
        name="confirm"
        type="password"
        class="input"
        :disabled="resumeStep"
        @input="handleConfirm"
        @blur="validStep"
      />
    </div>
  </div>
</template>

<style>
</style>