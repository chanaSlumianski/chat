import "./Message.css";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
import { IoSend } from "react-icons/io5";
import { useAuth } from '../context/AuthContext';


function Message() {
    const { user } = useAuth();
    
    const pubnub = new PubNub({
        publishKey: "demo",
        subscribeKey: "demo",
        userId: user.email   
    });

    function handleError(e) {
        console.log("Error handler: ", e);
    }

    return (
        <PubNubProvider client={pubnub}>
            <div id="chat-container">
                <Chat currentChannel="test" onError={handleError}>
                    <div id="message-list">
                        <MessageList/>
                    </div>
                    <h1>{user.email}</h1>
                    <div id="message-input">
                        <MessageInput />
                        <button className="send-button">
                            <IoSend />
                        </button>
                    </div>
                </Chat>
            </div>
        </PubNubProvider>
    );
}

export default Message;