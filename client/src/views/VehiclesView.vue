<template>
  <div>
    <Topbar />

    <div class="container-fluid">
      <div class="row">
        <Sidebar />

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="chartjs-size-monitor">
            <div class="chartjs-size-monitor-expand"><div class=""></div></div>
            <div class="chartjs-size-monitor-shrink"><div class=""></div></div>
          </div>
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Masini in service</h1> 
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Masini in service</h5>
              <div class="card-body">
                <div class="table-responsive">
              <table class="table" v-if="vehicles">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Numar de inmatriculare</th>
                    <th scope="col" colspan="2">Client</th>
                    <th scope="col">Actiuni</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="vehicle, index in vehicles" :key="index">
                    <th scope="row">{{vehicle.id}}</th>
                    <td>{{vehicle.vehiclePlate}}</td>
                    <td colspan="2">{{vehicle.clientId}}</td>
                    <td class="float-end">
                      <router-link :to="{ path: '/vehicle/'+ vehicle.id }"><button class="btn btn-secondary">Afiseaza informatii</button></router-link>
                      <button class=" mx-2 btn btn-danger" data-bs-toggle="modal" data-bs-target="#RemoveVehicleModal" @click="selectVehicle(vehicle)">Sterge masina</button>
                    </td>
                  </tr>
                </tbody>
                <div v-if="!vehicles" class="text-center">
                  <div class="spinner-border spinner-border-sm"></div>
              </div>
              </table>
                <!-- Modal -->
                <div class="modal fade" id="RemoveVehicleModal" tabindex="-1" aria-labelledby="RemoveVehicleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="RemoveVehicleModalLabel">Confirmare stergere</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Inchide"></button>
                      </div>
                      <div class="modal-body">
                        <h4>Esti sigur ca vrei sa stergi masina ?</h4>
                        <p class="fs-bold">Numar de refeerinta: <span>{{ selectedVehicle.id }}</span></p>
                        <p class="fs-bold">Numar de inmatriculare: <span>{{ selectedVehicle.vehiclePlate }}</span></p>
                        <p class="fs-bold">Client: <span>{{ selectedVehicle.clientId }}</span></p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Inchide</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="DeleteSelectedVehicle(selectedVehicle.id)">Sterge</button>
                      </div>
                    </div>
                  </div>
                </div>
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
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import axios from "@/axios";

export default {
  data() {
    return {
      vehicles: [],
      selectedVehicle: []
    }
  },
  components: {
    Sidebar,
    Topbar,
  },
  methods: {
    selectVehicle(vehicle){
      this.selectedVehicle = vehicle
    },  
    async GetAllVehicles() {
      axios.get('http://localhost:3000/vehicle/ShowAllVehicles')
        .then((res)=>{
          this.vehicles = res.data
        }).catch(err=>console.log(err))
      return this.vehicleData
    },
    async DeleteSelectedVehicle(id) {
      await axios.post('http://localhost:3000/vehicle/DeleteSelectedVehicle', {id:id})
      .catch(err=>console.log(err))
      .then(this.GetAllVehicles)
    },
  },
  beforeMount(){
    this.GetAllVehicles()
  }
};
</script>
