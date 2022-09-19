<script setup lang="ts">
import { ref } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { 
//   // JitsiMeeting,
//    JaaSMeeting 
//   } from '@/entry.esm';

// import JitsiMeeting from '@/lib-components/jitsi-meeting.vue';
import JaasMeeting from '@/lib-components/jaas-meeting.vue';


import { IJitsiMeetExternalApi } from '@/types';

// import JaasMeeting from '@/lib-components/jaas-meeting.vue';

const name = ref<string>('Daniel Adedeji');

const handleApiOnReady = (externalApi: IJitsiMeetExternalApi) => {
  console.log('Jisti is ready ready');
  console.log(externalApi);
};

const handleReadyToClose =  () => {
  console.log('Ready to close');

};

const getIframeRefOnApiReady = (parentNode: HTMLDivElement) => {
  console.log('parent iframe')
}
</script>


<template>
  <div id="app">
    <!-- <JitsiMeeting
      :roomName="name"
      :width="400"
      :height="400"
      @on-api-ready="handleApiOnReady"
      @on-ready-to-close="handleReadyToClose"
      @get-iframe-ref-on-api-ready="getIframeRefOnApiReady"
    >
      <template v-slot:spinner>Hello.....</template>
    </JitsiMeeting> -->

    <JaasMeeting 
      @on-api-ready="handleApiOnReady" 
      @on-ready-to-close="handleReadyToClose"
      @get-iframe-ref-on-api-ready="getIframeRefOnApiReady"
      :room-name="name"
      app-id="eeww"
      :height="400"
      :width="400"
    >
    <template v-slot:spinner>
      Hello
    </template>
    </JaasMeeting>
  </div>
</template>
