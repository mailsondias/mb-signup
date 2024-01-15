<script>
import Access from './Steps/Access.vue';
import Company from './Steps/Company.vue';
import Person from './Steps/Person.vue';
import Resume from './Steps/Resume.vue';
import Start from './Steps/Start.vue';

export default {
  name: 'signup',
  components: {
    Start,
    Person,
    Company,
    Access,
    Resume,
  },
  data() {
    return {
      steps: [
        {
          index: 1,
          title: 'Seja bem vindo(a)',
          component: 'Start',
        },
        {
          index: 2, 
          title: 'Pessoa Física',
          component: 'Person'
        },
        {
          index: 2,
          title: 'Pessoa Jurídica',
          component: 'Company'
        },
        {
          index: 3,
          title: 'Senha de acesso',
          component: 'Access'
        },
        {
          index: 4,
          title: 'Revise suas informações',
          component: 'Resume'
        },
      ],
      currentStep: 0,
      validStep: {
        1: {
          isValid: false
        },
        2: {
          isValid: false
        },
        3: {
          isValid: false
        },
      },
      formData: {
        email: null,
        kind_register: null,
        name: null,
        register_id: null,
        born_date: null,
        phone: null,
        company: null,
        employer_number: null,
        created_at: null,
        corporate_phone: null,
        passcode: null
      },
      isLoading: false,
      errorHandler: false
    }
  },
  computed: {
    startStep() {
      return this.currentStep === 0
    },
    personStep() {
      return this.currentStep === 1 && this.formData.kind_register === 1
    },
    companyStep() {
      return this.currentStep === 2 && this.formData.kind_register === 2
    },
    accessStep() {
      return this.currentStep === 3
    },
    resumeStep() {
      return this.currentStep === 4
    },
    textButton() {
      return this.currentStep !== 4 ? 'Continuar' : 'Cadastrar';
    }
  },
  methods: {
    handleValidStep(payload) {
      if (this.startStep) {
        this.formData.email = payload.email
        this.formData.kind_register = payload.kind_register

        this.validStep[1].isValid = payload.isValid
      }
      if (this.personStep) {
        this.formData.name = payload.name

        this.formData.register_id = payload.register_id
        this.formData.born_date = payload.born_date
        this.formData.phone = payload.phone

        this.validStep[2].isValid = payload.isValid 
      }
      if (this.companyStep) {
        this.formData.company = payload.company
        this.formData.employer_number = payload.employer_number
        this.formData.created_at = payload.created_at
        this.formData.corporate_phone = payload.corporate_phone

        this.validStep[2].isValid = payload.isValid  
      }
      if (this.accessStep) {
        this.formData.password = payload.password
        this.validStep[3].isValid = payload.isValid  
      }
      // if (this.resumeStep) {
      //   console.log('resume', payload)

      //   this.formData.company = payload.localData.company
      //   this.formData.employer_number = payload.localData.employer_number
      //   this.formData.created_at = payload.localData.created_at
      //   this.formData.corporate_phone = payload.localData.corporate_phone
      // }
    },
    handleNext() {
      this.errorHandler = false;

      if (this.startStep && this.validStep[1].isValid) {
        this.currentStep = this.formData.kind_register === 1 ? 1 : 2
        return
      }

      if (this.personStep && this.validStep[2].isValid) {
        this.currentStep = 3
        return
      }

      if (this.companyStep && this.validStep[2].isValid) {
        this.currentStep = 3
        return
      }

      if (this.accessStep && this.validStep[3].isValid) {
        this.currentStep = 4
        return
      }

      if (this.resumeStep) {
        if (this.validStep[1].isValid && this.validStep[2].isValid && this.validStep[3].isValid) {
          this.handleRegister()
          return
        }
      }

      this.errorHandler = true
      
      return false
    },
    handleBack() {
      if (this.formData.kind_register === 1 && this.accessStep) {
        this.currentStep = this.currentStep - 2
        return
      }
      if (this.companyStep) {
        this.currentStep = this.currentStep - 2
        return
      }
      this.currentStep = this.currentStep - 1
    },
    async handleRegister() {
      const api = 'http://localhost:3000/registration'

      try {
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        const result = await response.json();

        if (response.status === 201) {
          alert(result.message)
          location.reload()
        }

      } catch (error) {
        alert('Aconteceu algum erro em nosso servidor tente novamente mais tarde.')
      }
      this.resetRegister()
    },
    resetRegister() {
      this.currentStep = 0

      this.formData = {
        email: null,
        kind_register: null,
        name: null,
        register_id: null,
        born_date: null,
        phone: null,
        company: null,
        employer_number: null,
        created_at: null,
        corporate_phone: null,
        passcode: null
      }

      this.isValidStep = {
        1: {
          isValid: false
        },
        2: {
          isValid: false
        },
        3: {
          isValid: false
        },
      }
    },
  }
}
</script>

<template>
  <div class="main">
    <header class="header">
      <a href="#this" title="Signup - Mercado Bitcoin">
        <img src="../../assets/vue.svg" class="logo" alt="Vue logo" />
      </a>
    </header>
    <div class="signup">
      <div class="signup__header">
        <p>Etapa <span class="signup--active">{{ steps[currentStep].index }}</span> de <span>4</span></p>
        <h1>{{ steps[currentStep].title }}</h1>
      </div>

      <component
        :is="steps[currentStep].component"
        :step="currentStep"
        :form-data="formData"
        @valid="handleValidStep"
      />
      
      <div class="signup__actions">
        <button v-if="!startStep" class="button button--outline" @click="handleBack">
          Voltar
        </button>
        <button class="button" @click="handleNext">
          {{ textButton }}
        </button>
      </div>

      <p v-if="errorHandler">
        Preencha todos os campos corretamente.
      </p>
    </div>
  </div>
</template>

<style>
.main {
  width: 100%;
  padding: 2rem;
}
.header {
  margin-bottom: 1rem;
}

.signup {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.signup__header {
  margin-bottom: 1rem;
}
.signup__actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.signup--active {
  color: orange;
}

.input {
  display: block;
  font-size: 14px;
  padding: 0.7rem 0.5rem;
  width: 100%;
  border-radius: 6px;
  border: none;
  background-color: #333;
}

.button {
  display: block;
  width: 100%;
  background-color: orange;
  color: white;
}

.button--outline {
  border: 1px solid orange;
  background-color: transparent;
  color: orange;
}

.fieldset {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  text-align: left;
  margin: 0 0 0.5rem;
}
.fieldset label {
  display: block;
  margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
  .main {
    width: 360px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0 auto;
  }
}
</style>