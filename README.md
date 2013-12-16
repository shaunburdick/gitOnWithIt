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

- **/meeting**
  - *GET* Returns a list of active meetings
  - *POST* Creates a new meeting

- **/meeting/{name}**
  - *GET* Returns meta-data about a meeting
  - *POST* Modifies a meeting
  - *DELETE* Deletes a meeting

- **/meeting/{name}/join**
  - *POST* Join the meeting

- **/meeting/{name}/leave**
  - *POST* Leave a meeting

- **/meeting/{name}/members**
  - *GET* Returns a list of memebers
  - *POST* Add a member

- **/meeting/{name}/members/{uid}**
  - *GET* Returns meta-data about member
  - *POST* Modifies meta-data about member
  - *DELETE* Deletes a member

- **/meeting/{name}/start**
  - *POST* Start the meeting

- **/meeting/{name}/next**
  - *POST* Move to next random user

- **/meeting/{name}/end**
  - *POST* End the meeting
