<script setup lang="ts">
import type { QemuVM } from "@/interfaces/proxmox";
import { getNodeQEMUs } from "@/api/proxmox";
import { ref, onMounted } from "vue";

const props = defineProps({
  node: {
    type: String,
    required: true,
  },
});

const vms = ref<QemuVM[]>([]);

const getAllNodeQEMU = async (node: string) => {
  const res = await getNodeQEMUs(node);
  vms.value = res;
}

const refresh = () => {
  getAllNodeQEMU(props.node);
}
onMounted(() => {
  getAllNodeQEMU(props.node);
})

</script>
<template>
  <v-container>
    <h1 id="panel-title">VM 列表</h1>
    <v-row>
      <v-btn @click="refresh">刷新清單</v-btn>
    </v-row>
    <v-row>
      <v-col cols="3">VM 編號(名稱)</v-col>
      <v-col cols="1">狀態</v-col>
      <v-col cols="1">CPU 數量</v-col>
      <v-col cols="2">鎖定狀態</v-col>
      <v-col cols="2">記憶體使用量</v-col>
      <v-col cols="2">磁碟容量</v-col>
    </v-row>
    <v-row v-for="(vm, index) in vms" key:record data-aos="flip-up" class="vm-card">
      <v-col cols="3">{{ vm.id }}({{ vm.name }} )</v-col>
      <v-col cols="1">{{ vm.status }}</v-col>
      <v-col cols="1">{{ vm.cpus }}</v-col>
      <v-col cols="2">{{ vm.lock || "None" }}</v-col>
      <v-col cols="2">{{ Math.floor(vm.memory / vm.maxMemory * 100) + "%" }}</v-col>
      <v-col cols="2">{{ Math.floor(vm.maxDisk / 1024 / 1024 / 1000) + "G" }}</v-col>
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
