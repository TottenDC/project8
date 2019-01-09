# TechDegree Unit 8 Project - Using Gulp to Build a Front End Website

## Purpose:
* Use Gulp as a task-runner to prepare a pre-fabricated website (set up to mimic under development) for deployment.
* Practice setting up builds, local servers, and live reload.
* Practice managing dev dependencies using NPM.
## Note:
* All files were provided by Treehouse. I created the gulpfile.js and all tasks.
* I found and set up all dev dependencies. 
## To Use:
Use `npm install` to download all dependencies.

Available tasks:
* All tasks output into a distribute folder (dist).
    * `gulp scripts` - concatonates and minifies JS files with a sourcemap.
    * `gulp styles` - compiles and minifies Sass files with a sourcemap.
    * `gulp images` - compresses images.
    * `gulp clean` - deletes built files.
    * `gulp build` - runs all tasks.
    * `gulp` - runs all tasks, starts a local server on port 3000, and watches the Sass files for changes.
