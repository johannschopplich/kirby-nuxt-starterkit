<script setup lang="ts">
const site = useSite()
const listedChildren = computed(() =>
  (site.value?.children ?? []).filter((i) => i.isListed)
)
</script>

<template>
  <footer class="footer">
    <div class="grid">
      <div class="column" style="--columns: 8">
        <h2><a href="https://getkirby.com">Made with Kirby</a></h2>
        <p>
          Kirby: the file-based CMS that adapts to any project, loved by
          developers and editors alike
        </p>
      </div>

      <div class="column" style="--columns: 2">
        <h2>Pages</h2>
        <ul>
          <li v-for="item in listedChildren" :key="item.id">
            <NuxtLink :to="`/${item.id}`">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="column" style="--columns: 2">
        <h2>Kirby</h2>
        <ul>
          <li><a href="https://getkirby.com">Website</a></li>
          <li><a href="https://getkirby.com/docs">Docs</a></li>
          <li><a href="https://forum.getkirby.com">Forum</a></li>
          <li><a href="https://chat.getkirby.com">Chat</a></li>
          <li><a href="https://github.com/getkirby">GitHub</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 9rem 0 6rem;
  line-height: 1.5em;
}
.footer:before {
  content: '';
  display: block;
  width: 1.5rem;
  height: 2px;
  background: var(--color-black);
  margin-bottom: 1.5rem;
}

.footer h2 {
  font-weight: 600;
  margin-bottom: 0.75rem;
}
.footer ul,
.footer p {
  color: var(--color-text-grey);
}
.footer p {
  max-width: 15rem;
}
.footer a:hover {
  color: var(--color-text);
}
</style>
