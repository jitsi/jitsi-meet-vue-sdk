# Jitsi Meet Vue SDK
The Jitsi Meet Vue SDK provides the same user experience as the [Jitsi Meet](https://github.com/jitsi/jitsi-meet) app, in a customizable way which you can embed in your vue js app.

###### Inspiration and code idea gotten from
https://github.com/jitsi/jitsi-meet-react-sdk
## Install
```bash
npm install @jitsi/vue-sdk
```
### Modules
This library exposes two components with similar properties, intended for different use-cases.
#### JitsiMeeting
To be used with custom domains as-it-is in React projects:
```js
<JitsiMeeting
    :domain="YOUR_DOMAIN"
    :room-name="YOUR_ROOM_NAME"
/>
```
##### Properties specific to the `JitsiMeeting` component

###### `domain`
Optional. Field used to retrieve the external_api.js file that initializes the IFrame. If omitted, defaults to `meet.jit.si`.


#### JaaSMeeting
To be used with the `8x8.vc` domain as-it-is in Vue projects:
```js
<JaaSMeeting
    :app-id="YOUR_APP_ID"
    :room-name="YOUR_ROOM_NAME"
/>
```

...or with the `stage.8x8.vc` domain:
```js
<JaaSMeeting
    :app-id="YOUR_APP_ID"
    :room-name="YOUR_ROOM_NAME"
    :use-staging="true"
/>
```
**Note: When using the props name, Vuejs automatically converts it to kebab case**
##### Properties specific to the `JaasMeeting` component
###### `appId` 
Required. Provides an isolated context and prefixes the room name.

###### `useStaging`
Optional. Tells whether to use the staging environment or not.

#### Common properties
###### `roomName`
Required. String used when joining the meeting.

###### `lang`
Optional. The default meeting language.
```js
<JitsiMeeting
    :domain="YOUR_DOMAIN"
    :room-name="YOUR_ROOM_NAME"
    lang="de"
/>
```
###### `configOverwrite`
Optional. Object used for options overrides.

###### `interfaceConfigOverwrite`
Optional. Object used for more options overrides.

###### `jwt`
Optional. Token for authentication.

###### `invitees`
Optional. Participants list.

###### `devices`
Optional. Information regarding the devices used during the call.

###### `userInfo`
Optional. Details about the participant that started the meeting.


#### Slots

###### `spinner`
Optional. Custom loading view while the IFrame is loading.
```js
import CustomSpinner from "yourcustomspinner";
<JitsiMeeting
    :domain="YOUR_DOMAIN"
    :room-name="YOUR_ROOM_NAME"
>
	<template v-slot:spinner>
		<CustomSpinner />
	</template>
</JitsiMeeting>
```

#### Events
###### `getIFrameRefOnApiReady`
Event to retrieve the parent node of the IFrame for more control (e.g. styling). Triggered when the Jitsi Iframe is ready.
```js
<JitsiMeeting
    ...
    @get-iframe-ref-on-api-ready="(parentNode) => { parentNode.style.height = '700px'}"
/>
```
###### Typescript example
```ts
<JitsiMeeting
    ...
    @get-iframe-ref-on-api-ready="(parentNode:  HTMLDivElement) => { parentNode.style.height = '700px'}"
/>
```
###### `onApiReady`
Callback triggered when the external API is loaded to expose it for events and commands.
```js
<JitsiMeeting
    ...
    @on-api-ready="(externalApi) => {console.log('Jisti is ready')
}"
/>
```
###### Typescript example
```ts
<JitsiMeeting
    ...
    @on-api-ready="(externalApi:  IJitsiMeetExternalApi) => {console.log('Jisti is ready')
}"
/>
```
###### `onReadyToClose`
Callback triggered when the meeting is ready to be closed.
```js
<JitsiMeeting
    ...
    @on-ready-to-close="() => { console.log('Ready to close') }"
/>
```

## Sample

Run npm link in the root folder
```bash
npm link
```

Navigate to the `example` directory and run this commands
```bash
npm link @jitsi/vue-sdk
```

Install and run the project from the `example` directory to see the JitsiMeeting module in action.
```bash
npm run install
```

###
```bash
npm run dev
```