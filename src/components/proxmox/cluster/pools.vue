<script setup lang="ts">
import type { Pool } from "@/interfaces/proxmox";
import { getPools } from "@/api/proxmox";
import { ref, onMounted } from "vue";



const pools = ref<Pool[]>([]);

const getAllPools = async () => {
  const res = await getPools();
  pools.value = res;
}

const refresh = () => {
  getAllPools();
}
onMounted(() => {
  getAllPools();
})

</script>
<template>
  <v-container>
    <h1 id="panel-title">Pools 列表</h1>
    <v-row>
      <v-btn @click="refresh">刷新清單</v-btn>
    </v-row>
    <v-row>
      <v-col cols="2">資源集區 ID</v-col>
      <v-col cols="1">備註</v-col>
      <v-col cols="1">成員</v-col>
      <v-col cols="2">啟用狀態</v-col>
      <v-col cols="2">類型</v-col>
      <v-col cols="3">磁碟內容</v-col>
    </v-row>
    <v-row v-for="(pool, index) in pools" key:record data-aos="flip-up" class="vm-card">
      <v-col cols="2">{{ pool.id }}</v-col>
      <v-col cols="1">{{ pool.comment }}</v-col>
      <v-col v-for="(member, index) in pool.members">
        {{ member.type }}
        {{ member.node }}
        {{ member.vmid }}
        {{ member.name }}
      </v-col>
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
