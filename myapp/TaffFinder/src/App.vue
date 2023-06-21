<script setup>
import Offre from './components/Offre.vue';
import { ref } from 'vue'


const props = defineProps({
  data: Array,
  columns: Array,
  filterKey: String
})

const listOffres = ref([]); 

async function getData() {
    const res = await fetch("http://localhost:3001/api/offres");
    const finalRes = await res.json();
    listOffres.value = finalRes; 
    console.log(finalRes);
}
onMounted(getData); // Appeler getData() lorsque le composant est monté

gridColumns = Object.keys(listOffres[0])
const sortKey = ref('')
const sortOrders = ref(
  props.columns.reduce((o, key) => ((o[key] = 1), o), {})
)

</script>

<template>
  <form id="search">
    Search <input name="query" v-model="searchQuery">
  </form>
  <Offre
    :data="listOffres"
    :columns="gridColumns"
    :filter-key="searchQuery">
</Offre>
</template>