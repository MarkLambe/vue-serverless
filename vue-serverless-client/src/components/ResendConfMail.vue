<template>
  <div class="main">
    <div class="top-area">
        <div class="home-button-area" v-on:click="goHome()">
            <home-icon class="home-icon" title="Home"/>
        </div>
    </div>
    <div class="input-area">
      <span class="label">Resend Confirmation Mail</span>
      <input type="text" placeholder="email" :maxlength="64" v-model="email">
      <span class="submit-button" v-on:click="resendConfMail()">Send Mail</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ResendConfMail',
  props: {

  },
  components: {

  },
  methods: {
    resendConfMail() {
      this.$store.dispatch('resendConfirmationCode', {
        username: this.email.toLowerCase()
      });
    },
    goHome(){
        this.$router.push('/login/');
    }
  },
  data: () => ({
    email: null
  })
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
</style>
