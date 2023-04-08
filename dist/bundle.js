/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ (() => {

eval("\n// Get elements from the DOM\nconst messageInput = document.getElementById(\"message-input\");\nconst sendButton = document.getElementById(\"send-button\");\nconst chatHistory = document.querySelector(\".chat-history\");\nconst connectButton = document.querySelector(\".connect-button\");\n\n// MQTT details\n// const mqtt = require('mqtt');\nconst host = \"127.0.0.1\";\nconst port = \"1883\";\nconst topic = \"chat001\"\nlet client;\nlet clientId;\nlet windowClient = \"\";\n\n// Default Text and Value;\nconst defaultTextSubscribe = \"has joined the chat\" ;\nconst defaultTextUnsubscribe = \"has left the chat\";\nlet connect = false;\n\n// Event listeners\nconnectButton.addEventListener(\"click\", connectAndDisconnect);      // Add event listener for connet button\nsendButton.addEventListener(\"click\", sendMessage);                // Add event listener for send button\nmessageInput.addEventListener(\"keyup\", (event) => {          // Add event listener for message input field\n  if (event.keyCode === 13) {\n    event.preventDefault();\n    sendMessage();\n  }\n});\n\n\nfunction connectAndDisconnect(){\n  if( connect == false ){\n    connect = true;\n    connectButton.innerText = \"connected\";\n    connectButton.classList.add(\"connect-connected\");\n    if( typeof client === \"undefined\" ){\n      createClient();\n    }else{\n      subscribe();\n    }\n  }\n  else{\n    connect = false;\n    connectButton.innerText = \"connect\";\n    connectButton.classList.remove(\"connect-connected\");\n    unsubscribe();\n  }\n}\n\n\n// Creating Client and connecting...\nfunction createClient(){\n    clientId = `client-${Math.random().toString(36).substring(2, 5)}`;\n    const hostURL = 'ws://broker.emqx.io:8083/mqtt';\n\n    client = mqtt.connect(hostURL,{protocolVersion:5});\n\n    client.on('connect', () => {\n        console.log(`Connected, Your id is ${clientId}`);\n    });\n    subscribe();\n}\n\n// Subscribing to the topic\nfunction subscribe(){\n  client.subscribe(topic, {nl:true},() => {\n    client.publish(topic,`JOIN:${clientId}`);\n    console.log(`subscribe to the ${topic}`);\n    defaultMessage(0,\"Welcome to the chat\");\n  });\n}\n\n// Unsubscribing to the topic\nfunction unsubscribe(){\n  client.unsubscribe(topic);\n  client.publish(topic,`LEAVE:${clientId}`)\n  console.log(`unsubscribe to the ${topic}`);\n}\n\n// Listining for messages\nif( connect != false ){\n  client.on('message', (topic, message) => {\n    console.log(message.toString());\n    const parts = message.toString().split(':');\n    const action = parts[0];\n    const member = parts[1];\n    const msg = parts.slice(2).join(':');           // extract the message conten\n  \n    if (action === 'JOIN') {\n      console.log(`${member} ${defaultTextSubscribe}`);\n      defaultMessage(member,action);\n    } else if (action === 'LEAVE') {\n      console.log(`${member} ${defaultTextUnsubscribe}`);\n      defaultMessage(member,action);\n    } else {\n      console.log(`${member}: ${msg}`);\n      receiveMessage(member,msg);\n    }\n  \n  });\n}\n\n\n// Function to send a message\nfunction sendMessage() {\n  const messageText = messageInput.value;\n  if (messageText === \"\" || connect == false) {\n    return;\n  }\n\n  if( windowClient !== clientId){\n    const owner = document.createElement(\"p\");\n    owner.innerText = clientId;\n    owner.classList.add(\"sender-name\");\n    chatHistory.appendChild(owner);\n    windowClient = clientId;\n  }\n\n  const sentMessage = document.createElement(\"p\");\n  sentMessage.innerText = messageText;\n  sentMessage.classList.add(\"sent-message\");\n  chatHistory.appendChild(sentMessage);\n  messageInput.value = \"\";\n\n  console.log(`sent message : ${messageText} from ${clientId}`);\n}\n\n// Function to receive msgs\nfunction receiveMessage(member,msg){\n  if( windowClient !== member){\n    const owner = document.createElement(\"p\");\n    owner.innerText = member;\n    owner.classList.add(\"receiver-name\");\n    chatHistory.appendChild(owner);\n    windowClient = member;\n  }\n  \n  const receivedMessage = document.createElement(\"p\");\n  receivedMessage.innerText = msg;\n  receivedMessage.classList.add(\"received-message\");\n  chatHistory.appendChild(receivedMessage);\n\n  console.log(`${member} : ${msg}`);\n}\n\n// Function to default msg\nfunction defaultMessage(clientId,action){\n  windowClient = \"\";\n  const systemMessage = document.createElement('div');\n  if( clientId == 0 ){\n    systemMessage.innerText = `${action}`;\n  }\n  else{\n    systemMessage.innerText = `${clientId} ${action}`;\n  }\n  systemMessage.classList.add(\"system-message\");\n  chatHistory.appendChild(systemMessage);\n\n  console.log(`${ (clientId===0?\"\":clientId) } ${action}`);\n}\n\n\n\n//# sourceURL=webpack://chat-application/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/script.js"]();
/******/ 	
/******/ })()
;