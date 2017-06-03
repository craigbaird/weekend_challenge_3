# To-Do List
An weekend assignment creating a do do list which lets a user create tasks, mark tasks as complete, and delete tasks.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
1. Download .zip of the directory
2. Open .sql file and paste into Postico to create table
3. npm install
4. npm start
5. type localhost:5000 into a browser

## Technologies Used
- JavaScript
- jQuery
- Node
- SQL

## Assumptions

You are using Postico
You installed Postgres with homebrew
Postgres is currently running on your computer

## Instructions I was given:

This weekend is all about showing us that you have a handle on each of the different parts of the full stack. For this weekends challenge, you are going to create a 'TO DO' application. This is the type of application that is very common to tackle when learning a new language, which makes it extremely valuable to work through for the first time, since chances are good that at some point in your career you will tackle this type of application, but in another language.

Here are the specific components for the challenge:

1. Create a front end experience that allows a user to create a task.
2. When the task is created, it should be stored inside of a database (SQL)
3. Whenever a task is created the front end should refresh to show all tasks that need to be completed.
4. Each task should have an option to 'Complete' or 'Delete'.
5. When a task is complete, its visual representation should change on the front end (for example, the background of the task container could change from gray to green, as well as the complete option 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete)
Whether or not a task is complete should also be stored in the database.
6. Deleting a task should remove it both from the Front End as well as the Database.
7. Make sure that you also show us your best styling chops.

We would recommend you spend some time thinking about how to approach this problem. Think through all the logic that will be needed prior to writing any code. Take your time, relax, remember that impostor syndrome is real, and that you are capable of knocking this out of the park!

8. Additionally, please include some way to recreate your initial database schema. This can be a .sql file with CREATE TABLE statements or you can create your schema automatically when your app loads.

## HARD MODE

In whatever fashion you would like, create an 'are you sure: yes / no' option when deleting a task. Once again, you can interrupt this however you would like.

## PRO MODE

Adjust the logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.
