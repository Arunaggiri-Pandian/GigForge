import { GoogleGenAI, Type } from "@google/genai";
import { Project, DuplicateCheckResult } from "../types";

// Initialize Gemini Client
// Note: In a real app, ensure process.env.API_KEY is available. 
// For this mockup, we assume the environment is set up correctly as per instructions.
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const checkForDuplicateProjects = async (
  newTitle: string,
  newDescription: string,
  existingProjects: Project[]
): Promise<DuplicateCheckResult> => {
  console.log("Mock AI Check: Checking for duplicates for", { newTitle, newDescription, existingProjects });
  
  // Simulate network delay for 1 second
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a mock response
  return {
    isDuplicate: false,
    reason: "This is a unique project (mock response).",
    similarProjectIds: []
  };
};

export const generateHandoverDocs = async (
  projectTitle: string,
  repoUrl: string,
  solutionCode: string
): Promise<string> => {
  console.log("Mock AI DocGen: Generating docs for", { projectTitle, repoUrl, solutionCode });

  // Simulate network delay for 1.5 seconds
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return a mock markdown string
  return `
# MAINTENANCE.md (Mock Generated)

## **Project Title & Repo Link**
- **Title**: ${projectTitle}
- **Repository**: \`git clone ${repoUrl}\`

## **Overview**
This tool is designed to automate a specific task based on the provided code. It reads input, processes it, and produces a defined output.

## **Installation/Setup**
\`\`\`bash
# Install dependencies
npm install
# Run the application
npm run dev
\`\`\`

## **Logic Flow**
1.  The main script initializes and sets up its environment.
2.  It takes the following context: \`${solutionCode.substring(0, 100)}...\`
3.  Based on the logic, it performs its core operations.
4.  Results are logged to the console or returned to the caller.

## **Support**
For issues, please contact the development team or open an issue in the repository.
  `;
};