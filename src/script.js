// Get elements from the DOM
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatHistory = document.querySelector(".chat-history");
const connectButton = document.querySelector(".connect-button");

// MQTT details
// const mqtt = require('mqtt');
const host = "127.0.0.1";
const port = "1883";
const topic = "chat001"
let client;
let clientId;


// Default Text and Value;
const defaultTextSubscribe = "has joined the chat" ;
const defaultTextUnsubscribe = "has left the chat";
let connect = false;

// Event listeners
connectButton.addEventListener("click", connectAndDisconnect);      // Add event listener for connet button
sendButton.addEventListener("click", sendMessage);                // Add event listener for send button
messageInput.addEventListener("keyup", (event) => {          // Add event listener for message input field
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();
  }
});


function connectAndDisconnect(){
  if( connect == false ){
    connect = true;
    connectButton.innerText = "connected";
    connectButton.classList.add("connect-connected");
    if( typeof client === "undefined" ){
      createClient();
    }else{
      subscribe();
    }
  }
  else{
    connect = false;
    connectButton.innerText = "connect";
    connectButton.classList.remove("connect-connected");
    unsubscribe();
  }
}


// Creating Client and connecting...
function createClient(){
    clientId = "client" + Math.random().toString(36).substring(5);
    const hostURL = 'ws://broker.emqx.io:8083/mqtt';

    client = mqtt.connect(hostURL,{protocolVersion:5});

    client.on('connect', () => {
        console.log(`Connected, Your id is ${clientId}`);
    });
    subscribe();
}

// Subscribing to the topic
function subscribe(){
  client.subscribe(topic, {nl:true},() => {
    client.publish(topic,`JOIN:${clientId}`);
    console.log(`subscribe to the ${topic}`);
  });
}

// Unsubscribing to the topic
function unsubscribe(){
  client.unsubscribe(topic);
  client.publish(topic,`LEAVE:${clientId}`)
  console.log(`unsubscribe to the ${topic}`);
}

// Listining for messages
if( connect != false ){
  client.on('message', (topic, message) => {
    console.log(message.toString());
    const parts = message.toString().split(':');
    const action = parts[0];
    const member = parts[1];
    const msg = parts.slice(2).join(':');           // extract the message conten
  
    if (action === 'JOIN') {
      console.log(`${member} ${defaultTextSubscribe}`);
      defaultMessage(member,action);
    } else if (action === 'LEAVE') {
      console.log(`${member} ${defaultTextUnsubscribe}`);
      defaultMessage(member,action);
    } else {
      console.log(`${member}: ${msg}`);
      receiveMessage(member,msg);
    }
  
  });
}


// Function to send a message
function sendMessage() {
  const messageText = messageInput.value;
  if (messageText === "" || connect == false) {
    return;
  }
  const owner = document.createElement("p");
  owner.innerText = clientId;
  owner.classList.add("owner-name");
  chatHistory.appendChild(owner);

  const sentMessage = document.createElement("p");
  sentMessage.innerText = messageText;
  sentMessage.classList.add("sent-message");
  chatHistory.appendChild(sentMessage);
  messageInput.value = "";

  console.log(`sent message : ${messageText} from ${clientId}`);
}

// Function to receive msgs
function receiveMessage(member,msg){
  const owner = document.createElement("p");
  owner.innerText = member;
  owner.classList.add("owner-name");
  chatHistory.appendChild(owner);

  const receivedMessage = document.createElement("p");
  receivedMessage.innerText = msg;
  receivedMessage.classList.add("received-message");
  chatHistory.appendChild(receivedMessage);

  console.log(`${member} : ${msg}`);
}

// Function to default msg
function defaultMessage(clientId,action){
  const systemMessage = document.createrElement('div');
  systemMessage.innerText = `${clientId} ${action}`;
  systemMessage.classList.add("system-message");
  chatHistory.appendChild(systemMessage);

  console.log(`${clientId} ${action}`);
}

