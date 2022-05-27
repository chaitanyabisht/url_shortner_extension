const shortenCheckbox = document.getElementById("shorten-url");
const telegramCheckbox = document.getElementById("telegram-send");
const sendButton = document.getElementById("send-button");
const textBox = document.getElementById('url')

let BOT_TOKEN;
let CHAT_ID;
let BITLY_API_KEY;

chrome.storage.local.get(["BOT_TOKEN","CHAT_ID","BITLY_API_KEY"], function(items){
  BOT_TOKEN = items.BOT_TOKEN
  CHAT_ID = items.CHAT_ID
  BITLY_API_KEY = items.BITLY_API_KEY
  console.log(JSON.stringify(items))
});

getCurrentTabURL().then(url => textBox.value = url)

sendButton.addEventListener("click", () => {
    sendAction();
});

async function sendAction(){

  let sendURL = textBox.value;
  if (!(sendURL.includes("://"))) {
    sendURL = "http://" + sendURL;
  }

  if (shortenCheckbox.checked) {
    sendURL = await shortenURL(sendURL);
  }

  textBox.value = sendURL 
  
  if (telegramCheckbox.checked) {
    await sendTelegram(sendURL);
  }
  
}

async function shortenURL(URL) {
  let res = await fetch("https://api-ssl.bitly.com/v4/shorten", {
    method: "POST",
    headers: {
      Authorization: BITLY_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      long_url: URL,
      domain: "bit.ly",
    }),
  })
  let responseJSON = await res.json();
  return responseJSON.id;
}

async function sendTelegram(sendURL){
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${sendURL}`,{
        method:'POST'
    })
    .then(res => res.json())
}


async function getCurrentTabURL() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.url
}
