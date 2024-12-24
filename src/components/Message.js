// import "./styles.css";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";

const pubnub = new PubNub({
    publishKey: "demo",
    subscribeKey: "demo",
    userId: "test-user"
});

function Message() {
    function handleError(e) {
        console.log("Error handler: ", e);
    }

    return (
        <PubNubProvider client={pubnub}>
            <Chat currentChannel="test" onError={handleError}>
                <MessageList />
                <MessageInput />
            </Chat>
        </PubNubProvider>
    );
}

export default Message;