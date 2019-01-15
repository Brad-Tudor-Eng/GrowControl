#include <TroykaDHT.h>

// These constants won't change. They're used to give names to the pins used:
//input pins
const int aLightPin           = A3;
const int aMoisturePin        = A1;
const int dhtReadPin          = 11;

//power pins
const int lightPower    = 8;
const int moisturePower = 7;
const int dhtPowerPin   = 10;

//output values
int preMappedLight     = 0;
int preMappedHumidity  = 0;
int preMappedMoisture  = 0;

//mapped output Values
int light ;
int temp  ;
int humidity ;
int moisture ;

int sensorValue = 0;

char root;

//setup the DHT Sensor
DHT dht(dhtReadPin, DHT11);

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);


  //configure the power pins
  pinMode(lightPower, OUTPUT);
  pinMode(moisturePower, OUTPUT);
  pinMode(dhtPowerPin, OUTPUT);


  dht.begin();
}

void loop() {
//turn on the sensors
digitalWrite(lightPower, HIGH);
digitalWrite(moisturePower, HIGH);
digitalWrite(dhtPowerPin, HIGH);

//wait .5 seconds before next loop
delay(500);
dht.read();
//read the light values
// preMappedLight = analogRead(aLightPin);
  light = analogRead(aLightPin);
// light = map(preMappedLight, 0, 790, 0, 1000);

//read the Moisture values
 preMappedMoisture = analogRead(aMoisturePin);
 moisture = map(preMappedMoisture, 0, 1023, 0, 255);

//read the temp and humidity values
  temp = dht.getTemperatureF();
  preMappedHumidity = dht.getHumidity();
  humidity = map(preMappedHumidity, 0, 18, 0, 100);

//compile the JSON String
String JSON_Head = "\"{";
String JSON_Tail = "}\"";
String lightSTR = "\"light\": ";
String tempSTR = "\"temp\": ";
String humiditySTR = "\"humidity\": ";
String moistureSTR = "\"moisture\": ";
String comma = ", ";

//compile the JSON data
String JSON = JSON_Head + lightSTR + light + comma + tempSTR + temp + comma + humiditySTR + humidity + comma + moistureSTR + moisture + JSON_Tail;

//send out the JSON data
Serial.println(JSON);

//turn off the sensors
digitalWrite(lightPower, LOW);
digitalWrite(moisturePower, LOW);
digitalWrite(dhtPowerPin, LOW);

//wait 2 seconds before next loop
const int seconds = 2;
const int timeToWait = seconds * 1000;
delay(timeToWait);
}
