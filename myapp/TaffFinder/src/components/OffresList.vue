<script setup>  
import { ref } from 'vue'; 
const listItems = ref([]); 

async function getData() {
    const res = await fetch("http://localhost:3001/api/offres");
    const finalRes = await res.json();
    listItems.value = finalRes; 
    console.log(finalRes)
}
getData();
</script>
<template>
    <div>
        <h1> Liste des Offres </h1>
        <table border="1">
            <thead>
            <tr>                     
                <th scope="col">intitule</th>  
                <th scope="col">recruteur</th>                    
                <th scope="col">salaire</th>                                     
            </tr>             
        </thead>             
        <tbody>                 
            <tr v-for="item in listItems">                      
                <td>{{ item.intitule }}</td> 
                <td>{{ item.recruteur }}</td>                     
                <td>{{ item.salaire }}</td>                                      
            </tr>             
        </tbody>         
    </table>     
</div> 
</template>

