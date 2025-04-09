# CRAM
Class room assignment system, or CRAM, is a webapp developed by Patrick Cur, Jamison Heinrich, and Sravanth Tumma, for ITCS 6112, under Dr. Dorodchi

Final goal of the project is to automate the process of room assignments for school administrators, and allow for students to view listed classes and room/times. 

## Installation and Running of Server Instance
To install and run, you first must add your mongodb/atlas connection uri into a .env file. After creating .env in the "server" directory, add the line,

```.env
MONGO_URI = <your_connection_string>
```
and then run:
```shell
npm install
node server.js
```
If running correctly, should output a warning followed by 
```
Server connected to port 5000
Connected to MongoDB
```
## Installation and Running of Webclient Instance
To install and run, navigate to "webclient" directory in cli and run:
```bash
npm install
npm start
```
No config is needed, at the moment it will run the webclient on localhost:3000.

### Current features:
 - Basic user registration (currently, all users are considered admin)
 - Room creation, deletion, and viewing
 - Course creation, deletion, and viewing/editing
 - Student management including enrollment details in courses

### WIP/TODO:
- Automatic generation of assignments of courses
- Manual assignment of courses to rooms
- Room resource management (desktop pcs, whiteboard, etc)
- User role integrations
- Better UI
- Excel importing