<template>
  <div>
    <main class="login-form">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">Login</div>
              <div class="card-body">
                <form class="row">
                  <div class="m-3 form-group row">
                    <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                    <div class="col-md-6">
                      <input v-model="email" type="text" id="email_address" class="form-control" name="email-address"
                             required
                             autofocus>
                    </div>
                  </div>
                  <div class="m-3 form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                    <div class="col-md-6">
                      <input v-model="password" type="password" id="password" class="form-control" name="password"
                             required>
                    </div>
                  </div>
                  <div class="col-4 m-3">
                    <BaseButton
                        :button="{
                  name : 'Login',
                  type : 'button',
                  class : 'btn btn-info'}"
                        v-on:callback="login()"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BaseButton from "@/components/base-components/BaseButton";
import {actionTypes} from "@/stores/actionTypes";

export default {
  name: "AuthForm",
  components: {BaseButton},
  computed: {
    mainStore: {
      get() {
        return this.$store.state.auth;
      }
    },
    email: {
      get() {
        return this.$store.state.auth.form.email;
      },
      set(value) {
        this.$store.commit('updateEmail', value);
      }
    },
    password: {
      get() {
        return this.$store.state.auth.form.password;
      },
      set(value) {
        this.$store.commit('updatePassword', value);
      }
    }, dataToken: {
      get() {
        return this.$store.state.auth.dataToken;
      },
    },
  },
  methods: {
    login() {
      let self = this;
      return new Promise((resolve) => {
        resolve(1)
      }).then(() => {
        self.$store.dispatch(actionTypes.LOGIN);
      })
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Raleway:300,400,600);


body {
  margin: 0;
  font-size: .9rem;
  font-weight: 400;
  line-height: 1.6;
  color: #212529;
  text-align: left;
  background-color: #f5f8fa;
}

.navbar-laravel {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .04);
}

.navbar-brand, .nav-link, .my-form, .login-form {
  font-family: Raleway, sans-serif;
}

.my-form {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.my-form .row {
  margin-left: 0;
  margin-right: 0;
}

.login-form {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.login-form .row {
  margin-left: 0;
  margin-right: 0;
}
</style>