<template>
  <div class="skin-blue sidebar-mini wysihtml5-supported">
    <nav-bar></nav-bar>
    <side-bar></side-bar>
    <div class="content-wrapper" style="min-height: 916px;">
      <alert></alert>
      <content-header></content-header>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <content-footer></content-footer>
  </div>
</template>

<script>
  import NavBar from '@/components/global/NavBar'
  import SideBar from '@/components/global/SideBar'
  import ContentHeader from '@/components/global/ContentHeader'
  import ContentFooter from '@/components/global/ContentFooter'
  import Alert from '@/components/global/Alert'

  export default {components: {SideBar, NavBar, ContentFooter, ContentHeader, Alert}}
</script>
