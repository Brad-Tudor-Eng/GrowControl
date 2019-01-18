#include <ArduinoJson.h>
#include <TroykaDHT.h>

StaticJsonBuffer<200> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();

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


root["light"] = light;
root["temp"] = temp;
root["humidity"] = humidity;
root["moisture"] = moisture;

root.printTo(Serial);
Serial.println();

//turn off the sensors
digitalWrite(lightPower, LOW);
digitalWrite(moisturePower, LOW);
digitalWrite(dhtPowerPin, LOW);

//wait 2 seconds before next loop
delay(60000);
}
