<template>
  <section v-if="destination">
    <h1>{{ destination.name }}</h1>
    <go-back />
    <div class="destination-details">
      <img :src="`/images/${destination.image}`" :alt="destination.name" />
      <p>{{ destination.description }}</p>
    </div>
  </section>
  <section class="experiences">
    <h2>{{ destination.name }}</h2>
    <div class="cards">
      <router-link
        v-for="experience in destination.experiences"
        :key="experience.slug"
        :to="{
          name: 'experience.show',
          params: { experienceSlug: experience.slug },
        }"
      >
        <experiences-card :experience="experience" />
      </router-link>
    </div>
    <router-view />
  </section>
</template>

<script>
import sourceData from "@/data.json";
import ExperiencesCard from "@/components/ExperiencesCard.vue";
import GoBack from "@/components/GoBack.vue";

export default {
  components: {
    ExperiencesCard,
    GoBack,
  },
  // data() {
  //   return {
  //     destination: null,
  //   };
  // },

  props: {
    id: {
      type: Number,
      require: true,
    },
  },

  computed: {
    destination() {
      return sourceData.destinations.find(
        (destination) => destination.id === this.id
      );
    },
  },

  // methods: {
  //   async initData() {
  //     const response = await fetch(
  //       `https://travel-dummy-api.netlify.app/${this.$route.params.slug}.json`
  //     );
  //     this.destination = await response.json();
  //   },
  // },

  // async created() {
  //   this.initData();
  //   // this.$watch(() => this.$route.params, this.initData);
  // },
};
</script>
