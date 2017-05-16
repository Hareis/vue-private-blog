<template>
  <div id='app'>

    <md-layout md-align="center" md-flex="100"
         style="
          height: 76px;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 10;">

      <md-toolbar  style="width: 100%">
        <md-button class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1">
          <router-link to="/">{{ title }}</router-link>
        </h2>
        <md-layout md-hide-small>
          <search-bar md-hide-small v-show=" isPageList"></search-bar>
        </md-layout>


        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-icon>favorite</md-icon>
        </md-button>

      </md-toolbar>

    </md-layout>


    <!--内容板块 25% 75%-->
    <md-layout md-align="center" style="margin-top: 100px;">
      <md-layout md-flex="75">

        <md-layout :md-gutter="20">

          <md-layout md-flex="30" >
            <personal></personal>

          </md-layout>

          <md-layout md-flex="65" style="margin-left: 20px;">
            <router-view></router-view>
          </md-layout>

        </md-layout>

      </md-layout>
    </md-layout>

    <md-layout md-align="center" md-gutter="20">
      <footer-bar></footer-bar>
    </md-layout>

  </div>
</template>

<script>
  import conf from './config'
  import footerBar from './components/footerBar.vue'
  import searchBar from './components/searchBar.vue'
  import personal from './components/personal.vue'

  export default {
    name: 'app',

    data () {
      return {
        title: conf.blogTitle,
        isSearch: false
      }
    },
    methods: {
      test () {
        alert('asd')
      }
    },
    computed: {
      isPageList () {
        return this.$route.name === 'list'
      }
    },

    components: {
      personal,
      footerBar,
      searchBar
    }
  }
</script>
<style lang="css">

</style>
