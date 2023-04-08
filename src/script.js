// import statement
import {topic, clientId, windowClient, connect, createClient, subscribe, unsubscribe, publish, changeTheValueOfConnect,changeTheValueOfWindowClient} from './mqttscript.js';

// Get elements from the DOM
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatHistory = document.querySelector(".chat-history");
const connectButton = document.querySelector(".connect-button");

// Default Text and Value;
export const defaultTextSubscribe = "has joined the chat" ;
export const defaultTextUnsubscribe = "has left the chat";


// Event listeners
connectButton.addEventListener("click", connectAndDisconnect);      // Add event listener for connet button
sendButton.addEventListener("click", sendMessage);                // Add event listener for send button
messageInput.addEventListener("keyup", (event) => {          // Add event listener for message input field
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();
  }
});

// Function to connect and disconnect <button>
function connectAndDisconnect(){
  if( connect == false ){
    changeTheValueOfConnect(true);
    connectButton.innerText = "connected";
    connectButton.classList.add("connect-connected");
    if( typeof client === "undefined" ){
      createClient();
    }else{
      subscribe();
    }
  }
  else{
    changeTheValueOfConnect(false);
    connectButton.innerText = "connect";
    connectButton.classList.remove("connect-connected");
    unsubscribe();
  }
}

// Function to send a message
function sendMessage() {
  const messageText = messageInput.value;
  if( connect == false ){
    alert("You are not connected");
    return;
  }
  if ( messageText === "" ) {
    return;
  }

  if( windowClient !== clientId){
    const owner = document.createElement("p");
    owner.innerText = clientId;
    owner.classList.add("sender-name");
    chatHistory.appendChild(owner);
    changeTheValueOfWindowClient(clientId);
  }

  const sentMessage = document.createElement("p");
  sentMessage.innerText = messageText;
  sentMessage.classList.add("sent-message");
  chatHistory.appendChild(sentMessage);
  messageInput.value = "";

  publish(topic,`${clientId}:${messageText}`);
  console.log(`sent message : ${messageText} from ${clientId}`);
}

// Function to receive msgs
export function receiveMessage(member,msg){
  if( windowClient !== member){
    const owner = document.createElement("p");
    owner.innerText = member;
    owner.classList.add("receiver-name");
    chatHistory.appendChild(owner);
    changeTheValueOfWindowClient(member);
  }
  
  const receivedMessage = document.createElement("p");
  receivedMessage.innerText = msg;
  receivedMessage.classList.add("received-message");
  chatHistory.appendChild(receivedMessage);

  console.log(`${member} : ${msg}`);
}

// Function to default msg
export function defaultMessage(clientId,action){
  changeTheValueOfWindowClient("");
  const systemMessage = document.createElement('div');
  if( clientId == 0 ){
    systemMessage.innerText = `${action}`;
  }
  else{
    systemMessage.innerText = `${clientId} ${action}`;
  }
  systemMessage.classList.add("system-message");
  chatHistory.appendChild(systemMessage);

  console.log(`${ (clientId===0?"":clientId) } ${action}`);
}  

