<template>
  <div class="main">
    <div class="input-area">
      <span class="label">Reset Password</span>
      <span class="sub-label">Check your inbox for the reset code.</span>
      <input type="text" placeholder="email" :maxlength="64" disabled v-model="email">
      <input type="password" :class="{ 'form-error': markPasswordError }" placeholder="New Password" :maxlength="64" v-model="password">
      <input type="password" :class="{ 'form-error': markPasswordConfError }" placeholder="New Password Again" :maxlength="64" v-model="passwordConf">
      <input type="text" :class="{ 'form-error': markCodeError }" placeholder="Reset Code" :maxlength="64" v-model="resetCode">
      <span class="submit-button" v-on:click="setNewPassword()">Set Password</span>
      <span class="error-message" v-show="errorMessage">{{errorMessage}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SetNewPassword',
  props: {

  },
  components: {

  },
  methods: {
    setNewPassword() {
        if(!this.formIsValid){
            this.errorMessage = "Form Incomplete."
            this.showFormDirty = true;
            return;
        }
        this.$store.dispatch('confirmPassword', {
            username: this.email,
            code: this.resetCode,
            newPassword: this.password
        }).then(() => {
            this.$router.push('/login/');
        }).catch((err) => {
            this.errorMessage = err.message;
        });
    }
  },
  data: () => ({
    email: '',      
    password: '',
    passwordConf: '',
    resetCode: '',
    showFormDirty: false,
    errorMessage: null
  }),
  computed: {
    isPasswordValid(){
        return this.password.length >= 12;
    },
    isPasswordConfValid(){
        return this.passwordConf.length >= 12;
    },
    isResetCodeValid(){
        return this.resetCode.length >= 6;
    },
    markPasswordError(){
        return !this.isPasswordValid && (this.showFormDirty || this.password.length != 0);
    },
    markPasswordConfError(){
        return !this.isPasswordConfValid && (this.showFormDirty || this.passwordConf.length != 0);
    },
    markCodeError(){
        return !this.isResetCodeValid && (this.showFormDirty || this.resetCode.length != 0);
    },
    doPasswordsMatch(){
        return this.password === this.passwordConf;
    },
    formIsValid() {
      return this.isPasswordValid
      && this.isPasswordConfValid
      && this.isResetCodeValid
      && this.doPasswordsMatch;
    },
  },
  mounted: function(){
      this.email = this.$route.params.email;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main{
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  height: 100vh;
  width: 100vw;
}

.input-area {
  grid-row: 2;
  grid-column: 2;
  align-self: center;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(8, auto);
}

.input-area input{
  height: 30px;
  outline: none;
}

.input-area:hover input{
  outline: none;
}

.label {
  font-size: 120%;
  justify-self: center;
  padding-top: 15px;
}

.sub-label {
  font-size: 120%;
  justify-self: center;
  padding-top: 15px;
}

.form-error {
    border: 1px solid #F44336;
}

.submit-button {
    padding: 5px 10px;
    border-radius: 20px;
    justify-self: center;
    background-color: #F06292;
    color: #FFF;
    height: 25px;
}

.submit-button:hover {
    cursor:pointer;
}

.error-message {
    color: #F44336;
}
</style>
