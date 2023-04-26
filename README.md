# GitHub Issue Tracker App

This app allows users to track issues for a GitHub repository using the GitHub API. The app features a simple drag-and-drop interface with three columns: ToDo (all new issues), In Progress (opened issues with assignee), and Done (closed issues). The app also stores the current issue position (column and order) between search and browser sessions, so users can pick up where they left off.

## DEMO
[DEMO LINK](https://igor-kashchenko.github.io/github-kanban-board/)

## Installation
To use the app, simply clone the repository and run `npm install`. Hit the `npm run start`. No additional installation is required.

## Usage
To get started, enter the URL of a GitHub repository in the input field at the top of the page and click "Load". For example: https://github.com/facebook/react.

The app will then load all issues for the repository using the GitHub API. The issues will be displayed in the certain column based on their's state.

To move an issue to another column, simply drag and drop it to the desired column.

To change the order of issues within a column, simply drag and drop the issue to the desired position. 

The app stores the current issue position (column and order) between search and browser sessions, so users can pick up where they left off. If the user switches to another repository and then back to the original repository, they will see all changes they made for that repository.

Users can also visit the profile of the owner of the repository and visit the repository itself by clicking the links under the input field.

## Technologies Used
This app was built using React, Redux, Typescript, React-bootstrap, React-testing-library and the GitHub API.
