<script setup lang="ts">
import type { Node } from "@/interfaces/proxmox";
import { getNodes } from "@/api/proxmox";
import { ref, onMounted } from "vue";
import router from '@/router';

const nodes = ref<Node[]>([]);
const show = ref(false);

const getAllNodes = async () => {
  const res = await getNodes();
  nodes.value = res;
};

const getNodeInfo = (nodeName: string) => {
  router.push({name:"PVENode-Resources",params:{node:nodeName}})
};

onMounted(() => {
  getAllNodes();
});

</script>
<template>
  <v-container>
    <v-row>
      <h2> Proxmox Cluster 節點</h2>
    </v-row>
    <v-row justify="center">
      <v-col cols=6 xs=12 sm=12 md=6 lg=6 xl=4 xxl=4 v-for="node in nodes">
        <v-card color="orange" variant="flat" class="mx-auto">
          <v-card-item>
            <div>
              <div class="text-h6 mb-1">
                節點名稱 {{ node.name }}
              </div>
              <div class="text-overline mb-1">
                在線狀態 {{ node.status }}
              </div>

              <div class="text-caption">
                核心數量 {{ node.maxCpu }} 記憶體容量 {{ node.maxMemory / 1024 / 1024 / 1000 }}</div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-btn color="deep-orange-lighten-4" text="Reserve" block border @click="getNodeInfo(node.name)">
                取得節點更多資訊
              </v-btn>
            </div>

          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>
