# Grow Control
> IOT automated Green house and control system.

Grow Control is a Raspberry Pi / Arduino based fully automated greenhouse. The React frontend allows the user to monitor the data and manage the physical devices as they see fit. Historic measurements are stored in a database and live data is streamed to the user though websockets.

The project is based off the MERN Stack. RabbitMQ serves as the message broker to handle direct device communication. A GraphQL Yoga server handles the backend logic. The client side is written using the React framework. Access to a demo account which has a physical device is available upon request. All sensors are currently attached to the physical device, but the only output devices currently attached are the heater and humidifier. 

![](/readme/growctrl.JPG)

## About

A few motivating and useful examples of how your product can be used. Spice this up with code blocks and potentially more screenshots.

_For more examples and usage, please refer to the [Wiki][wiki]._

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







