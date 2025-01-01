// import "./Message.css";
// import PubNub from "pubnub";
// import { PubNubProvider } from "pubnub-react";
// import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
// import { IoSend,IoAttach } from "react-icons/io5";
// import { useAuth } from '../context/AuthContext';

// function Message() {
//     const { user } = useAuth();

//     const pubnub = new PubNub({
//         publishKey: "demo",
//         subscribeKey: "demo",
//         userId: user.email
//     });

//     function handleError(e) {
//         console.log("Error handler: ", e);
//     }
//     async function getHistory() {
//         const url = new URL('http://localhost:8080/getHistory');
//         url.searchParams.append('username', user.email);

//         try {
//             const response = await fetch(url.toString(), {
//                 method: 'GET',
//             });

//             if (!response.ok) {
//                 throw new Error('Cant get files');
//             }

//             const historyLink = response.data;
//             window.open(historyLink)

//         } catch (err) {
//             console.log('Failed to get history.');
//         }
//     }


//     return (
//         <PubNubProvider client={pubnub}>
//             <div id="chat-container">
//                 <Chat currentChannel="test" onError={handleError}>
//                     <div id="message-list">
//                         <MessageList />
//                     </div>
//                     <div id="message-input">
//                         <MessageInput />
//                         <button className="send-button">
//                             <IoSend />
//                         </button>
//                         <button className="send-button" onClick={getHistory}>
//                             <IoAttach />
//                         </button>
//                     </div>
//                 </Chat>
//             </div>
//         </PubNubProvider>
//     );
// }

// export default Message;

// -------------------------

import "./Message.css";
import React, { useState, useEffect } from 'react';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
import { IoSend, IoAttach } from "react-icons/io5";
import { useAuth } from '../context/AuthContext';

function Message() {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const pubnub = new PubNub({
        publishKey: "demo",
        subscribeKey: "demo",
        userId: user.email
    });

    function handleError(e) {
        console.log("Error handler: ", e);
    }

    async function chat(userMessage) {
        const url = new URL('http://localhost:8080/chat');
        url.searchParams.append('username', user.email);
        url.searchParams.append('prompt', userMessage);
        
        try {
            // const response = await fetch(url.toString(), {
            //     method: 'GET',
            // });
            // if (!response.ok) {
            //     throw new Error('Cant get files');
            // }
            // const result = await response.json();
            const result = "OK"
            // { createdAt: Date.now(),
            // id: "fa1f8132-a058-403e-9b8a-7b0c138f29d4",
            // text: "OK",
            // type: "default"}
            // console.log(result);

            // Create a bot message based on the result from the API
            const botMessage = {
                text: result || "No response from bot", // Adjust based on actual response structure
                sender: 'bot',
                timetoken: Date.now()+1,
            };

            // Add both user and bot messages to the state
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: userMessage.text, sender: user.email, timetoken: Date.now() }, // User message
                botMessage
            ]);

        } catch (err) {
            console.log('Failed to get chat.');
        }
    }
    console.log(messages)
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
            const historyLink = await response.json();
            window.open(historyLink);
        } catch (err) {
            console.log('Failed to get history.');
        }
    }

    return (
        <PubNubProvider client={pubnub}>
            <div id="chat-container">
                <Chat currentChannel="test" onError={handleError}>
                    <div id="message-list">
                        {console.log("123")
                        }
                        {console.log(messages)}
                        
                        <MessageList messages={messages} />
                        
                    </div>
                    <div id="message-input">
                        <MessageInput 
                            onSend={(text) => chat(text)} // Send user message to chat function
                        />
                        <button className="send-button" onClick={() => getHistory()}>
                            <IoAttach />
                        </button>
                    </div>
                </Chat>
            </div>
        </PubNubProvider>
    );
}

export default Message;
// -----------------



// import "./Message.css";
// import React, { useState, useEffect } from 'react';
// import PubNub from "pubnub";
// import { PubNubProvider } from "pubnub-react";
// import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
// import { IoSend, IoAttach } from "react-icons/io5";
// import { useAuth } from '../context/AuthContext';

// function Message() {
//     const { user } = useAuth();
//     const [messages, setMessages] = useState([]);
//     const pubnub = new PubNub({
//         publishKey: "demo",
//         subscribeKey: "demo",
//         userId: user.email
//     });

//     useEffect(() => {
//         pubnub.subscribe({ channels: ['test'] });
        
//         const listener = {
//             message: (event) => {
//                 setMessages((prevMessages) => [...prevMessages, event.message]);
//             }
            
//         };
//         {console.log(messages)}

//         pubnub.addListener(listener);

//         return () => {
//             pubnub.removeListener(listener);
//             pubnub.unsubscribeAll();
//         };
//     }, [pubnub]);

//     function handleError(e) {
//         console.log("Error handler: ", e);
//     }

//     async function chat(userMessage) {
//         const url = new URL('http://localhost:8080/chat');
//         url.searchParams.append('username', user.email);
//         url.searchParams.append('prompt', userMessage);
        
//         try {
//             const result = "OK"; // Replace with actual API call if needed

//             // Create a bot message based on the result from the API
//             const botMessage = {
//                 text: result || "No response from bot",
//                 sender: 'bot',
//                 timetoken: Date.now(),
//             };

//             // Publish user message
//             pubnub.publish({
//                 channel: 'test',
//                 message: { text: userMessage, sender: user.email, timetoken: Date.now() }
//             });

//             // Publish bot message
//             pubnub.publish({
//                 channel: 'test',
//                 message: botMessage
//             });

//         } catch (err) {
//             console.log('Failed to get chat.');
//         }
//     }

//     async function getHistory() {
//         const url = new URL('http://localhost:8080/getHistory');
//         url.searchParams.append('username', user.email);
//         try {
//             const response = await fetch(url.toString(), {
//                 method: 'GET',
//             });
//             if (!response.ok) {
//                 throw new Error('Cant get files');
//             }
//             const historyLink = await response.json();
//             window.open(historyLink);
//         } catch (err) {
//             console.log('Failed to get history.');
//         }
//     }

//     return (
//         <PubNubProvider client={pubnub}>
//             <div id="chat-container">
//                 <Chat currentChannel="test" onError={handleError}>
//                     <div id="message-list">
//                         <MessageList messages={messages} />
//                     </div>
//                     <div id="message-input">
//                         <MessageInput 
//                             onSend={(text) => chat(text)} // Send user message to chat function
//                         />
//                         <button className="send-button" onClick={getHistory}>
//                             <IoAttach />
//                         </button>
//                     </div>
//                 </Chat>
//             </div>
//         </PubNubProvider>
//     );
// }

// export default Message;
