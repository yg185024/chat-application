/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/mqttscript.js":
/*!***************************!*\
  !*** ./src/mqttscript.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"changeTheValueOfConnect\": () => (/* binding */ changeTheValueOfConnect),\n/* harmony export */   \"changeTheValueOfWindowClient\": () => (/* binding */ changeTheValueOfWindowClient),\n/* harmony export */   \"clientId\": () => (/* binding */ clientId),\n/* harmony export */   \"connect\": () => (/* binding */ connect),\n/* harmony export */   \"createClient\": () => (/* binding */ createClient),\n/* harmony export */   \"publish\": () => (/* binding */ publish),\n/* harmony export */   \"subscribe\": () => (/* binding */ subscribe),\n/* harmony export */   \"topic\": () => (/* binding */ topic),\n/* harmony export */   \"unsubscribe\": () => (/* binding */ unsubscribe),\n/* harmony export */   \"windowClient\": () => (/* binding */ windowClient)\n/* harmony export */ });\n/* harmony import */ var _script_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script.js */ \"./src/script.js\");\n// import statement\n\n\n// MQTT details\n// const mqtt = require('mqtt');\nconst host = \"127.0.0.1\";\nconst port = \"1883\";\nconst topic = \"chat001\"\nlet client;\nlet clientId;\nlet windowClient = \"\";\n\n// Default Text and Value;\nlet connect = false;\n\n// Functions to change the exported attribute value;\n// modifying is not allowed since import creates a read-only binding to the exported value.\nfunction changeTheValueOfConnect(val){     // Function to change the value of connect\n    connect = val;\n}   \nfunction changeTheValueOfWindowClient(val){  // Function to change the value of windowClient\n    windowClient = val;\n}\n\n// Creating Client and connecting...\nfunction createClient(){\n    clientId = `client-${Math.random().toString(36).substring(2, 5)}`;\n    const hostURL = 'ws://broker.emqx.io:8083/mqtt';\n\n    client = mqtt.connect(hostURL,{protocolVersion:5});\n\n    client.on('connect', () => {\n        console.log(`Connected, Your id is ${clientId}`);\n    });\n    subscribe();\n}\n\n// Subscribing to the topic\nfunction subscribe(){\n  client.subscribe(topic, {nl:true},() => {\n    publish(topic,`${clientId}:JOIN`);\n    console.log(`subscribe to the ${topic}`);\n    (0,_script_js__WEBPACK_IMPORTED_MODULE_0__.defaultMessage)(0,\"Welcome to the chat\");\n  });\n}\n\n// Unsubscribing to the topic\nfunction unsubscribe(){\n    client.unsubscribe(topic);\n    publish(topic,`${clientId}:LEAVE`)\n    console.log(`unsubscribe to the ${topic}`);\n    (0,_script_js__WEBPACK_IMPORTED_MODULE_0__.defaultMessage)(0,\"You left the chat\");\n  }\n  \n// Publishes the msg\nfunction publish(topic,msg){\n    client.publish(topic,msg);\n}\n\n// Listining for messages\nif( connect != false ){\n    client.on('message', (topic, message) => {\n        console.log(message.toString());\n        const parts = message.toString().split(':');\n        const member = parts[0];\n        const action = parts[1];\n        const msg = parts.slice(2).join(':');           // extract the message content\n\n        if (action === 'JOIN') {\n        console.log(`${member} ${_script_js__WEBPACK_IMPORTED_MODULE_0__.defaultTextSubscribe}`);\n        (0,_script_js__WEBPACK_IMPORTED_MODULE_0__.defaultMessage)(member,action);\n        } else if (action === 'LEAVE') {\n        console.log(`${member} ${_script_js__WEBPACK_IMPORTED_MODULE_0__.defaultTextUnsubscribe}`);\n        (0,_script_js__WEBPACK_IMPORTED_MODULE_0__.defaultMessage)(member,action);\n        } else {\n        console.log(`${member}: ${msg}`);\n        (0,_script_js__WEBPACK_IMPORTED_MODULE_0__.receiveMessage)(member,msg);\n        }\n\n    });\n}\n\n//# sourceURL=webpack://chat-application/./src/mqttscript.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"defaultMessage\": () => (/* binding */ defaultMessage),\n/* harmony export */   \"defaultTextSubscribe\": () => (/* binding */ defaultTextSubscribe),\n/* harmony export */   \"defaultTextUnsubscribe\": () => (/* binding */ defaultTextUnsubscribe),\n/* harmony export */   \"receiveMessage\": () => (/* binding */ receiveMessage)\n/* harmony export */ });\n/* harmony import */ var _mqttscript_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mqttscript.js */ \"./src/mqttscript.js\");\n// import statement\n\n\n// Get elements from the DOM\nconst messageInput = document.getElementById(\"message-input\");\nconst sendButton = document.getElementById(\"send-button\");\nconst chatHistory = document.querySelector(\".chat-history\");\nconst connectButton = document.querySelector(\".connect-button\");\n\n// Default Text and Value;\nconst defaultTextSubscribe = \"has joined the chat\" ;\nconst defaultTextUnsubscribe = \"has left the chat\";\n\n\n// Event listeners\nconnectButton.addEventListener(\"click\", connectAndDisconnect);      // Add event listener for connet button\nsendButton.addEventListener(\"click\", sendMessage);                // Add event listener for send button\nmessageInput.addEventListener(\"keyup\", (event) => {          // Add event listener for message input field\n  if (event.keyCode === 13) {\n    event.preventDefault();\n    sendMessage();\n  }\n});\n\n// Function to connect and disconnect <button>\nfunction connectAndDisconnect(){\n  if( _mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.connect == false ){\n    (0,_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.changeTheValueOfConnect)(true);\n    connectButton.innerText = \"connected\";\n    connectButton.classList.add(\"connect-connected\");\n    if( typeof client === \"undefined\" ){\n      (0,_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.createClient)();\n    }else{\n      (0,_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.subscribe)();\n    }\n  }\n  else{\n    (0,_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.changeTheValueOfConnect)(false);\n    connectButton.innerText = \"connect\";\n    connectButton.classList.remove(\"connect-connected\");\n    (0,_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.unsubscribe)();\n  }\n}\n\n// Function to send a message\nfunction sendMessage() {\n  const messageText = messageInput.value;\n  if( _mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.connect == false ){\n    alert(\"You are not connected\");\n    return;\n  }\n  if ( messageText === \"\" ) {\n    return;\n  }\n\n  // Create a div element to hold the message\n  const messageDiv = document.createElement(\"div\");\n  messageDiv.classList.add(\"sender-message-div\");\n\n  if( _mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.windowClient !== _mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.clientId){\n    const owner = document.createElement(\"p\");\n    owner.innerText = _mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.clientId;\n    owner.classList.add(\"sender-name\");\n    messageDiv.appendChild(owner);\n    (0,_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.changeTheValueOfWindowClient)(_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.clientId);\n  }\n\n  // Create a span element to hold the message text\n  const sentMessage = document.createElement(\"span\");\n  sentMessage.classList.add(\"sender-message\");\n  sentMessage.innerText = messageText;\n  \n  // Create a span element to hold the timestamp\n  const timestamp = document.createElement(\"span\");\n  timestamp.classList.add(\"sender-timestamp\");\n  timestamp.innerText = getCurrentTime();\n\n  // Append the sentmessage text and timestamp to the message div\n  messageDiv.appendChild(sentMessage);\n  messageDiv.appendChild(timestamp);\n\n  // Append the message div to the chat box\n  chatHistory.appendChild(messageDiv);\n\n\n  chatHistory.scrollTop = chatHistory.scrollHeight;\n  messageInput.value = \"\";\n\n  (0,_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.publish)(_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.topic,`${_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.clientId}:${messageText}`);\n  console.log(`sent message : ${messageText} from ${_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.clientId}`);\n}\n\n// Function to receive msgs\nfunction receiveMessage(member,msg){\n\n  // Create a div element to hold the message\n  const messageDiv = document.createElement(\"div\");\n  messageDiv.classList.add(\"receiver-message-div\");\n\n  if( _mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.windowClient !== member){\n    const owner = document.createElement(\"p\");\n    owner.innerText = member;\n    owner.classList.add(\"receiver-name\");\n    owner.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);\n    messageDiv.appendChild(owner);\n\n    chatHistory.scrollTop = chatHistory.scrollHeight; \n    (0,_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.changeTheValueOfWindowClient)(member);\n  }\n  \n  // Create a span element to hold the message text\n  const receivedMessage = document.createElement(\"span\");\n  receivedMessage.classList.add(\"receiver-message\");\n  receivedMessage.innerText = msg;\n  \n  // Create a span element to hold the timestamp\n  const timestamp = document.createElement(\"span\");\n  timestamp.classList.add(\"receiver-timestamp\");\n  timestamp.innerText = getCurrentTime();\n\n  // Append the sentmessage text and timestamp to the message div\n  messageDiv.appendChild(receivedMessage);\n  messageDiv.appendChild(timestamp);\n\n  // Append the message div to the chat box\n  chatHistory.appendChild(messageDiv);\n  \n  chatHistory.scrollTop = chatHistory.scrollHeight;\n  console.log(`${member} : ${msg}`);\n}\n\n// Function to default msg\nfunction defaultMessage(clientId,action){\n  (0,_mqttscript_js__WEBPACK_IMPORTED_MODULE_0__.changeTheValueOfWindowClient)(\"\");\n  const systemMessage = document.createElement('div');\n  if( clientId == 0 ){\n    systemMessage.innerText = `${action}`;\n  }\n  else{\n    systemMessage.innerText = `${clientId} ${action}`;\n  }\n  systemMessage.classList.add(\"system-message\");\n  chatHistory.appendChild(systemMessage);\n  chatHistory.scrollTop = chatHistory.scrollHeight;\n  console.log(`${ (clientId===0?\"\":clientId) } ${action}`);\n}  \n\n\n// Function to get the current time in HH:MM format\nfunction getCurrentTime() {\n  const date = new Date();\n  const hours = date.getHours();\n  const minutes = date.getMinutes();\n  const formattedHours = hours < 10 ? \"0\" + hours : hours;\n  const formattedMinutes = minutes < 10 ? \"0\" + minutes : minutes;\n  return `${formattedHours}:${formattedMinutes}`;\n}\n\n\n//# sourceURL=webpack://chat-application/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script.js");
/******/ 	
/******/ })()
;