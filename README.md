Git On With It!!
================

**Git On With It!!**(GOWI) is a small meeting helper app written in node.js.

The app allows a user to create a meeting and share a unique URL to others 
so that they may join. When creating a room, you specify a name, how long each 
user can speak, and an optional password for privacy.

When a user joins, they can create one or more *members* that are present in 
the meeting(one user, conference room, etc).

When the owner starts the meeting, it will randomly select a member and start 
a countdown.  The member will have up to the specified length to speak and can 
then pass to the next random member.

Once the all members have gone, the meeting is considered finish.

This app is inspired by Agile SCRUM meetings.  The meetings are designed to be 
short and sweet.  This app should keep them that way.

Installation
------------
To install and use:

1. Make sure you have node.js installed
2. Clone this repository into a local folder
  - `git clone https://github.com/shaunburdick/gitOnWithIt.git <folder>`
3. Change directories into the cloned folder
4. Install the dependencies
  - `npm install`
5. Run the application
  - `node app`

API End Points
--------------

See API.raml
