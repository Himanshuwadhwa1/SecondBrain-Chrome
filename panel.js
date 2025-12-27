  const chat = document.getElementById("chat");
  const input = document.getElementById("input");

  function addMessage(text, className) {
    const div = document.createElement("div");
    div.className = `message ${className}`;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    // Fake bot response (replace with API later)
    setTimeout(() => {
      addMessage("You said: " + text, "bot");
    }, 500);
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });