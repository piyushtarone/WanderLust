In this project we have implemented new things like : 

1 EJS-Mate: 
{
    This is use to create a boilerplate code which can be used in multiple files in the project or we can say that multiple pages of the website.
    Its very simple to use and syntax

    "npm i ejs-mate":
    This is the command to install the package 

    <% layout('boilerplate') -%>
    this Cammand is used to apply the boilerplate code to every file 

    //While this line is inserted in the file their is no need of other lines except  <body> 

    Const ejsmate = require ("ejs-mate)
    app.engine(ejs,ejs-mate)

}

2 Card:
{
    The card tamplet was taken from the bootstrap quiclstart
    Then arranged the card in proper manner 

    OverLay :{
        This feature is used to add some text on the image and with the help of opacity we can make a animation of hover over the image 
    }
}

3 Error Handling:
 a.WrapAsync function:{
    This is a .js file which calls a function which calls another function for catching the error 
    This function is used in every async function as we have to show error from the database
 }
 
 b.Custom ExpressError:{
    This is a custom error which is used for a universal error i.e if the request does not mathch with the any of the defined route 
    then the request will got to the universal error which will handle it properly.

    syntax&example{
        app.all("*",(req,res,next)=>{  //"*" used for universal error means when the request does not match with any response then it goes to universal error handler
        next(new Expresserror(404,"Page not found"))
});
    }
 }
 
4 Review Machanism :
 a. Hear we will establish one to many relations 
   {
    one user = Many reviews on multiple locations 
   }
 b. First define new schema for the review {Comment , Rating , CreatedAT("for date")}
 c. Add the review form in the show.ejs {Below the details of the location}
 d. Submitting the review:
 {
    [
        1. Create a route for submitting the review: {POST Request}
         a: We cannot create a saparate route "/review" for the review because we are not working with the reviws saperately .
         b: We will establish a connection with the review "One-to-many"
         c: Route will be "/listings/:id/reviews"

        2. Deleting the reviews form the database as well as from the listing :
         a: This is done with the help of $pull query
         b: This query pulls the reviews related to the listing and perfom the delete operation when the listing is deleted
         c: Its like a middleware which executes as soon as the delete operation is performed on the listings.
    ]
 }
 
5. Express Router:
 {
    It is the method of structuring your code and make it more readable for the user . It helps to maintain your primary app.js file 
    in proper structure and not get bloated .
 }
 Method:
  a. First we can separate the models from the main file , i.e for example you have 2 models in the program that is "user" and "post".
  b. Then you can add the models saparately in the two sub folders.
  c. Then by adding just a single line in the main file you can access all the routes of that folder 
  d. Line of code :app.use("/users",user);
  e. This line has "/users" which is the comman part of the routes of the user model
  f. It helps to find the exact route easily
  g. By this you can maintain and keep your main file more clean and readable.

Process:
 a. We have created a new folder "routes"
 b. Then we added all the listing methods "create,update,delete,show"
 c. And added all their requirements\
 d. Lastly accessed all of them by adding app.use("/listings",listing) //in the app.js
 e. The same we did for the "reviews" to aquire them in the app.js 
 f. Here we used special function i.e "mergeperams" //{This merged the parent parameters with the child function in the reviews.js for accessign the :id}

6. Cookies
{
    HTTP cookies are small blocks od data created by the web server while user is browsing the website and placed on the user's computer 
    or other device by the user's web browser .

    3 Uses : 1. Session Management {Store temporary data like different imtems added to cart from different pages of the website and not stored in the database until order placed}
             2. Personilization
             3. Tracking {Track users activity}
    
    * Express Session :{
        These are the session assigned by the server which stores some temporaary data in the form of cookies and these cokies can we accessed 
        in diffrent different tabs as it assignes a special Secret Key to the user .
      
      -Two Methods{expires and maxAge}=> This sets an expery date for the cokie to get deleted
    }
} 
7. Connect-Flash {
    The flash is a special area of the session used to store message. Messages are written to the flash and cleared after being displayed to the user.
}
8. Authentication and Authorization{
    *Authentication is the process to indentify who the person is .
    *Authorization is the process to verify what specific application, files,and data user has access to  
}
9. Authorization{
    For this we have to take user for all the listings .
    To do this we have to add a user data to every listing.
    => We added a owner property in the listing Schema

    Now the problem is adding the owner property to every single listing object is very unprofessional so we will use a different method:{
        => We will use our "index.js" from "init" and we will add a map function before the insertion of listing data .
           We do so by adding a map function which will take the original object of listing and add a owner ID with that .
           ("Owner id we will define a comman id for all the yearlier listing from the data base")
    }
}

10. In the part of Authentication and Authorization we have lerned:
-Setting up the Routes {
    Adding the middleware inside the routes
}
-Setting up the models {
    Defining new schema in the model folder and then requiring them when needed
}
-Defining new schemas and updating existing schemas {
    Adding new field of Author in the review schema
    Adding new field for the owner of the Listing
}
-Validating Routes
-Creating and Adding MiddleWares {
    isLoggedin
    isReviewAuthor
    express-session
}
-Flash Messages{
    The messages showed up at the time of any actions like creating or deleting the review/Listing.
}
-Sessions for storing the temporary memory {
    it helps us to store the temporary data like sate , owner , author, flash message , etc
    we used the express-session to manage sessions in the node.js/Express.app
}

These were the basic concepts involve in the Authenticcation and Authorization part of this project

11. MVC {Model, View, Controller}
 -Model=> It includes the DataBase and their schemas 
 -Views=> It includies the frontend part of the website
 -Controller=> It includes the backend part of the website as it controlles different different Routes 
 For Eg: The index route from the routes folder the async function is removed and pasted in the controller file i.e listing.js
         Then the async function is assigned to a new variable and that variable is used everywhere


12. Start Rating Animation
 we took the referance from the github library: starability
 From here we directly took the code for the animation and then placed in our code , added a new rating.css file and uploaded the code their also.

13. Image Upload Feature
 Here we have two majour problems we have to solve i.e :
  1. The current form is not ale to send the file to the backend DataBase.
  2. Their is always a size limit for the file to be uploaded.

 To solve this issue we will perform these simple steps:
  1. Make the form capable of sending the files to backend.
  2. Make use of 3rd party services for storing the file which will generate a URL for that file.
  3. Then we will save this URL into our Backend mongoDB Database.

 1 Form Manupulation:
  insert "enctype=multipart/form-data" this helps in accepting the files.
  Then change the type of input to "file"
 2. Now to send the proper file in formated way to the backend we make use of npm library "multer"
   "npm i multer"
   Then we will add the code for accepting the file in the index route
3. Cloud Setup
   Create account on Cloudinary and get the API key
   Setup:
    Create .env file and upload {CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET_KEY}
    Install "dotenv" to access the credentials from .env file {npm i dotenv}
    Install cloudanary {npm i cloudinary}
    Install multer-storage-cloudinary {npm i multer-storage-cloudinary}