import csv
import cv2
import numpy as np
import os
import face_recognition
import pandas as pd
import sqlite3
from datetime import datetime

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(BASE_DIR, "assets", "img", "Parent")

dataPath = r'.\\assets\\data\\'
db_path = 'db\\db1.sqlite'

# Database connection
connection = sqlite3.connect(db_path)

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

# Function to link faces and update records
def linkFaces(Parents_Name, Child_Name):
    if Parents_Name != "unknown" and Child_Name != "UNKNOWN":
        try:
            cursor = connection.cursor()
            
            # Check if the relationship exists
            query_check = "SELECT status FROM records WHERE parent_name = ? AND child_name = ?;"
            cursor.execute(query_check, (Parents_Name, Child_Name))
            result = cursor.fetchone()

            if result:
                # Update the status if the relationship exists
                query_update = "UPDATE records SET status = 1 WHERE parent_name = ? AND child_name = ?;"
                cursor.execute(query_update, (Parents_Name, Child_Name))
                connection.commit()
                print(f"Status updated for parent '{Parents_Name}' and child '{Child_Name}'.")

                # Store in CSV file
                file_path = "assets\\data\\Detected.csv"
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                new_data = [Parents_Name, Child_Name, timestamp, 1]

                # Append data to CSV instead of overwriting
                with open(file_path, mode="a", newline="", encoding="utf-8") as csv_file:
                    csv_writer = csv.writer(csv_file)
                    csv_writer.writerow(new_data)
                print(f"Logged relationship in '{file_path}'.")

            else:
                print(f"No relationship found between parent '{Parents_Name}' and child '{Child_Name}'.")
        except Exception as e:
            print(f"Error in linking faces: {e}")

# Load and encode reference images
encodeListKnown = findEncodings(images)
print('Encoding Complete.')

# Start webcam capture
cap = cv2.VideoCapture(0)  # Use webcam instead of ESP32 Cam

while True:
    success, img = cap.read()  # Read frame from webcam
    if not success:
        print("Failed to capture image from webcam.")
        continue

    # Resize and process the frame
    imgS = cv2.resize(img, (0, 0), None, 0.5, 0.5)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

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

# Cleanup
cap.release()
cv2.destroyAllWindows()
