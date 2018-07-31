<template>
  <div class="loginPage">
        <div class="login-section">
            <div class="login-input-section">
                <div class="login-input" :class="{ 'form-error': markNameError }">
                    <input  type="text" placeholder="email" :maxlength="64" v-model="loginEmail">
                </div>
                <div class="login-input" :class="{ 'form-error': markNameError }">
                    <input type="password" placeholder="password" :maxlength="64" v-model="loginPassword">
                    <span class="help-icon-area">
                        <help-circle-outline-icon class="help-icon popover-activator" title="Help" v-popover:ForgotPassword/>
                    </span>
                </div>
                <span class="login-button" v-on:click="handleLoginSubmit()">Login</span>
            </div>
            <div class="login-error-area">
                <span class="alert alert-error" v-show="loginErrorMessage">
                    {{ loginErrorMessage }}
                </span>
            </div>
            <div class="offer-resend-conf-mail" v-show="offerResendConfMail">
                <span class="resend-conf-mail-button" v-on:click="resendConfMail()">Click here to re-send confirmation email.</span>
            </div>
        </div>
        <div class="signup-section" >
            <div class="sign-up-inputs-area" v-show="!justVerified">
                <div class="sign-up-title">
                    <span>Create A Dev C.V.</span>
                </div>
                <div class="sign-up-input" :class="{ 'form-error': markNameError }">
                    <input type="text" placeholder="Name" v-model="name" :maxlength="64">
                </div>
                <div class="sign-up-input" :class="{ 'form-error': markEmailError }">
                    <input type="text" placeholder="email" v-model="email" :maxlength="64">
                </div>
                <div class="sign-up-input" :class="{ 'form-error': markPasswordError }">
                    <input type="password" placeholder="Password" v-model="password" :maxlength="64">
                </div>
                <div class="sign-up-input" :class="{ 'form-error': markPasswordConfError }">
                    <input type="password" placeholder="Password Again" v-model="passwordConfirmation" :maxlength="64">
                </div>
                <div class="sign-up-input sign-up-button-area">
                    <span class="sign-up-button" v-on:click="handleSignUpSubmit()">  
                        Sign-Up
                    </span>
                </div>
                <div>
                    <span class="alert alert-success" v-show="successMessage">
                        {{ successMessage }}
                    </span>
                    <span class="alert alert-error" v-show="signUpErrorMessage">
                        {{ signUpErrorMessage }}
                    </span>
                </div>
            </div>
            <div class="verified-area" v-show="justVerified">
                Verification successful! Log in above to get started.
            </div>
        </div>
    <popover name="ForgotPassword">
        <div class="forgot-password-area" v-on:click="handleForgotPasswordClicked()">
            Reset Password
        </div>
    </popover>
  </div>
</template>

<script>
import AccountIcon from "vue-material-design-icons/account.vue"
import HelpCircleOutlineIcon from "vue-material-design-icons/help-circle-outline.vue"

