from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify

app = Flask("__name__")
cors = CORS(app)


@app.route("/face", methods=['GET', 'POST'])
def face_class():
    if request.method == "POST":
        bytesOfImage = request.get_data()
        with open('image.jpeg', 'wb') as out:
            out.write(bytesOfImage)
        return "Image read"
    return jsonify({'GET': "FACES"})


if __name__ == "__main__":
    app.run(host='139.179.205.77', port=5000, debug=True)
