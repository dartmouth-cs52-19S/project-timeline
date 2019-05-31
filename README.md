# Timeline

Have you ever felt overwhelmed or undereducated about all the opportunities available to you in life? Us too. That's why we built Timeline, a website that helps you know what you don't.

Visit http://lifetime.surge.sh/ to see it all in action.

## About 

Timeline allows you to visualize big life possibilities - think college, trade school, the army, etc - and create self-curated timelines of your future, exposing you and others to options in life you wouldn't have otherwise known about.

The main goal of Timeline is exposure rather than planning - once you know about an opportunity, there are plenty of resources to figure out how to get there. Timeline aims to overcome the problem of the "unknown unknowns," and open your mind to the many possibilities in life.

## Designs and Such 
[Where we began](https://docs.google.com/presentation/d/1uVv9RZOnCL7DT-d8cwIa50YsybgIbgEStRLKBG0Cfwg/edit#slide=id.g56fe0cc43e_1_0): the pitch that launched 2.5 weeks of code

[Team Figma - Hi-Fi Mockups](https://www.figma.com/files/project/2496184/Timeline---Journey---Design-Your-Life)

Tell us what you think by filling out our [survey!](https://www.surveymonkey.com/r/WT9VZT6)

## Architecture

Code is organized into several folders - beyond the classic pages index.html, index.js, and style.css, we have folders for actions, components, containers, img, and reducers. Our containers are smart components - things that need to know about the web app state (settings, sign in, nav). Our components are the parts of the functionality that really only need to display what we tell them to (i.e. timeline element, timline detail, error banner, etc.)

Our code library is based on Lab 4/5. Additionally, we have used react-particles-js for pretty effects and react-dropdown for expected high school graduation date.

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

Beyond all this cool stuff, we've also added other functionality for admins (timeline content creaters/modifiers)!!!

If you are an admin, you get 2 more routes (and corresponding nav bar icons): ```lifetime.surge.sh/newTime``` and ```//lifetime.surge.sh/updateTime```. These guys are protected (i.e. we built in functionality so that only certain users who may or may not be us can use it) as they allow you to create a new timeline element (i.e. Work) and update them, respectively.

## Brief Summary / Debrief of this Term

This was a very fun idea to create and implement - many thanks to Regina and Shep for pitching! Our team thororughly enjoyed working together to build something from the ground up!!! During our wrap-up discussion, team members mentioned:
- they felt empowered to design and create websites (in both personal/professional contexts)
- it was cool to go onto websites, poke around their elements, and actually kinda understand what they were doing "back there"
- they were glad to have taken this class

This could have been a better experience if the whole team had been together during the entire 2.5 weeks (trip to the sea, a wedding, and performing at the MET complicated this a bit, but we managed to work around/through it). I think most of us wished we had more time to devote to it - there is always more to do! Dividing up the work by features (vs strict frontend/backend "roles") would have been a good idea. Also, it would have been nice to have designated meeting spots - during finals week especially, there weren't many places that could accomodate 5 coders. Reserved hours in Dali for CS52 perhaps?

## Preliminary User Testing & Future Direction

During Technigala, we asked users to provide us with survey feedback in regards to their overall experience, ease of use, and requested functionality with Timeline.

Overall, we drew several conclusions from the data that will help to shape Timeline in the future:
1. collected 7 responses - good engagment not great
    a. possible reason why - most who came by just watched us demo on admin (we didn't force people to sign up)
2. average rating was 4.14/5 stars, 5/7 users rated it as a 5
3. ease of use 7.5/10 - could have been better. Focus on #4 & #5 in the future!
4. to make it easier to use
    a. complete functionality (centered lines, timing working)
    b. more interactivity esp with timelines
    c. more onboarding/a user manual
5. future features - crowdsourced timeline (easy - admin for superusers! have to work through logic to determine who is a “superuser”), email verification and notifications, fb login

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

Everyone who took our survey - you rock

Timmy Tim Tim (Tim)
