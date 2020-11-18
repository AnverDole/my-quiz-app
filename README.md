# MyQuiz App Documentation

##### This application builds for host and manage online exams.
 In this system there are 2 types of users. 
 1. Instructors
 2. Students

**instructors** are creating the exams and **students** can take exams that created by instructors. this app allow the instructors to host there exams  and students can take those exams online anytime anywhere and also students can view there attempt status(marks for mcqs, wich mcqs are wrong, wich mcqs are correct.. etc) after finishing the attempt.

### Features

- Instructors can create, edit, update exams.
- Students can view all available exams.
- Students can take exam.
- Students can view the summary after finishing the exam. 

### Login credentials
------------

#### Instructor account
- Username(email) : student1@gmail.com
- Password : 1234567890

#### Student Account
- Username(email) : student1@gmail.com
- Password : 1234567890

### Instructor

------------


##### First you must login with instructor account.

#### Create exam

##### First goto the My Exams page by clicking the my exams button appear in the navigation bar.
[![My Exams](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor%20account/my%20exams%20page.png?raw=true "My Exams")](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor%20account/my%20exams%20page.png?raw=true  "My Exams")

##### Click new exam button.

##### Fill the title, subject, duration fields.
[![Exam info section](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor%20account/new%20exam%20info.png?raw=true "Exam info section")](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor%20account/new%20exam%20info.png?raw=true "Exam info section")
##### Add mcq questions, answers and select the correct answer on the dropdown.
[![Mcq Question](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor%20account/question.png?raw=true "Mcq Question")](https://github.com/AnverDole/my-quiz-app "Mcq Question")

##### Reapear above 3 steps many times.

##### Click submit button to submit the new exam.
------------

#### Edit Exam

##### First goto the My Exams page by clicking the my exams button appear in the navigation bar.
[![My Exams](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor%20account/my%20exams%20page.png?raw=true "My Exams")](https://github.com/AnverDole/my-quiz-app "My Exams")

##### Click view button in any exams that you wants to edit.

##### Click edit exam button.

[![View Exam](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor%20account/edit%20exam%20button.png?raw=true "View Exam")](https://github.com/AnverDole/my-quiz-app "View Exam")

##### After finishing the edit exam click update button for save changes.


[![Bottom section of edit exam](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor%20account/update%20exam%20button.png?raw=true "Bottom section of edit exam")](https://github.com/AnverDole/my-quiz-app "Bottom section of edit exam")

#### View Exam

##### First goto the My Exams page by clicking the my exams button appear in the navigation bar.

##### Click view button in any exams that you wants to view.
[![My Exams](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor%20account/view%20exam%20button.png?raw=true "My Exams")](https://github.com/AnverDole/my-quiz-app "My Exams")

#### Delete Exam

##### First goto the My Exams page by clicking the my exams button appear in the navigation bar.

##### Click view button in any exams that you wants to delete.

##### Click delete button.
[![View Exam](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor%20account/delete%20exam.png?raw=true "View Exam")](https://github.com/AnverDole/my-quiz-app "View Exam")

### Student

------------


##### First you must login with student account.

#### View all available exams

##### Goto the All exams page by clicking All exams button appear in the navigation bar.

[![All Exams](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor-account/all%20exams.png?raw=true "All Exams")](https://github.com/AnverDole/my-quiz-app "All Exams")

#### Take Exam

##### Goto the All exams page by clicking All exams button appear in the navigation bar.
[![All Exams](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor-account/all%20exams.png?raw=true "All Exams")](https://github.com/AnverDole/my-quiz-app "All Exams")


##### Click Take exam button in any exam that you wants to take.

##### Click take exam appear on the next page.
[![Take Exam](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor-account/take%20exam.png?raw=true "Take Exam")](https://github.com/AnverDole/my-quiz-app "Take Exam")

##### You can goto the next question and previous question by clicking next, previous buttons.

##### You can leave the exam any time and continue anytime with clicking the cancel button appear on the bottom.

##### For submit the exam you need to go to the last question and click finish button.
[![Exam](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor-account/final%20question.png?raw=true "Exam")](https://github.com/AnverDole/my-quiz-app "Exam")

#### View finished exam summary

##### Goto the My exams page by clicking My exams button appear in the navigation bar.

[![My Exams](https://github.com/AnverDole/my-quiz-app/blob/main/doc-assets/instructor-account/my%20exams.png?raw=true "My Exams")](https://github.com/AnverDole/my-quiz-app "My Exams")
##### Click summary button in any exam that you wants to view summary.

### Deploy to the developer machine

------------


##### First you need to install git, npm and vue cli on your machine.
- Create new folder for project root directory.
- Open the cmd(console) and type cd, and then past the previously created project directory path.

	`$ cd ./project-root-directory `

- Type git clone, and then paste the URL of the repository.

	`$ git clone https://github.com/AnverDole/my-quiz-app `

- Type npm run dev for start serving the app.

	 `$ npm run dev`
