<script setup lang="ts">
import type DrawerMenuItem from '@/interfaces/DrawerMenuItemInterface';

/** Drawer menu items */
const items: DrawerMenuItem[] = [
  {
    title: '首頁',
    icon: 'mdi-home',
    to: { name: 'Index' },
  },
  {
    title: '-', // Divider
  },
  {
    title: '網路規則',
    icon: 'mdi-network',
    to: { name: 'Network' },
  },
  {
    title: '新建立規則',
    icon: 'mdi-creation',
    to: { name: 'create' },
  },
  {
    title: '規則指令生成工具',
    icon: 'mdi-creation',
    to: { name: 'Iptables' },
  },
  {
    title: '資訊',
    icon: 'mdi-information',
    to: { name: 'About' },
  },
  {
    title: '-', // Divider
  },
  {
    title: 'Proxmox 節點',
    icon: 'mdi-laptop',
    to: { name: 'PVENodes' },
  },
  {
    title: 'Proxmox 群集',
    icon: 'mdi-server',
    to: { name: 'PVECluster-Resources' },
  },
];
</script>

<template>
  <v-list nav>
    <template v-for="item in items" :key="item.title">
      <v-divider v-if="item.title === '-'" />
      <template v-else>
        <!-- Menu Item -->
        <v-list-item
          v-if="!item.items"
          :disabled="!item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
          link
        />
        <!-- Sub menu -->
        <v-list-group v-else-if="item.items" v-model="item.active">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="item.icon"
              :title="item.title"
            />
          </template>
          <!-- Sub menu item -->
          <template v-for="subItem in item.items" :key="subItem.title">
            <v-divider v-if="subItem.title === '-'" />
            <v-list-item
              v-else
              :disabled="!subItem.to"
              :prepend-icon="subItem.icon"
              :title="subItem.title"
              :to="subItem.to"
              link
            />
          </template>
        </v-list-group>
      </template>
    </template>
  </v-list>
</template>
