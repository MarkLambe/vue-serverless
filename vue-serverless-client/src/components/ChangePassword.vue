<template>
  <div class="main">
    <div class="top-area">
        <div class="home-button-area" v-on:click="goHome()">
            <home-icon class="home-icon" title="Home"/>
        </div>
    </div>
    <div class="input-area">
      <span class="label">Change Password</span>
      <input type="password" :class="{ 'form-error': markCurrentPasswordError }" placeholder="Current Password" :maxlength="64" v-model="currentPassword">
      <input type="password" :class="{ 'form-error': markNewPasswordError }" placeholder="New Password" :maxlength="64" v-model="newPassword">
      <input type="password" :class="{ 'form-error': markNewPasswordConfError }" placeholder="New Password Again" :maxlength="64" v-model="newPasswordConf">
      <span class="submit-button" v-on:click="setNewPassword()">Set Password</span>
      <span class="error-message" v-show="errorMessage">{{errorMessage}}</span>
      <span class="success-message" v-show="successMessage">{{successMessage}}</span>
    </div>
  </div>
</template>

<script>

import HomeIcon from "vue-material-design-icons/home.vue"


export default {
  name: 'ChangePassword',
  props: {
  },
  components: {
      HomeIcon      
  },
  methods: {
    setNewPassword() {
        if(!this.formIsValid){
            this.errorMessage = "Form Incomplete."
            this.showFormDirty = true;
            return;
        }
        this.$store.dispatch('changePassword', {
            oldPassword: this.currentPassword,
            newPassword: this.newPassword
        }).then(() => {
            this.successMessage = "Password Changed!"
        }).catch((err) => {
            this.errorMessage = err.message;
        });
    },
    goHome(){
        this.$router.go(-1);
    }
  },
  data: () => ({
    email: '',   
    currentPassword: '',
    newPassword: '',
    newPasswordConf: '',
    showFormDirty: false,
    errorMessage: null,
    successMessage: null
  }),
  computed: {
    isCurrentPasswordValid(){
        return this.currentPassword.length >= 12;
    },
    isNewPasswordValid(){
        return this.newPassword.length >= 12;
    },
    isNewPasswordConfValid(){
        return this.newPasswordConf.length >= 12;
    },
    markCurrentPasswordError(){
        return !this.isCurrentPasswordValid && (this.showFormDirty || this.currentPassword.length != 0);
    },
    markNewPasswordError(){
        return !this.isNewPasswordValid && (this.showFormDirty || this.newPassword.length != 0);
    },
    markNewPasswordConfError(){
        return !this.isNewPasswordConfValid && (this.showFormDirty || this.newPasswordConf.length != 0);
    },
    doPasswordsMatch(){
        return this.newPassword === this.newPasswordConf;
    },
    formIsValid() {
      return this.currentPassword
      && this.newPassword
      && this.newPasswordConf
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

.home-button-area {
    float: left;
    padding-left: 50px;
    padding-top: 50px;
}

.home-button-area:hover {
    cursor: pointer;
}

.home-icon {
    font-size: 200%;
}

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
  grid-template-rows: repeat(7, auto);
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
