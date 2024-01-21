import os, io, read
from flask import Flask, send_from_directory, request, Response
from summarise import summarise
from define import define, generate_problems
import speech_recognition as sr
from pydub import AudioSegment

app = Flask(__name__, static_folder='../frontend/dist')
coherekey = os.environ.get("COHERE_API_KEY")
openkey = os.environ.get("OPENAI_API_KEY")

@app.route('/uploadFile', methods=['POST'])
def uploadPDF():
    print("\n\n\ncall to uploadFile\n\n\n")

    # parse the pdf or audio file and get the text from in
    if request.content_type == 'application/pdf':
        try:
            pdf_stream = io.BytesIO(request.data)
            lecture_texts = read.read_pdf(pdf_stream)
        except Exception as e:
            print(e)
            return Response("error reading file", status=422, mimetype="test/plain")
    elif request.content_type == 'audio/mpeg':
        try:
            rec = sr.Recognizer()
            audio = AudioSegment.from_file(io.BytesIO(request.data), format="mp3")

            # Convert AudioSegment to AudioData
            audio_data = sr.AudioData(audio.raw_data, audio.frame_rate, audio.sample_width)


            audio_da = rec.record(audio_data)
            print("yeehaw")
            audio = rec.record(audio_da, duration=3600)
            print("yeboi")
            lecture_texts = rec.recognize_bing(audio)
            print(lecture_texts)
            pass
        except Exception as e:
            print(e)
            return Response("error reading audio file", status=421, mimetype="text/plain")
    else:
        return Response("not a pdf file or an audio file", status = 422, mimetype="text/plain")

    
    try:
        summary = summarise(lecture_texts, coherekey)
    except Exception as e:
        print(e)
        return Response("error summarising file", status=500, mimetype="test/plain")
    
    # take the summary and create definitions and practice problems from them
    try:
        definitions = define(summary, openkey)
        problems = generate_problems(summary,openkey)
    except Exception as e:
        print(e)
        return Response("error generating definitions/problems", status=500, mimetype="test/plain")
    
    # split all the string into a list of points, then put that list into a dict
    # in order to send as a json object to the react app (andrew wanted it like this :/)
    summary_list = summary.splitlines()
    def_list = definitions.splitlines()
    prob_list = problems.splitlines()
    summary_dict = {}
    def_dict = {}
    prob_dict = {}
    i = 0
    for point in summary_list:
        summary_dict[i] = point
        i += 1
    i = 0
    for defi in def_list:
        def_dict[i] = defi
        i += 1
    i = 0
    for prob in prob_list:
        prob_dict[i] = prob
        i += 1
    
    multi_dic = {}

    multi_dic["bulletpoints"] = summary_dict
    multi_dic["definitions"] = def_dict
    multi_dic["problems"] = prob_dict

    return multi_dic


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
