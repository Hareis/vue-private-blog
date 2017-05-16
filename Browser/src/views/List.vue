<template>
  <section class="list-view" style="width: 100%">

    <!--"-->
    <div v-if="loading"
         style="
              width: 100%;
              height: 100%;
              text-align: center;
              background-color: #040404;
              opacity: 0.2;">
      <md-spinner md-indeterminate class="md-accent" style="margin: 0 auto;"></md-spinner>
    </div>
    <div v-else-if="filteredList.length === 0" style="text-align: center;">
      <div style="margin: 0 auto;">
        <md-icon class="md-primary">cancel</md-icon>
        sorry,无数据..
      </div>
    </div>

    <ol v-else style="padding: 0;margin-top: 0px;">
      <li v-for="{ title, sha, date } in filteredList" :key="sha">
        <md-card md-with-hover>

          <router-link :to="'/post/' + sha" class="item-title">
            <md-card-header>

              <div class="md-title">{{ title }}</div>
              <div class="md-subhead">
                <time pubdate="pubdate" :datetime="date | formatDate" :title="date | formatDate" class="item-date">
                  {{ date | timeago }}
                </time>
              </div>
            </md-card-header>
          </router-link>

          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.
          </md-card-content>

          <md-card-actions>
            <md-button>Action</md-button>
            <md-button>Action</md-button>
          </md-card-actions>
        </md-card>
      </li>
    </ol>

  </section>
</template>

<script>
  import api from '../api'
  import conf from '../config'

  export default {
    name: 'listView',

    data () {
      return {
        lists: [],
        loading: true
      }
    },

    computed: {
      filteredList () {
        let keyword = ''
        if (this.$route) {
          keyword = (this.$route.query.q || '').toLowerCase()
        }
        // Filter by title, Order by publish date, desc
        return this.lists
          .filter(item => (item.title.toLowerCase().indexOf(keyword) !== -1))
          .sort((itemA, itemB) => (new Date(itemB.date) - new Date(itemA.date)))
      }
    },

    created () {
      this.loadList()
    },

    methods: {
      loadList () {
        this.loading = true
        window.document.title = conf.blogTitle
        api.getList()
          .then(lists => {
            this.loading = false
            this.lists = lists
          })
          .catch(err => {
            this.loading = false
            console.error(err)
          })
      }
    },

    watch: {
      '$route': 'loadList'
    }

  }
</script>
<style scoped="">
  ol li{
    list-style: none;
    margin-bottom: 20px;
  }
</style>