export default {
  name: 'LandingPage',
  components: {
    AccountIcon,
    HelpCircleOutlineIcon
  },
  methods: {
    handleLoginSubmit() {
      // Remove alert boxes
      this.successMessage = null;
      this.loginErrorMessage = null;
      this.$store.dispatch('authenticateUser', {
        username: this.loginEmail.toLowerCase(),
        password: this.loginPassword,
      }).then(() => {
        this.loginPassword = '';
        this.loginErrorMessage = null;
        let username = this.$store.state.cognito.user.username;
        this.$router.push('/user/' + username);
        this.successMessage = 'Successfuly signed in';
      }).catch((err) => {
          if(err.message == "User is not confirmed."){
              this.offerResendConfMail = true;
          }
        this.loginErrorMessage = err.message;
      });
    },
    handleSignUpSubmit() {
        if(!this.formIsValid){
            if(!this.isNameValid){
                this.signUpErrorMessage = "Please enter a name";
            }
            else if(!this.isEmailValid){
                this.signUpErrorMessage = "Please enter an email address";
            }
            else if(!this.isPasswordValid){
                this.signUpErrorMessage = "Password must be 12 or more characters";
            }
            else if(!this.doPasswordsMatch){
                this.signUpErrorMessage = "Your passwords don't match";
            }
            this.showFormDirty = true;
            return;
        }
        this.showFormDirty = false
        this.successMessage = null;
        this.signUpErrorMessage = null;
        this.$store.dispatch('signUp', {
            username: this.email.toLowerCase(),
            password: this.password,
            attributes: {
                name: this.name,
            },
        }).then(() => {
            this.$router.push('/verifyEmail/' + this.email.toLowerCase());
        }).catch((err) => {
            this.signUpErrorMessage = err.message;
        });
    },
    handleForgotPasswordClicked(){
        this.$router.push('resetPassword/');
    },
    resendConfMail() {
        this.$router.push('resendConfMail/');
    }
  },
  data: () => ({
    signUpErrorMessage: null,
    loginErrorMessage: null,
    successMessage: null,
    loginEmail: '',
    loginPassword: '',
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    showFormDirty: false,
    offerResendConfMail: false,
    justVerified: false
  }),
  computed: {
    isNameValid(){
        return this.name.length > 0;
    },
    isEmailValid(){
        return this.email.length > 5;
    },
    isPasswordValid(){
        return this.password.length >= 12;
    },
    isPasswordConfValid(){
        return this.passwordConfirmation.length >= 12;
    },
    markNameError(){
        return !this.isNameValid && (this.showFormDirty || this.name.length != 0);
    },
    markEmailError(){
        return !this.isEmailValid && (this.showFormDirty || this.email.length != 0);
    },
    markPasswordError(){
        return !this.isPasswordValid && (this.showFormDirty || this.password.length != 0);
    },
    markPasswordConfError(){
        return !this.isPasswordConfValid && (this.showFormDirty || this.passwordConfirmation.length != 0);
    },
    doPasswordsMatch(){
        return this.password === this.passwordConfirmation;
    },
    formIsValid() {
      return this.isNameValid
      && this.isEmailValid
      && this.isPasswordValid
      && this.isPasswordConfValid
      && this.doPasswordsMatch;
    },
  },
  created(){
      this.justVerified = this.$route.params.verified ? this.$route.params.verified : false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.loginPage {
    height:100vh;
    display: grid;
    grid-template-areas: 
    "login-section"
    "signup-section";
}


@media (min-width: 800px) {
  .loginPage {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
      "login-section signup-section";
  }

  .description-section {
      padding-bottom: 0px;
  }

  .text-section {
        font-weight: 300;
        font-size: 150%;
        text-align: left;
        padding: 0px 25px;
        padding-top: 50px;
    }

    .login-section {
        grid-template-columns: 1fr 10fr 1fr;
    }
}

@media (max-width: 801px) {

    .login-input-section {
        margin-top: 15px;
    }

    .login-section {
        grid-template-columns: 1fr 15fr 1fr;
    }
}

.login-section {
    grid-area: login-section;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
}

.login-input-section {
    grid-column: 2;
    display: grid;
    align-self: center;
    padding: 0px 10px;
    grid-template-columns: 2fr 2fr 1fr;
}

.signup-section {
    grid-area: signup-section;
    display: grid;
}

.sign-up-inputs-area {
    display: grid;
    grid-template-rows: repeat(5, 1fr) 2fr 1fr;
    padding-top: 50px;
}

.verified-area {
    display: grid;
    padding-top: 50px;
}

.sign-up-input {
    justify-self: center;
    width: 70%;
    max-width: 400px;
    padding: 10px 0px;
}

.sign-up-title {
    font-size: 120%;
}

.sign-up-inputs-area input {
    width: 100%;
    font-size: 110%;
    border: none;
    border-bottom: 1px solid rgba(119,119,119, 0.8);
}

.sign-up-inputs-area input:focus {
    font-size: 110%;
    outline: none;
    border-bottom: 1px solid #29B6F6;
}

.sign-up-button-area {
    padding-top: 20px;
}

.sign-up-button {
    padding: 10px 40px;
    border-radius: 20px;
    background-color: #F06292;
    color: #FFF;
}

.sign-up-button:hover {
    cursor: pointer;
    background-color: #E91E63;
}

.form-error input {
    border-bottom: 1px solid #F44336;
}

.form-error input:focus {
    border-bottom: 1px solid #F44336;
}

.login-section input{
    width: 70%;
    font-size: 100%;
    align-self: end;
    padding: 5px;
}

.login-section input:focus{
    padding: 5px;
    outline: none;
    border: 1px solid #29B6F6;
}

.login-input {
    align-self: end;
}

.login-error-area {
    grid-column-start: 1;
    grid-column-end: span 3;
    align-self: center;
}

.offer-resend-conf-mail {
    grid-row-start: 3;
    grid-column-start: 1;
    grid-column-end: span 3;
}

.help-icon {
    font-size: 120%;
}

.popover-activator:hover {
    cursor: pointer;
}

.login-button {
    padding: 5px 10px;
    border-radius: 20px;
    justify-self: end;
    background-color: #F06292;
    color: #FFF;
    height: 25px;
    align-self: end;
}

.login-button:hover {
    cursor:pointer;
}

.resend-conf-mail-button:hover {
    cursor: pointer
}

.alert-error{
    color: #F06292;
}

.forgot-password-area:hover {
    cursor: pointer;
    background-color: rgba(187,187,187, 0.2);
}

.help-icon {
    color: rgba(119,119,119, 0.8);
}
</style>
