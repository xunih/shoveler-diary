<script setup></script>

<template>
  <div>
    <img id="Home" src="../../assets/mainpicture.jpeg" />
    <div class="btn--home-page">
      <router-link :to="{ path: '/login' }">
        <button type="button" class="btn btn-dark mr-2">Log In</button>
      </router-link>
      <div class="divider"></div>
      <router-link :to="{ path: '/register' }">
        <button type="button" class="btn btn-dark mr-2">Sign Up</button>
      </router-link>
    </div>
  </div>
</template>

<style>
#Home {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.btn--home-page {
  position: absolute;
  transform: translate(-50%, -50%);
  margin-right: -50%;
  top: 50%;
  left: 50%;
}

.divider {
  width: 5px;
  height: auto;
  display: inline-block;
}
</style>
