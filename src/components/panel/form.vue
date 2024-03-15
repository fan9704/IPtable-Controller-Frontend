<script setup lang="ts">
import { getNetworkRecord, patchNetworkRecord } from '@/api/network';
import type { NetworkRecord, NetworkRecordRequestDTO } from '@/interfaces/network';
import { onUpdated, onMounted, ref, toRaw, type PropType } from 'vue';


const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
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
const findNetworkRecordById = async (id: string) => {
  const res = await getNetworkRecord(id);
  record.value = res.data;
  oldRecord.value = res.data;
};
const resetForm = () => {
  // console.log('reset');
  // console.log(oldRecord.value);
  record.value = toRaw(oldRecord.value);
};
const submitForm = async () => {
  console.log('submit');
  console.log(record.value);
  const formRecord = {
    outputIp: record.value.outputIp,
    outputPort: record.value.outputPort,
    inputIp: record.value.inputIp,
    inputPort: record.value.inputPort,
    protocol: record.value.protocol,
    note: record.value.note,
  } as NetworkRecordRequestDTO;
  const res = await patchNetworkRecord(props.id, formRecord)
  if (res.status == 200) {
    record.value = res.data;
    alert('修改成功');
  }
  else {
    alert('修改失敗');
  }

};
onUpdated(() => {
  if (props.id != "") {
    findNetworkRecordById(props.id);
  }
});
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
  /* margin: 0% 5%; */
  width: 100%;
  padding: 2%;
  background-color: #ffffff5e;
  border-radius: 0px 0px 20px 20px;
}
</style>
