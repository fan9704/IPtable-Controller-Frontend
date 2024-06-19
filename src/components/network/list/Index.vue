<script setup lang="ts">
import { listNetworkRecords, deleteNetworkRecord } from '@/api/network';
import type { NetworkRecord } from '@/interfaces/network';
import { onMounted, ref } from 'vue';
import router from '@/router';
import swal from 'sweetalert2';

const formShow = ref<boolean>(false);

const networkRecords = ref<NetworkRecord[]>([]);

const selectId = ref<string>('');

const goEdit = (id: string) => {
  router.push(`/network/${id}`);
}

const setId = async (id: string) => {
  selectId.value = id;
  formShow.value = true;
}
const closeForm = () => {
  formShow.value = false;
  selectId.value = '';
}
const findAllNetworkRecords = async () => {
  const res = await listNetworkRecords();
  networkRecords.value = res;
};
const deleteById = async (id: string) => {
  const res = await deleteNetworkRecord(id);
  swal.fire('刪除成功', "網路規則刪除成功", "success");
  findAllNetworkRecords();
};

onMounted(() => {
  findAllNetworkRecords();
});
</script>
<template>

  <h1 id="panel-title">Proxmox Virtual Environment 網路控制台</h1>

  <v-row>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2">輸出 IP:Port</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2">輸入 IP:Port</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2">通訊協定</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="3">備註</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="3">操作</v-col>
  </v-row>
  <v-row v-for="(record, index) in networkRecords" key:record class="network-record">
    <v-col cols="6" xs=6 sm="6" md="4" lg="2">{{ record.outputIp }}:{{ record.outputPort }}</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2">{{ record.inputIp }}:{{ record.inputPort }}</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2">{{ record.protocol }}</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="3">{{ record.note }}</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="3">
      <v-btn @click="goEdit(record.id)">
        <v-icon>
          mdi-puzzle-edit
        </v-icon>
      </v-btn>
      <v-btn @click="deleteById(record.id)">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-col>

  </v-row>

  <v-container id="create-container">
    <v-btn id="create-btn" to="/new">新建規則</v-btn>
  </v-container>
</template>

<style>
.v-col {
  text-align: center;
}
.v-theme--dark .network-record {
  border: 1px solid white;

}

.v-theme--light .network-record {
  border: 1px solid black
}
#panel-title {
  text-align: center;
  margin: 20px;
  font-size: larger;
}

#form-close-btn {
  width: 100%;
  text-align: center;
  background-color: #ffffff3a;
}

#form-container {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #0000008a;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  overflow: auto;
}

#create-btn {
  background-color: #1b7fd1;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  overflow: auto;
  bottom: 10%;
  right: 5%;
}
</style>
