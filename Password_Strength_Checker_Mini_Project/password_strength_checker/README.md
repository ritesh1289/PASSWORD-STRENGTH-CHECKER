# Password Strength Checker and Security Awareness Tool

A beginner-friendly B.Sc. IT cybersecurity mini project built with HTML, CSS, JavaScript, Python, and Flask.

## Features
- Live password strength estimate
- Five basic checks: length, lowercase, uppercase, number, special character
- Suggestions to improve the password
- Show/hide password control
- Browser-cryptography-based sample password generator
- Responsive interface and awareness tips
- No database and no password storage

## Requirements
- Python 3.10 or newer
- VS Code (recommended)
- Internet is not required after Flask is installed

## Run on Windows
1. Extract the ZIP file and open the `password_strength_checker` folder in VS Code.
2. Open Terminal → New Terminal.
3. Create a virtual environment:
   ```powershell
   py -m venv .venv
   ```
4. Activate it:
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```
   If PowerShell blocks activation, use Command Prompt terminal and run:
   ```bat
   .venv\Scripts\activate.bat
   ```
5. Install Flask:
   ```powershell
   python -m pip install -r requirements.txt
   ```
6. Start the app:
   ```powershell
   python app.py
   ```
7. Open this address in your browser: http://127.0.0.1:5000
8. Stop the server with `Ctrl+C` in the terminal.

## Folder structure
```text
password_strength_checker/
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js
└── docs/
    ├── PROJECT_REPORT.md
    ├── TEST_CASES.md
    ├── FLOWCHART.md
    └── VIVA_QUESTIONS.md
```

## Test samples
Use made-up examples only:
- `abc` → very weak
- `Ritesh123` → weak/medium depending on rules; it is predictable and should not be used as a real password
- `Cloud!River7Stone` → likely very strong under these basic checks
- Click **Generate strong sample** to create a random demonstration password.

## Privacy and limitations
The browser sends the typed sample to the local Flask server at `127.0.0.1` for evaluation. The application does not save it to a database or print it in application code. Do not enter real account passwords. The app uses simple rules and cannot determine whether a password has been leaked, guessed by an attacker, or is unique across accounts. Its score is educational, not a guarantee of security.

The Flask development server is intended for local testing only. Do not expose it to the public internet as-is.
