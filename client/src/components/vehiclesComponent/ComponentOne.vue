<template>
<div>
    <h4 class="text-center mb-2">Date despre client</h4>
    <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" role="switch" v-model="JuridicPerson" @change="emitEventChanged" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">Persoana Juridica</label>
    </div>
    <div class="row row-cols-3">
        <div class="col-sm">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" v-model="clientName" @change="emitEventChanged" placeholder="name@example.com">
                <label for="floatingInput">{{JuridicPerson ? 'Denumire Companie' : 'Nume'}}</label>
            </div>
        </div>
        <div class="col-sm" v-if="JuridicPerson">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" v-model="clientJId" @change="emitEventChanged" placeholder="name@example.com">
                <label for="floatingInput">CUI</label>
            </div>
        </div>
        <div class="col-sm" v-if="JuridicPerson">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" v-model="clientReg" @change="emitEventChanged" placeholder="name@example.com">
                <label for="floatingInput">Reg</label>
            </div>
        </div>
    </div>
    <div class="row row-cols-2">
        <div class="col-sm">
            <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" v-model="clientPhone" @change="emitEventChanged" placeholder="Password">
                <label for="floatingPassword">Numar de telefon</label>
            </div>
        </div>
        <div class="col-sm">
            <div class="form-floating">
                <input type="email" class="form-control" id="floatingPassword" v-model="clientEmail" @change="emitEventChanged" placeholder="Password">
                <label for="floatingPassword">Adresa de email</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'component',
    data(){
        return {
            JuridicPerson: false,
            input_two: '',
            clientName: '',
            clientPhone: '',
            clientEmail: '',
            clientJId: '',
            clientReg: ''
        }
    },
    methods: {
        emitEventChanged () {
            this.$emit('CustomEventInputChanged', [
                {
                    "clientType": this.JuridicPerson,
                    "clientName": this.clientName,
                    "clientPhone": this.clientPhone,
                    "clientEmail": this.clientEmail,
                    "clientJId": this.clientJId,
                    "clientReg": this.clientReg
                }
            ]);
        }
    }
}
</script>
