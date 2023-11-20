<template>
    <div>
        <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Utilizatori</h5>
              <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Utilizator</th>
                    <th scope="col">Email</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody v-if="users">
                  <tr v-for="user in users">
                    <th scope="row">{{user.id}}</th>
                    <td>{{user.username}}</td>
                    <td>{{user.email}}</td>
                    <td><button @click="createNewUser" color="primary">Save</button>
                      <button @click="onSubmit" color="primary">Save</button>
                    </td>
                  </tr>
                </tbody>
                <div v-if="!users" class="text-center">
                  <div class="spinner-border spinner-border-sm"></div>
              </div>
              </table>
            </div>
            </div>
          </div>
    </div>
</template>
<script>
import axios from "@/axios"

export default {
    data() {
      return {
        users: []
      }  
    },
    mounted() {
    this.getAllCustomers();
    },
    methods: {
        async getAllCustomers() {
      axios.get('http://localhost:3000/auth/GetAllUsers')
        .then((res)=>{
          this.users = res.data
        }).catch(err=>console.log(err))
    },
    createNewUser(){
      axios
      .post('http://localhost:3000/auth/CreateNewUser', {
        username : "Test",
        email: "Test@Test.com",
        password: "Test"
      })
      .then(this.getAllCustomers());
    },
    }
}
</script>
