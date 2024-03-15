<script setup lang="ts">
import { createNetworkRecord } from '@/api/network';
import type { NetworkRecord, NetworkRecordRequestDTO } from '@/interfaces/network';
import { onUpdated, onMounted, ref, toRaw, type PropType } from 'vue';


const record = ref({
  outputIp: '',
  outputPort: '',
  inputIp: '',
  inputPort: '',
  protocol: '',
  note: '',
} as NetworkRecord);
const oldRecord = ref({
  outputIp: '',
  outputPort: '',
  inputIp: '',
  inputPort: '',
  protocol: '',
  note: '',
} as NetworkRecord);
const submitForm = async () => {
  const formRecord = {
    outputIp: record.value.outputIp,
    outputPort: record.value.outputPort,
    inputIp: record.value.inputIp,
    inputPort: record.value.inputPort,
    protocol: record.value.protocol,
    note: record.value.note,
  } as NetworkRecordRequestDTO;
  const res = await createNetworkRecord(formRecord)
  if (res.status == 201) {
    record.value = res.data;
    alert('新增成功');
  }
  else {
    alert('新增失敗');
  }
};
const resetForm = () => {
  // console.log('reset');
  // console.log(oldRecord.value);
  record.value = toRaw(oldRecord.value);
};
</script>

<template>
  <v-form id="form">
    <v-row>
      <v-col cols=" 2">
        <v-text-field v-model="record.outputIp" label="輸出 IP"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field v-model="record.outputPort" label="輸出 Port"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field v-model="record.inputIp" label="輸入 IP"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field v-model="record.inputPort" label="輸入 Port"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-select v-model="record.protocol" :items="['TCP', 'UDP', 'SSH']" label="通訊協定"></v-select>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="record.note" label="備註"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn class="mt-4" color="success" block @click="submitForm">
          Submit
        </v-btn>

        <v-btn class="mt-4" color="error" block @click="resetForm">
          Reset Form
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<style>
#form {
  width: 100%;
  padding: 3% 4%;
  background-color: #ffffff5e;
  border-radius: 20px;
}
</style>
