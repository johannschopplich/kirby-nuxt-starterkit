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
    if (!Array.isArray(props.collection)) {
      throw new TypeError('Invalid prop: "collection" must be an array.')
    }

    const data = reactive({
      item: props.collection.find((item) => item.uuid === props.uuid),
    })

    return () => {
      if (slots.default) return slots.default(data)
    }
  },
})
