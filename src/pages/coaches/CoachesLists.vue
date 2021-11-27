<template>
    <div>
        <base-dialog :show="!!error" title="An error occured" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter
                @change-filter="changeFilterHandler"
            ></coach-filter>
        </section>
        <base-card>
            <section>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                    <base-button link to="/auth" v-if="!isLoggedIn">Login to register as coach</base-button>
                    <base-button link to="/register" v-if="isLoggedIn && !isLoading && !isCoach">Register as Coach</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <p v-else-if="!isLoading && error">{{ error }}</p>
                <ul v-else-if="hasCoaches">
                    <coach-item 
                        v-for=" (c, index) in filteredCoaches" 
                        :key="index" 
                        :id="c.id"
                        :firstName="c.firstName" 
                        :lastName="c.lastName"
                        :rate="c.hourlyRate"
                        :areas="c.areas"
                    ></coach-item>
                </ul>
                <h3 v-else>No Coaches Found</h3>
            </section>
        </base-card>
    </div>
</template>
<script>
import CoachItem from './../../components/coaches/CoachItem.vue';
import CoachFilter from './../../components/coaches/CoachFilter.vue';
export default {
   components: {
       CoachItem,
       CoachFilter
   },
   data(){

       return {
           isLoading: false,
           error: null,
           activeFilter: {
               frontend: true,
               backend: true,
               career: true
           }
       }

   },

   computed: {
    isLoggedIn(){
        return this.$store.getters.isAuthenticated
    },

    filteredCoaches(){
        const coaches = this.$store.getters['coaches/coaches']
        return coaches.filter(coach => {
            if(this.activeFilter.frontend && coach.areas.includes('frontend')) {
                return true;
            }

            if(this.activeFilter.backend && coach.areas.includes('backend') ) {
                return true;
            }

            if(this.activeFilter.career && coach.areas.includes('career')) {
                return true;
            }

            return false
        });
    },

    hasCoaches(){
        return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },
       
    isCoach(){
        return this.$store.getters['coaches/isCoach'];
    }
   },

   created(){
       this.loadCoaches();
   },

   methods: {
       changeFilterHandler(updatedFilter){
           this.activeFilter = updatedFilter;
       },

       async loadCoaches( isForceRefresh = false ){
           this.isLoading = true;
           try{
               await this.$store.dispatch('coaches/loadCoaches', { isForceRefresh });
           }catch(error){
               this.error = error.message || 'Something went wrong !';
           }
           this.isLoading = false;
       },

       handleError(){
           this.error = null;
       }
   }
}
</script>

<style  scoped>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .controls {
        display: flex;
        justify-content: space-between;
    }
</style>