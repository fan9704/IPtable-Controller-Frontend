<script setup lang="ts">
import type { Storage } from "@/interfaces/proxmox";
import { getStorages } from "@/api/proxmox";
import { ref, onMounted } from "vue";

const storages = ref<Storage[]>([]);

const getAllNodeStorages = async () => {
  const res = await getStorages();
  storages.value = res;
}

const refresh = () => {
  getAllNodeStorages();
}
onMounted(() => {
  getAllNodeStorages();
})

</script>
<template>
  <v-container>
    <h1 id="panel-title">Storages 列表</h1>
    <v-row>
      <v-btn @click="refresh">刷新清單</v-btn>
    </v-row>
    <v-row>
      <v-col cols="2">儲存空間名稱</v-col>
      <v-col cols="1">Share 類型</v-col>
      <v-col cols="1">總容量</v-col>
      <v-col cols="2">啟用狀態</v-col>
      <v-col cols="2">類型</v-col>
      <v-col cols="3">磁碟內容</v-col>
    </v-row>
    <v-row v-for="(storage, index) in storages" key:record data-aos="flip-up" class="vm-card">
      <v-col cols="2">{{ storage.name }}</v-col>
      <v-col cols="1">{{ storage.shared }}</v-col>
      <v-col cols="1">{{ Math.floor(storage.total / 1024 / 1024 / 1000) + "G" }}</v-col>
      <v-col cols="2">{{ !storage.disabled }}</v-col>
      <v-col cols="2">{{ storage.type }}</v-col>
      <v-col cols="3">{{ storage.content }}</v-col>
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
