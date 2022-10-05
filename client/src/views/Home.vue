<script setup></script>

<template>
  <div>
    <router-link :to="{ path: '/register' }"
      ><button>Sign Up</button></router-link
    >
    <router-link :to="{ path: '/login' }"><button>Sign In</button></router-link>
  </div>
</template>
