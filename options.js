const BOT_TOKEN = document.getElementById('botToken')
const CHAT_ID = document.getElementById('chatID')
const BITLY_API_KEY = document.getElementById('bitlyAPIKey')
const setButton = document.getElementById('set-button')


setButton.addEventListener('click', () => {
    chrome.storage.local.set({ "BOT_TOKEN": BOT_TOKEN.value, "CHAT_ID": CHAT_ID.value, "BITLY_API_KEY":BITLY_API_KEY.value }, () => {
        alert('Credentials Stored')
    });
})