# Timeline
Timeline helps you know what you don't.

Visit http://lifetime.surge.sh/ right now to see what we have.

## Important
If you want to update a node or create a new one, please sign in as an `admin` (ask us for the username and pwd). Secure, we know. Then refresh the page. 
If you sign out after, refresh as well to see the non-admin nav bar.

PLEASE DO NOT USE DELETE AS AN ADMIN. RIGHT NOW IT DELETES EVERYTHING. WE BEG YOU. NO.

[Team Figma -- Mockups](https://www.figma.com/files/project/2496184/Timeline---Journey---Design-Your-Life)

## Architecture

Code is organized into several folders - beyond the classic pages index.html, index.js, and style.css, we have folders for actions, components, containers, img, and reducers. Our containers are smart components - things that need to know about the web app state (settings, sign in, nav). Our components are th parts of the functionality that really only need to display what we tell them to (i.e. timeline element, timline detail, error banner, etc.)

Code library is based on Lab 4/5. Additionally, we have used react-particles-js.

## Setup

Git clone both the frontend and backend repos onto your local dev environment. Then`yarn` it! Download all your dependencies :) Yarn life.

## Deployment
Heroku git: https://git.heroku.com/timimeline.git

Heroku domain: https://timimeline.herokuapp.com/

Backend: https://github.com/dartmouth-cs52-19S/project-api-timeline

To deploy the project, change the deploy URL in both package.json 's to another surge URL. Then, hit that `yarn deploy`.


## Frontend Routes
Let's walk through the frontend routes together!! These all come from `actions/index.js`.

```axios.get(`${ROOT_URL}/explore`)```
- fetches timeline data

```axios.get(`${ROOT_URL}/timeline/5ce5bf1be5057b0034c8a87c`)```
- fetches the landing page timeline (had to make under root, hence the long id)

```axios.get(`${ROOT_URL}/timeline/${id}`)```
- selects a certain timeline node

 ```axios.post(`${ROOT_URL}/personal`, timelineID)```
-saves a timeline object to someone’s personal timeline

```axios.post(`${ROOT_URL}/timeline`, fields)```
- makes a timeline object with specific fields (id, title, selected/not, time [to start it], content [title, image, description])

```axios.post(`${ROOT_URL}/timeline/${fields.id.toString()}`, fields)```
- updates a timeline obj with the same fields

```axios.delete(`${ROOT_URL}/timeline/${timeline._id}`)```
- currently deletes all timeline data lol

```axios.get(`${ROOT_URL}/timeline/${id}`)```
- gets a selected timelind

 axios.get(`${ROOT_URL}/personal${API_KEY}`,
 - gets user information (email, username, HS graduation date)

```axios.post(`${ROOT_URL}/username${API_KEY}`, username)```
- checks if username has been taken

 ```axios.post(`${ROOT_URL}/signin`, user)```
- signs someone in and authorizes them

```axios.post(`${ROOT_URL}/signup`, user)```
- signs someone up, authorizes them

```axios.post(`${ROOT_URL}/personal`, timeline)``
- save a timeline to a user's profile through the personal tab

```axios.put(`${ROOT_URL}/personal`, fields)```
- update certain user information

## Authors

Abhimanyu Kapur '21

Katie Goldstein '20

Regina Yan '19

Sheppard Somers '19

Zoe Yu '19


![Team Photo](src/img/teamTimeline.jpeg)

## Sources

We started this project with Regina's Lab 4 (front end) and Abhi's Lab 5 (server).

## Acknowledgments

Our lovely TA's, especially Jasmine!

Timmy Tim Tim (Tim)
