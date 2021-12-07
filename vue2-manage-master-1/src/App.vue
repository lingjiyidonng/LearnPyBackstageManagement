<template>
    <div id="app" class="fillcontain">
		    <router-view></router-view>
    </div>
    
</template>

  <div id="app">
    <div class="markdown-body">
      <markdown-test>
        <template v-slot:footer>
          <div>test</div>
          <button>footer</button>
        </template>
      </markdown-test>
    </div>
  </div>
  
<script>
    export default {
    	
    }
</script>

<style lang="less">
	@import './style/common';
</style>
