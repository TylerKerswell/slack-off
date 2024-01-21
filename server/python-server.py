import os, io, read
from flask import Flask, send_from_directory, request, Response
from summarise import summarise
from define import define, generate_problems
import speech_recognition as sr
import json

DEBUG_MODE = False

app = Flask(__name__, static_folder='../frontend/dist')
coherekey = os.environ.get("COHERE_API_KEY")
openkey = os.environ.get("OPENAI_API_KEY")

@app.route('/uploadFile', methods=['POST'])
def uploadPDF():
    print("\n\n\ncall to uploadFile\n\n\n")

    if DEBUG_MODE:
        return json.load(open("debuginfo.json"))

    # parse the pdf or audio file and get the text from in
    if request.content_type == 'application/pdf':
        try:
            pdf_stream = io.BytesIO(request.data)
            lecture_texts = read.read_pdf(pdf_stream)
        except Exception as e:
            print(e)
            return Response("error reading file", status=422, mimetype="test/plain")
    elif request.content_type == 'audio/wav':
        print("\n\nparsing audio...\n\n")
        try:
            if DEBUG_MODE:
                lecture_texts = "welcome to all of countless three minutes disclaimer i do not fit absolutely everything you're assuming the video we too long the stuff was eating and amos for inspiring the study of check out their video on county which i've lived in description fellas get into it or what three space vectors and surfaces to sink into the fiercest functions and treating these functions take to win votes on x. and y. axes increase in output on the sea exits the actors your twenties with direction and magnitude is also placed three factors teach their direction is three dimensional urgent vector multiplication we knew operations like addition and subtraction with actors just a win win with greater numbers which differ with actors our exit they're different kinds of publication for scalded dog product is the most intuitive drawled glacier the numbers in a factor for the corresponding one the other factor avarice also up and answered our product is facing archery but there it is an interesting connection between got products in the state croatia should between two letters to perpendicular for thought and all of their call them three space factors always have a dog produce your own for jupiter all factors that are deceived the product of the magnitude of the two factors discovery since become the fall in florida which is the englewood electors unity in the double absolute values the magnitude of the cross product is the author mainly of multiplying vectors this parking expressed to the detriment of this matrix or i didn't hear the new investors into the x. y. and z. directions respectively and signor the vector be multiplied across parts also has an interesting property though we generate a factor that is worth r a perpendicular to the two factors be multiplied perjury the listener reduce a multi variable functions bristling with two functions were reproach index fell you begin to go to the three function for repression value on the x. y. played using limits we get older hundred riveted to second what to eat one thing to note that they're in philly many here is a three function is turnpike says they're in philly many directions want to go in the julie's your call directional derivatives also taking the partial birth with respect x kisses the room to room given the positive extraction and approaching the first actual life gives us the derivative in the four direction ingredient is a generalization of this graham the point is a factor with quoted speed arrhythmia extraction and why direction or for the liberals decide we define differentiation integral full success with older able functions were doing it deliberately to find the area under function for fighting the volume moderate to do this first to enable next direction the integrate that area the second time over the white erection effective week's turning it that is all we can do it over girls eagleson every over not retain your region instead of having the mountaineer goals be numbers baby functions wiggle c's color hornets for the liberals were sitting in there all the white yes it is you're eating a notice of the polar glacier were in reading is our cubans or squared more on that later or drive trouble arose and three quarter and systems troubling her roles can also be used for folly and stronger role swig every penny three the region as long as we can find three different boundary sensitive to hear extras from the seared into our white mushrooms your ex for retraining your base his ego truce you're aware squared cream is worth parabolic shaped for orosco to be used for fighting things like average temperature or we would be enumerated temperature function over three surface to find their perch temperature with him in the liberal side has it's easier to avert a polar coordinates likewise there's an analogous system and three space rather to know the system cylindrical base your coordinates is little corn it's there is reviews are busy corner and they will fade and it's your porn it's there is reason to engels rose three dishes retorted fees the angle from the vertical line and passes through the portion and they were just waiting for her sex cornett frustrations and jacoby and there's actually an infinite number of corded systems not just the once described previously any current system can be defined as x. equals junior the white bulls interview he is example in four corners this is x. equals marcos and it white walls are signs that are changing in any role for one corner system to another one assess your function jaded coby and to the inside of the inner brought to cover the distortions which important systems creates busted his feelings apple ago when profound earlier you're reducing jacoby and being added to the inside of the earl what is said is basically an oversimplification of the reason i'm sure we're in the real reason involves a tough call our foodmaker c.'s would you go to determine the back of the entirety of its own anyways to the transformation scene to convert to port sweater girl does your coordinates are seven vector fields scalar fields and liner girls butterfield isn't a sign of a vector to each point up later space scalar field is essentially that with greater numbers to eighty skinner's into these three services so but he played in a way they're essentially the same thing as three functions we need a new role in count one dear rose always on a flat surface think she's paper which is sheet of paper was bent in three space is is gail earline integral the zeroes in over scalar field to yes they're also vector liner grossed over doctor fields the simulate illustrate i'll be thinking of them is who worked on hard all as it travels along the vector fuel forced labour skills to be conservative mean any line and roll on and his path independent is very analogous to conservative forces a gravity will worked on particles as president in effect gravity has a factor field on this field varies depending on the objects are present butterfield of curing properties have urchins and current divergence idiomatic outflow from stern part of actor field in the center of the divergences high since everything is moving our words for way divergences lower system for intruding in some root out karl is the amount of radiation around is reported record field here in the outside that perot's los is there's not more spend the dissenters across high says everything's been surrounded an asset once again i left out a lot of stuff after all yours first win of course minutes in yours alfa may make some videos later on going more in depth on the various subjects discussed your pen and they're all sorts of amazing resources on line if you wanna go more in depth yourself like some of them instruction for now that's all i see you next time"
            else:
                bytesf = io.BytesIO(request.data)
                audio = sr.AudioFile(bytesf)
                rec = sr.Recognizer()
                with audio as source:
                    audiodata = rec.record(audio)
                lecture_texts = rec.recognize_whisper(audio_data=audiodata, language='english')
                print(lecture_texts)
        except Exception as e:
            print(e)
            return Response("error reading audio file", status=421, mimetype="text/plain")
    else:
        return Response("not a pdf file or an audio file", status = 422, mimetype="text/plain")

    # summarize the text we got from any source
    print("\n\nsummarizing text...\n\n")
    try:
        summary = summarise(lecture_texts, coherekey)
    except Exception as e:
        print(e)
        return Response("error summarising file", status=500, mimetype="test/plain")
    
    print("\n\nfinished summarizing, generating...\n\n")
    # take the summary and create definitions and practice problems from them
    try:
        definitions = define(summary, openkey)
        problems = generate_problems(summary,openkey)
    except Exception as e:
        print(e)
        return Response("error generating definitions/problems", status=500, mimetype="test/plain")
    
    print("finished!")
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
        if not point.isspace():
            summary_dict[i] = point
            i += 1
    i = 0
    for defi in def_list:
        if not defi.isspace():
            def_dict[i] = defi
            i += 1
    i = 0
    for prob in prob_list:
        if not prob.isspace():
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