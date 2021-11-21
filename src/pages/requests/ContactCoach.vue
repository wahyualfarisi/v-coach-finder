<template>
    <div>
        <base-dialog :show="!!error" @close="errorHandler" title="An error occured!">
            <p>{{ error }}</p>
        </base-dialog>
        <form @submit.prevent="submitForm" v-if="!isLoading">
            <div class="form-control">
                <label for="email">Your E-mail</label>
                <input type="email" id="email" v-model.trim="email" />
            </div>
            <div class="form-control">
                <label for="message">Message</label>
                <textarea id="message" rows="5" v-model.trim="message"></textarea>
            </div>
            <p class="errors" v-if="!formIsValid"> Please enter valid email and non empty message</p>
            <div class="actions">
                <base-button>Send Message</base-button>
            </div>
        </form>
        <div v-else>
            <base-spinner></base-spinner>
        </div>
    </div>
</template>

<script>
import BaseDialog from '../../components/ui/BaseDialog.vue';
export default {
  components: { BaseDialog },
    data(){
        return {
            email: '',
            message: '',
            formIsValid: true,
            isLoading: false,
            error: null
        }
    },
    methods: {
        async submitForm(){
            this.formIsValid = true;

            if(this.email === '' || !this.email.includes('@') || this.message === '') {
                this.formIsValid = false;
                return;
            }

            const payload = {
                email: this.email,
                message: this.message,
                coachId: this.$route.params.id
            }

            this.isLoading = true;

            try{
                await this.$store.dispatch('requests/contactCoach', payload);
                this.$router.replace('/')
            }catch(error){
                this.error = error.message || 'Something went wrong !'
            }

            this.isLoading = false;

        },

        errorHandler(){
            this.error = null;
        }
    }
}
</script>

<style scoped>
    form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
    }

    .form-control {
    margin: 0.5rem 0;
    }

    label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
    }

    input,
    textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
    }

    input:focus,
    textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
    }

    .errors {
    font-weight: bold;
    color: red;
    }

    .actions {
    text-align: center;
    }
</style>