import os
import random
from flask import Flask, jsonify, request,send_from_directory
from flask_cors import CORS
import pandas as pd
import pymongo as mongo
from flask import redirect, url_for, flash
from werkzeug.utils import secure_filename

client = mongo.MongoClient('localhost', 27017)

db = client.flask_db

app = Flask(__name__)
CORS(app)

path = r'.\\assets\\data\\'


@app.route('/register', methods=['POST'])
def register():

    data = request.get_json()
    
    username = data.get('username')
    password = data.get('password')

    if username != "" and password != "":
       name = db.create_collection("Users")
       print(name)

    return jsonify({
        'message': 'User registered successfully!',
        'username': username
    }), 200  





IMAGE_DIRECTORY = os.path.join(app.root_path, "assets",'img','parents')



@app.route('/Images/parents/<path:filename>', methods=['GET'])
def set_images(filename):
    try:
        print(filename)
        return send_from_directory(IMAGE_DIRECTORY, filename)
    except FileNotFoundError:
        return jsonify({"error": "Image not found"}), 404
    
CSV_DIRECTORY = os.path.join(app.root_path,'assets', 'data')

@app.route('/data/list-all', methods=['GET'])
def serve_csv():

    df = pd.read_csv('.\\assets\\data\\data.csv')

    json_data = df.to_json(
        orient='records', 
        indent=4
    )

    return json_data
    

IMAGE_DIRECTORY_C = os.path.join(app.root_path, "assets",'img','childs')
@app.route('/Images/childs/<path:filename>', methods=['GET'])
def set_images1(filename):
    try:

        print(filename)
        return send_from_directory(IMAGE_DIRECTORY_C, filename)
    except FileNotFoundError:
        return jsonify({"error": "Image not found"}), 404
    
def random_number():
    return random.randint(1, 100)

@app.route('/data/ServeData', methods=['GET'])
def DetectedServe():

    df = pd.read_csv('.\\Detected.csv')


    json_data = df.to_json(
        orient='records', 
        indent=4
    )

    return json_data





PARENT_DIR = os.path.join(app.root_path, 'assets', 'img','childs')
CHILD_DIR = os.path.join(app.root_path, 'assets', 'img','parents')
ALLOWED_EXTENSIONS = {'jfif'}
ALLOWED_MIME_TYPES = {'image/jfif'}

os.makedirs(PARENT_DIR, exist_ok=True)
os.makedirs(CHILD_DIR, exist_ok=True)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload-img/parents', methods=['POST'])
def upload_parent_image():
 
    if 'parent_image' not in request.files:
        return jsonify({"error": "Missing parent image file"}), 400

    parent_file = request.files['parent_image']

    # Check if the file is allowed type and not empty
    if parent_file and allowed_file(parent_file.filename):
        parent_filename = secure_filename(parent_file.filename)

        # Save parent image in PARENT_DIR
        parent_file_path = os.path.join(PARENT_DIR, parent_filename)
        parent_file.save(parent_file_path)

        return jsonify({
            "parent_image": parent_file_path,
            "message": "Parent image uploaded successfully"
        }), 200
    else:
        return jsonify({"error": "Invalid file type or empty file"}), 400

# Function to handle child's image upload
@app.route('/upload-img/childs', methods=['POST'])
def upload_child_image():
    # Check if the request has the file
    if 'child_image' not in request.files:
        return jsonify({"error": "Missing child image file"}), 400

    child_file = request.files['child_image']

    # Check if the file is allowed type and not empty
    if child_file and allowed_file(child_file.filename):
        child_filename = secure_filename(child_file.filename)

        # Save child image in CHILD_DIR
        child_file_path = os.path.join(CHILD_DIR, child_filename)
        child_file.save(child_file_path)

        return jsonify({
            "child_image": child_file_path,
            "message": "Child image uploaded successfully"
        }), 200
    else:
        return jsonify({"error": "Invalid file type or empty file"}), 400



if __name__ == "__main__":
    app.run(
    host='0.0.0.0',
    port=5000,
    debug=True)