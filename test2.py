import csv
import pandas as pd
import cv2
import urllib.request
import numpy as np
import os
from datetime import datetime
import face_recognition
import sqlite3
import dlib
from imutils.face_utils import shape_to_np

# Paths
path = r'D:\\Kashif\\Delete\\Smartpick-ML - Copy\\assets\\img\\Parent'
dataPath = r'.\\assets\\data\\'
db_path = 'db\\db1.sqlite'

# Database connection
connection = sqlite3.connect(db_path)

# Camera feed URL
url = 'http://192.168.58.105/cam-hi.jpg'

# Load reference images and names
images = []
classNames = []
myList = os.listdir(path)
print("Reference Images List:", myList)

for cl in myList:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])
print("Class Names:", classNames)

# Function to encode reference images
def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encodes = face_recognition.face_encodings(img)
        if len(encodes) > 0:  # Ensure the face is detected
            encodeList.append(encodes[0])
        else:
            print("Warning: Face encoding failed for one of the reference images.")
    return encodeList

# Function to link faces in database
import csv
from datetime import datetime

# def linkFaces(Parents_Name, Child_Name):
#     if Parents_Name != "unknown" and Child_Name != "UNKNOWN":
#         try:
#             # Database connection and cursor
#             cursor = connection.cursor()
            
#             # Check if the relationship exists in the database
#             query_check = """
#             SELECT status FROM records 
#             WHERE parent_name = ? AND child_name = ?;
#             """
#             cursor.execute(query_check, (Parents_Name, Child_Name))
#             result = cursor.fetchone()

#             if result:
#                 # Update the status if the relationship exists
#                 query_update = """
#                 UPDATE records
#                 SET status = 0
#                 WHERE parent_name = ? AND child_name = ?;
#                 """
#                 cursor.execute(query_update, (Parents_Name, Child_Name))
#                 connection.commit()
#                 print(f"Status updated for parent '{Parents_Name}' and child '{Child_Name}'.")

#                 # Store the relationship in Detected.csv (overwrite old data)
#                 file_path = "assets\\data\\Detected.csv"
#                 timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
#                 new_data = [Parents_Name, Child_Name, timestamp, 1]

#                 with open(file_path, mode="w", newline="", encoding="utf-8") as csv_file:
#                     csv_writer = csv.writer(csv_file)
#                     # Write the header
#                     csv_writer.writerow(["Parent_Name", "Child_Name", "Timestamp", "Status"])
#                     # Write the new data
#                     csv_writer.writerow(new_data)
#                 print(f"Latest relationship stored in '{file_path}'.")

#                 # Store the relationship in detectedData.csv (append new data)
#                 append_file_path = "assets\\data\\detectedData.csv"
#                 with open(append_file_path, mode="a", newline="", encoding="utf-8") as append_csv_file:
#                     csv_writer = csv.writer(append_csv_file)
#                     # Check if file is empty to write header
#                     if append_csv_file.tell() == 0:
#                         csv_writer.writerow(["Parent_Name", "Child_Name", "Timestamp", "Status"])
#                     # Append the new data
#                     csv_writer.writerow(new_data)
#                 print(f"Appended relationship to '{append_file_path}'.")

#             else:
#                 print(f"No relationship found between parent '{Parents_Name}' and child '{Child_Name}'.")
#         except Exception as e:
#             print(f"Error in linking faces: {e}")
#     else:
#         print("Invalid parent or child name. Operation skipped.")

import csv
from datetime import datetime

def linkFaces(Parents_Name, Child_Name):
    if Parents_Name != "unknown" and Child_Name != "UNKNOWN":
        try:
            # Database connection and cursor
            cursor = connection.cursor()
            
            # Check if the relationship exists in the database
            query_check = """
            SELECT status FROM records 
            WHERE parent_name = ? AND child_name = ?;
            """
            cursor.execute(query_check, (Parents_Name, Child_Name))
            result = cursor.fetchone()

            if result:
                # Update the status if the relationship exists
                query_update = """
                UPDATE records
                SET status = 0
                WHERE parent_name = ? AND child_name = ?;
                """
                cursor.execute(query_update, (Parents_Name, Child_Name))
                connection.commit()
                print(f"Status updated for parent '{Parents_Name}' and child '{Child_Name}'.")

                # Store the relationship in Detected.csv (overwrite old data)
                file_path = "assets\\data\\Detected.csv"
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                new_data = [Parents_Name, Child_Name, timestamp, 1]

                with open(file_path, mode="w", newline="", encoding="utf-8") as csv_file:
                    csv_writer = csv.writer(csv_file)
                    # Write the header
                    csv_writer.writerow(["Parent_Name", "Child_Name", "Timestamp", "Status"])
                    # Write the new data
                    csv_writer.writerow(new_data)
                print(f"Latest relationship stored in '{file_path}'.")

                # Append unique data to detectedData.csv
                append_file_path = "assets\\data\\detectedData.csv"
                unique_data = True
                try:
                    # Check if the data already exists
                    with open(append_file_path, mode="r", newline="", encoding="utf-8") as read_csv_file:
                        csv_reader = csv.reader(read_csv_file)
                        # Skip the header row
                        next(csv_reader, None)
                        for row in csv_reader:
                            if row[:2] == [Parents_Name, Child_Name]:
                                unique_data = False
                                break
                except FileNotFoundError:
                    # If the file doesn't exist, treat as new
                    pass

                if unique_data:
                    with open(append_file_path, mode="a", newline="", encoding="utf-8") as append_csv_file:
                        csv_writer = csv.writer(append_csv_file)
                        # Write header if the file is empty
                        if append_csv_file.tell() == 0:
                            csv_writer.writerow(["Parent_Name", "Child_Name", "Timestamp", "Status"])
                        # Append the new unique data
                        csv_writer.writerow(new_data)
                    print(f"Appended unique relationship to '{append_file_path}'.")
                else:
                    print(f"Relationship already exists in '{append_file_path}'. Skipping append.")

            else:
                print(f"No relationship found between parent '{Parents_Name}' and child '{Child_Name}'.")
        except Exception as e:
            print(f"Error in linking faces: {e}")
    else:
        print("Invalid parent or child name. Operation skipped.")



