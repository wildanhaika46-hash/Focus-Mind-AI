# FocusMind AI

**The ultimate AI-powered Chrome Extension to enhance online focus, learning, and productivity. Built for the modern student and professional.**

FocusMind AI is an innovative browser extension designed for the Google Chrome Hackathon 2025. It leverages Chrome's built-in AI capabilities (Gemini Nano) to create a distraction-free and efficient online environment. This tool helps users stay focused, comprehend information faster, and manage their digital notes seamlessly, all without relying on external servers or compromising privacy.

## Purpose & Social Impact

In an era of constant digital distractions, maintaining focus is a critical challenge for students and professionals alike. The endless stream of notifications, social media, and clickbait content fragments attention, hinders deep work, and reduces learning efficiency.

FocusMind AI aims to solve this problem by providing a suite of intelligent tools that empower users to take control of their online experience. By blocking distractions, summarizing complex content, and offering AI-assisted writing aids, the extension promotes healthier digital habits and fosters a more productive work/study environment. Its social impact lies in its potential to reduce cognitive overload, improve mental well-being, and democratize access to advanced AI learning tools, as it runs entirely on-device.

## Chrome AI APIs Used

FocusMind AI is built on the power and privacy of Chrome's on-device AI. We utilize the following APIs, which run locally without sending your data to the cloud:

-   **Summarizer API (`chrome.ai.summarizer`):** To generate concise summaries of web pages, articles, and documents automatically.
-   **Rewriter API (`chrome.ai.rewriter`):** To paraphrase, simplify, or change the tone of selected text.
-   **Translator API (`chrome.ai.translator`):** For instant translation of text snippets without leaving the page.
-   **Proofreader API (`chrome.ai.proofreader`):** To correct grammar and spelling mistakes in user-written text.
-   **Prompt API (`chrome.ai.prompt`):** For more general-purpose AI tasks and future creative features.

We also use standard Chrome extension APIs for core functionality:
-   **Declarative Net Request API (`chrome.declarativeNetRequest`):** To efficiently block distracting websites without performance overhead.
-   **Storage API (`chrome.storage`):** To save user settings, smart notes, and focus session data locally.

## Features

-   🧘‍♂️ **Focus Mode:** Activate a high-intensity focus session that blocks a customizable list of distracting websites (e.g., YouTube, TikTok, Twitter).
-   🧠 **Summarize Page:** Instantly get a summary of the active web page. Perfect for quickly understanding long articles or research papers.
-   📝 **Smart Notes:** Save summaries, ideas, or selected text directly into a built-in note-taking system. All notes are stored locally and are easily accessible.
-   🌐 **AI Writing Assistant:** Select any text to translate, rewrite, or proofread it using the integrated Chrome AI tools.
-   📊 **Focus Stats Dashboard:** Track your productivity with a simple dashboard showing how long you've maintained focus and how many distractions have been blocked.
-   🔒 **Offline & Private:** All AI features work entirely offline, powered by the local Gemini Nano model. Your data never leaves your device.
-   ✨ **Modern & Responsive UI:** A clean, professional, and intuitive interface designed for a seamless user experience.

## Installation & Usage

FocusMind AI is designed to be run directly from the source code in Chrome's Developer Mode.

**Prerequisites:**
-   Google Chrome version 120 or newer.
-   Enable the "On-Device AI" flag in Chrome: `chrome://flags/#optimization-guide-on-device-model`

**Installation Steps:**

1.  **Download the Code:** Clone or download this repository to your local machine.
    ```bash
    git clone https://github.com/your-username/FocusMindAI.git
    ```
2.  **Open Chrome Extensions:** Navigate to `chrome://extensions` in your Chrome browser.
3.  **Enable Developer Mode:** Toggle the "Developer mode" switch in the top-right corner.
4.  **Load the Extension:** Click the "Load unpacked" button and select the `FocusMindAI/` directory from your local machine.
5.  **Pin the Extension:** Pin the FocusMind AI icon to your toolbar for easy access.

You are now ready to use FocusMind AI!

## License & Contributors

This project is open source and licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

**Lead Developer:**
-   [Your Name/Team Name]

We welcome contributions! Please feel free to fork the repository, make improvements, and submit a pull request.
