<script setup lang="ts">
import { listNetworkRecords, deleteNetworkRecord, refreshNetworkRecordById, refreshAllNetworkRecord } from '@/api/network';
import type { NetworkRecord } from '@/interfaces/network';
import { computed, onMounted, ref } from 'vue';
import router from '@/router';
import swal from 'sweetalert2';

const networkRecords = ref<NetworkRecord[]>([]);
const filter = ref({
  outputIp: 'all',
  inputIp: 'all',
  protocol: 'all',
});
const outputIpOption = ref<string[]>(["all"]);
const inputIpOption = ref<string[]>(["all"]);
const goEdit = (id: string) => {
  router.push(`/network/${id}`);
}

const findAllNetworkRecords = async () => {
  const res = await listNetworkRecords();
  networkRecords.value = res;
  res.forEach((record) => {
    if (record.outputIp && !outputIpOption.value.includes(record.outputIp)) {
      outputIpOption.value.push(record.outputIp);
    }
    if (record.inputIp && !inputIpOption.value.includes(record.inputIp)) {
      inputIpOption.value.push(record.inputIp);
    }
  });
};
const refreshById = async (id: string) => {
  await refreshNetworkRecordById(id);
  swal.fire('刷新成功', "網路規則刷新成功", "success");
  findAllNetworkRecords();
}
const refreshAll = async () => {
  const res = await refreshAllNetworkRecord();
  swal.fire('刷新成功', "網路規則刷新成功", "success");
  networkRecords.value = res;
}

const deleteById = async (id: string) => {
  await deleteNetworkRecord(id);
  swal.fire('刪除成功', "網路規則刪除成功", "success");
  findAllNetworkRecords();
};
const filteredRecords = computed(() => {
  return networkRecords.value.filter(record => record.outputIp === filter.value.outputIp || filter.value.outputIp === "all").filter(record => record.inputIp === filter.value.inputIp || filter.value.inputIp === "all").filter(record => record.protocol === filter.value.protocol
    || filter.value.protocol === "all");

});

onMounted(() => {
  findAllNetworkRecords();
});
</script>
<template>

  <h1 id="panel-title">NAT 網路控制台</h1>
  <v-row>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2">輸出 IP:Port</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2">輸入 IP:Port</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2">通訊協定</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="3">備註</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="3">操作</v-col>
  </v-row>
  <v-row>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2"><v-select label="輸出 IP" v-model=filter.outputIp
        :items=outputIpOption></v-select></v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2"><v-select label="輸入 IP" v-model=filter.inputIp
        :items=inputIpOption></v-select></v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2"><v-select label="通訊協定" v-model="filter.protocol"
        :items="['all', 'TCP', 'UDP', 'SSH']"></v-select></v-col>
  </v-row>
  <v-row v-for="(record, index) in filteredRecords" key:record class="network-record">
    <v-col cols="6" xs=6 sm="6" md="4" lg="2">{{ record.outputIp }}:{{ record.outputPort }}</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2">{{ record.inputIp }}:{{ record.inputPort }}</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="2">{{ record.protocol }}</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="3">{{ record.note }}</v-col>
    <v-col cols="6" xs=6 sm="6" md="4" lg="3">
      <v-btn @click="refreshById(record.id)">
        <v-icon>
          mdi-refresh
        </v-icon>
      </v-btn>
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
    <v-btn id="refresh-btn" @click="refreshAll">同步/刷新規則</v-btn>
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

#refresh-btn {
  color: white;
  background-color: #1b7fd1c3;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
#create-btn {
  color: white;
  background-color: #1b7fd1;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
</style>
