<script setup lang="ts">
import { ref } from 'vue';

interface CommandObject {
  preRouting: String;
  postRouting: String;
}


const outputIp = ref<String>("");
const outputPort = ref<String>("");
const inputIp = ref<String>("");
const inputPort = ref<String>("");

const commandList = ref<CommandObject[]>([]);

const generateIptablesCommand = () => {
  const preRouting = `iptables -t nat -A PREROUTING -p tcp --dport ${outputPort.value} -j DNAT --to-destination ${inputIp.value}:${inputPort.value}`;
  const postRouting = `iptables -t nat -A POSTROUTING -p tcp -d ${inputIp.value} --dport ${inputPort.value} -j SNAT --to-source ${outputIp.value}`;

  let commandObject = {
    "preRouting": preRouting,
    "postRouting": postRouting
  }
  commandList.value.push(commandObject);
}

</script>
<template>
  <v-container>
    <v-row class="justify-center">
      <v-col style="text-align: center;">
        <h1 id="index-title">Iptables NAT 指令生成頁面</h1>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="3"><v-text-field label="對外 IP" v-model=outputIp></v-text-field></v-col>
      <v-col cols="3"><v-text-field label="對外 Port" v-model=outputPort></v-text-field></v-col>
      <v-col cols="3"><v-text-field label="對內 IP" v-model=inputIp></v-text-field></v-col>
      <v-col cols="3"><v-text-field label="對內 Port" v-model=inputPort></v-text-field></v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn @click="generateIptablesCommand">
          提交
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-for="(command, index) in commandList">
      <v-col cols="6">{{ command.preRouting }}</v-col>
      <v-col cols="6">{{ command.postRouting }}</v-col>
    </v-row>
  </v-container>
</template>
<style>
#index-title {
  font-size: 4rem;
}

#index-logo {
  margin-top: 20px;
  border-radius: 5%;
}
</style>
