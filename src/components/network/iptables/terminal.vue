<script setup lang="ts">
import { ref } from 'vue';
import { executeCommand } from '@/api/network';
import type { ExecuteCommandRequestDTO, ExecuteCommandResponseDTO } from '@/interfaces/network';
const messages = ref<string>("");
const input = ref<string>("");


const execute = async () => {
  const request: ExecuteCommandRequestDTO = {
    command: input.value
  };
  const res: ExecuteCommandResponseDTO = await executeCommand(request);
  messages.value += res.response.replace('\n', ';')
  input.value = "";
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 id="terminal-title">Iptables Terminal</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea variant="outlined" :model-value="messages" readonly auto-grow>

        </v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="Enter Command" v-model="input"></v-text-field><v-btn @keyup.enter="execute"
          @click="execute">
          Send
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
