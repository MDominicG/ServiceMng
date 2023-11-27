<template>
  <div>  
  <Topbar/>

<div class="container-fluid">
  <div class="row">
    
    <Sidebar/>

    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Panoul Principal</h1>
        <!-- <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            This week
          </button>
        </div> -->
      </div>

      <div class="row row-cols-1 gx-2 mb-2">
        <div class="col-sm">
          <ShowAllUsers/>
        </div>
        <div class="col-sm">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Masini in service</h5>
              <div class="card-body">
                <div class="table-responsive">
              <table class="table" v-if="vehicles">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="vehicle, index in vehicles" :key="index">
                    <th scope="row">{{vehicle.id}}</th>
                    <td>{{vehicle.vehiclePlate}}</td>
                    <td>{{vehicle.clientId}}</td>
                    <td>
                      <router-link :to="{ path: '/vehicle/'+ vehicle.id }"><button class="btn btn-secondary">Afiseaza informatii</button></router-link>
                    </td>
                  </tr>
                </tbody>
                <div v-if="!vehicles" class="text-center">
                  <div class="spinner-border spinner-border-sm"></div>
              </div>
              </table>
            </div>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Adauga masina
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Adauga masina in service</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <nav aria-label="breadcrumb text-center">
                          <ol class="breadcrumb breadcrumb-custom overflow-hidden text-center bg-body-tertiary border rounded-3">
                            <li class="breadcrumb-item">
                              <a class="link-body-emphasis fw-semibold text-decoration-none" href="#">
                                <svg class="bi" width="16" height="16"><use xlink:href="#house-door-fill"></use></svg>
                                Date despre client
                              </a>
                            </li>
                            <li class="breadcrumb-item">
                              <a class="link-body-emphasis fw-semibold text-decoration-none" href="#">Date despre masina</a>
                            </li>
                            <li class="breadcrumb-item" aria-current="page">
                              <a class="link-body-emphasis fw-semibold text-decoration-none">Finalizare</a>
                            </li>
                          </ol>
                        </nav>
                        <div id="toReplace">
                          <component :is="currentComponent" @CustomEventInputChanged="doSomenthing">{{component}}</component>
                      </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-if="currentComponent!='ComponentTwo'" class="btn btn-primary" @click="swapComponent('ComponentTwo')">Inainte</button>
                        <button v-if="currentComponent!='ComponentOne'" class="btn btn-secondary" @click="swapComponent('ComponentOne')">Inapoi</button>
                        <button  class="btn btn-primary" @click="createNewVehicle">Salveaza</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
</div>
</template>
<script>
  import ComponentOne from "@/components/vehiclesComponent/ComponentOne.vue"
  import ComponentTwo from "@/components/vehiclesComponent/ComponentTwo.vue"
  import ShowAllUsers from "@/components/usersComponent/ShowAllUsers.vue"
  import Sidebar from '@/components/Sidebar.vue'
  import Topbar from '@/components/Topbar.vue'
  import axios from "@/axios"

export default {
  data() {
    return {
      currentComponent: 'ComponentOne',
      componentsArray: ['ComponentOne', 'ComponentTwo'],
      input_one: [],
      input_two: [],
      input_three: [],
      vehicles: []
    }
  },
  components: {
    Sidebar,
    Topbar,
    ComponentOne,
    ComponentTwo,
    ShowAllUsers
  },
  mounted() {
    this.showAllVehicles();
  },
  methods: {
    async showAllVehicles() {
      axios.get('http://localhost:3000/vehicle/ShowAllVehicles')
        .then((res)=>{
          this.vehicles = res.data
        }).catch(err=>console.log(err))
    },
    doSomenthing ( data ) {
      if(this.currentComponent == 'ComponentOne')
        this.input_one = data;
      else
        this.input_two = data;

        this.input_three = this.input_one.concat(this.input_two);
    },
    createNewVehicle()
    {
      axios
      .post('http://localhost:3000/vehicle/CreateNewVehicle', this.input_three)
      .then(this.showAllVehicles);
    },
    swapComponent (component)
    {
      this.currentComponent = component;
      console.log(this.currentComponent)
    },
  }
}
</script>
