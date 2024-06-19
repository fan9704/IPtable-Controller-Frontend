<script lang="ts" setup>
import { useGlobal } from '@/store';

/** Global Store */
const globalStore = useGlobal();

/** Display snackbar */
const showSnackbar = (message: string) => globalStore.setMessage(message);
</script>

<template>
  <v-container class="about">
    <v-row>
      <v-col cols="12">
        <h1 id="about-title">作者 FKT</h1>
      </v-col>
    </v-row>
  </v-container>
</template>
