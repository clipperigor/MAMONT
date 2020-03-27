#include <Mamont.h>

#include <ESP8266WiFi.h>
#include <DallasTemperature.h>




const char* hn = "Mamont.Test"; //имя хоста платы
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);


WiFiServer server(80);  //порт сервера

void setup() {
  //Настройки платы
   pinsSetup();
  
  Serial.begin(115200);
  Serial.print("Connecting to ");
  delay(10);
  Serial.println(ssid);


  WiFi.hostname(hn);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  IPAddress gateway(192, 168, 74, 1); //Регистрация в Сети для приема команд
  IPAddress subnet(255, 255, 255, 0); // 

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  //Ожидание команды клиента
  server.begin();
  Serial.println("Server started");

}

void loop() {
 
  unsigned long currentMillis = millis();
//Serial.println(WiFi.localIP());

  if ( currentMillis - previousMillis > watchdog ) {
    previousMillis = currentMillis;
    WiFiClient client;

    if (!client.connect(host, port)) {
      Serial.println("connection failed");
      return;
    }
    String url = "/mamont/sensors?body="+makeJsonBody();
    //Serial.println(url);

    // Отправить запрос на сервер
    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" +
                 "Connection: close\r\n\r\n");

    unsigned long timeout = millis();
    while (client.available() == 0) {
      if (millis() - timeout > 2000) {
        Serial.println(">>> Client Timeout !");
        client.stop();
        return;
      }
    }

    // Read all the lines of the reply from server and print them to Serial
    while (client.available()) {
      String line = client.readStringUntil('\r');
    //  Serial.print(line);
    }
  }
  //////////////////////////////////////////////////////////////
  WiFiClient client = server.available();
 if (!client) {
    Serial.println("Waiting client request! ");
    delay(200);
    return;
  }else{


  // Wait until the client sends some data
  //Serial.println("new client");
  while (!client.available()) {
    delay(10);
  }

  // Read the first line of the request
  String request = client.readStringUntil('\r');
  Serial.println(request);
  client.flush();

  // Return the response
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println("Content-Length: 10");
  client.println();//  Не трогать эту строчку - конец заголовка ответа
  
  //Выполнение команды , полученной от клиентского запроса
  execCommand(request, client);


  Serial.println("Client disconnected");
  //Serial.println("");



  }

}

void execCommand(String request, WiFiClient client) {
 /////////////////////////////////////////
   if (request.indexOf("/RESET;") != -1) {
      soft_reset();
      return ;
    }

  /////////////////////////////////////////

/////////////////////////////////////////
 
  if (request.indexOf("/D6=ON;") != -1) {
      digitalWrite(D6, HIGH);
     
      client.print(digitalRead(D6));
    return ;
  }
  if (request.indexOf("/D6=OFF;") != -1) {
      digitalWrite(D6, LOW);
     
      client.print(digitalRead(D6));
    return ;
  }
  if (request.indexOf("/D5=ON;") != -1) {
      digitalWrite(D5, HIGH);
    
      client.print(digitalRead(D5));
    return ;
  }
  if (request.indexOf("/D5=OFF;") != -1) {
      digitalWrite(D5, LOW);
   
      client.print(digitalRead(D5));
    return ;
  }
  
  ///////////////////////////////////////////////
   if (request.indexOf("/GETD5;") != -1) {
    client.println(digitalRead(D5));
    return;
  }
  if (request.indexOf("/GETD6;") != -1) {
    client.println(digitalRead(D6));
    return;
  }

}

String makeJsonBody(){
  //Преобразовать ip к строке
  IPAddress ip=WiFi.localIP();
   String s="";
  for (int i=0; i<4; i++){
    s += i  ? "." + String(ip[i]) : String(ip[i]);
  }
 
   String url = "{\"hostname\":\"Управление котлом\",\"values\":[";
    sensors.requestTemperatures();
    
    url+="{\"title\":\"Котел (управление)\",\"value\":\""+String((digitalRead(D6)==1)?"Работает":"Отключен")+"\",\"cmd\": \"D6=ON; D6=OFF\"},";
   url += "{\"title\":\"Центральный насос (управление)\",\"value\":\"" + String((digitalRead(D5) == 1) ? "Работает" : "Отключен") + "\",\"cmd\": \"D5=ON; D5=OFF\"},";
  url += "{\"title\":\"Состояние насоса\",\"value\":\"" + String((digitalRead(D5) == 1) ? "Работает" : "Отключен") + "\",\"cmd\": \"GETD5\"},";
    url+="{\"title\":\"Состояние котла\",\"value\":\""+String((digitalRead(D6)==1)?"Работает":"Отключен")+"\",\"cmd\": \"GETD6\"}";
 
////Завершение подготовки запроса 
  
    url+="]}";
     Serial.println(url);
    return urlencode(url);
  }
