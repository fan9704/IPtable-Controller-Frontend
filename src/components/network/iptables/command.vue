<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getIptablesCommand } from '@/api/network';
import type { IptablesCommandResponseDTO } from '@/interfaces/network';
import swal from 'sweetalert2';
import Terminal from '@/components/network/iptables/terminal.vue';
const iptablesCommand = ref<IptablesCommandResponseDTO>();

const getIptables = async () => {
  iptablesCommand.value = await getIptablesCommand();
  swal.fire(
    '成功取得 NAT Iptables',
    iptablesCommand.value.message + "-" + iptablesCommand.value.status,
    'success'
  );
}

onMounted(async () => {
  getIptables();
});

</script>
<template>
  <v-container>
    <v-row>
      <v-col cols=12>
        <h1 id="create-title">Iptables Terminal List</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-textarea variant="outlined" :model-value="iptablesCommand?.response" auto-grow>

      </v-textarea>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn @click="getIptables">Refresh</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <Terminal></Terminal>
</template>
