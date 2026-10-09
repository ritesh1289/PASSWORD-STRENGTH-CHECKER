# Test Cases

Use made-up passwords only. Results below follow the project's simple rules; this is not a security guarantee.

| ID | Input / action | Expected result |
|---|---|---|
| TC-01 | Open `http://127.0.0.1:5000` | Home page loads |
| TC-02 | Leave password blank | Meter resets; no password is sent |
| TC-03 | Enter `abc` | Very Weak; length and several criteria fail |
| TC-04 | Enter `abcdefghijkL1!` | All five checks pass; Very Strong |
| TC-05 | Enter `abcdefghijkl` | Length and lowercase pass; other checks fail |
| TC-06 | Click Show | Password becomes visible |
| TC-07 | Click Hide | Password is masked |
| TC-08 | Click Generate strong sample | Random 16-character sample appears and is evaluated |
| TC-09 | Click Clear | Input, meter, and checklist reset |
| TC-10 | Submit non-string value to API | API returns HTTP 400 |
| TC-11 | Submit over 1024 characters to API | API returns HTTP 400 |
| TC-12 | Stop Flask and type a password | UI shows a local-server connection message |

## Manual API test
With Flask running, this command can test the backend using a made-up sample:
```powershell
Invoke-RestMethod -Uri http://127.0.0.1:5000/api/check-password -Method Post -ContentType "application/json" -Body '{"password":"Example!Cloud7River"}'
```
The returned JSON should contain `level`, `score`, `checks`, `suggestions`, `length`, and `message`.
