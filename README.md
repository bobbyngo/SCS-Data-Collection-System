# SCS Data Collection System

## Overview:
A Supervised Consumption Site (SCS), also referred to as a safe injection site or supervised injection facility, is a healthcare venue designed for individuals to consume drugs, often illicit substances, under the supervision of trained personnel. Presently, data collection from drug users at these sites involves a high degree of manual input, where staff members are required to manually enter information into Excel spreadsheets or fill out paper forms by hand. Subsequently, this data is transmitted to Health Canada via email, which poses inherent risks of data loss and inconsistencies due to the unstable nature of email communication.

## Solution:
A web-based data collection and management system for supervised consumption sites in Canada that can intake supervised consumption site data and securely report it to HC, accessed via the internet using a variety of devices. Data visibility determined by role-based authentication. Single line client data will be received and securely retrieved from the database by Site Users. Mean while, Health Canada users will see aggregated data through a dashboard analyzing overall trends.

## Demo:
[DEMO](https://youtu.be/9tUlVzd37hY/)

## System Architecture
![image](https://github.com/bobbyngo/Supervised-Consumption-Site/assets/76576373/107a2579-509b-4690-a772-e7816445b3e6)

## API endpoints
All the REST APIs are available in this path [```backend/routes```](https://github.com/bobbyngo/Supervised-Consumption-Site/tree/main/backend/routes)

## Running the App
Step 1: Make sure having PostgreSQL installed in the machine. Create a database called ```postgres-supervised-consumption```</br>
Step 2: The directory ```backend/config/config.json``` has the connection information for PostgreSQL, make changed based on this config file </br>
Step 3: Open terminal in ```backend``` directory, run ```npm install``` to install all dependencies and ```npm start``` to start the system and generate the tables in the database</br>
Step 4: Populate user and question data for demoing
  - Navigate to ```backend/models/roles.model.js``` uncommented line 38 ```populateRole()``` to populate the roles. Then save the app and commented it out again
  - Repeat the step to ```backend/models/question_type.model.js``` line 27
  - Repeat the step to ```backend/utils/db_connection.js``` uncommented line 340, 341, and 342, then save the new changes then uncommented them again</br>
  
Step 5: Open terminal in ```frontend``` directory, run ```npm install``` to install all dependencies and ```npm start``` to start UI</br>
Step 6: You can now login to the system with these following credentials, after populate the data:</br>
The password for all users is ```password```</br>
![image](https://github.com/bobbyngo/Supervised-Consumption-Site/assets/76576373/28f4b8ad-3e8d-4bb7-8df4-885b16361010)


## Email configuration
When the user update the question, the email will be sent to the recipients using Node mailer. For configurating email, follow this [tutorial](https://www.youtube.com/watch?v=-nazR-yxaSk) </br>
Email credential: ```backend/utils/email_notification.js```. Notice you will need to create the .env file in the same directory for the EMAIL_PWD</br>
Email recipients and sending information: [backend/controllers/answer.controller.js](https://github.com/bobbyngo/Supervised-Consumption-Site/blob/ec00b0ee0d07b59131656cf4af3ba26561ec66b3/backend/controllers/answer.controller.js#L77)</br>

## Team contribution
| Team Member       | Work Contribution                         |
| :---:             |             :---:                         |
| Bao Bobby Ngo     | Backend, Architecture Design, Team Lead   |
| Stephnie Ughara   |PowerBI - Dashboard, Database              |
| Mark Hamad        | Frontend                                  |
