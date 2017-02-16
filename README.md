# Udacity Project: Neighborhood Map

Neighborhood Map is the sixth project built during completion of the [Udacity's](https://www.udacity.com/) Nanodegree program [Full Stack Web Developer](https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004). To learn how it was built, check [Intro to AJAX](https://www.udacity.com/courses/intro-to-ajax--ud110) and [JavaScript Design Patterns](https://www.udacity.com/courses/javascript-design-patterns--ud989).

## Review Guide

The project was developed with [Yeoman](https://github.com/yeoman) and [generator-ko](https://github.com/SteveSanderson/generator-ko). The production version is hosted [here](https://mradenovic.github.io/neighborhood-map/) and the production code is contained within [dist](https://github.com/mradenovic/neighborhood-map/tree/master/dist) folder. Source code is contained within [src](https://github.com/mradenovic/neighborhood-map/tree/master/src) folder.

### Tested environments

#### Linux

Linux ubuntu 4.4.0-62-generic #83-Ubuntu SMP Wed Jan 18 14:10:15 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux  
node v4.2.6  
npm 3.5.2  
bower 1.8.0  
gulp 3.9.1  

#### OS X

Darwin OS X 13.4.0 Darwin Kernel Version 13.4.0: Mon Jan 11 18:17:34 PST 2016; root:xnu-2422.115.15~1/RELEASE_X86_64 x86_64  
node v6.9.5  
npm 3.10.10  
bower 1.8.0  
gulp 3.9.1  


## Develop

### Prerequisites

[Node.js 4.2.6](https://nodejs.org/download/release/v4.2.6/) or [Node.js 6.9.5](https://nodejs.org/download/release/v6.9.5/)    
[bower](https://bower.io/)  
[gulp](http://gulpjs.com/)

### Prepare development environment
- Clone the repo: `git clone https://github.com/mradenovic/neighborhood-map.git`
- cd into newly created directory: `cd neighborhood-map`
- Install npm dependencies: `npm install`
- Install bower dependencies: `bower install`

### Available commands
- Run `gulp test` to run tests once
- Run `gulp tdd` to run tests and watch for changes
- Run `gulp` to build for production
- Run `gulp serve:src` to preview the source
- Run `gulp serve:dist` to preview the production

## Attributions
All the places and data about places are provided by [Yelp API](https://www.yelp.com/developers). Code used to access Yelp API was based on example found [here](https://gist.github.com/mnemonicflow/1b90ef0d294c692d24458b8378054c81).

Map is provided by
[Google Maps JavaScript APi](https://developers.google.com/maps/documentation/javascript/), and is used with the help of [google-maps](https://github.com/Carrooi/Node-GoogleMaps) module.

Sidebar is designed with [bootstrap-sidebar](http://github.com/asyraf9/bootstrap-sidebar).