# Function to find the child linked to the detected parent
def find_parent(name):
    try:
        query = f"SELECT child_name FROM records WHERE parent_name = '{name}';"
        result = pd.read_sql_query(query, connection)
        if not result.empty:
            return result.iloc[0]['child_name']
        return "UNKNOWN"
    except Exception as e:
        print(f"Error fetching parent from database: {e}")
        return "UNKNOWN"

# Eye blink detection functions
def eye_aspect_ratio(eye):
    """Calculate the eye aspect ratio to detect blinking."""
    A = np.linalg.norm(eye[1] - eye[5])
    B = np.linalg.norm(eye[2] - eye[4])
    C = np.linalg.norm(eye[0] - eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

# Initialize dlib's face detector and facial landmark predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# Left and right eye landmark indices
(lStart, lEnd) = (42, 48)
(rStart, rEnd) = (36, 42)

# Constants for eye blink detection
EYE_AR_THRESH = 0.2  # Eye aspect ratio threshold for blink
CONSEC_FRAMES = 3    # Number of consecutive frames for a blink

# Load and encode reference images
encodeListKnown = findEncodings(images)
print('Encoding Complete.')

# Start video feed processing
while True:
    try:
        # Fetch frame from camera feed
        img_resp = urllib.request.urlopen(url)
        imgnp = np.array(bytearray(img_resp.read()), dtype=np.uint8)
        img = cv2.imdecode(imgnp, -1)

        # Convert to grayscale for landmark detection
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        rects = detector(gray, 0)
        
        # Track blink status
        blink_detected = False
        
        for rect in rects:
            # Detect facial landmarks
            shape = predictor(gray, rect)
            shape = shape_to_np(shape)
            
            # Extract left and right eye coordinates
            leftEye = shape[lStart:lEnd]
            rightEye = shape[rStart:rEnd]
            
            # Calculate eye aspect ratios
            leftEAR = eye_aspect_ratio(leftEye)
            rightEAR = eye_aspect_ratio(rightEye)
            
            # Average eye aspect ratio
            ear = (leftEAR + rightEAR) / 2.0
            
            # Check for blink
            if ear < EYE_AR_THRESH:
                blink_detected = True
            
            # Resize and process the frame
            imgS = cv2.resize(img, (0, 0), None, 0.5, 0.5)
            imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

            # If blink detected, proceed with face recognition
            if blink_detected:
                # Detect faces in the current frame
                facesCurFrame = face_recognition.face_locations(imgS)
                encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

                for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
                    # Match current frame face with reference encodings
                    matches = face_recognition.compare_faces(encodeListKnown, encodeFace, tolerance=0.55)
                    faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
                    matchIndex = np.argmin(faceDis) if len(faceDis) > 0 else -1

                    if matches[matchIndex]:
                        name = classNames[matchIndex]
                        print("Detected Face:", name)
                    else:
                        name = "unknown"

                    # Fetch child linked to the detected parent
                    linked_name = find_parent(name)

                    # Display results on video feed
                    y1, x2, y2, x1 = faceLoc
                    y1, x2, y2, x1 = y1 * 2, x2 * 2, y2 * 2, x1 * 2  # Adjust scaling
                    cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
                    cv2.putText(img, f'{name} -> {linked_name}', (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

                    # Log detected match
                    linkFaces(name, linked_name)

        # Show video feed
        cv2.imshow('Webcam', img)

        # Break on 'q' key press
        if cv2.waitKey(5) & 0xFF == ord('q'):
            break
    except Exception as e:
        print(f"Error processing video feed: {e}")

cv2.destroyAllWindows()