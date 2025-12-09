from flask import Flask, render_template, request, redirect, url_for, session, flash
import json
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "your_secret_key"

# Load questions
with open("data/questions.json") as f:
    questions = json.load(f)

# Database helper
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Home route
@app.route("/")
def index():
    return render_template("index.html")

# Register route
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = generate_password_hash(request.form["password"])
        conn = get_db_connection()
        conn.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        conn.close()
        flash("Registration successful! Please login.")
        return redirect(url_for("login"))
    return render_template("register.html")

# Login route
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        conn = get_db_connection()
        user = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
        conn.close()
        if user and check_password_hash(user["password"], password):
            session["user_id"] = user["id"]
            flash("Login successful!")
            return redirect(url_for("dashboard"))
        flash("Invalid credentials!")
    return render_template("login.html")

# Dashboard route
@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

# Test routes
@app.route("/aptitude_test")
def aptitude_test():
    return render_template("aptitude_test.html", questions=questions["aptitude_test"])

@app.route("/domain_test/<domain>")
def domain_test(domain):
    return render_template("domain_test.html", questions=questions["domain_test"][domain], domain=domain)

@app.route("/prediction_test")
def prediction_test():
    return render_template("prediction_test.html", questions=questions["prediction_test"])

if __name__ == "__main__":
    app.run(debug=True)
