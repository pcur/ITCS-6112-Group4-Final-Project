# Outline
Server is using a modular architecture, REST API based interaction between modules. 

## Mongo Database Collection Structure
Collections: 
  users (id, name, email, role, student_id, enrolled_courses)
  courses (id, name, capacity, time, length, instructor, preferences { buildings, times}, assigned room, enrolled students)
  rooms (id, building, room number, capacity, assigned courses)
  enrollments (id, student, course, status)

## Backend Modules
Room Assignment (assignments.js) - Handles logic for determining where to place courses
  - POST: /assignments/generate - Runs algorithm and assignment
  - GET: /assignments/:courseId - Retrieves room assignment for specific course
  - GET: /assignments/:roomId - Retrieves course assignments for specific rooms
  - GET: /assignments - Retrieves all assignments
  - PATCH: /assignments/:courseId - Manual change of room assignment for specific course
  - DELETE: /assignments/:courseId - Removes assigment for specific course
    
Authentication & Accounts (auth.js) - Handles user creation and login
  - POST: /auth/register - Registers new user
  - POST: /auth/login - Authenticates user
  - POST: /auth/logout - Deauth's a user
  - GET: /auth/me - Returns info of current logged in user
  - PATCH: /auth/updatePassword/:userId - Updates a users password
  - PATCH: /auth/updateRole/:userId - updates a users role
    
Student Management (students.js) - Handles enrollments
  - GET: /students - Retrieve all students info
  - GET: /students/:studentId - Retrieves info of specific student
  - GET: /students/:studentId/enrollments - check enrollments of specific student
  - POST: /students/:studentId/enroll/:courseId - enrolls student in specific course
  - DELETE: //students/:studentId/drop/:courseId - drops student from specific course

Room Management (rooms.js) - Allows for creation, removal, and modification of rooms
  - GET: /rooms - Retrieves all rooms
  - GET: /rooms/:roomId - Gives details of specfic room
  - POST: /rooms - creates new room
  - PATCH: /rooms/:roomId - updates room details
  - DELETE: /rooms/:roomId - removes room

Course Management (courses.js) - Allows for creation and modifcation of courses and their times/preferences
  - GET: /courses - retrieve all courses
  - GET: /courses/:courseId - gets details of specific course
  - GET: /courses/:courseId/students - gives all students enrolled
  - GET: /courses/:courseId/preferences - gives course preferences
  - POST: /courses - creates new room
  - PATCH: /courses/:courseId/preferences - modify course preferences
  - PATCH: /courses/:courseId - updates course details
  - DELETE: /courses/:courseId - deletes course+
