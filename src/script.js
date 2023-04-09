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

  // Create a div element to hold the message
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("sender-message-div");

  if( windowClient !== clientId){
    const owner = document.createElement("p");
    owner.innerText = clientId;
    owner.classList.add("sender-name");
    messageDiv.appendChild(owner);
    changeTheValueOfWindowClient(clientId);
  }

  // Create a span element to hold the message text
  const sentMessage = document.createElement("span");
  sentMessage.classList.add("sender-message");
  sentMessage.innerText = messageText;
  
  // Create a span element to hold the timestamp
  const timestamp = document.createElement("span");
  timestamp.classList.add("sender-timestamp");
  timestamp.innerText = getCurrentTime();

  // Append the sentmessage text and timestamp to the message div
  messageDiv.appendChild(sentMessage);
  messageDiv.appendChild(timestamp);

  // Append the message div to the chat box
  chatHistory.appendChild(messageDiv);


  chatHistory.scrollTop = chatHistory.scrollHeight;
  messageInput.value = "";

  publish(topic,`${clientId}:${messageText}`);
  console.log(`sent message : ${messageText} from ${clientId}`);
}

// Function to receive msgs
export function receiveMessage(member,msg){

  // Create a div element to hold the message
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("receiver-message-div");

  if( windowClient !== member){
    const owner = document.createElement("p");
    owner.innerText = member;
    owner.classList.add("receiver-name");
    owner.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    messageDiv.appendChild(owner);

    chatHistory.scrollTop = chatHistory.scrollHeight; 
    changeTheValueOfWindowClient(member);
  }
  
  // Create a span element to hold the message text
  const receivedMessage = document.createElement("span");
  receivedMessage.classList.add("receiver-message");
  receivedMessage.innerText = msg;
  
  // Create a span element to hold the timestamp
  const timestamp = document.createElement("span");
  timestamp.classList.add("receiver-timestamp");
  timestamp.innerText = getCurrentTime();

  // Append the sentmessage text and timestamp to the message div
  messageDiv.appendChild(receivedMessage);
  messageDiv.appendChild(timestamp);

  // Append the message div to the chat box
  chatHistory.appendChild(messageDiv);
  
  chatHistory.scrollTop = chatHistory.scrollHeight;
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
  chatHistory.scrollTop = chatHistory.scrollHeight;
  console.log(`${ (clientId===0?"":clientId) } ${action}`);
}  


// Function to get the current time in HH:MM format
function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
