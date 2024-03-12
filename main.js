const chatInput = document.querySelector('#chat-input')
const sendBtn = document.querySelector('#send-btn')
const container = document.querySelector(".chat-container")
const themeBtn = document.querySelector("#theme-btn")
const deleteBtn = document.querySelector("#delete-btn")


let userText = null;

const loadDataFromLocalStorage=()=>{
   const defaultText=`
   <div class="default-text">
    <h1>CenkGPT</h1>
  </div>`
  container.innerHTML=localStorage.getItem("all-chats")  || defaultText;
}
loadDataFromLocalStorage() 


const createElement = (html, className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className)
    chatDiv.innerHTML = html
    return chatDiv;
}

const getChatResponse = async (anime) => {
   
    const API_URL = "https://api.openai.com/v1/chat/completions"
  const pElemnt=  document.createElement("p");

  //! Api Talebi için özellikleri ve verileri tanmlama
    const requestData = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: `${userText}`,
          },
        ],
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${}`,
        },
        body: JSON.stringify(requestData),
      };
      //! Api Yanıtına Post İsteği Gönderip yanıtı p elementine aktarma
    try {
        const response = await(await fetch(API_URL, requestOptions)).json()
        pElemnt.textContent=response.choices[0].message.content;
    
        

    } catch (error) {
        pElemnt.textContent=`OOOOOOOpps Geri Bildirim için adamcenktekin@gmail.com 
         ${error}`;
        pElemnt.classList.add("error")
        console.log(pElemnt);
    }
    anime.querySelector(".typing-animation").remove();
    anime.querySelector(".chat-details").appendChild(pElemnt);

    localStorage.setItem("all-chats",container.innerHTML)
    
};



const showTypingAnimation = () => {
    const html = `
            <div class="chat-content">
                <div class="chat-details">
                    <img src="chatbot.jpg" alt="">
                    <div class="typing-animation">
                        <div class="typing-dot" style="--delay:0.2s"></div>
                        <div class="typing-dot" style="--delay:0.3s"></div>
                        <div class="typing-dot" style="--delay:0.4s"></div>
                    </div>
                </div>
            </div>
    `
    const anime = createElement(html, "incoming")
    container.appendChild(anime)
    getChatResponse(anime)

}

const handleOutGoingChat = () => {
    userText = chatInput.value.trim();

    if (!userText) return;
    const html = `<div class="chat-content">
  <div class="chat-details">
      <img src="user.jpg" alt="">
      <p>${userText}</p>
  </div>
</div>
  `
  

    const outgoingChatDiv = createElement(html, "outgoing");
    document.querySelector(".default-text").remove();

    container.appendChild(outgoingChatDiv)
    setTimeout(showTypingAnimation, 500);


}

sendBtn.addEventListener("click", handleOutGoingChat)

themeBtn.addEventListener("click",()=>{
document.body.classList.toggle("light-mode");
themeBtn.textContent=document.body.classList.contains("light-mode") ? "dark_mode" :"light_mode"
})
deleteBtn.addEventListener("click",()=>{
if (confirm("Bütün verileri Sİlmek istediğinden Eminmisin?")) {

    localStorage.removeItem("all-chats");
    loadDataFromLocalStorage()
}
})