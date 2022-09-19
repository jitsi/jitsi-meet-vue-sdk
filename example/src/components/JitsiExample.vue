<script setup>
import { reactive, ref } from "vue";
import { JitsiMeeting } from "@jitsi/vue-sdk";
import Spinner from "./Spinner.vue";

let apiRef = ref();
let logItems = reactive([]);
let showNew = ref(false);
let knockingParticipants = reactive([]);

const printEventOutput = (payload) => {
  logItems = [...logItems, JSON.stringify(payload)];
};

const handleAudioStatusChange = (payload, feature) => {
  if (payload.muted) {
    logItems = [...logItems, `${feature} off`];
  } else {
    logItems = [...logItems, `${feature} on`];
  }
};

const handleChatUpdates = (payload) => {
  if (payload.isOpen || !payload.unreadCount) {
    return;
  }
  apiRef.value.executeCommand("toggleChat");
  logItems = [...logItems, `you have ${payload.unreadCount} unread messages`];
};

const handleKnockingParticipant = (payload) => {
  logItems = [...logItems, JSON.stringify(payload)];
  knockingParticipants = [...knockingParticipants, payload?.participant];
};

const resolveKnockingParticipants = (condition) => {
  knockingParticipants.forEach((participant) => {
    apiRef.value.executeCommand(
      "answerKnockingParticipant",
      participant?.id,
      condition(participant)
    );
    knockingParticipants = knockingParticipants.filter(
      (item) => item.id === participant.id
    );
  });
};

const handleJitsiIFrameRef1 = (iframeRef) => {
  iframeRef.style.border = "10px solid #3d3d3d";
  iframeRef.style.background = "#3d3d3d";
  iframeRef.style.height = "400px";
};

const handleJitsiIFrameRef2 = (iframeRef) => {
  iframeRef.style.marginTop = "10px";
  iframeRef.style.border = "10px dashed #df486f";
  iframeRef.style.padding = "5px";
  iframeRef.style.height = "400px";
};

const handleApiReady = (apiObj) => {
  apiRef.value = apiObj;
  apiRef.value.on("knockingParticipant", handleKnockingParticipant);
  apiRef.value.on("audioMuteStatusChanged", (payload) =>
    handleAudioStatusChange(payload, "audio")
  );
  apiRef.value.on("videoMuteStatusChanged", (payload) =>
    handleAudioStatusChange(payload, "video")
  );
  apiRef.value.on("raiseHandUpdated", printEventOutput);
  apiRef.value.on("titleViewChanged", printEventOutput);
  apiRef.value.on("chatUpdated", handleChatUpdates);
  apiRef.value.on("knockingParticipant", handleKnockingParticipant);
};

const handleReadyToClose = () => {
  /* eslint-disable-next-line no-alert */
  alert("Ready to close...");
};

const generateRoomName = () =>
  `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;
</script>

<template>
  <div>
    <!-- Multiple instances demo -->
    <JitsiMeeting
      v-if="showNew"
      :roomName="generateRoomName()"
      @get-iframe-ref-on-api-ready="handleJitsiIFrameRef2"
    />
    <div :style="{ margin: '15px 0' }">
      <div
        :style="{
          display: 'flex',
          justifyContent: 'center',
        }"
      >
        <button
          type="text"
          title="Click to execute toggle raise hand command"
          :style="{
            border: 0,
            borderRadius: '6px',
            fontSize: '14px',
            background: '#f8ae1a',
            color: '#040404',
            padding: '12px 46px',
            margin: '2px 2px',
          }"
          @click="() => apiRef.executeCommand('toggleRaiseHand')"
        >
          Raise hand
        </button>
        <button
          type="text"
          title="Click to approve/reject knocking participant"
          :style="{
            border: 0,
            borderRadius: '6px',
            fontSize: '14px',
            background: '#0056E0',
            color: 'white',
            padding: '12px 46px',
            margin: '2px 2px',
          }"
          @click="
            () =>
              resolveKnockingParticipants(({ name }) => !name.includes('test'))
          "
        >
          Resolve lobby
        </button>
        <button
          type="text"
          title="Click to execute subject command"
          :style="{
            border: 0,
            borderRadius: '6px',
            fontSize: '14px',
            background: '#df486f',
            color: 'white',
            padding: '12px 46px',
            margin: '2px 2px',
          }"
          @click="() => apiRef.executeCommand('subject', 'New Subject')"
        >
          Change subject
        </button>
        <button
          type="text"
          title="Click to create a new JitsiMeeting instance"
          :style="{
            border: 0,
            borderRadius: '6px',
            fontSize: '14px',
            background: '#3D3D3D',
            color: 'white',
            padding: '12px 46px',
            margin: '2px 2px',
          }"
          @click="() => (showNew = !showNew)"
        >
          Toggle new instance
        </button>
      </div>
    </div>
    <div v-for="(item, index) in logItems" :key="index">
      <div
        :style="{
          fontFamily: 'monospace',
          padding: '5px',
        }"
        :key="index"
      >
        {{ item }}
      </div>
    </div>

    <h1
      :style="{
        fontFamily: 'sans-serif',
        textAlign: 'center',
      }"
    >
      JitsiMeeting Demo App
    </h1>
    <JitsiMeeting
      :room-name="generateRoomName()"
      :config="{
        subject: 'lalalala',
        hideConferenceSubject: false,
      }"
      @on-api-ready="(externalApi) => handleApiReady(externalApi)"
      @on-ready-to-close="handleReadyToClose"
      @get-iframe-ref-on-api-ready="handleJitsiIFrameRef1"
    >
      <template v-slot:spinner><Spinner /></template>
    </JitsiMeeting>
  </div>
</template>
