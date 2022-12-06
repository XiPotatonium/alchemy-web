<template>
  <v-container>
    <v-alert closable v-model="useAlert" type="error" variant="outlined">{{ alertMsg }}</v-alert>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const useAlert = ref(false);
const alertMsg = ref("Error msg");

function setAlert(msg: string) {
  alertMsg.value = msg;
  useAlert.value = true;
}

</script>
