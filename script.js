// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme or system preference
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

if (savedTheme) {
  body.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
} else {
  body.dataset.theme = systemPrefersDark ? "dark" : "light";
  themeToggle.textContent = systemPrefersDark ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
  const currentTheme = body.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  body.dataset.theme = newTheme;
  themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", newTheme);
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Contact form submission handling
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Message sent! (This is a demo, no actual submission occurs.)");
    this.reset();
  });

// Download CV function
// ...existing code...
function downloadCV() {
  const link = document.createElement("a");
  link.href = "./cv.pdf"; // Ensure cv.pdf is in your project root or update the path
  link.download = "BiswarupBiswas_cv.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// ...existing code...

// Chatbot functionality
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotToggle = document.querySelector(".chatbot-toggle");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotInput = document.getElementById("chatbot-input");

// Toggle chatbot window
chatbotToggle.addEventListener("click", () => {
  chatbotWindow.classList.toggle("open");
});

// Predefined responses
const responses = {
  hi: "Hello! Nice to see you! How can I assist you today?",
  hello: "Hi there! What can I help you with?",
  projects:
    "Check out the projects section above to see my work! I’ve built some cool stuff like web apps and responsive sites.",
  contact:
    "You can reach me via the contact form above or just keep chatting here!",
  default:
    "Hmm, not sure about that one. Try asking about my projects or how to contact me!",
};

// Send message and get bot response
function sendMessage() {
  const message = chatbotInput.value.trim().toLowerCase();
  if (!message) return;

  // Add user message
  const userMessage = document.createElement("div");
  userMessage.className = "chatbot-message user";
  userMessage.textContent = message;
  chatbotMessages.appendChild(userMessage);

  // Get bot response
  const botResponse = responses[message] || responses["default"];
  const botMessage = document.createElement("div");
  botMessage.className = "chatbot-message bot";
  botMessage.textContent = botResponse;
  chatbotMessages.appendChild(botMessage);

  // Clear input and scroll to bottom
  chatbotInput.value = "";
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Handle Enter key for sending messages
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Section fade-in on scroll
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => {
  observer.observe(section);
});
