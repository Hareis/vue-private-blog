<template>
 <div>
    <input
  class="searchbar-input"
  placeholder="Search.."
  type="search"
  ref="searchBar"
  v-model="keyword"
  @click="selectSearchText"
  @focus="isFoucus=!isFoucus;"
  @blur="isFoucus=!isFoucus"
  @keyup.esc="resetSearch">
  <label v-show="isFoucus">(按esc 可快速清空)</label> 
 </div>
</template>

<script>
    export default {

        data() {
            return {
                isFoucus: false,
                keyword: ''
            }
        },

        created() {
            this.keyword = this.$route.query.q || ''
        },

        methods: {
            resetSearch() {
                //debugger;
                this.keyword = ''
                this.$refs.searchBar.blur()
            },
            selectSearchText() {
                //debugger;
                this.$refs.searchBar.select()
            },
            updateQuery() {
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