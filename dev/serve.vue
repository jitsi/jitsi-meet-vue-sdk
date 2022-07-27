<script setup lang="ts">
import { ref } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { JitsiMeeting } from '@/entry.esm';
import { IJitsiMeetExternalApi } from '@/types';
const name = ref<string>('Daniel Adedeji');

const handleApiOnReady = (externalApi: IJitsiMeetExternalApi) => {
  console.log('I am ready');
  // console.log(externalApi);
};

const handleReadyToClose =  () => {
  console.log('Ready to close');

};
</script>

<template>
  <div id="app">
    <JitsiMeeting
      :roomName="name"
      :width="700"
      :height="500"
      @on-api-ready="handleApiOnReady"
      @on-ready-to-close="handleReadyToClose"
    />
  </div>
</template>
