# Aperture

Inspired by Flickr, Aperture is your new space for photo-sharing. Upload, curate albums, and connect with a vibrant community. Dive in and let your creativity shine.

Checkout out [Aperture](https://aperture-6ohc.onrender.com/) and find your inspiration.

## Index

[MVP Feature List](https://github.com/JonEzana/aperture_project/wiki/Features) |
[Database Scheme](https://github.com/JonEzana/aperture_project/wiki/DB-Schema-Diagram-&-Schema) |
[User Stories](https://github.com/JonEzana/aperture_project/wiki/User-Stories) |
[Store Shape](https://github.com/JonEzana/aperture_project/wiki/Store-Shape) |

## Technologies Used

<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" /><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"/><img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" /><img src="https://img.shields.io/badge/Render-46E3B7.svg?style=for-the-badge&logo=Render&logoColor=white" /><img src="https://img.shields.io/badge/SQLAlchemy-D71F00?logo=sqlalchemy&logoColor=fff&style=for-the-badge" alt="SQLAlchemy Badge"><img src="https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white" />

## Landing Page
![landing](images/aperture.png)

## Photo Detail Page
![detail](images/aperture2.png)

## User Profile Page
![detail](images/aperture1.png)

## Getting started
1. Clone this repository:
    * `https://github.com/JonEzana/aperture_project.git`

2. Install dependencies into the Backend by running the following:
    * `pipenv install`

3. Install dependencies into the Frontend by cd into `react-app` and running the following:
    * `npm install`

4. Create a **.env** file using the **.envexample** provided

5. Set up your database with information from your .env and then run the following to create your database, migrate, and seed:
    * `pipenv run flask db migrate`
    * `pipenv run flask db upgrade`
    * `pipenv run flask seed all`


6. Start the app for backend using:
    * `pipenv run flask run`

7. Start the app for frontend by cd into `react-app` and running:
    * `npm start`

8. Now you can use the `Demo User` button to log in or Create an account

***

# Features

## Photos
Logged-in Users can
* post a Photo
* read/view other users' photos
* update their photos
* delete their photos

## Albums
Logged-in Users can
* create an Album
* read/view other users' albums
* update their albums
* delete their albums

## Comments
Logged-in Users can
* post a comment for a photo under the photo detail page
* read/view other users' comments under a photo detail page
* delete a comment post by the logged-in user

## Favorites
Logged-in Users can
* favor/unfavor a photo by clicking the star icon on home page or photo detail page
* read/review other users' favorite photos by checking the users profile `Faves` section

# Connect
* Colin Sung [GitHub](https://github.com/colinsung0714) [LinkedIn](https://www.linkedin.com/in/colin-sung-187a57103/)
* Ludia Park [GitHub](https://github.com/lypark5) [LinkedIn](https://www.linkedin.com/in/ludia-park-172496293/)
* Jon Ezana [GitHub](https://github.com/JonEzana) [LinkedIn](https://www.linkedin.com/in/jon-ezana-798a8419b/)
* Vivian Li [GitHub](https://github.com/Vivi355) [LinkedIn](https://www.linkedin.com/in/liqin-li-880646144/)
