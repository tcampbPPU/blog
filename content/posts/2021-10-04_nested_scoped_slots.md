---
title: Using Scoped Slots in Nested Components
description: Vue's scoped slots are a powerful feature when designing components to inject content up through its parents components. This article will give a walk through on how to use this within nested components.
createdAt: 2021-10-04
updatedAt: 2021-10-04
slug: nested_scoped_slots
---

To get a basic overview lets setup some demo code.

Starting off let us create an initial component acting as our `Parent` component called `index.vue`. This could be for example a page that shows a board of tasks.
```vue [~/pages/index.vue]
<template>
  <div>
    <child-component
      :columns="columns"
    >
    </child-component>
  </div>
</template>
<script>
export default {
  data () {
    return {
      columns: [
        {
          title: 'title 1',
          tasks: [
            {
              id: 1,
              title: 'Title',
              body: 'Body',
            },
          ],
        },
        {
          title: 'title 2',
          tasks: [
            {
              id: 2,
              title: 'Title',
              body: 'Body',
            },
          ],
        },
      ],
    }
  },
}
</script>
```

Next, skipping ahead we are going to setup our `Grandchild` component. This is because this component will do very little, its only going be have template HTML markup that will
design the layout of our card

```vue [~/components/Grandchild.vue]
<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div class="flex justify-between">
      <slot name="title" />
    </div>
    <div class="flex mt-4 justify-between items-center">
      <slot name="body" />
    </div>
  </div>
</template>
```

Above you can see there are 2 slots created: (`title` & `body`). These are dynamic slots that its own parent (ChildComponent.vue) will use to render data traditionally.

Now lets create our `Child` component for our `index.vue` page we setup earlier.

```vue [~/components/Child.vue]
<template>
  <div>
    <div class="flex py-12 w-full">
      <div
        v-for="(column, idx) in columns"
        :key="idx"
        class="bg-gray-100 rounded-lg px-3 py-3 mr-4 overflow-y-auto"
      >
        <slot name="label" :column="column" />
          <grandchild-component
            v-for="task in column.data"
            :key="task.id"
            class="mt-3"
          >
            <!-- 1 -->
            <template #title>
              <slot name="title" :task="task" />
              <slot name="action" :task="task" />
            </template>
            <!-- 2 -->
            <template #body>
              <slot name="body" :task="task" />
            </template>
          </grandchild-component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
  },
}
</script>
```
Example the points ...

Now back in our `Parent` index.vue we have full control over which data we want to display and how to render it.

<!-- TODO -->
