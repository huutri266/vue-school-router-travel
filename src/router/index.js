import { createRouter, createWebHistory } from "vue-router";
import dataSource from "@/data.json";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChuckName: "home" */ "@/views/NotFound.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChuckName: "home" */ "@/views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChuckName: "home" */ "../views/AboutView.vue"),
  },
  {
    path: "/destination/:id/:slug",
    name: "destination.show",
    component: () => import("../views/DestinationShow.vue"),
    props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
    beforeEnter: (to) => {
      const exits = dataSource.destinations.find(
        (destination) => destination.id === parseInt(to.params.id)
      );
      if (!exits) {
        return {
          name: "NotFound",
          // to keep this url
          params: { pathMatch: to.path.split("/").slice(1) },
          query: to.query,
          hash: to.hash,
        };
      }
    },
    children: [
      {
        path: ":experienceSlug",
        name: "experience.show",
        component: () => import("../views/ExperiencesShow.vue"),
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "my-router-link-active",
  scrollBehavior(to, from, savePosition) {
    return savePosition || { top: 0 };
  },
});

export default router;
