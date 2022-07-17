<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { JitsiMeetVueSdkSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  JitsiMeetVueSdkSample,
  // }
});
</script>

<template>
  <div id="app">
    <jitsi-meeting />
  </div>
</template>
