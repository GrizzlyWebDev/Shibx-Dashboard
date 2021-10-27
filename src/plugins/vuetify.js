import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#4d0aaf',
          secondary: '#8850d5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    },
  });