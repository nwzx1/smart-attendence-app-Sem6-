# Student Attendance System using Face Recognition

## Project Overview

This project is a smart, contactless attendance system that leverages face recognition technology to automatically record student attendance. Built using a full-stack architecture, it eliminates the need for manual roll calls and ensures accuracy, speed, and data integrity in educational institutions.

### Objectives
- Automate the student attendance process using facial recognition.
- Provide a real-time and contactless solution to enhance efficiency.
- Ensure data privacy and system scalability using modern tools.

## Technologies Used

| Layer         | Technology Stack                                          |
|--------------|-----------------------------------------------------------|
| Frontend     | React.js, Vite, TailwindCSS, Shadcn                       |
| State Mgmt   | Zustand, React Query                                     |
| Backend      | Bun (JavaScript runtime), Hono (API framework)           |
| Database     | SQLite                                                   |
| ML & Vision  | Python, Dlib, OpenCV2, CMake                             |
| Image Format | TIFF (for high-resolution face capture)                  |

### Features
- Real-time face recognition for automatic attendance logging.
- High-resolution image capture and encoding.
- Lightweight and local deployment using SQLite.
- Responsive frontend with user-friendly interface.
- Secure and private handling of facial data.
- Attendance reports and timestamp logs.

## Output & Process

The Student Attendance System follows a streamlined workflow, from student registration to real-time attendance marking. Each step ensures a seamless experience for students and staff.

### 1. Student Registration and Image Capture
- Students register by providing their name, ID number, and class information.
- A high-resolution image of the student’s face is captured using a standard webcam.
- The image is saved in TIFF format to retain facial details and ensure recognition accuracy.

### 2. Face Detection, Encoding, and Database Storage
- Captured images undergo preprocessing to detect facial landmarks.
- The system encodes the facial features and stores them in an SQLite database.
- Each encoding is linked to the corresponding student’s academic details.

### 3. Real-Time Recognition and Attendance Logging
- On classroom entry, the system captures live video frames via webcam.
- When a face is recognized, attendance is logged with a timestamp.
- The process is automatic, fast, and eliminates manual roll calls.

### 4. Attendance Monitoring
- Teachers can view real-time attendance updates.
- Attendance reports can be generated and exported for record-keeping.
- The system ensures minimal manual intervention and maximum accuracy.

### 5. Privacy and Security
- Only encoded facial data is stored, not raw images.
- The system ensures data privacy and complies with standard practices.

### 6. Future Enhancements
- Potential features include multi-factor authentication, cloud integration, mobile support, and visitor system integration.

---

## Conclusions

1. The Student Attendance System using Face Recognition effectively demonstrates the application of facial recognition technology to automate and streamline the attendance process.
2. The use of high-quality image formats and reliable libraries like Dlib and OpenCV significantly contributed to the system's precision.
3. The full-stack architecture using Python, Bun, Hono, React.js, and modern tools provided an efficient and scalable solution.
4. SQLite served as a lightweight and fast local data storage solution.
5. The modular and hardware-independent system is deployable in schools with basic infrastructure.
6. Real-time dashboard features enable efficient attendance tracking.
7. Data privacy is maintained by storing only facial encodings.
8. Open-source technologies proved capable of supporting real-world school systems.
9. The system reduces manual error and enhances institutional transparency.
10. Future upgrades can include multi-factor authentication and system integrations.

