<template>
    <section>
        <base-card>
            <h2>{{ fullName }}</h2>
            <h3>${{ rate }}/hour</h3>
        </base-card>
    </section>
    <section>
        <base-card>
            <header>
                <h2>Interested ? Reach out now!</h2>
                <base-button link :to="contactLink">Contact</base-button>
            </header>
            <router-view></router-view>
        </base-card>    
    </section>
    <section>
        <base-card>
            <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
            <p>{{ descriptions }}</p>
        </base-card>
    </section>
</template>
<script>
export default {
    props: ['id'],
    data() {
        return {
            selectedCoach: null
        }
    },
    created(){
        this.selectedCoach = this.$store.getters['coaches/coaches'].find(el => el.id === this.id);
    },
    computed: {
        fullName(){
            return this.selectedCoach.firstName + ' '+ this.selectedCoach.lastName
        },
        contactLink(){
            return `/coaches/` + this.id + '/contact'
        },
        areas(){
            return this.selectedCoach.areas
        },
        rate(){
            return this.selectedCoach.rate
        },
        descriptions(){
            return this.selectedCoach.descriptions
        }
    }
}
</script>