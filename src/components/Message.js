import "./Message.css";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
import { IoSend,IoAttach } from "react-icons/io5";
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
    async function getHistory() {
        const url = new URL('http://localhost:8080/getHistory');
        url.searchParams.append('username', user.email);

        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Cant get files');
            }

            const historyLink = response.data;
            window.open(historyLink)

        } catch (err) {
            console.log('Failed to get history.');
        }
    }


    return (
        <PubNubProvider client={pubnub}>
            <div id="chat-container">
                <Chat currentChannel="test" onError={handleError}>
                    <div id="message-list">
                        <MessageList />
                    </div>
                    <div id="message-input">
                        <MessageInput />
                        <button className="send-button">
                            <IoSend />
                        </button>
                        <button className="send-button" onClick={getHistory}>
                            <IoAttach />
                        </button>
                    </div>
                </Chat>
            </div>
        </PubNubProvider>
    );
}

export default Message;