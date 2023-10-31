<template>
    <div>
        <h4 class="text-center mb-2">Date despre masina</h4>
        <div class="row row-cols-2 mb-2">
            <div class="col-sm">
                <div class="form-floating">
                    <input type="text" class="form-control"  v-model="clientVehicleNumber" @change="emitEventChanged" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Numar de inmatriculare</label>
                </div>
            </div>
            <div class="col-sm">
                <div class="form-floating">
                    <input type="text" class="form-control"  v-model="clientVehicleVIN" @change="emitEventChanged" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Serie de sasiu</label>
                </div>
            </div>
        </div>
        <div class="row row-cols-3 mb-2">
            <div class="col-sm">
                <div class="form-floating">
                    <input type="text" class="form-control"  v-model="clientVehicleMake" @change="emitEventChanged" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Marca</label>
                </div>
            </div>
            <div class="col-sm">
                <div class="form-floating">
                    <input type="text" class="form-control"  v-model="clientVehicleModel" @change="emitEventChanged" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Model</label>
                </div>
            </div>
            <div class="col-sm">
                <div class="form-floating">
                    <input type="text" class="form-control"  v-model="clientVehicleYear" @change="emitEventChanged" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">An fabricatie</label>
                </div>
            </div>
        </div>
        <div class="row row-cols-4 mb-2">
            <div class="col-sm">
                <div class="form-floating">
                    <input type="text" class="form-control"  v-model="clientVehiclePower" @change="emitEventChanged" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Kw</label>
                </div>
            </div>
            <div class="col-sm">
                <div class="form-floating">
                    <input type="text" class="form-control"  v-model="clientVehicleGas" @change="emitEventChanged" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Combustibil</label>
                </div>
            </div>
            <div class="col-sm">
                <div class="form-floating">
                    <input type="text" class="form-control"  v-model="clientVehicleCapacity" @change="emitEventChanged" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Capacitate motor</label>
                </div>
            </div>
            <div class="col-sm">
                <div class="form-floating">
                    <input type="text" class="form-control"  v-model="clientVehicleOdometer" @change="emitEventChanged" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Kilometraj</label>
                </div>
            </div>
        </div>
        <hr class="mb-2">
        <p class="mb-2">Lucrari solicitate de client</p>
        <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="newTask"
               @keyup.enter="addTask"  @keypress="isLetter($event)">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" @click="addTask" type="button">Adauga</button>
            </div>
        </div>
        <div v-for="(task, index) in tasks"
                     :task="task"
                     :key="task"
        >
            <div class="input-group mb-3">
                <input type="text" class="form-control" :value="task.title" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" @click="removeTask(index)" type="button">Sterge</button>
                </div>
            </div>
        </div>
        <p class="mb-2">Lucrari recomandate</p>
        <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="newRTask"
               @keyup.enter="addRTask"  @keypress="isLetter($event)">
            <div class="input-group-append">
                <button class="btn btn-success" @click="addRTask" type="button">Adauga</button>
            </div>
        </div>
        <div v-for="(task, index) in RTasks"
                     :task="task"
                     :key="task"
        >
            <div class="input-group mb-3">
                <input type="text" class="form-control" :value="task.title" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" @click="removeRTask(index)" type="button">Sterge</button>
                </div>
            </div>
        </div>
        <div class="form-check">
            <input type="checkbox" class="form-check-input"  v-model="clientVehicleReadyToInsert" @change="emitEventChanged" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            newTask: '',
            newRTask: '',
            tasks: [],
            RTasks: [],
            clientVehicleNumber: '', 
            clientVehicleVIN: '',
            clientVehicleMake: '',
            clientVehicleModel: '',
            clientVehicleYear: '',
            clientVehiclePower: '',
            clientVehicleGas: '',
            clientVehicleCapacity: '',
            clientVehicleOdometer: '',
            clientVehicleTasks: [], 
            clientVehicleRTasks: [],
            clientVehicleReadyToInsert: false,
        }
    },
    methods: {
        isLetter(e) {
            let char = String.fromCharCode(e.keyCode);
            if (/^[A-Za-z0-9-. ]+$/.test(char)) return true;
            else e.preventDefault();
        },
        emitEventChanged () {
            this.$emit('CustomEventInputChanged', [
                {
                    "clientVehicleNumber" : this.clientVehicleNumber, 
                    "clientVehicleVIN" : this.clientVehicleVIN,
                    "clientVehicleMake" : this.clientVehicleMake,
                    "clientVehicleModel" : this.clientVehicleModel,
                    "clientVehicleYear" : this.clientVehicleYear,
                    "clientVehiclePower" : this.clientVehiclePower,
                    "clientVehicleGas" : this.clientVehicleGas,
                    "clientVehicleCapacity" : this.clientVehicleCapacity,
                    "clientVehicleOdometer" : this.clientVehicleOdometer,
                    "clientVehicleTasks" : this.tasks, 
                    "clientVehicleRTasks" : this.RTasks,
                    "clientVehicleReadyToInsert" : this.clientVehicleReadyToInsert
                }
            ]);
        },
        removeTask(index)
        {
            this.tasks.splice(index, 1);
        },
        addTask ()
        {
            if (this.newTask) {
                this.tasks.push({
                title: this.newTask
                });
                this.newTask = '';
            }
        },
        removeRTask(index)
        {
            this.RTasks.splice(index, 1);
        },
        addRTask ()
        {
            if (this.newRTask) {
                this.RTasks.push({
                title: this.newRTask
                });
                this.newRTask = '';
            }
        }
    }
}
</script>
