<script setup></script>

<template>
  <div>
    <router-link :to="{ path: '/register' }"
      ><button>Sign Up</button></router-link
    >
    <router-link :to="{ path: '/login' }"><button>Sign In</button></router-link>
    <router-link :to="{ path: '/post' }"
      ><button>Create a post</button></router-link
    >
    <router-link :to="{ path: '/calendar' }"
      ><button>Calendar</button></router-link
    >
  </div>
</template>
