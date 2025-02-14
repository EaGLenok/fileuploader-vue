<template>
  <div>
    <nav class="navbar navbar-light bg-light mb-3">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">File Upload App</span>
      </div>
    </nav>
    <HomeView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeView from './views/HomeView.vue'

export default defineComponent({
  name: 'App',
  components: { HomeView }
})
</script>
