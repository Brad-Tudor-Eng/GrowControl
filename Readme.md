# Grow Control
> IOT automated Green house and control system.



![](/readme/growctrl.JPG)

## About

### Physical Device
The Raspberry Pi receives analogue and digital data from several sensors attached to an arduino red board.  Based off the environmental data, the raspberry pi then adjusts the sensors to meet the users specification.  It then transmits the data via the AMPQ protocol to RabbitMQ and the API server.

### Backend
The API is based off the GraphQL Yoga package.  It hosts the Frontend and handles all of the data from the physical device.  The data is passed off to a MongoDB database and streamed to the user using GraphQL Subscriptions.

### Frontend
The React Frontend serves as the UI for the phsyical device.  A live-chart, data table and gauges show the latest data.  A simple control table is avaliable for the user to modify the phsyical device settings.  Futher menus are avaliable for standard CRUD operations on the users account and the users devices.

## Technologies

### Frontend
* React
* Redux
* React Router
* ReCharts
* SCSS
* Apollo-Client
* JSX

### Backend
* Node
* Javascript
* RabbitMQ
* GraphQL Yoga
* MongoDB (MLab)
* Express
* Babel
* Moment
* Bcrypt
* JWT

### Raspberry PI
* Node
* Javascript
* Moment
* RabbitMQ

### Arduino
* C++
* JSON







