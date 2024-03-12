export default {
    data() {
        return {
            breadList: []
        }
    },
    watch: {
      $route(){
          this.getBreadCrumb()
      }
    },
    methods: {
        getBreadCrumb() {
            this.breadList = this.$route.meta.bread || []
        }
    },
    created() {
        this.getBreadCrumb();
    }
}