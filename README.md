# GigForge

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

GigForge is a web application that helps manage projects, likely for freelancers or small teams. It utilizes the Gemini API for AI-powered features. This project was bootstrapped with Vite.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (which includes npm)
*   A Gemini API key

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/your-repository-name.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd your-repository-name
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```
4.  Set up your environment variables.
    *   Create a `.env.local` file in the root of the project.
    *   Add your Gemini API key to the `.env.local` file. You can use `.env.local.example` as a template:
        ```
        GEMINI_API_KEY=your_gemini_api_key
        ```

## Usage

To run the app in development mode, run the following command:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the address shown in your terminal) to view it in the browser.

## Features

*   **Project Dashboard:** View and manage your projects.
*   **Create New Projects:** Easily create new projects.
*   **Project Details:** View detailed information about each project.
*   **AI Integration:** Leverages the Gemini API for advanced features.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request