import os
from flask import Flask, send_from_directory, request, Response

import read

app = Flask(__name__, static_folder='../frontend/dist')

@app.route('/uploadPDF', methods=['POST'])
def uploadPDF():
    if request.content_type != 'application/pdf':
        return Response("not a pdf file", status = 422, mimetype="text/plain")
    pdfFile = request.data


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