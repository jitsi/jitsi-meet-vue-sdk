<script lang="ts">
import { defineComponent } from 'vue';

interface SampleData {
  counter: number;
  initCounter: number;
  message: {
    action: string | null;
    amount: number | null;
  };
}

export default /*#__PURE__*/defineComponent({
  name: 'JitsiMeetVueSdkSample', // vue component name
  data(): SampleData {
    return {
      counter: 5,
      initCounter: 5,
      message: {
        action: null,
        amount: null,
      },
    };
  },
  computed: {
  },
  methods: {
    loadIframe(): void {
      console.log('loadIframe');
    }
  },
});
</script>

<template>
  <div class="jitsi-meet-vue-sdk-sample">
    <button @click="loadIframe">
      Load Iframe
    </button>
    <!-- <script src='https://meet.jit.si/external_api.js'></script> -->
    <!-- <iframe src="https://www.youtube.com/embed/yOP5-3_WFus" width="400" height="100" style="border:none; background:white;" frameborder="0" scrolling="no"></iframe> -->
    <iframe width="560" height="315" src="https://www.youtube.com/embed/yOP5-3_WFus" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<style scoped>
  .jitsi-meet-vue-sdk-sample {
    display: block;
    width: 400px;
    margin: 25px auto;
    border: 1px solid #ccc;
    background: #eaeaea;
    text-align: center;
    padding: 25px;
  }
  .jitsi-meet-vue-sdk-sample p {
    margin: 0 0 1em;
  }
</style>
