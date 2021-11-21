<template>
    <section>
        <base-card>
            <header>
                <h2>Request Received</h2>
            </header>
            
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>

            <p v-else-if="!isLoading && error">{{ error }}</p>

            <ul 
                v-else-if="hasRequests">
                <request-item 
                    v-for="(req, index) in receivedRequests"
                    :key="index"
                    :message="req.message"
                    :email="req.userEmail"
                />
            </ul>

            <h3 v-else>You Haven't received any requests yet!</h3>
        </base-card>
    </section>
</template>

<script>
import RequestItem from './../../components/requests/RequestItem.vue';

export default {
    data(){
        return {
            isLoading: false,
            error: null
        }
    },

    components: {
        RequestItem
    },

    computed: {
        receivedRequests(){
            return this.$store.getters['requests/requests'];
        },

        hasRequests(){
            return !this.isLoading && this.$store.getters['requests/hasRequests'];
        }
    },

    created(){
        this.fetchRequests()
    },

    methods: {
        async fetchRequests(){
            this.isLoading = true;
            try{
                await this.$store.dispatch(`requests/fetchRequests`);
            }catch(error){
                this.error = error.message || `Something when wrong !.`;
            }
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>