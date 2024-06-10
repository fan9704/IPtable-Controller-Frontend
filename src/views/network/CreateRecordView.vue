<script setup lang="ts">
import Form from "@/components/network/create/form.vue";
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols=12>
        <h1 id="create-title">建立新的網路規則</h1>
      </v-col>
    </v-row>
    <Form></Form>
  </v-container>
</template>
<style>
#create-title {
  text-align: center;
  font-size: 2em;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}
</style>
