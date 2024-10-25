# TODO List

### 1. Error Handling in Authentication

- [ ] Implement error handling in user registration
  - Handle invalid inputs (e.g., missing fields, incorrect formats)
  - Add password input with validation (e.g., minimum length, complexity requirements)
  - Show meaningful error messages to users
  - Add server-side validation and feedback
- [ ] Implement error handling in user login
  - Handle incorrect credentials (e.g., invalid username or password)
  - Add throttling or rate-limiting for login attempts
  - Display proper error messages on failure

### 2. Chat Interface Features

- [ ] Make the chat interface interactive with real-time functionality
  - Use WebSocket or similar technology to enable real-time messaging
  - Add user typing indicators
  - Implement message sending/receiving features
  - Add message read receipts
  - Handle disconnection and reconnection seamlessly
  - Add error handling for failed message deliveries

### 3. Authentication UI Enhancements

- [ ] Make the **Login** and **Register** buttons interactive
  - Add loading states (e.g., spinner) when the user clicks the button
  - Disable buttons while the form is being submitted
  - Provide visual feedback for successful or failed actions

### 4. User Session Management

- [ ] Store the user session in cookies after login
  - Use secure HTTP-only cookies to store session tokens or user data
  - Ensure the session is persistent across refreshes (or until logout)
- [ ] Add a **Logout** option
  - Create a logout button to clear the session (both on client and server)
  - Redirect the user to the login screen after logging out
  - Clear cookies upon logout
