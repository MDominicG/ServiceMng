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
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
          >
            <h1 class="h2">Vehicle: {{ vehicleData.vehiclePlate }}</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group me-2">
                <button type="button" class="btn btn-sm btn-outline-secondary" @click="generateReport">
                  GDPR
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Predare-Primire
                </button>
              </div>
              <div class="btn-group me-2">
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Comanda initiala
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Deviz
                </button>
              </div>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
              >

                Inspectie finala
              </button>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Detalii despre client: <span style="color:red" v-if="clientData.clientType == 1">Persoana Juridica</span><span style="color:red" v-else="clientData.clientType == 2">Persoana Fizica</span></h5>
                  <div class="card-text">
                    <div class="row mb-2">
                      <div class="col-sm">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="clientData.clientName">
                          <label for="floatingInputValue" class="fw-bold">Denumire:</label>
                        </div>
                      </div>
                      <div v-if="clientData.clientType == 1" class="col-sm">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="clientData.clientId">
                          <label for="floatingInputValue" class="fw-bold">C.U.I / C.N.P</label>
                        </div>
                      </div>
                      <div v-if="clientData.clientType == 1" class="col-sm">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="clientData.clientReg">
                          <label for="floatingInputValue" class="fw-bold">ReCom:</label>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-2">
                      <div class="col-sm">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="clientData.clientPhone">
                          <label for="floatingInputValue" class="fw-bold">Nr. de telefon</label>
                        </div>
                      </div>
                      <div class="col-sm">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="clientData.clientEmail">
                          <label for="floatingInputValue" class="fw-bold">Adresa de email:</label>
                        </div>
                      </div>
                    </div>
                    <p class="text-center"><strong>Inregistrat la data:</strong> {{ clientData.createdAt }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Detalii despre masina</h5>
                  <div class="card-text">
                    <div class="row mb-2">
                      <div class="col-sm-6">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="vehicleData.vehiclePlate">
                          <label for="floatingInputValue" >Numar de inmatriculare</label>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="vehicleData.vehicleVIN">
                          <label for="floatingInputValue"><strong>Serie de sasiu</strong></label>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-2">
                      <div class="col-sm-4">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="vehicleData.vehicleMake">
                          <label for="floatingInputValue">Marca</label>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="vehicleData.vehicleModel">
                          <label for="floatingInputValue">Model</label>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="vehicleData.vehicleYear">
                          <label for="floatingInputValue">Anul fabricatiei</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-3">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="vehicleData.vehicleGas">
                          <label for="floatingInputValue">Combustibil</label>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="vehicleData.vehiclePower">
                          <label for="floatingInputValue">Putere (kw) </label>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="vehicleData.vehicleCapacity">
                          <label for="floatingInputValue">Capacitate cilindrica</label>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="vehicleData.vehicleOdometer">
                          <label for="floatingInputValue">Odometru</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header text-center">Lucrari solicitate de client</div>
            <div class="card-body">
              <div class="card-text">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" colspan="2">#</th>
                        <th scope="col" colspan="2">Lucrari solicitate</th>
                      </tr>
                    </thead>
                    <tbody v-if="vehicleData && vehicleData.vehicleTask.length">
                      <tr v-for="Task, index in vehicleData.vehicleTask" :key="Task.id">
                        <th scope="row" colspan="2">{{ index }}</th>
                        <td colspan="2">{{ Task.title }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="card-footer text-body-secondary text-center">2 days ago</div>
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
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      vehicleData: [],
      clientData: []
    }
  },
  components: {
    Sidebar,
    Topbar,
    GDPRPDF
  },
  methods: {
    async GetVehicleDetails() {
      await axios.post('http://localhost:3000/vehicle/GetVehicleDetails', {id:this.id})
        .then((res)=>{
          this.vehicleData = res.data;
          // Parse the stringified JSON into an actual JSON object
          try {
            this.vehicleData.vehicleTask = JSON.parse(this.vehicleData.vehicleTask);
          } catch (error) {
            console.error('Error parsing vehicleTask JSON:', error);
          }
        }).catch(err=>console.log(err))
      return this.vehicleData
    },
    async GetCustomerDetails() {
      await axios.post('http://localhost:3000/customer/GetCustomerDetails', {id:this.vehicleData.clientId})
        .then((res)=>{
          this.clientData = res.data;
          // Parse the stringified JSON into an actual JSON object
        }).catch(err=>console.log(err))
      return this.clientData
    },
  },
  beforeMount(){
    this.GetVehicleDetails().then(() => {
    this.GetCustomerDetails();
  });
    
  }
};
</script>
