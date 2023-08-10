# Movie Database Documentation

Welcome to the documentation for the Movie Database project. This documentation will guide you through the features and usage of the application, which provides a list of popular movies to browse, movie details, trailers, cast information, and user authentication.

## Table of Contents
1. Introduction
2. Features
3. Technologies Used
4. Getting Started
5. Usage
6. API Integration
7. Screenshots
8. Contributions
9. License

## 1. Introduction
The Movie Database is a web application built with Next.js that allows users to browse a list of popular movies, view movie details, watch trailers, explore cast information, and manage a personalized list of favorite movies. The application utilizes TheMovieDatabase API for fetching movie data and MongoDB for storing user information and favorite movies.

## 2. Features
The Movie Database offers the following features:
- Browse popular movies
- Infinity Scroll
- View movie details, including synopsis, release date, and ratings
- Watch movie trailers
- Explore cast information and their past works
- User registration and login using validator and Bcrypt
- Authentication with JWT (JSON Web Tokens)
- Add movies to the user's favorite list

## 3. Technologies Used
The following technologies are used in the Movie Database project:
- Next.js: A React framework for server-side rendering and building web applications
- TheMovieDatabase API: Provides movie data and trailers
- Supabase

## 4. Getting Started
To get started with the Movie Database project, follow these steps:
1. Clone the repository: `git clone https://github.com/Alucard2169/Movie-Database.git`
2. Install the dependencies: `npm install`
3. Set up environment variables for API keys, database connection, and JWT secret.
4. Start the development server: `npm run dev`
5. Access the application at `http://localhost:3000`.

## 5. Usage
Once the application is running, you can:
- Browse the list of popular movies on the homepage.
- Click on a movie to view its details, including synopsis, release date, and ratings.
- Watch the movie trailer.
- Explore the cast members and their past works.
- Register a new user account or log in with an existing account.
- Add movies to your favorite list.

## 6. API Integration
The Movie Database integrates with TheMovieDatabase API to fetch movie data and trailers. To set up the API integration, follow these steps:
1. Obtain an API key from TheMovieDatabase website (https://www.themoviedb.org/).
2. Set the API key as an environment variable in your development environment.



## 7. Screenshots
Here is a screenshot of the Movie Database application:

![Movie Database Screenshot](https://github.com/Alucard2169/Movie-Database/blob/main/screenshot1.png)

---

![Movie database screenshot](https://github.com/Alucard2169/Movie-Database/blob/main/screenshot2.png)

## 8. Contributions
Contributions to the Movie Database project are welcome. If you would like to contribute, please follow the guidelines outlined in the repository's CONTRIBUTING file.

## 9. License
The Movie Database project is released under the [MIT License](https://opensource.org/licenses/MIT).
