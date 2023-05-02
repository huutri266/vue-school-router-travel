<template>
  <nav id="nav">
    <router-link to="/" id="logo">Vue School Travel App</router-link>
    <router-link to="/about">About</router-link>
    <router-link
      v-for="des in destinations"
      :key="des.id"
      :to="{ name: 'destination.show', params: { id: des.id, slug: des.slug } }"
      >{{ des.name }}</router-link
    >
  </nav>
</template>

<script>
import sourceData from "@/data.json";

export default {
  data() {
    return {
      destinations: sourceData.destinations,
    };
  },
};
</script>

<style lang="css" scoped>
#nav .my-router-link-active {
  color: aqua;
  border-bottom: 2px solid aqua;
}
</style>
