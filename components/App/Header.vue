<script setup lang="ts">
const route = useRoute()
const site = useSite()

const listedChildren = computed(() =>
  (site.value?.children ?? []).filter((i) => i.isListed)
)
</script>

<template>
  <header class="header">
    <NuxtLink class="logo" to="/">
      {{ site.title }}
    </NuxtLink>

    <nav class="menu">
      <NuxtLink
        v-for="item in listedChildren"
        :key="item.id"
        :to="{ path: `/${item.id}` }"
        :aria-current="
          route.path.startsWith(`/${item.id}`) ? 'page' : undefined
        "
      >
        {{ item.title }}
      </NuxtLink>

      <AppSocial />
    </nav>
  </header>
</template>
