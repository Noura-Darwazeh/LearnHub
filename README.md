# LearnHub 🎓

**Team Members:**  
- **Aseel Hamayel**  
- **Bessan**  
- **Noura**  
- **Rahaf**  

**Date:** 6/10/2024  

---

## Table of Contents 📚
- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Project Goals](#project-goals)
- [Features](#features)
  - [1. Authentication 🔒](#1-authentication-)
  - [2. Course Management](#2-course-management)
  - [3. Enrollment Management](#3-enrollment-management)
  - [4. User Profile Management](#4-user-profile-management)
  - [5. User Management](#5-user-management)
  - [6. Course Search 🔍](#6-course-search-)
  - [7. Logout](#7-logout)
- [Wireframes 🖼️](#wireframes-)
- [Software Diagrams 🗺️](#software-diagrams-)
  - [Use Case Diagrams](#use-case-diagrams)
  - [UML Model Diagram (ERD)](#uml-model-diagram-erd)
  - [UML Activity Diagram](#uml-activity-diagram)
- [Design Patterns](#design-patterns)
- [Code Collaboration 🤝](#code-collaboration-)
- [Testing 🧪](#testing-)
  - [Manual Testing](#manual-testing)
  - [Unit Testing](#unit-testing)
- [Task Schedule ✅](#task-schedule)
- [Technologies Used ⚙️](#technologies-used)
- [Application Overview](#application-overview)
- [Documentation & Wireframes 📄](#documentation--wireframes-)

---

## 🚨 Problem Statement

Many organizations promote live courses across scattered platforms such as Facebook and LinkedIn. This decentralization makes it challenging for users to track available courses, leading to missed opportunities for learning. **LearnHub** provides a centralized platform where users can easily browse, view, and apply for live courses, storing enrollments in a database for efficient review by course administrators.

## 💡 Proposed Solution

LearnHub addresses the fragmented course advertisement issue by offering a comprehensive platform for both users and course providers. It simplifies the process of finding, viewing, and applying for live courses, enabling users to submit applications without sifting through multiple platforms. 

The admin dashboard enhances course management by allowing administrators to add, edit, and manage courses and users efficiently. This ensures up-to-date course offerings and a streamlined application process for users.

##  🎯 Project Goals

- **Centralize Course Information:** Aggregate live course offerings from various organizations into one accessible platform.
- **Simplify Enrollment:** Enable users to apply for courses easily, with applications stored in a database for review.
- **Improve Course Management:** Provide administrators with a dedicated dashboard to manage courses and users, including adding, editing, and tracking enrollments.
- **Enhance User Experience:** Ensure users can quickly find and apply for courses, minimizing the risk of missing important opportunities.

LearnHub serves as a comprehensive solution for both learners and course providers, streamlining the entire process from course discovery to enrollment management.

## 🚀 Features

### 1. Authentication 🔒
Users can register and manage their accounts by providing:
- **User Name**
- **Email**
- **Password**: Minimum 8 characters, must contain numbers, special characters, upper and lower characters.

### 2. Course Management 📖
Administrators can efficiently manage course offerings through:
- **Add New Courses:** Quickly input new course details.
- **Edit Existing Courses:** Update course information as needed.
- **Delete Courses:** Deleting a course.

### 3. Enrollment Management 🎓
- **Enroll in Courses:** Users can apply for courses directly through the platform, which are then stored in the database for  review.
- **View Enrolled Courses:** Users can easily access a list of courses they are enrolled in.

### 4. User Profile Management 👤
Users can manage their profiles with features including:
- **Edit Username and Password:** Update personal information to keep accounts secure.
- **Account Deletion:** Users have the option to delete their accounts if needed.

### 5. User Management 👥
- **Administrator Capabilities:** Admins can manage user accounts and courses and modify them.

### 6. Course Search 🔍
- **Search Functionality:** Users can search for courses using filters to find relevant offerings quickly.

### 7. Logout 🚪
- **Session Management:** Users can log out to secure their accounts, ensuring that their personal information remains protected.

## Wireframes 🖼️
We created wireframes using Balsamiq to visualize the user interface and user experience.  
[View Wireframes](https://drive.google.com/file/d/1KW3AsYlQghWnkWIie9PMH0TI2ydmkgnL/view?usp=sharing)

## Software Diagrams 🗺️

### Use Case Diagrams
1. **User Use Case**  
   [View User Use Case Diagram](https://drive.google.com/file/d/1CRZgoNstDD9VlILzEoPLDCH6LbdssH0d/view?usp=sharing)  

2. **Admin Use Case**  
   [View Admin Use Case Diagram](https://drive.google.com/file/d/1IahliQ8_pZZBQBM90VLNSdjPw6T-fMc7/view?usp=sharing)  
  

### UML Model Diagram (ERD)
In this project, we utilized **MongoDB** for data storage. We chose NoSQL due to its flexibility, ease of use, scalability, and compatibility with modern JavaScript development.

[View ERD Diagram](https://drive.google.com/file/d/1VEyFOqP5lySHcscmM7SfechIKrP4IA-L/view?usp=sharing)  

### UML Activity Diagram
The UML activity diagram illustrates the flow of specific tasks within the application.  
[UML Activity Diagram Reference](https://drive.google.com/file/d/1UMxFEYkYjHSBd5GUuWSRiuVgBsk14bdt/view?usp=sharing)

## Design Patterns
We implemented the **MVC (Model-View-Controller)** architecture using:
- **React** for the frontend to build a dynamic user interface.
- **Node.js** for the backend to manage server-side operations.
- **APIs** for seamless communication between the frontend and backend.
  
Additionally, we utilized the **Factory design pattern** in the search component to manage search functionality dynamically.

## Code Collaboration 🤝
- **Frontend Repository:** [LearnHub Frontend GitHub](https://github.com/Noura-Darwazeh/LearnHub)  
- **Backend Repository:** [LearnHub Backend GitHub](https://github.com/bessantomeh/LearnHub_Backend/tree/main)  
- **SonarQube Results:** [SonarQube Screenshot](https://drive.google.com/file/d/1--8JeRK0NFrfqFKHFsw735opDPdj-MpX/view?usp=sharing)

## Testing 🧪

### Manual Testing
We conducted manual test cases for the add course feature to ensure functionality and reliability.  
[Manual Test Suite Report](https://app.testomat.io/projects/learnhub/runs/e7ff509b/report)

### Unit Testing
Unit tests focused on the enrollment functionality to ensure robustness and accuracy. *(Add details on the testing framework and coverage)*

## Task Schedule ✅
- **Trello Board:** [Trello Project Management](https://trello.com/b/YhaPvz32/mrdt-group-f)

## Technologies Used ⚙️
- **Frontend:** React
- **Backend:** Node.js
- **Database:** MongoDB
- **Version Control:** GitHub
- **Code Review:** SonarQube
- **Testing:** Testomat, Postman (for API testing)

## Application Overview
The application includes the following features:
- **Authentication:** User login, signup, and password reset functionality.
- **Home Page:** Overview of available courses with easy navigation.
- **Courses Page:** Search and filter options for course discovery.
- **Course Details Page:** Detailed course information with enrollment choices.
- **User Profile Page:** Users can view enrolled courses, edit their profile, and delete their account.
- **Admin Dashboard:** Comprehensive management of courses and users with CRUD operations and search functionalities.
- **About Us Page:** Information about the team and project objectives.

## Documentation & Wireframes 📄
Additional project documentation and wireframes can be found [here](link-to-documentation).

---

Thank you for exploring our LearnHub project! We aim to provide a valuable resource for learners seeking live courses. For any inquiries or feedback, please reach out to the team.
