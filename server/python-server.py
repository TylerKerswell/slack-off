from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return '''<p>gamers</p>
            <br>
            <br>
            <h1>yodle</h1>'''

if __name__ == '__main__':
    app.run()
