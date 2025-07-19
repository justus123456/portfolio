from flask import Flask, render_template, request
from learn import answer_question  

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    answer = ""
    if request.method == "POST":
        question = request.form.get("question", "").strip()
        if question:
            answer = answer_question(question)  
        else:
            answer = "Please enter a valid question."
    
    return render_template("index.html", answer=answer)

if __name__ == "__main__":
    app.run(debug=True)
