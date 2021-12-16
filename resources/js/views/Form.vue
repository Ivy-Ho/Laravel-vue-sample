<template>
  <div lass="container">
    <h3>vee-validate example</h3>
    <validation-observer v-slot="{ invalid }">
      <form @submit.prevent="submitForm" class="mb-5">
        <validation-provider rules="required|email" class="form-group" tag="div" v-slot="{ errors, classes, passed }">
          <!-- input -->
          <label for="email">Email</label>
          <input id="email" type="email" name="email" v-model="email" class="form-control" :class="classes">
          <!-- error message -->
          <span class="invalid-feedback">{{ errors[0] }}</span>
          <span v-if="passed" class="valid-feedback">Email correct</span>
        </validation-provider>
        <button type="submit" class="btn btn-primary" :disabled="invalid">submit</button>
      </form>
    </validation-observer>


    <h3>Bootstrap modal form validation example</h3>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailModal">Open modal</button>

    <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailModalLabel">Competition Inroll</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <InputText title="Competition Name" type="text" class="col-md-6 mb-3" v-model="detailInputs.name"
                :invalidFeedBack="detailInvaild.name"></InputText>
              <InputText title="Competition Place" type="text" class="col-md-6 mb-3" v-model="detailInputs.place"
                  :invalidFeedBack="detailInvaild.place"></InputText>
              <InputText title="From" type="date" class="col-md-6 mb-3"
                  v-model="detailInputs.enrollStartDate"
                  :invalidFeedBack="detailInvaild.enrollStartDate"></InputText>
              <InputText title="To" type="date" class="col-md-6 mb-3"
                  v-model="detailInputs.enrollEndDate" :invalidFeedBack="detailInvaild.enrollEndDate">
              </InputText>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" @click="submitForm" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>

</div>
</template>



<script>
import InputText from '../components/InputText.vue';
import { Modal } from 'bootstrap';
export default {
  components: {
    InputText,
  },
  data() {
    return {
      email: '',
      password: '',
      searchInputs: {
        name: 'hhh',
      },
      detailInputs: {
        id: "",
        name: "",
        place: "",
        pickUp: false,
        type: [],
        enrollStartDate: "",
        enrollEndeDate: "",
        eventDateType: "1", // 1: 區間; 2:間隔
        eventStartDate: "",
        eventEndDate: "",
        eventDate: [],
        payStatusList: []
      },
      //檢核文字
      detailInvaild: {
          name: "",
          place: "",
          pickUp: "",
          type: "",
          enrollStartDate: "",
          enrollEndeDate: "",
          eventDateType: "",
          eventStartDate: "",
          eventEndDate: "",
          eventDate: "",
      },
    }
  },
  methods: {
    submitForm() {
      $('#detailModal').modal('hide');
      console.table(this.detailInputs);
    }
  },
  mounted() {
  }
}
</script>