<template>
  <v-app>
    <Spinner />
    <v-app-bar app elevate-on-scroll color="#4d0aaf" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Shibx"
          contain
          max-height="60px"
          max-width="200"
          src="../public/img/icons/SHIBXPNG-2.png"
        />
      </div>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="mx-5"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      height="100%"
      app
      v-model="drawer"
      floating
      temporary
      right
      dark
      color="#4d0aaf"
    >
      <v-list-item>
        
          <v-img src="../public/img/icons/SHIBXPNG-2.png"></v-img>
        
      </v-list-item>
      <v-list nav>
        <v-list-item-group v-model="group" active-class="secondary--text">
          <v-list-item href="https://shibxbsc.com/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <router-link to="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-chart-tree</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/tracker">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-wallet</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Tracker</v-list-item-title>
            </v-list-item>
          </router-link>
          
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div>
          <v-list-item-subtitle class="text-center my-0">
            Join Shibx
          </v-list-item-subtitle>
          <v-list-item class="d-flex justify-center">
            <div>
              <v-btn
                href="https://twitter.com/ShibXOfficial"
                target="_blank"
                text
                icon
                class="mx-2"
              >
                <svg
                  width="25px"
                  height="20px"
                  viewBox="0 0 30 25"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <title>Path</title>
                  <defs>
                    <linearGradient
                      x1="239.595374%"
                      y1="167.823543%"
                      x2="17.2382834%"
                      y2="29.6589985%"
                      id="linearGradient-1"
                    >
                      <stop stop-color="#FFF" offset="0%"></stop>
                      <stop stop-color="#FFF" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="CryptoIsland_home"
                      transform="translate(-1129.000000, -6051.000000)"
                      fill="url(#linearGradient-1)"
                      fill-rule="nonzero"
                    >
                      <g
                        id="Footer"
                        transform="translate(0.000000, 5885.000000)"
                      >
                        <g
                          id="733635"
                          transform="translate(1129.027757, 166.259715)"
                        >
                          <path
                            d="M30,2.84123077 C28.884375,3.32307692 27.695625,3.64246154 26.45625,3.79753846 C27.73125,3.048 28.704375,1.87015385 29.161875,0.450461538 C27.973125,1.14830769 26.660625,1.64123077 25.261875,1.91630769 C24.133125,0.732923077 22.524375,0 20.769375,0 C17.364375,0 14.623125,2.72123077 14.623125,6.05723077 C14.623125,6.53723077 14.664375,6.99876923 14.765625,7.43815385 C9.6525,7.19261538 5.128125,4.77969231 2.08875,1.104 C1.558125,2.01046154 1.246875,3.048 1.246875,4.16492308 C1.246875,6.26215385 2.34375,8.12123077 3.97875,9.19753846 C2.990625,9.17907692 2.02125,8.89661538 1.2,8.45169231 C1.2,8.47015385 1.2,8.49415385 1.2,8.51815385 C1.2,11.4609231 3.331875,13.9052308 6.1275,14.4683077 C5.626875,14.6030769 5.08125,14.6676923 4.515,14.6676923 C4.12125,14.6676923 3.72375,14.6455385 3.350625,14.5643077 C4.1475,16.9624615 6.40875,18.7255385 9.0975,18.7827692 C7.005,20.3944615 4.348125,21.3655385 1.471875,21.3655385 C0.9675,21.3655385 0.48375,21.3433846 0,21.2824615 C2.724375,23.0123077 5.953125,24 9.435,24 C20.7525,24 26.94,14.7692308 26.94,6.768 C26.94,6.50030769 26.930625,6.24184615 26.9175,5.98523077 C28.138125,5.13230769 29.16375,4.06707692 30,2.84123077 Z"
                            id="Path"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </v-btn>
              <v-btn
                href="https://t.me/shib_x"
                target="_blank"
                text
                icon
                class="mx-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="28"
                  height="28"
                  viewBox="0 0 48 48"
                  style="fill: #000000"
                >
                  <linearGradient
                    id="BiF7D16UlC0RZ_VqXJHnXa_oWiuH0jFiU0R_gr1"
                    x1="9.858"
                    x2="38.142"
                    y1="9.858"
                    y2="38.142"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="1" stop-color="#FFF"></stop>
                    <stop offset="1" stop-color="#FFF"></stop>
                  </linearGradient>
                  <path
                    fill="url(#BiF7D16UlC0RZ_VqXJHnXa_oWiuH0jFiU0R_gr1)"
                    d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                  ></path>
                  <path
                    d="M10.119,23.466c8.155-3.695,17.733-7.704,19.208-8.284c3.252-1.279,4.67,0.028,4.448,2.113	c-0.273,2.555-1.567,9.99-2.363,15.317c-0.466,3.117-2.154,4.072-4.059,2.863c-1.445-0.917-6.413-4.17-7.72-5.282	c-0.891-0.758-1.512-1.608-0.88-2.474c0.185-0.253,0.658-0.763,0.921-1.017c1.319-1.278,1.141-1.553-0.454-0.412	c-0.19,0.136-1.292,0.935-1.745,1.237c-1.11,0.74-2.131,0.78-3.862,0.192c-1.416-0.481-2.776-0.852-3.634-1.223	C8.794,25.983,8.34,24.272,10.119,23.466z"
                    opacity=".05"
                  ></path>
                  <path
                    d="M10.836,23.591c7.572-3.385,16.884-7.264,18.246-7.813c3.264-1.318,4.465-0.536,4.114,2.011	c-0.326,2.358-1.483,9.654-2.294,14.545c-0.478,2.879-1.874,3.513-3.692,2.337c-1.139-0.734-5.723-3.754-6.835-4.633	c-0.86-0.679-1.751-1.463-0.71-2.598c0.348-0.379,2.27-2.234,3.707-3.614c0.833-0.801,0.536-1.196-0.469-0.508	c-1.843,1.263-4.858,3.262-5.396,3.625c-1.025,0.69-1.988,0.856-3.664,0.329c-1.321-0.416-2.597-0.819-3.262-1.078	C9.095,25.618,9.075,24.378,10.836,23.591z"
                    opacity=".07"
                  ></path>
                  <path
                    fill="#4d0aaf"
                    d="M11.553,23.717c6.99-3.075,16.035-6.824,17.284-7.343c3.275-1.358,4.28-1.098,3.779,1.91	c-0.36,2.162-1.398,9.319-2.226,13.774c-0.491,2.642-1.593,2.955-3.325,1.812c-0.833-0.55-5.038-3.331-5.951-3.984	c-0.833-0.595-1.982-1.311-0.541-2.721c0.513-0.502,3.874-3.712,6.493-6.21c0.343-0.328-0.088-0.867-0.484-0.604	c-3.53,2.341-8.424,5.59-9.047,6.013c-0.941,0.639-1.845,0.932-3.467,0.466c-1.226-0.352-2.423-0.772-2.889-0.932	C9.384,25.282,9.81,24.484,11.553,23.717z"
                  ></path>
                </svg>
              </v-btn>
            </div>
          </v-list-item>
        </div>
      </template>
      <v-spacer></v-spacer>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
        <div class="page-bg"></div>

          <div class="animation-wrapper">
          <div class="particle particle-1"></div>
          <div class="particle particle-2"></div>
          <div class="particle particle-3"></div>
          <div class="particle particle-4"></div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<style>
</style>

<script>
import Spinner from "../src/components/Spinner";
export default {
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
  },
  data: () => ({
    drawer: false,
    group: null,
    title: "",
  }),
  mounted() {},
  components: {
    Spinner,
  },
  methods: {
    async accept() {
      this.showUpgradeUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
  },
};
</script>
