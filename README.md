## StudyNotion
** StudyNotion is a fully functional ed-tech platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to create, consume, and rate educational content, offering an interactive learning experience for students and a platform for instructors to showcase their expertise globally.

## The backend server for this project is available as a Docker image on Docker Hub. You can pull the image using the following command:
docker pull pankajs53/studynotion-backend:v3

## Current Live Version can be find on below link:
https://rad-valkyrie-749c03.netlify.app

# Front-end
    The front end of StudyNotion is designed using Figma for a clean and minimal user interface. Check out the Figma design here.

Key Pages
 ## For Students:

    Homepage: Introduction to the platform, links to course list and user details.
    Course List: List of all courses with descriptions and ratings.
    Wishlist: Courses added to the student's wishlist.
    Cart Checkout: Complete the course purchase.
    Course Content: Access course content including videos and materials.
    User Details: Student account information.
    User Edit Details: Edit account details.
## For Instructors:

    Dashboard: Overview of courses, ratings, and feedback.
    Insights: Detailed course metrics.
    Course Management: Create, update, delete courses, manage content and pricing.
    Profile Details: View and edit account details.
## For Admin (Future Scope):

    Dashboard: Overview of platform's courses, instructors, and students.
    Insights: Platform metrics including users, courses, and revenue.
    Instructor Management: Manage instructor details, courses, and ratings.
    Other Pages: User and course management.
## Technologies Used
    ReactJS: Building user interfaces
    CSS & Tailwind: Styling frameworks
    Redux: State management
    VSCode: Development environment

## Back-end Architecture
StudyNotion uses a monolithic architecture with Node.js and Express.js, and MongoDB as the primary database. This design ensures better control, security, and performance.

## Features and Functionalities
    User Authentication & Authorization: Email/password login, OTP verification, password reset.
    Course Management: CRUD operations for courses, manage content and media.
    Payment Integration: Razorpay for handling payments.
    Cloud-based Media Management: Cloudinary for storing and managing media.
    Markdown Formatting: Easier display and rendering of course content.

## Technologies Used
    Node.js: Primary framework
    MongoDB: Flexible and scalable data storage
    Express.js: Web application framework
    JWT: Secure authentication and authorization
    Bcrypt: Password hashing
    Mongoose: Object Data Modeling (ODM) library

## Data Models and Database Schema
    Student Schema: Fields for name, email, password, and course details.
    Instructor Schema: Fields for name, email, password, and course details.
    Course Schema: Fields for course name, description, instructor details, and media content.
## Summary
StudyNotion is designed to provide an immersive learning experience with robust features for students and instructors. With a well-structured front-end and back-end, it ensures security, scalability, and optimal performance. Future enhancements will further expand its capabilities.

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or a pull request.
