// import statement
import {defaultTextSubscribe,defaultTextUnsubscribe,receiveMessage, defaultMessage} from './script.js';

// MQTT details
// const mqtt = require('mqtt');
const host = "127.0.0.1";
const port = "1883";
const topic = "chat001"
let client;
let clientId;
let windowClient = "";

// Default Text and Value;
let connect = false;

// Functions to change the exported attribute value;
// modifying is not allowed since import creates a read-only binding to the exported value.
function changeTheValueOfConnect(val){     // Function to change the value of connect
    connect = val;
}   
function changeTheValueOfWindowClient(val){  // Function to change the value of windowClient
    windowClient = val;
}

// Creating Client and connecting...
function createClient(){
    clientId = `client-${Math.random().toString(36).substring(2, 5)}`;
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
    publish(topic,`${clientId}:JOIN`);
    console.log(`subscribe to the ${topic}`);
    defaultMessage(0,"Welcome to the chat");
  });
}

// Unsubscribing to the topic
function unsubscribe(){
    client.unsubscribe(topic);
    publish(topic,`${clientId}:LEAVE`)
    console.log(`unsubscribe to the ${topic}`);
    defaultMessage(0,"You left the chat");
  }
  
// Publishes the msg
function publish(topic,msg){
    client.publish(topic,msg);
}

// Listining for messages
if( connect != false ){
    client.on('message', (topic, message) => {
        console.log(message.toString());
        const parts = message.toString().split(':');
        const member = parts[0];
        const action = parts[1];
        const msg = parts.slice(2).join(':');           // extract the message content

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

export default {topic, clientId, windowClient, connect, createClient, subscribe, unsubscribe, publish, changeTheValueOfConnect,changeTheValueOfWindowClient};