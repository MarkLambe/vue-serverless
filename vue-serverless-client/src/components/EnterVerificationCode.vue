<template>
  <div class="main">
    <div class="input-area">
      <span class="label">Verify Email</span>
      <span class="sub-label">Check your inbox for the verification code.</span>
      <input type="text" placeholder="email" :maxlength="64" disabled v-model="email">
      <input type="text" :maxlength="6" v-model="code">
      <span class="submit-button" v-on:click="confirmRegistration()">Verify</span>
      <span class="error-message" v-show="failMessage">{{failMessage}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EnterVerificationCode',
  methods: {
    confirmRegistration() {
        this.$store.dispatch('confirmRegistration', {
            username: this.email,
            code: this.code
        })
        .then(() => {
            this.$router.push('/login/justVerified');
        })
        .catch(() => {
            this.failMessage = 'Incorrect Code, try again'
        });
    },
    goHome(){
        this.$router.push('/login/');
    }
  },
  data: () => ({
    email: null,
    code: '000000',
    failMessage: null
  }),
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
  grid-template-rows: repeat(3, auto);
}

.input-area input{
  height: 30px;
}

.input-area:hover input{
  outline: none;
}

.label {
  font-size: 120%;
  justify-self: center;
  padding-top: 15px;
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
