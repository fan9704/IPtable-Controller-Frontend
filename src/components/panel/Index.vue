<script setup lang="ts">
import FormComponent from '@/components/panel/form.vue';

import { listNetworkRecords, deleteNetworkRecord } from '@/api/network';
import type { NetworkRecord } from '@/interfaces/network';
import { onMounted, ref } from 'vue';
import router from '@/router';

const formShow = ref<boolean>(false);

const networkRecords = ref<NetworkRecord[]>([]);

const selectId = ref<string>('');

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
  networkRecords.value = res.data;
};
const deleteById = async (id: string) => {
  const res = await deleteNetworkRecord(id);
  if (res.status == 200) {
    alert('刪除成功');
    findAllNetworkRecords();
  }
  else {
    alert('刪除失敗');
  }
};

onMounted(() => {
  findAllNetworkRecords();
});
</script>
<template>

  <h1 id="panel-title">Proxmox Virtual Environment 網路控制台</h1>

  <v-row>
    <v-col cols="2">輸出 IP</v-col>
    <v-col cols="1">輸出 Port</v-col>
    <v-col cols="2">輸入 IP</v-col>
    <v-col cols="1">輸入 Port</v-col>
    <v-col cols="2">通訊協定</v-col>
    <v-col cols="1">備註</v-col>
    <v-col cols="3">操作</v-col>
  </v-row>
  <v-row v-for="(record, index) in networkRecords" key:record>
    <v-col cols="2">{{ record.outputIp }}</v-col>
    <v-col cols="1">{{ record.outputPort }}</v-col>
    <v-col cols="2">{{ record.inputIp }}</v-col>
    <v-col cols="1">{{ record.inputPort }}</v-col>
    <v-col cols="2">{{ record.protocol }}</v-col>
    <v-col cols="1">{{ record.note }}</v-col>
    <v-col cols="3">
      <v-btn @click="setId(record.id)">
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
  <v-container v-show="formShow" id="form-container">
    <v-btn class="justify-end" id="form-close-btn" @click="closeForm" prepend-icon="mdi-close-circle">
      關閉</v-btn>

    <FormComponent :id="selectId" />
  </v-container>

  <v-container id="create-container">
    <v-btn id="create-btn" to="/new">新建規則</v-btn>
  </v-container>
</template>

<style>
.v-col {
  text-align: center;
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
