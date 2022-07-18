/* eslint-disable-next-line */
import { JitsiMeeting } from '..';
import IMeetingProps from './IMeetingProps';

/**
 * The type of the Vue {@code Component} props of {@link JitsiMeeting}.
 */
export default interface IJitsiMeetingProps extends IMeetingProps {

    /**
     * The domain used to build the conference URL.
     */
    domain?: string;
}