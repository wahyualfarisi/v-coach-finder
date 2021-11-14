<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="firstname">Firstname</label>
            <input type="text" id="firstname" v-model.trim="firstName.val" @blur="clearValidity('firstName')"  />
            <p v-if="!firstName.isValid">Firstname must not be empty!</p>
        </div>
        <div class="form-control" :class="{invalid: !lastName.isValid}">
            <label for="lastname">lastname</label>
            <input type="text" id="lastname" v-model.trim="lastName.val" @blur="clearValidity('lastName')" />
            <p v-if="!lastName.isValid">Lastname must not be empty!</p>
        </div>
        <div class="form-control" :class="{invalid: !descriptions.isValid}">
            <label for="description">description</label>
            <textarea name="description" id="description" v-model.trim="descriptions.val" rows="5" @blur="clearValidity('descriptions')"></textarea>
            <p v-if="!descriptions.isValid">Description must not be empty!</p>
        </div>
        <div class="form-control" :class="{invalid: !rate.isValid}" >
            <label for="rate">rate</label>
            <input type="number" id="rate" v-model.number="rate.val" @blur="clearValidity('rate')" />
            <p v-if="!rate.isValid">Rate must not be empty!</p>
        </div>
        <div class="form-control" :class="{invalid: !areas.isValid}">
            <h3>Areas of Expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.val">
                <label for="frontend">Frontend Development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas.val">
                <label for="backend">Backend Development</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas.val">
                <label for="career">Career Advisory</label>
            </div>
            <p v-if="!areas.isValid">Please select areas atleast 1 !</p>
        </div>
        <p v-if="!formIsValid">Please fix the above errors amd submit again</p>
        <base-button>Register</base-button>
    </form>
</template>
<script>
export default {
    emits: ['save-data'],
    data(){
        return {
            firstName: {
              val: '',
              isValid: true
            },
            lastName: {
              val: '',
              isValid: true
            },
            descriptions: {
              val: '',
              isValid: true
            },
            rate: {
              val: null,
              isValid: true
            },
            areas: {
              val: [],
              isValid: true
            },
            formIsValid: true
        }
    },
    methods: {
        validate(){
          this.formIsValid = true;

          if(this.firstName.val === ''){
            this.firstName.isValid = false;
            this.formIsValid = false;
          }

          if(this.lastName.val === ''){
            this.lastName.isValid = false;
            this.formIsValid = false;
          }

          if(this.descriptions.val === ''){
            this.descriptions.isValid = false;
            this.formIsValid = false;
          }

          if(!this.rate.val || this.rate.val < 0){
            this.rate.isValid = false
            this.formIsValid = false
          } 

          if(this.areas.val.length === 0){
            this.areas.isValid = false;
            this.formIsValid = false;
          }


        },
        clearValidity(input){
          this[input].isValid = true;
        },
        submitForm(){
            this.validate();

            if(!this.formIsValid) return;


            const formData = {
                first: this.firstName.val,
                last: this.lastName.val,
                desc: this.descriptions.val,
                rate: this.rate.val,
                areas: this.areas.val
            }
            this.$emit('save-data', formData)
        }
    }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>