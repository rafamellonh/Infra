from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route("/")
def quiz():
    return render_template("index.html")

@app.route("/status")
def status():
    return jsonify(
        app="lab-sample-app-quiz",
        status="ok",
        message="Aplicação de exemplo com página de quiz para testes no GitLab e Docker."
    )

if __name__ == "__main__":
    # host 0.0.0.0 para o container expor a porta
    app.run(host="0.0.0.0", port=5000)
