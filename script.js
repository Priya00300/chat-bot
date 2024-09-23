const typing = document.querySelector(".typing-form");
const chatlist = document.querySelector(".chatlist");
let usermessage = null;

// Use backticks for template literals
const api_key = 'AIzaSyDAAJmTny5CTWTHKWNCETRnQs0wUZESepo';
const api_url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${api_key}`;

// Function to create a message div element
const createMessage = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

// Generate API response with proper POST request
const generateAPIResponse = async () => {
    try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: usermessage // Sending user message in the request
            })
        });

        const data = await response.json();  // Get the response data
        return data.generated_text || "Sorry, I couldn't get a response.";
        
    } catch (error) {
        console.log(error);
        return "There was an error fetching the response.";
    }
};

// Show loading animation function
const showloadinganimation = () => {
    const html = `<div class="message-content">
                    <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png" alt="gemini image" class="avatar">
                    <p class="text"></p>
                    <div class="loading-indicator">
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                    </div>
                  </div>`;
    
    // Create a loading message
    const incomingmessage = createMessage(html, "incoming", "loading");
    chatlist.appendChild(incomingmessage);

    // Call the API and handle response
    generateAPIResponse().then(responseText => {
        incomingmessage.querySelector('.text').innerText = responseText;
        // Remove the loading indicator after response
        incomingmessage.classList.remove("loading");
    });
};

// Handle user input and outgoing chat
const handleOutgoingchat = () => {
    usermessage = typing.querySelector(".typing-input").value.trim();
    if (!usermessage) return;

    console.log(usermessage);

    const html = `<div class="message-content">
                    <img src="https://cdn-icons-png.flaticon.com/512/219/219969.png" alt="user" class="avatar"/>
                    <p class="text"></p>
                 </div>`;
    
    const outgoingmessage = createMessage(html, "outgoing");
    outgoingmessage.querySelector(".text").innerText = usermessage;
    chatlist.appendChild(outgoingmessage);
    typing.reset();

    // Add a delay before showing the loading animation
    setTimeout(showloadinganimation, 500);
};

// Listen to form submission
typing.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingchat();
});
