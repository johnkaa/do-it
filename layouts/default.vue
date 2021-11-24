<template>
  <div class="app">
    <Sidebar />
    <div class="container">
      <Header />
      <Nuxt />
    </div>
  </div>
</template>

<style scoped>
  @media (max-width: 1100px) {
    .container {
      padding: 0 15px 105px 15px;
    }
  }
</style>
