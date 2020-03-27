#include "Arduino.h"


const char* ssid = "MamontNet"; //Доступ к локальной сети
const char* password = "Miron4ikIgorJava";
// const char* ssid = "clippernet"; //Доступ к локальной сети
// const char* password = "0734650600";
const char* host = "192.168.74.100";  // IP сервера, к которому будет сделан запрос
const int   port = 8888;            //  порт для запроса к серверу
const int   watchdog = 5000;        // Время между http запросами - для отправки сообщений серверу
unsigned long previousMillis = millis();
#define ONE_WIRE_BUS 4 //D2 --pin температурных датчиков
#define DHTPIN D4
#define DHTTYPE DHT22



String urldecode(String str);
String urlencode(String str);
unsigned char h2int(char c);
void soft_reset();
void pinsSetup();
