<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { JitsiMeeting } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  JitsiMeeting,
  // }
});
</script>

<template>
  <div id="app">
    <JitsiMeeting
      roomName="Room one"
    />
  </div>
</template>
