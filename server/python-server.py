import os
from flask import Flask, send_from_directory, request

import read

app = Flask(__name__, static_folder='../frontend/dist')

@app.route('/uploadPDF', methods=['POST'])
def uploadPDF():
    pdf_file = read.read_pdf(request.data)

# Serve React App
@app.route('/', defaults={'path': ''}, methods=["GET"])
@app.route('/<path:path>', methods=["GET"])
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(use_reloader=True, port=5525, threaded=True, host="0.0.0.0")