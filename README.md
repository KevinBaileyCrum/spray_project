# Spray Project

![Alt Text](https://media.giphy.com/media/cPm1n4rcPApuzZOzQg/giphy.gif)

## About
Mountain Project is great and one of my favorite aspects of the site that Ive been playing with this past year involves ticking climbs.  One thing that is missing is a news feed for when your friends tick climbs.  Spray Project lets you add friends and see what they have been ticking.  

I'm surprised something like this does not exist within Mountain Project and I would love for them to add a feature such as this.  There is more funcionality that could be added to augment the spray experience such as a method of congradulating friends on their ticks.  Unfortunatly that lies outside the scope of Mountain Project's API and would require hackey screen scraping and injecting users' passwords to go headless and send a message.

## Note of Deprecation 
At the end of 2020 Mountain Project was purchased by OnX and the public api was shut down.  This application, like many others reliant on public apis is now out of order.  To all the users of Spray Project good luck with spraying using other means, perhaps I'll over hear you, the old fassioned way, in the meadow. 

## Technologies Used:
* Express.js
* React.js
* Json Web Token
* MongoDB and Mongoose
* Ionic Framework

I feel like in hindsight the whole thing could have been built using soley React.js or Express.js as they are both sophisticated enough to meet the project's requirements however I've always wanted to work with both Express and React working together and I figured now is the chance.


### Express Backend
fill in your own API key for Mountain Project endpoints used in `api/routes/ticks.js`
provide own secret for signing Json Web Token in the auth middleware
cd ./api run `npm run start-dev`
runs port 9000
### MongoDB
install local instance of mongoDB by following
`https://github.com/mongodb/homebrew-brew`.
### React Frontend
Built with Ionic5
cd ./clinet run `npm start`
runs port 3000

#### Submit a PR
I am open to any suggestions or pull requests

#### Deployment
I hope to deploy this project soon once it is up and running but feel free to clone and check it out as is. 

#### Spray Project does not use semi-colons.  If a language allows for you not to use them and you do not have good reason to use them, why use them?  
