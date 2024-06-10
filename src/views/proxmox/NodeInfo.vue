<script setup lang="ts">
import QEMU from "@/components/proxmox/node/qemu.vue";
import Storages from "@/components/proxmox/node/storages.vue";
import FirewallRules from "@/components/proxmox/node/firewall-rules.vue";

const props = defineProps({
  node: {
    type: String,
    required: true,
  },
});

</script>
<template>
  <QEMU :node="props.node" />
  <Storages :node="props.node" />
  <FirewallRules :node="props.node" />
</template>
<style></style>
