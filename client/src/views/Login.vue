<template>
  <div class="container-fluid" style="height: 100%">
        <div class="row" style="height: 100%">
            <div class="col" style="background-color: #5C5053">
                
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <div class="p-5 border border-2 border-secondary rounded" style="width: 80%">
                    <h1 class="mb-3">SIGN IN</h1>
                    <form @submit.prevent="login">
                        <div class="form-group mb-3">
                          <label class="d-flex" for="exampleInputEmail1">Email address</label>
                          <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group mb-5">
                          <label class="d-flex" for="exampleInputPassword1">Password</label>
                          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
                        </div>
                        <div>
                            <button type="submit" class="btn btn-primary rounded-pill w-100">LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login () {
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            })
            this.email = ''
            this.password = ''
        }
    }
    
}
</script>

<style>
    
</style>