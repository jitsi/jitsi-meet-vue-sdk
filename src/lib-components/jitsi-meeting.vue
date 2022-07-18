<script setup lang="ts">
import { defineProps, withDefaults, DefineComponent } from 'vue';
import { DEFAULT_DOMAIN } from '@/constants';
// import { generateComponentId } from '@/utils';
// import { IJitsiMeetingProps } from '@/types';

export interface IJitsiMeetingProps {
  /**
     * The domain used to build the conference URL.
     */
  domain?: string;
  /**
     * The name of the room to join.
     */
  roomName: string;

  /**
   * The JS object with overrides for options defined in the config.js file
   * https://github.com/jitsi/jitsi-meet/blob/master/config.js.
   */
  configOverwrite?: object;

  /**
   * The JS object with overrides for options defined in the interface_config.js file
   * https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js.
   */
  interfaceConfigOverwrite?: object;

  /**
   * The JWT token.
   */
  jwt?: string;

  /**
   * Object arrays that contain information about participants invited to a call.
   */
  invitees?: [];

  /**
   * Information map about the devices used in a call.
   */
  devices?: {

    /**
     * The label of the device used for audio input.
     */
    audioInput: string;

    /**
     * The label of the device  used for audio output.
     */
    audioOutput: string;

    /**
     * The label of the device used for video input.
     */
    videoInput: string;
  };

  /**
   * The JS object that contains information about the participant starting the meeting.
   */
  userInfo?: {

    /**
     * The participant display name.
     */
    displayName: string;

    /**
     * The participant email address.
     */
    email: string;
  };

  /**
   * The custom spinner to be displayed while the iframe is loading.
   */
  spinner?: DefineComponent;

  /**
   * The external API reference for events and commands.
   */
  // onApiReady?: (api: IJitsiMeetExternalApi) => void;

  /**
   * The callback for when the meeting is ready to be closed.
   */
  onReadyToClose?: () => void;

  /**
   * The parent node used by the IFrame.
   */
  getIFrameRef?: (parentNode: HTMLDivElement) => void;
}

//reason for this https://github.com/vuejs/core/issues/4294
const props = withDefaults(defineProps<IJitsiMeetingProps>(), {
  domain: DEFAULT_DOMAIN,
});

console.log(props);
// console.log(domain);


// const componentId = ref<string>('');
// const loading = ref<boolean>(false);
// const apiLoaded = ref<boolean>(false);
// const externalApi = ref<string>('');

// interface JitsiMeetingData {
//   componentId: string,
//   loading: boolean,
//   apiLoaded: boolean,
//   externalApi: string,
// }


// export default /*#__PURE__*/defineComponent({
//   name: 'JitsiMeeting',
//   setup(props){
//     console.log(props);
//   }
// });
</script>

<template>
  <div class="jitsi-meeting">
    <div>
      {{ domain }}
    </div>
  </div>
</template>

<style scoped>
</style>
