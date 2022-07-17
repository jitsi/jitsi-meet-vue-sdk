<script lang="ts">
import { defineComponent } from 'vue';
// import { DEFAULT_DOMAIN } from '@/constants';
// import { generateComponentId } from '@/utils';


interface JitsiMeetingData {
}

export default /*#__PURE__*/defineComponent({
  name: 'JitsiMeeting',
  data(): JitsiMeetingData {
    return {
    };
  },
  computed: {
  },
  methods: {
    loadScript(): void {
      console.log('loadIframe');
    }
  },
});
</script>

<template>
  <div class="jitsi-meeting">
    <button @click="loadScript">
      Load Iframe
    </button>
    <!-- <script src='https://meet.jit.si/external_api.js'></script> -->
    <!-- <iframe src="https://www.youtube.com/embed/yOP5-3_WFus" width="400" height="100" style="border:none; background:white;" frameborder="0" scrolling="no"></iframe> -->
    <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/yOP5-3_WFus" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
  </div>
</template>

<style scoped>
</style>
