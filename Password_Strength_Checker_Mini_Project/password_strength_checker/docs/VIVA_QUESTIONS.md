# Viva Questions and Answers

### 1. What is the title of your project?
Password Strength Checker and Security Awareness Tool.

### 2. What is cybersecurity?
Cybersecurity is the practice of protecting systems, networks, applications, and data from digital attacks and unauthorized access.

### 3. What is the purpose of this project?
It estimates password strength using basic rules and teaches users how to improve password habits.

### 4. Which technologies did you use?
HTML, CSS, JavaScript, Python, and Flask.

### 5. What is Flask?
Flask is a lightweight Python web framework used to build web applications and HTTP endpoints.

### 6. What is the role of HTML?
HTML defines the structure and content of the web page.

### 7. What is the role of CSS?
CSS controls the appearance, layout, and responsive design.

### 8. What is the role of JavaScript?
JavaScript handles user interactions, sends requests to Flask, updates the checklist, and generates sample passwords.

### 9. What is an API?
An API is an interface that allows software components to communicate. Here, JavaScript calls a Flask endpoint and receives JSON.

### 10. What is JSON?
JSON is a lightweight text format for exchanging structured data.

### 11. What criteria are checked?
Length of at least 12 characters, lowercase letters, uppercase letters, digits, and special characters.

### 12. Does a strong score guarantee safety?
No. The project uses simple rules and cannot guarantee that a password is unpredictable, unique, or absent from data breaches.

### 13. Why should passwords not be reused?
If one service is breached, an attacker may try the same password on other services.

### 14. What is multi-factor authentication?
MFA requires an additional proof of identity beyond a password, such as an authenticator-app code or security key.

### 15. What is a password manager?
It is a tool that helps create and store unique passwords securely.

### 16. Does the project use a database?
No. A database is unnecessary for this version, and the application does not save passwords.

### 17. How does the frontend communicate with the backend?
JavaScript sends an HTTP POST request to `/api/check-password` and receives a JSON response.

### 18. What is input validation?
Input validation checks that data has the expected type and acceptable size before processing it.

### 19. What is the purpose of the password generator?
It creates a random sample password for learning and demonstrations, using browser cryptographic randomness.

### 20. What are the limitations?
The checker uses basic rules, may miss predictable patterns, does not check breach databases, and cannot guarantee security.

### 21. What is localhost?
Localhost refers to the same computer on which the application is running. This app uses `127.0.0.1:5000`.

### 22. What is a future enhancement?
A future version could use a more sophisticated estimator, add translations, and improve automated testing.

### 23. Why did you use Python?
Python has readable syntax and is beginner-friendly for implementing the checking logic.

### 24. What did you learn from this project?
I learned how to build a small web application, connect JavaScript to a Flask backend, validate input, return JSON, and explain password-security practices.
