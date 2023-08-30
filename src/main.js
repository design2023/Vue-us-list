import { createApp } from "vue";
import App from "./App.vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as labsComponents from "vuetify/labs/components";
import * as directives from "vuetify/directives";
import router from './router';

const vuetify = createVuetify({
  theme: { defaultTheme: "light" },
  iconfont: 'mdi',
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
  compilerOptions: {
    isCustomElement: (tag) => tag.startsWith("v-"),
  },
});

createApp(App).use(vuetify).use(router).mount("#app");