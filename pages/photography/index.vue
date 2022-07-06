<script setup lang="ts">
const { data } = await usePhotographyPage()
const children = computed(() => data.value?.result?.children)
</script>

<template>
  <div>
    <AppIntro />

    <ul class="grid" style="--gutter: 1.5rem">
      <li
        v-for="(project, index) in children ?? []"
        :key="index"
        class="column"
        style="--columns: 3"
      >
        <NuxtLink :to="`/${project.id}`">
          <figure>
            <span class="img" style="--w: 4; --h: 5">
              <img
                :src="project?.cover?.url ?? project?.images?.[0]?.url"
                alt=""
              />
            </span>
            <figcaption class="img-caption">
              {{ project.title }}
            </figcaption>
          </figure>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
