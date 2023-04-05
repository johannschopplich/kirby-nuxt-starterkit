import type { PropType } from 'vue'

type UuidResolverCollection = (Record<string, any> & { uuid: string })[]

// Resolve a given UUID to an item in a collection, especially useful for
// files that are not resolved server-side
export default defineComponent({
  props: {
    uuid: {
      type: String,
      required: true,
    },
    collection: {
      type: Array as PropType<UuidResolverCollection>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const data = reactive({
      item: resolveUuid(props.collection, props.uuid),
    })

    return () => {
      if (slots.default) return slots.default(data)
    }
  },
})
