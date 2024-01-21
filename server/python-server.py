import os, io, read
from flask import Flask, send_from_directory, request, Response
from summarise import summarise

app = Flask(__name__, static_folder='../frontend/dist')

# MONGODB_URI = "mongodb+srv://public:yhj7nZX6EajcWNdZXs4VM2x2z2TUu4Uu2wrRoA31h244EkLnr02k3qe5R39ULZnk@cluster0.mongodb.net/slackoff"
key = os.environ.get("COHERE_API_KEY")

@app.route('/uploadPDF', methods=['POST'])
def uploadPDF():
    print("call to uploadPDF")

    # parse the pdf of slides and get the text in the slides
    if request.content_type != 'application/pdf':
        return Response("not a pdf file", status = 422, mimetype="text/plain")
    try:
        pdf_stream = io.BytesIO(request.data)
        lecture_texts = read.read_pdf(pdf_stream)
    except:
        return Response("error reading file", status=422, mimetype="test/plain")
    
    # try:
    #     binary_data = request.data.decode('utf-8')
    #     database.files.insert_one({'_id': usr, 'data': binary_data})
    # except:
    #     return Response("cant add file to mongoDB", status=500, mimetype="text/plain")

    # grab the summary from the api
    try:
        summary = summarise(lecture_texts, key)
    except Exception as e:
        print(e)
        return Response("error summarising file", status=500, mimetype="test/plain")
    
    # split the summary string into a list of points, then put that list into a dict
    # in order to send as a json object to the react app (andrew wanted it like this :/)
    summary_list = summary.splitlines()
    summary_dict = {}
    i = 0
    for point in summary_list:
        summary_dict[i] = point
        i += 1

    
    return summary_dict


# Serve React App
@app.route('/', defaults={'path': ''}, methods=["GET"])
@app.route('/<path:path>', methods=["GET"])
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    # try:
    #     client = pymongo.MongoClient(MONGODB_URI)
    #     database = client["pdfs"]
    # except Exception as e:
    #     print(e)
    #     print("error connecting to the database")
    #     os._exit(1)

    app.run(use_reloader=True, port=5525, threaded=True, host="0.0.0.0")