// Get elements from the DOM
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatHistory = document.querySelector(".chat-history");

// Add event listener for send button
sendButton.addEventListener("click", sendMessage);

// Add event listener for message input field
messageInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();
  }
});

// Function to send a message
function sendMessage() {
  const messageText = messageInput.value;
  if (messageText === "") {
    return;
  }
  const message = document.createElement("p");
  message.innerText = messageText;
  message.classList.add("sent-message");
  chatHistory.appendChild(message);
  messageInput.value = "";
  setTimeout(() => {
    const receivedMessage = document.createElement("p");
    receivedMessage.innerText = "Sample reply message";
    receivedMessage.classList.add("received-message");
    chatHistory.appendChild(receivedMessage);
  }, 1000);
}

