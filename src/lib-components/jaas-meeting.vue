<script setup lang="ts">
import {
  defineProps,
  // defineEmits,
  withDefaults,
  // onMounted,
  ref,
} from "vue";
import { getJaaSDomain, getRoomName } from "@/utils";
import { JitsiMeeting } from "./index";

// import { IJitsiMeetingProps } from '@/types';
import { IMeetingProps } from "@/types";

/**
     * Returns the JitsiMeeting Component with access to a custom External API
     * to be used as-it-is in React projects
     *
     * @param {IJaaSMeetingProps} props the component's props
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
*/

/**
 * The type of the Vue {@code Component} props of {@link JaaSMeeting}.
 */
export interface IJaaSMeetingProps extends IMeetingProps {
  /**
   * The App ID that provides an isolated context and prefixes the room name.
   */
  appId: string;

  /**
   * Whether to use the stage environment or not.
   */
  useStaging?: boolean;
}

//reason for this https://github.com/vuejs/core/issues/4294
const props = withDefaults(defineProps<IJaaSMeetingProps>(), {
  useStaging: true,
});

// const emit = defineEmits<{
//   (e: "onApiReady", externalApi: IJitsiMeetExternalApi): void;
//   (e: "onReadyToClose"): void;
//   (e: "getIframeRefOnApiReady", parentNode: HTMLDivElement): void;
// }>();

// // eslint-disable-next-line vue/no-setup-props-destructure
const { appId, useStaging, roomName } = props;

const jaasDomain = ref<string>(getJaaSDomain(useStaging));
const roomNameString = ref<string>(getRoomName(roomName, appId));
</script>

<template>
  <JitsiMeeting
    v-bind="{ ...$props, ...$attrs }"
    :domain="jaasDomain"
    :room-name="roomNameString"
  />
</template>
