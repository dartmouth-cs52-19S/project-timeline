# Timeline
Timeline helps you know what you don't.

Visit http://lifetime.surge.sh/ right now to see what we have.

[Team Figma -- Mockups](https://www.figma.com/files/project/2496184/Timeline---Journey---Design-Your-Life)

Tell us what you think by filling out our [survey!](https://www.surveymonkey.com/r/WT9VZT6)


## Architecture

Code is organized into several folders - beyond the classic pages index.html, index.js, and style.css, we have folders for actions, components, containers, img, and reducers. Our containers are smart components - things that need to know about the web app state (settings, sign in, nav). Our components are th parts of the functionality that really only need to display what we tell them to (i.e. timeline element, timline detail, error banner, etc.)

Code library is based on Lab 4/5. Additionally, we have used react-particles-js for pretty effects and react-dropdown for expected high school graduation date.

## Setup

Git clone both the frontend and backend repos onto your local dev environment. Then `yarn` it! Download all your dependencies :) Yarn life.

## Relevant Links
Heroku git: https://git.heroku.com/timimeline.git

Heroku domain: https://timimeline.herokuapp.com/

Backend: https://github.com/dartmouth-cs52-19S/project-api-timeline

## Deployment
To deploy the project, change the deploy URL in both package.json 's to another surge URL. Then, hit that `yarn deploy`.


## Frontend Routes
Let's walk through the frontend routes together!! You can explore these lovelies on ```lifetime.surge.sh/```.

```lifetime.surge.sh/``` is our default landing page. It's pretty, huh? Particles.js (and Regina's design skills). Learn a little more about Timeline, and sign up NOW!

Clicking the `sign up` button in the nav bar takes you to ```http://lifetime.surge.sh/signup```. Fill out the required forms and yay, you're in!

Or, you could be a b0$$ and already have an account. Hurrah! Click `sign in` from the landing page. You're on ```http://lifetime.surge.sh/signin```. Ah! More particles!

Once you're signed in or signed up, you are taken to the *master* timeline, ```lifetime.surge.sh/explore/start```. Explore all your options. If you click certain events, you may see the url change to something like ```http://lifetime.surge.sh/explore/5ce1dfadf41c760034ffe52d```. What is that?? NBD, the long number thing is just the `id` of whatever Timeline node you are currently viewing. Don't worry about it :).

Once you want to save something to your own personal timeline(s), click the `save` button and.. Boom! You're at ```lifetime.surge.sh/save```. Try planning out some alternate timeline(s)!

If you want to change your settings, go to ```lifetime.surge.sh/settings```. Do your thing.

If you are an admin, you get 2 other routes as well: ```lifetime.surge.sh/newTime``` and ```//lifetime.surge.sh/updateTime```. These guys are protected (i.e. we built in functionality so that only certain users who may or may not be us) as they allow you to create a new timeline element (i.e. Work) and update them, respectively.

## Authors

Abhimanyu Kapur '21

Katie Goldstein '20

Regina Yan '19

Sheppard Somers '19

Zoe Yu '19


![Team Photo](src/img/teamTimeline.jpeg)

## Sources

We started this project with Regina's Lab 4 (front end) and Abhi's Lab 5 (server).

Certain functions in the code have comments with more specific sources.

## Acknowledgments

Our lovely TA's, especially Jasmine!

Timmy Tim Tim (Tim)
