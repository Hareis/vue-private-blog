<template>
  <div>

    <md-input-container md-inline style="width: 250px;float: right;">
      <label>请输入关键词</label>
      <md-input
        class="searchbar-input"
        type="search"
        ref="searchBar"
        v-model="keyword"
        @keyup.esc="resetSearch"
      ></md-input>
    </md-input-container>


  </div>
</template>

<script>
  export default {

    data () {
      return {
        isFoucus: false,
        keyword: ''
      }
    },

    created () {
      this.keyword = this.$route.query.q || ''
    },

    methods: {
      resetSearch () {
        // debugger;
        this.keyword = ''
        this.$refs.searchBar.blur()
      },
      updateQuery () {
        if (this.keyword) {
          this.$router.push({
            name: 'list',
            query: {
              q: this.keyword
            }
          })
        } else {
          this.$router.push({
            name: 'list',
            query: null
          })
        }
      }
    },

    watch: {
      'keyword': 'updateQuery'
    }

  }
</script>
