<script setup lang="ts">
import { ref } from "vue";

import partImage from "@/assets/images/part.jpg";
import orderImage from "@/assets/images/order.jpg";
import scheduleImage from "@/assets/images/schedule.jpeg";
import accountImage from "@/assets/images/account.png";

import { useRouter } from 'vue-router';
const router = useRouter();
const panelList = ref(
  [
    {
      title: "網路規則管理",
      image: partImage,
      link: "/network",
    },
    {
      title: "Proxmox 叢集",
      image: orderImage,
      link: "/pve/cluster",
    },
    {
      title: "Proxmox 節點",
      image: scheduleImage,
      link: "/pve/nodes",
    },
    {
      title: "規則指令生成器",
      image: accountImage,
      link: "/iptables",
    },
  ]
);
const goRoute = (route: string) => {
  console.log(route);
  router.push({ path: route });
}
</script>
<template>
  <v-container>
    <v-row>
      <h3>選單</h3>
    </v-row>
    <v-row>
      <v-col cols="12" xs="6" sm="6" md="6" lg=3 xl=3 xxl=3 v-for="p in panelList"
        class="text-center d-flex child-flex">
        <v-img :src="p.image" class="bg-grey-lighten-2 panel-image" @click="goRoute(p.link)" cover>
          <v-card-text class="text-grow" id="button">
            {{ p.title }}</v-card-text>
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <h3>商店簡介</h3>
    </v-row>
    <v-row>
      <v-col v-for=" n in 9" :key="n" class="d-flex child-flex" cols="4">
        <v-img :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`" aspect-ratio="1" class="bg-grey-lighten-2" cover>
          <template v-slot:placeholder>
            <v-row align="center" class="fill-height ma-0" justify="center">
              <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.text-grow {
  flex-grow: 1;
  height: 100%;
  align-content: center;
  font-size: 1.5em;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}

.panel-image {
  transition: all .3s ease-in-out;
}

/*animate parent div so element doesn't push all content*/
.panel-image:hover {
  transform: scale(1.15);
}
</style>
