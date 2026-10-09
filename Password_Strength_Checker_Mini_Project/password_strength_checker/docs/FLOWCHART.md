# Flowchart

```mermaid
flowchart TD
    A([Start]) --> B[Open Password Strength Checker]
    B --> C[Enter a made-up sample password]
    C --> D{Input empty?}
    D -- Yes --> E[Reset strength meter and checklist]
    E --> C
    D -- No --> F[JavaScript sends request to local Flask API]
    F --> G[Validate request and input length]
    G --> H[Check length, lowercase, uppercase, number, special character]
    H --> I[Calculate rule-based score and suggestions]
    I --> J[Return JSON result]
    J --> K[Display strength and checklist]
    K --> L{Generate or clear?}
    L -- Generate --> M[Generate random sample password]
    M --> F
    L -- Clear --> E
    L -- Continue --> C
```

## Architecture
Browser (HTML/CSS/JavaScript) → local HTTP POST request → Flask route `/api/check-password` → Python evaluation function → JSON response → browser updates the UI.

No database is used.
