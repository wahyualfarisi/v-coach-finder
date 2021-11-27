<template>
    <base-card>
        <form @submit.prevent="submitForm">
            <div class="form-control">
                <label for="email">E-mail</label>
                <input type="email" id="email" v-model.trim="email">
            </div>
            
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="password">
            </div>
            
            <p v-if="!formIsValid">Please enter valid email and password, password atleast 6 characters long.</p>

            <base-button>{{ buttonTextAuth }}</base-button>
            <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchTextAuth }} instead</base-button>
        </form>
    </base-card>
</template>

<script>
export default {
    data(){
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login'
        }
    },

    computed: {
        buttonTextAuth(){
            return this.mode === 'login' ? 'Login' : 'Register'
        },

        switchTextAuth(){
            return this.mode === 'login' ? 'Register' : 'Login'
        }
    },

    methods: {
        switchAuthMode() {
            this.mode = this.mode === 'login' ? 'register' : 'login'
        },
        submitForm() {
            this.formIsValid = true;
            if(
                this.email === '' ||
                !this.email.includes('@') ||
                this.password.length < 6
            ) {
                this.formIsValid = false;
                return;
            }

        }
    }
}
</script>

<style scoped>
    form {
    margin: 1rem;
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
</style>