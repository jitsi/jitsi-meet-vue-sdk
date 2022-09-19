<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  withDefaults,
  // DefineComponent,
  onMounted,
  ref,
} from "vue";
import { DEFAULT_DOMAIN } from "@/constants";
import { generateComponentId } from "@/utils";
// import { IJitsiMeetingProps } from '@/types';
import { JitsiMeetExternalApi, IJitsiMeetExternalApi } from "@/types";
import { fetchExternalApi } from "@/init";

/**
 * Returns the JitsiMeeting Component with access to a custom External API
 * to be used as-it-is in React projects
 *
 * @param {IJitsiMeetingProps} props the component's props
 * @returns {VueComponent} the `JitsiMeeting` Component
 * @example
  ```js
    <JitsiMeeting
      :roomName="name"
      :width="700"
      :height="500"
      @on-api-ready="handleApiOnReady"
      @on-ready-to-close="handleReadyToClose"
      @get-iframe-ref-on-api-ready="getIframeRefOnApiReady"
    >
      <template v-slot:spinner></template>
    </JitsiMeeting>
  ```
 */
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
   * The created IFrame width.
   * The width argument has the following characteristics:
   * A numerical value indicates the width in pixel units.
   * If a string is specified the format is a number followed by px, em, pt, or %
   */
  width: number | string;

  /**
   * The height for the created IFrame.
   * The height argument has the following characteristics:
   * A numerical value indicates the height in pixel units.
   * If a string is specified the format is a number followed by px, em, pt, or %.
   */
  height: number | string;

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
  // spinner?: DefineComponent;

  /**
   * The external API reference for events and commands.
   */
  // onApiReady?: (api: IJitsiMeetExternalApi) => void;

  /**
   * The callback for when the meeting is ready to be closed.
   */
  // onReadyToClose?: () => void;

  /**
   * The parent node used by the IFrame.
   */
  // getIFrameRef?: (parentNode: HTMLDivElement) => void;

  /**
   * The default meeting language
   */
  lang?: string;
}

//reason for this https://github.com/vuejs/core/issues/4294
const props = withDefaults(defineProps<IJitsiMeetingProps>(), {
  domain: DEFAULT_DOMAIN,
  width: 600,
  height: 400,
  lang: "en",
});

const emit = defineEmits<{
  (e: "onApiReady", externalApi: IJitsiMeetExternalApi): void;
  (e: "onReadyToClose"): void;
  (e: "getIframeRefOnApiReady", parentNode: HTMLDivElement): void;
}>();

// eslint-disable-next-line vue/no-setup-props-destructure
const {
  domain,
  roomName,
  width,
  height,
  configOverwrite,
  interfaceConfigOverwrite,
  jwt,
  invitees,
  devices,
  userInfo,
  lang,
} = props;

const componentId = ref<string>("");
const loading = ref<boolean>(false);
const apiLoaded = ref<boolean>(false);
const externalApi = ref<JitsiMeetExternalApi>();
const apiRef = ref<IJitsiMeetExternalApi>();
const meetingRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  componentId.value = generateComponentId("jitsiMeeting");

  fetchExternalApi(domain)
    .then((api: JitsiMeetExternalApi) => {
      externalApi.value = api;
      apiLoaded.value = true;

      loadIframe(externalApi.value);
    })
    .catch((e: Error) => console.error(e.message));
});

const loadIframe = (JitsiMeetExternalAPI: JitsiMeetExternalApi) => {
  apiRef.value = new JitsiMeetExternalAPI(domain, {
    roomName,
    width,
    height,
    configOverwrite,
    interfaceConfigOverwrite,
    jwt,
    invitees,
    devices,
    userInfo,
    parentNode: meetingRef.value,
    lang,
  });

  loading.value = false;

  if (apiRef.value) {
    emit("onApiReady", apiRef.value);

    apiRef.value.on("readyToClose", () => {
      emit("onReadyToClose");
    });

    if (meetingRef.value) {
      emit("getIframeRefOnApiReady", meetingRef.value);
    }
  }
};
</script>

<template>
  <slot v-if="loading || !apiRef" name="spinner"></slot>
  <div :id="componentId" :key="componentId" ref="meetingRef"></div>
</template>
