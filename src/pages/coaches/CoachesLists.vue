<template>
    <section>Filter</section>
    <section>
        <div class="controls">
            <button>Refresh</button>
        </div>
        <ul v-if="hasCoaches">
            <li v-for=" (c, index) in filteredCoaches" :key="index">{{ c.firstName }}</li>
        </ul>
        <h3 v-else>No Coaches Found</h3>
    </section>
</template>
<script>
export default {
   computed: {
       filteredCoaches(){
           return this.$store.getters['coaches/coaches']
       },
       hasCoaches(){
           return this.$store.getters['coaches/hasCoaches']
       }
   }
}
</script>