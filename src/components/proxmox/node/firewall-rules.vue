<script setup lang="ts">
import type { FirewallRule } from "@/interfaces/proxmox";
import { getNodeFirewallRules } from "@/api/proxmox";
import { ref, onMounted } from "vue";

const props = defineProps({
  node: {
    type: String,
    required: true,
  },
});

const rules = ref<FirewallRule[]>([]);

const getAllNodeFirewallRules = async (node: string) => {
  const res = await getNodeFirewallRules(node);
  rules.value = res;
}

const refresh = () => {
  getAllNodeFirewallRules(props.node);
}
onMounted(() => {
  getAllNodeFirewallRules(props.node);
})

</script>
<template>
  <v-container>
    <h1 id="panel-title">防火牆規則表</h1>
    <v-row>
      <v-btn @click="refresh">刷新清單</v-btn>
    </v-row>
    <v-row>
      <v-col cols="1">規則編號</v-col>
      <v-col cols="1">啟用狀態</v-col>
      <v-col cols="1">類別</v-col>
      <v-col cols="1">動作</v-col>
      <v-col cols="1">巨集</v-col>
      <v-col cols="1">介面</v-col>
      <v-col cols="1">協定</v-col>
      <v-col cols="1">來源位置</v-col>
      <v-col cols="1">來源 Port</v-col>
      <v-col cols="1">目標位置</v-col>
      <v-col cols="1">目標 Port</v-col>
      <v-col cols="1">紀錄層級</v-col>
    </v-row>
    <v-row v-for="(rule, index) in rules" key:record data-aos="flip-up" class="vm-card">
      <v-col cols="1">{{ rule.pos }}</v-col>
      <v-col cols="1">{{ rule.enable }}</v-col>
      <v-col cols="1">{{ rule.type }}</v-col>
      <v-col cols="1">{{ rule.action }}</v-col>
      <v-col cols="1">{{ rule.macro }}</v-col>
      <v-col cols="1">{{ rule.iface }}</v-col>
      <v-col cols="1">{{ rule.source }}</v-col>
      <v-col cols="1">{{ rule.sourcePort }}</v-col>
      <v-col cols="1">{{ rule.destination }}</v-col>
      <v-col cols="1">{{ rule.destinationPort }}</v-col>
      <v-col cols="1">{{ rule.log }}</v-col>
    </v-row>
  </v-container>
</template>
<style>
.vm-card {
  color: #000;
  background-color: #f5ce9c;
  border-radius: 5px;
  margin: 1%;
}
</style>
