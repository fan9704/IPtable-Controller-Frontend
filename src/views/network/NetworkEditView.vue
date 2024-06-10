<script setup lang="ts">
import { getNetworkRecord, patchNetworkRecord } from '@/api/network';
import type { NetworkRecordRequestDTO } from '@/interfaces/network';
import router from '@/router';
import { onMounted, ref } from 'vue';
import swal from 'sweetalert2';


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
} as NetworkRecordRequestDTO);

const findNetworkRecordById = async (id: string) => {
  const res = await getNetworkRecord(id);
  record.value = res;
};
const resetForm = () => {
  record.value = {
    outputIp: '',
    outputPort: '',
    inputIp: '',
    inputPort: '',
    protocol: '',
    note: '',
  };
};
const submitForm = async () => {
  const formRecord = {
    outputIp: record.value.outputIp,
    outputPort: record.value.outputPort,
    inputIp: record.value.inputIp,
    inputPort: record.value.inputPort,
    protocol: record.value.protocol,
    note: record.value.note,
  } as NetworkRecordRequestDTO;
  const res = await patchNetworkRecord(props.id, formRecord)
  record.value = res;
  swal.fire("修改成功", "網路規則資料已經同步更新", "success")
};
const goToList = () => {
  router.push('/network');
}
onMounted(() => {
  if (props.id != null) {
    findNetworkRecordById(props.id);
  }
});
</script>

<template>
  <v-container id="part-edit-form-shell">

    <v-form id="part-edit-form">
      <v-row>
        <v-col cols=12>
          <h1>修改網路規則</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-text-field v-model="record.outputIp" label="對外 IP"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="record.outputPort" label="對外 Port"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="record.inputIp" label="對內 IP"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="record.inputPort" label="對內 Port"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="record.protocol" label="通訊協定"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="record.note" label="描述"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-btn class="mt-4" color="success" block @click="submitForm">
            提交
          </v-btn>

        </v-col>
        <v-col cols="4">
          <v-btn class="mt-4" color="error" block @click="resetForm">
            重新填寫
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn class="mt-4" block color="info" @click="goToList">
            返回網路規則列表
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<style>
#part-edit-form {
  /* margin: 0% 5%; */
  width: 100%;
  padding: 2%;
  background-color: #ffffff5e;
  border-radius: 0px 0px 20px 20px;
}
</style>
