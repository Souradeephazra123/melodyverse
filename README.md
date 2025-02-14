# MelodyVerse

## Project Description

Develop the login and signup screens for a fictional music streaming service called "MelodyVerse". These screens should be visually appealing, user-friendly, and function flawlessly across different devices (desktop, tablet, mobile).

## Requirements

### Technology Stack
- React.js for component structure and functionality.
- Tailwind CSS for styling.

### Login Screen
- Include fields for username/email and password.
- Implement basic validation for empty fields and password strength using React state management and validation libraries.
- Display clear error messages for invalid input.
- Offer "Forgot Password" functionality (basic link for now).
- Implement a "Remember Me" option using local storage or cookies.
- Redirect to the application homepage after successful login using React Router.

### Signup Screen
- Include fields for username/email, password (with confirmation), and optional fields like name and profile picture.
- Implement validation for the required fields and email format using React state management and validation libraries.
- Include terms and conditions checkbox.
- Display clear error messages and success messages.
- Simulate sending a welcome email notification upon successful signup (no actual email sending required).
- Redirect to the login screen after successful signup using React Router.

### General Requirements
- Implement responsive design using Tailwind.
- Ensure the screens are visually appealing and consistent with the "MelodyVerse" theme (design details left to your interpretation).

### Best Practices
- Enforce input validation and sanitization to prevent vulnerabilities.
- Protect against common attacks like SQL injection and XSS.
- Securely store passwords using strong hashing algorithms (bcrypt or Argon2).
- Implement proper error handling and provide informative error messages.
- Write clean, well-structured, and documented code.
- Consider using environment variables for sensitive information.
- Handle sessions and token expiration effectively.

### Bonus Points
- Implement password reset functionality.
- Integrate email verification for signup.
- Add rate limiting to protect against brute force attacks.
- Use middleware for authentication and authorization.
- Write unit tests for API endpoints.
- Add password visibility toggle.
- Use animations or microinteractions with React libraries like Framer Motion to enhance user experience.
- Include accessibility features like alt text and keyboard navigation using ARIA attributes and focus management.
- Implement unit testing for your React components using Jest or similar libraries.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd melodyverse
    ```
2.Install dependencies:
    ```
    npm install
    ```
3.Run the development server:
    ```
    npm run dev
    ```
4.Build for production:
    ```
    npm run build
    ```
