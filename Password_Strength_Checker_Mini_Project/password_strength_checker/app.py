from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)

SPECIAL_CHARS = r"""!@#$%^&*()-_=+[]{};:,.?/\\|~`'"<>"""


def evaluate_password(password):
    """Return a transparent, rule-based estimate. Never store or print the password."""
    if not isinstance(password, str):
        password = ""

    checks = {
        "length": len(password) >= 12,
        "lowercase": bool(re.search(r"[a-z]", password)),
        "uppercase": bool(re.search(r"[A-Z]", password)),
        "number": bool(re.search(r"\d", password)),
        "special": any(ch in SPECIAL_CHARS for ch in password),
    }

    score = sum(checks.values())
    suggestions = []

    if len(password) < 8:
        suggestions.append("Use at least 12 characters; longer passwords are generally harder to guess.")
    elif len(password) < 12:
        suggestions.append("Increase the length to at least 12 characters.")
    if not checks["lowercase"]:
        suggestions.append("Add a lowercase letter (a–z).")
    if not checks["uppercase"]:
        suggestions.append("Add an uppercase letter (A–Z).")
    if not checks["number"]:
        suggestions.append("Add a number (0–9).")
    if not checks["special"]:
        suggestions.append("Add a special character, such as !, @, #, or %.")
    if password and len(set(password)) == 1:
        suggestions.append("Avoid repeating the same character.")
    if password and password.lower() in {"password", "password123", "qwerty123", "admin123"}:
        suggestions.append("Avoid common passwords and predictable patterns.")

    if not password:
        level = "Very Weak"
        message = "Enter a sample password to see its estimated strength."
    elif len(password) < 8 or score <= 2:
        level = "Very Weak" if len(password) < 8 and score <= 2 else "Weak"
        message = "This password has several weaknesses."
    elif score == 3:
        level = "Medium"
        message = "Improve the missing criteria to make it stronger."
    elif score == 4:
        level = "Strong"
        message = "Good start. Consider improving any remaining criteria."
    else:
        level = "Very Strong"
        message = "It meets all five checks. Length and uniqueness still matter."

    if password and not suggestions:
        suggestions.append("Use a unique password for every account and consider a password manager.")

    return {
        "level": level,
        "score": score,
        "max_score": 5,
        "checks": checks,
        "suggestions": suggestions,
        "length": len(password),
        "message": message,
    }


@app.get("/")
def home():
    return render_template("index.html")


@app.post("/api/check-password")
def check_password():
    data = request.get_json(silent=True) or {}
    password = data.get("password", "")
    if not isinstance(password, str):
        return jsonify({"error": "Password must be text."}), 400
    if len(password) > 1024:
        return jsonify({"error": "Please test a password with 1024 characters or fewer."}), 400
    # The password is evaluated in memory only; it is not saved or printed.
    return jsonify(evaluate_password(password))


if __name__ == "__main__":
    # Local development server only. Do not expose Flask's development server to the internet.
    app.run(host="127.0.0.1", port=5000, debug=False)
