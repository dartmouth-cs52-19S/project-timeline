# lab4-regina-yan
Available at freefoodatnow.surge.sh


# What I did
I created a CRUD application with React-Redux that allows the user to create free food events, read/view current events, update post information, and delete completed events with the CS52 backend. 


# What worked
It took me awhile to really figure out how the containers connected to each other and how actions worked, but Short Assignment 5/6 were extremely helpful to my understanding. In the end, I adapted the "blog post" idea and created the Free Food @ Now Site. The "tags" in the API are reframed as the location/time of the event. 

### Main Screen
<img width="1217" alt="Screen Shot 2019-04-30 at 1 35 19 AM" src="https://user-images.githubusercontent.com/38498065/56968273-de148600-6b30-11e9-9525-9fd0ccdc8272.png">

### Individual Post
<img width="1213" alt="Screen Shot 2019-04-30 at 1 38 04 AM" src="https://user-images.githubusercontent.com/38498065/56968272-de148600-6b30-11e9-89a5-ab1323d7f55d.png">

### Updating Post
<img width="1226" alt="Screen Shot 2019-04-30 at 1 38 31 AM" src="https://user-images.githubusercontent.com/38498065/56968271-dd7bef80-6b30-11e9-9943-6c9486f62619.png">

### Creating New Post
<img width="500" alt="Screen Shot 2019-04-30 at 1 48 10 AM" src="https://user-images.githubusercontent.com/38498065/56968270-dd7bef80-6b30-11e9-955b-db5d1d13533d.png">

# Extra Credit
For extra credit, I turned the blog into a free food site. I also added form validation. For example, the title and tags (location/time) are required, so if the user doesn't fill them out (I used onBlur for this), then the box will turn red after they click away from that field. The submit button will not show up unless all the required fields are filled.

<img width="500" alt="Screen Shot 2019-04-30 at 1 48 00 AM" src="https://user-images.githubusercontent.com/38498065/56969043-592a6c00-6b32-11e9-8dea-052089a0bef0.png">

I also used a function to check to make sure the image URL is actually a valid URL. While that field is not required, if one does decide to fill it out, it needs to be an actual site or else we won't have a cover image!

<img width="500" alt="Screen Shot 2019-04-30 at 1 48 36 AM" src="https://user-images.githubusercontent.com/38498065/56968268-dd7bef80-6b30-11e9-8027-906c239270a9.png">





