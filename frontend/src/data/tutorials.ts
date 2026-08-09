export interface TutorialData {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  costEstimate: string;
  category: string;
  author: string;
  tags: string[];
  coverImage: string;
  partsList: string[];
  steps: { title: string; content: string; code?: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const tutorials: TutorialData[] = [
  {
    id: 1,
    title: "Build a Smart Doorbell with Raspberry Pi",
    slug: "raspberry-pi-smart-doorbell",
    description: "Create a WiFi-connected doorbell with live video streaming, motion detection, and mobile notifications using Raspberry Pi.",
    content: "Build a complete smart doorbell system using a Raspberry Pi Zero 2 W, a PiCamera Module v2, and a PIR motion sensor. This project combines hardware wiring with Python programming to create a WiFi-connected doorbell that streams live video, detects motion, and sends push notifications to your phone. You will learn how to set up Raspberry Pi OS, install OpenCV and Flask, wire sensors to GPIO pins, and build a web interface for remote viewing. The final system includes a physical button for visitors, motion-activated recording, and mobile alerts with captured images, giving you a budget-friendly alternative to commercial video doorbells.",
    difficulty: "Intermediate",
    timeEstimate: "4-6 hours",
    costEstimate: "$45-65",
    category: "raspberry-pi",
    author: "Alex Chen",
    tags: ["raspberry-pi", "security", "camera", "iot"],
    coverImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800",
    partsList: [
      "Raspberry Pi Zero 2 W",
      "PiCamera Module v2",
      "PIR Motion Sensor",
      "Push Button",
      "Resistor 330Ω",
      "Breadboard and Jumper Wires",
      "MicroSD Card (16GB+)",
      "Power Supply (5V 2.5A)"
    ],
    steps: [
      { title: "Set Up Raspberry Pi OS", content: "Download Raspberry Pi OS Lite from the official website and flash it to your MicroSD card using Raspberry Pi Imager. Insert the card into your Pi and connect the power supply, monitor, and keyboard. Run sudo apt update && sudo apt upgrade to ensure all packages are current before proceeding.", code: "sudo apt update && sudo apt upgrade" },
      { title: "Install Required Packages", content: "Install the essential Python libraries needed for the doorbell project using pip. You will need Flask for the web server, OpenCV for camera access and motion detection, and gpiozero for GPIO control. Run the following command to install all dependencies in one go.", code: "pip3 install flask opencv-python gpiozero" },
      { title: "Wire the Hardware", content: "Connect the PIR motion sensor to GPIO pin 17 on the Raspberry Pi, with its VCC pin going to 3.3V and GND to ground. Wire the push button to GPIO pin 27 with a 330Ω pull-down resistor to ensure clean signal transitions. Mount the PiCamera Module v2 to the Pi's CSI port by lifting the camera connector tab and seating the ribbon cable firmly." },
      { title: "Write the Doorbell Script", content: "Create a new Python file called doorbell.py that imports Flask, OpenCV, and gpiozero. Set up a basic Flask web server that serves a live video stream endpoint and listens for button press events. Define callbacks for motion detection that trigger the camera to capture a snapshot when movement is detected near the door." },
      { title: "Configure Motion Detection", content: "Initialize the OpenCV video capture and set up a background subtractor for motion detection. Define a region of interest that covers the door area and configure sensitivity thresholds to avoid false triggers from passing cars or animals. When motion is detected, save a timestamped image and trigger the notification system." },
      { title: "Set Up Mobile Notifications", content: "Create a free Pushbullet or IFTTT account and generate an API key for sending notifications. Integrate the API calls into your doorbell script so that a push notification with the captured image is sent to your phone whenever the button is pressed or motion is detected. Test the notification flow by pressing the button and verifying the alert arrives on your device." }
    ],
    metaTitle: "Build a Smart Doorbell with Raspberry Pi - Complete Guide",
    metaDescription: "Step-by-step tutorial to build a WiFi smart doorbell with Raspberry Pi, camera, motion detection, and mobile notifications."
  },
  {
    id: 2,
    title: "Arduino Home Automation Hub",
    slug: "arduino-home-automation-hub",
    description: "Build a centralized home automation hub using Arduino Mega that controls lights, fans, and appliances via web interface.",
    content: "Create a centralized home automation hub using an Arduino Mega 2560, 4-channel relay modules, and an ESP8266 WiFi module. This project lets you control lights, fans, and household appliances from a custom web interface hosted on the Arduino. You will learn how to wire AC loads safely through relays, establish serial communication between the Arduino and ESP8266 for WiFi connectivity, and build an HTML/CSS/JavaScript dashboard that runs in any browser on your local network. The tutorial covers circuit safety practices, relay isolation, and how to add voice control integration with Amazon Alexa or Google Assistant as a bonus step.",
    difficulty: "Intermediate",
    timeEstimate: "8-10 hours",
    costEstimate: "$60-90",
    category: "arduino",
    author: "Sarah Mitchell",
    tags: ["arduino", "home-automation", "relay", "web-interface"],
    coverImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800",
    partsList: [
      "Arduino Mega 2560",
      "4-Channel Relay Module",
      "ESP8266 WiFi Module",
      "LEDs (Various Colors)",
      "Breadboard",
      "Jumper Wires",
      "AC Load (Lamps, Fans)"
    ],
    steps: [
      { title: "Set Up Arduino IDE", content: "Download and install the Arduino IDE from the official website, then add the board manager URL for ESP8266 support. Navigate to Preferences and paste the ESP8266 board manager URL into the Additional Boards Manager URLs field. Install the required libraries including ESP8266WiFi, WebServer, and Servo through the Library Manager." },
      { title: "Wire the Relay Module", content: "Connect the IN1-IN4 pins of the 4-channel relay module to Arduino digital pins 22 through 25. Wire the relay module's VCC to the Arduino 5V pin and GND to ground. Each relay channel will control one AC appliance, so run the live wire through the relay's COM and NO terminals for normally-open switching." },
      { title: "Integrate ESP8266", content: "Connect the ESP8266 WiFi module to the Arduino's hardware serial pins (TX1/RX1 on pins 18/19). Wire the ESP8266 VCC to 3.3V and CH_PD to 3.3V, and GND to ground. Use the AT command set to configure the ESP8266 as a WiFi station that connects to your home network and listens for incoming HTTP requests." },
      { title: "Write the Control Firmware", content: "Write the main Arduino sketch that receives commands from the ESP8266 via serial communication. Parse incoming HTTP request parameters to determine which relay to toggle on or off. Include safety features such as a debounce delay to prevent rapid switching and an auto-off timer that turns off appliances after a configurable duration.", code: "void setup() {\n  Serial1.begin(9600);\n  for (int i = 22; i <= 25; i++) {\n    pinMode(i, OUTPUT);\n    digitalWrite(i, HIGH);\n  }\n}\n\nvoid loop() {\n  if (Serial1.available()) {\n    String cmd = Serial1.readStringUntil('\\n');\n    if (cmd.startsWith(\"RELAY\")) {\n      int pin = cmd.charAt(5) - '0' + 21;\n      bool state = cmd.charAt(7) == '1';\n      digitalWrite(pin, state ? LOW : HIGH);\n    }\n  }\n}" },
      { title: "Build the Web Interface", content: "Create an HTML file with toggle switches for each appliance, styled with CSS for a responsive mobile-friendly layout. Use JavaScript fetch() calls to send HTTP requests to the ESP8266 when a switch is toggled. Host the web interface from the ESP8266's SPIFFS filesystem so the dashboard is accessible from any device on your WiFi network." }
    ],
    metaTitle: "Arduino Home Automation Hub - DIY Smart Home Guide",
    metaDescription: "Build a complete home automation hub with Arduino Mega, relay modules, and ESP8266 WiFi. Control lights and appliances from your phone."
  },
  {
    id: 3,
    title: "Smart Plant Watering System with ESP32",
    slug: "smart-plant-watering-esp32",
    description: "Automated plant watering system using soil moisture sensors, water pump, and ESP32 with cloud dashboard.",
    content: "Build an automated plant watering system using an ESP32, a capacitive soil moisture sensor, and a mini water pump controlled through a relay module. This IoT project reads real-time soil moisture data, triggers watering when the soil gets too dry, and logs everything to a cloud dashboard on ThingSpeak or Blynk. You will learn how to wire sensors and relays to ESP32 GPIO pins, calibrate moisture readings for your specific soil type, and set up WiFi-based remote monitoring so you can check your plants from anywhere. The tutorial covers pump timing, over-watering prevention, and how to extend the system with multiple sensors for a garden or greenhouse setup.",
    difficulty: "Beginner",
    timeEstimate: "2-3 hours",
    costEstimate: "$20-35",
    category: "esp32",
    author: "Marcus Johnson",
    tags: ["esp32", "iot", "gardening", "sensors"],
    coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    partsList: [
      "ESP32 DevKit",
      "Soil Moisture Sensor",
      "Mini Water Pump",
      "Relay Module",
      "Tubing",
      "Breadboard",
      "Jumper Wires"
    ],
    steps: [
      { title: "Wire Soil Moisture Sensor", content: "Connect the soil moisture sensor's VCC pin to the ESP32 3.3V pin and GND to ground. Wire the analog output (AOUT) to GPIO pin 34, which supports analog input on the ESP32. Insert the sensor probes into the soil near your plant's root zone, ensuring good contact with the soil for accurate readings." },
      { title: "Connect Water Pump", content: "Wire the mini water pump through a single-channel relay module to safely switch its power on and off. Connect the relay's IN pin to GPIO pin 26 on the ESP32, and wire the pump's power supply through the relay's COM and NO terminals. Attach tubing from the pump to the plant pot and secure it so water flows directly to the root area." },
      { title: "Write Sensor Code", content: "Write an Arduino sketch that reads the analog moisture value from the sensor and maps it to a 0-100 percentage scale. Define a threshold value (typically around 30-40%) below which the pump should activate. When the moisture reading drops below the threshold, turn on the relay for a timed watering cycle of 2-3 seconds, then re-check the moisture level." },
      { title: "Add Cloud Dashboard", content: "Create a free ThingSpeak or Blynk account and obtain your API key. Modify the sketch to send moisture readings to the cloud platform at regular intervals using WiFi. Set up alerts on the dashboard so you receive a notification whenever your plant needs attention, and view historical moisture data to optimize your watering schedule." }
    ],
    metaTitle: "Smart Plant Watering System with ESP32 - IoT Tutorial",
    metaDescription: "Build an automated plant watering system with ESP32, soil moisture sensors, and cloud dashboard. Perfect beginner IoT project."
  },
  {
    id: 4,
    title: "Voice-Controlled LED Matrix with Arduino",
    slug: "voice-controlled-led-matrix-arduino",
    description: "Build a voice-controlled 8x8 LED matrix display that responds to spoken commands using Arduino and a microphone module.",
    content: "Build an interactive 8x8 LED matrix display controlled entirely by your voice using an Arduino Uno, a MAX7219 LED matrix module, and a sound sensor. This project combines audio signal processing with real-time display control to create a system that responds to claps, spoken words, or ambient sound patterns. You will wire the LED matrix and microphone to the Arduino, install the LedControl library, and write firmware that analyzes amplitude peaks to trigger different display animations. By the end, you will have a voice-activated display that can scroll text, show patterns, and react to music, demonstrating both hardware interfacing and signal processing fundamentals.",
    difficulty: "Advanced",
    timeEstimate: "6-8 hours",
    costEstimate: "$35-50",
    category: "arduino",
    author: "Alex Chen",
    tags: ["arduino", "led", "voice-control", "display"],
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    partsList: [
      "Arduino Uno",
      "8x8 LED Matrix (MAX7219)",
      "Sound Sensor Module",
      "Wires",
      "Breadboard"
    ],
    steps: [
      { title: "Assemble LED Matrix", content: "Chain together up to four MAX7219 LED matrix modules by connecting their DOUT pins to the next module's DIN pins. Mount the modules on a breadboard or custom PCB and connect the VCC to 5V, GND to ground, DIN to Arduino pin 11, CS to pin 10, and CLK to pin 13. Verify all solder joints and pin connections are secure before powering on the display." },
      { title: "Wire Sound Sensor", content: "Connect the sound sensor module's VCC to 5V and GND to ground on the Arduino. Wire the analog output (AOUT) to Arduino analog pin A0 for volume level detection. Adjust the onboard potentiometer on the sound sensor to calibrate the sensitivity threshold so it picks up your voice without triggering on ambient noise." },
      { title: "Install Libraries", content: "Open the Arduino IDE Library Manager and install the LedControl library for MAX7219 control. Also install the VoiceRecognitionV3 library or the software-based pitch detection library depending on your approach. Verify the libraries compile correctly by uploading a blank sketch with the include statements to ensure there are no conflicts." },
      { title: "Program Voice Commands", content: "Create an Arduino sketch that reads analog sound levels from the microphone and detects claps or voice commands by analyzing amplitude peaks. Define different patterns for each recognized command, such as scroll text, display animations, or change brightness. Map each voice pattern to a specific LED animation and test each command to ensure reliable recognition in different noise environments.", code: "int soundPin = A0;\nint threshold = 500;\nunsigned long lastPeak = 0;\n\nvoid loop() {\n  int level = analogRead(soundPin);\n  if (level > threshold && millis() - lastPeak > 200) {\n    lastPeak = millis();\n    int clapCount = 1;\n    while (millis() - lastPeak < 500) {\n      if (analogRead(soundPin) > threshold) {\n        clapCount++;\n        lastPeak = millis();\n      }\n    }\n    triggerAnimation(clapCount);\n  }\n}" }
    ],
    metaTitle: "Voice-Controlled LED Matrix with Arduino - Advanced DIY",
    metaDescription: "Build a voice-controlled 8x8 LED matrix with Arduino. Advanced project with sound sensors and real-time display control."
  },
  {
    id: 5,
    title: "Raspberry Pi Security Camera System",
    slug: "raspberry-pi-security-camera",
    description: "Set up a multi-camera security system with motion detection, recording, and remote viewing using Raspberry Pi.",
    content: "Set up a multi-camera security system using a Raspberry Pi 4, dual PiCamera Module v2 cameras, and MotionEyeOS for centralized management. This project transforms your Raspberry Pi into a network video recorder that captures motion-triggered footage, stores recordings on a USB hard drive or NAS, and provides a clean web interface for live viewing and playback. You will install MotionEyeOS, configure both camera feeds, set up detection zones to minimize false alarms, and enable secure remote access through a WireGuard VPN so you can monitor your property from anywhere in the world without exposing your system to the public internet.",
    difficulty: "Intermediate",
    timeEstimate: "5-7 hours",
    costEstimate: "$70-120",
    category: "raspberry-pi",
    author: "Sarah Mitchell",
    tags: ["raspberry-pi", "security", "camera", "surveillance"],
    coverImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800",
    partsList: [
      "Raspberry Pi 4 (4GB+)",
      "PiCamera Module v2 (x2)",
      "MicroSD Card (32GB+)",
      "Power Supply",
      "Case with cooling"
    ],
    steps: [
      { title: "Install MotionEyeOS", content: "Download MotionEyeOS from the official repository and flash it to your MicroSD card using Etcher or Raspberry Pi Imager. Insert the card into your Raspberry Pi 4 and connect both camera modules to the CSI ports. Boot the Pi and access the MotionEye web interface at http://localhost:8765 to begin configuration." },
      { title: "Configure Cameras", content: "Navigate to the MotionEye settings and enable both camera feeds by adding each camera's unique identifier. Adjust the resolution to 1280x720 for a good balance of quality and storage, and set the frame rate to 15fps. Configure motion detection sensitivity and define detection zones that focus on entry points while ignoring trees or roads that might cause false alarms." },
      { title: "Set Up Network Storage", content: "Mount a network-attached storage (NAS) device or USB hard drive to the Raspberry Pi for recording storage. In MotionEye settings, configure the storage location to point to your mounted directory and set the retention period to automatically delete old recordings. Enable continuous recording or motion-triggered recording based on your preference and available storage capacity." },
      { title: "Enable Remote Access", content: "Install and configure WireGuard VPN on the Raspberry Pi for secure remote access to your camera feeds. Open the necessary ports on your router and configure port forwarding to direct external traffic to the Pi. Test remote viewing from your phone by connecting to the VPN and accessing the MotionEye interface from outside your local network." }
    ],
    metaTitle: "Raspberry Pi Security Camera System - Complete Guide",
    metaDescription: "Build a multi-camera security system with Raspberry Pi. Motion detection, recording, and remote viewing tutorial."
  },
  {
    id: 6,
    title: "DIY Smart Mirror with Raspberry Pi",
    slug: "diy-smart-mirror-raspberry-pi",
    description: "Build a magical smart mirror that displays weather, news, calendar, and time using Raspberry Pi and a two-way mirror.",
    content: "Build a magical smart mirror that displays the weather, your calendar, news headlines, and the time using a Raspberry Pi 4, an old picture frame, and a two-way acrylic mirror. This project combines woodworking, electronics, and software to create a functional piece of smart home furniture that looks like it came from a science fiction movie. You will learn how to assemble the mirror frame with proper lighting, configure MagicMirror2 with custom modules, connect to APIs for real-time data, and troubleshoot common display issues like glare and backlight bleed. The tutorial includes wiring diagrams for the backlight LED strip and step-by-step module configuration for weather, calendar, news, and clock displays.",
    difficulty: "Advanced",
    timeEstimate: "10-14 hours",
    costEstimate: "$100-200",
    category: "raspberry-pi",
    author: "Marcus Johnson",
    tags: ["raspberry-pi", "display", "smart-home", "magic-mirror"],
    coverImage: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800",
    partsList: [
      "Raspberry Pi 4",
      "LCD Monitor (22 inch)",
      "Two-Way Acrylic Mirror",
      "Wood Frame Materials",
      "PIR Sensor"
    ],
    steps: [
      { title: "Build the Frame", content: "Measure your LCD monitor and two-way mirror to determine the frame dimensions, then cut wood strips to size using a miter saw. Assemble the frame with wood glue and screws, ensuring the interior depth accommodates both the monitor and mirror with room for ventilation. Sand and paint the frame to match your room decor before installing the components." },
      { title: "Install MagicMirror²", content: "Flash Raspberry Pi OS to the MicroSD card and run the MagicMirror² automated installer script from the terminal. After installation, configure the config.js file to set your location, language, and desired modules. Connect the LCD monitor to the Pi's HDMI output and position the two-way mirror directly in front of the display to create the mirror effect." },
      { title: "Configure Modules", content: "Edit the modules array in config.js to add weather (using OpenWeatherMap), news feeds (RSS), calendar (Google Calendar), and clock modules. Position each module on screen by adjusting the position property (top-left, top-center, top-right, etc.). Customize the appearance of each module by modifying CSS classes and setting appropriate update intervals for live data." },
      { title: "Add Motion Activation", content: "Wire a PIR motion sensor to GPIO pin 18 on the Raspberry Pi and mount it behind the mirror frame where it can detect approaching users. Add the motion module to MagicMirror² configuration and set it to wake the display when movement is detected. Configure a sleep timer so the display turns off after 5 minutes of inactivity, extending the monitor's lifespan and saving energy." }
    ],
    metaTitle: "DIY Smart Mirror with Raspberry Pi - MagicMirror Tutorial",
    metaDescription: "Build a smart mirror with Raspberry Pi that displays weather, news, and calendar. Complete hardware and software guide."
  },
  {
    id: 7,
    title: "Arduino Weather Station with OLED Display",
    slug: "arduino-weather-station-oled",
    description: "Build a compact weather station that measures temperature, humidity, pressure, and displays readings on an OLED screen.",
    content: "Build a portable weather station using a Raspberry Pi, a BME280 temperature and humidity sensor, and an E-Ink display that updates every 30 seconds without requiring a WiFi connection. This project creates a self-contained, low-power weather monitor that you can place anywhere in your home, office, or garden. You will learn how to wire the BME280 sensor to the Pi's I2C pins, write a Python script that reads atmospheric data, and render clean weather information on a sunlight-readable E-Ink screen. The tutorial covers power management for extended battery life, data logging to a local SQLite database, and how to add additional sensors like a BMP180 barometric pressure sensor or a UV index sensor for a more complete weather picture.",
    difficulty: "Beginner",
    timeEstimate: "2-3 hours",
    costEstimate: "$15-25",
    category: "arduino",
    author: "Alex Chen",
    tags: ["arduino", "weather", "sensors", "display"],
    coverImage: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800",
    partsList: [
      "Arduino Nano",
      "BME280 Sensor",
      "0.96\" OLED Display",
      "Breadboard",
      "Jumper Wires"
    ],
    steps: [
      { title: "Wire BME280 Sensor", content: "Connect the BME280 sensor to the Arduino Nano via the I2C bus. Wire the SDA pin to A4 and SCL pin to A5 on the Nano, and connect VCC to 3.3V and GND to ground. Ensure the sensor is oriented correctly and seated firmly on the breadboard for reliable readings." },
      { title: "Connect OLED Display", content: "Wire the 0.96-inch OLED display to the same I2C bus by connecting its SDA and SCL pins to A4 and A5 respectively. Since both the sensor and display share the I2C bus, they can operate simultaneously using different addresses. Connect the OLED VCC to 3.3V and GND to ground, making sure the wiring is clean and free of shorts." },
      { title: "Install Libraries", content: "Open the Arduino IDE Library Manager and install the Adafruit BME280 library along with its dependency, the Adafruit Unified Sensor library. Also install the Adafruit SSD1306 library for OLED display control and the Adafruit GFX Library for graphics primitives. These libraries handle all the low-level communication so you can focus on reading and displaying sensor data." },
      { title: "Write Display Code", content: "Create an Arduino sketch that initializes both the BME280 sensor and the OLED display in the setup function. In the main loop, read temperature, humidity, and pressure values from the sensor every two seconds. Format the readings as readable text strings and display them on the OLED screen, updating the values continuously to create a real-time weather station display.", code: "#include <Wire.h>\n#include <Adafruit_BME280.h>\n#include <Adafruit_SSD1306.h>\n\nAdafruit_BME280 bme;\nAdafruit_SSD1306 display(128, 64, &Wire);\n\nvoid setup() {\n  bme.begin(0x76);\n  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n}\n\nvoid loop() {\n  float t = bme.readTemperature();\n  float h = bme.readHumidity();\n  float p = bme.readPressure() / 100.0;\n  display.clearDisplay();\n  display.setTextSize(1);\n  display.setCursor(0,0);\n  display.printf(\"Temp: %.1f C\\n\", t);\n  display.printf(\"Hum:  %.1f %%\\n\", h);\n  display.printf(\"Pres: %.1f hPa\\n\", p);\n  display.display();\n  delay(2000);\n}" }
    ],
    metaTitle: "Arduino Weather Station with OLED Display - Beginner Guide",
    metaDescription: "Build a compact Arduino weather station with BME280 sensor and OLED display. Perfect beginner electronics project."
  },
  {
    id: 8,
    title: "Smart Garage Door Controller",
    slug: "smart-garage-door-controller",
    description: "Automate your garage door with WiFi control, status monitoring, and scheduled closing using ESP32.",
    content: "Build a smart garage controller using an ESP32, a relay module, and a magnetic reed switch that lets you open, close, and monitor your garage door from your phone. This project replaces expensive commercial garage openers with a DIY solution that integrates with Home Assistant, Google Home, or Amazon Alexa. You will wire the relay to the garage door opener's manual button terminals, install the reed switch to detect the door position, and flash firmware that connects to your WiFi network and exposes a clean web interface for remote control. The tutorial covers electrical safety when working near high-voltage garage openers, setting up MQTT for reliable communication, and configuring push notifications so you are alerted whenever the door opens or closes.",
    difficulty: "Intermediate",
    timeEstimate: "3-5 hours",
    costEstimate: "$25-40",
    category: "esp32",
    author: "Sarah Mitchell",
    tags: ["esp32", "garage", "automation", "wifi"],
    coverImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800",
    partsList: [
      "ESP32 DevKit",
      "Relay Module",
      "Magnetic Door Sensor",
      "LEDs (Red, Green)",
      "Breadboard"
    ],
    steps: [
      { title: "Wire Relay to Garage Opener", content: "Locate the manual trigger button terminals on your garage door opener motor unit. Wire the relay module's COM and NO terminals in parallel with the button so the relay can trigger the opener just like a button press. Connect the relay's IN pin to GPIO pin 26 on the ESP32 and power the relay module from the ESP32's 5V pin." },
      { title: "Install Door Sensor", content: "Mount the magnetic reed switch on the garage door frame with one half on the fixed frame and the other on the moving door panel. Wire the sensor to GPIO pin 27 with a pull-up resistor so the pin reads HIGH when the door is closed and LOW when open. Position the sensor at a height where the magnets align properly when the door is fully closed." },
      { title: "Write Firmware", content: "Create an Arduino sketch that connects the ESP32 to your WiFi network and starts a web server on port 80. Define endpoints for toggling the garage door, checking door status, and viewing connection information. Implement a safety feature that prevents the door from being triggered twice within 5 seconds to avoid accidental rapid opening and closing cycles.", code: "#include <WiFi.h>\n#include <WebServer.h>\n\nconst int relayPin = 26;\nconst int doorPin = 27;\nunsigned long lastTrigger = 0;\nWebServer server(80);\n\nvoid handleToggle() {\n  if (millis() - lastTrigger < 5000) {\n    server.send(429, \"text/plain\", \"Too soon\");\n    return;\n  }\n  digitalWrite(relayPin, HIGH);\n  delay(300);\n  digitalWrite(relayPin, LOW);\n  lastTrigger = millis();\n  server.send(200, \"text/plain\", \"Toggled\");\n}\n\nvoid handleStatus() {\n  bool closed = digitalRead(doorPin) == HIGH;\n  server.send(200, \"application/json\",\n    \"{\\\"door\\\":\\\"\" + String(closed ? \"closed\" : \"open\") + \"\\\"}\");\n}" },
      { title: "Build Mobile App", content: "Design a simple HTML/CSS/JavaScript web interface with a large toggle button and a status indicator showing whether the door is open or closed. Use the Fetch API to send requests to the ESP32 endpoints when the user taps the button. Add CSS animations for visual feedback and auto-refresh the door status every 3 seconds so the display stays current without manual page reloads." }
    ],
    metaTitle: "Smart Garage Door Controller with ESP32 - DIY Tutorial",
    metaDescription: "Build a WiFi smart garage door controller with ESP32. Includes status monitoring, mobile control, and auto-close timer."
  },
  {
    id: 9,
    title: "Robot Arm with Arduino Servos",
    slug: "robot-arm-arduino-servos",
    description: "Build a 4-DOF robotic arm using servo motors controlled by Arduino with joystick or Bluetooth control.",
    content: "Construct a programmable 4-axis robot arm using Arduino, SG90 micro servo motors, and a custom 3D-printed or laser-cut frame that can pick up, move, and place small objects with precision. This project teaches you the fundamentals of robotic kinematics, PWM servo control, and inverse motion planning. You will wire four servos to the Arduino's PWM pins, write code that maps joystick or potentiometer inputs to joint angles, and build a simple web interface for recording and replaying movement sequences. The tutorial covers servo calibration, load balancing to prevent motor strain, and how to extend the arm with a gripper or suction cup end effector for different task applications.",
    difficulty: "Advanced",
    timeEstimate: "8-12 hours",
    costEstimate: "$40-70",
    category: "arduino",
    author: "Marcus Johnson",
    tags: ["arduino", "robotics", "servo", "robot-arm"],
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    partsList: [
      "Arduino Uno",
      "SG90 Servo Motors (x4)",
      "Robot Arm Kit (3D printed or purchased)",
      "Joystick Module",
      "Breadboard",
      "External Power Supply (5V 3A)"
    ],
    steps: [
      { title: "Assemble Arm Structure", content: "If using a 3D printed kit, print all arm segments using PLA filament at 20% infill for a good strength-to-weight ratio. Assemble the base, shoulder, elbow, and gripper joints using the provided screws and hardware. Sand any rough edges and test-fit each joint to ensure smooth movement before installing the servos." },
      { title: "Mount Servos", content: "Install the SG90 servo motors at each joint, starting with the base rotation servo mounted to the platform. Attach the shoulder servo to the base arm, the elbow servo to the upper arm, and the gripper servo at the end effector. Use servo mounting brackets or hot glue to secure each motor firmly while ensuring the servo horns align with the joint axes." },
      { title: "Wire to Arduino", content: "Connect each servo's signal wire to Arduino PWM pins: base to pin 3, shoulder to pin 5, elbow to pin 6, and gripper to pin 9. Wire all servo VCC pins to the external 5V power supply rather than the Arduino's 5V pin to prevent brownouts. Connect the joystick module to analog pins A0 (X-axis) and A1 (Y-axis) for directional control." },
      { title: "Write Control Code", content: "Write an Arduino sketch that reads joystick values and maps them to servo angle changes with a smoothing filter to prevent jittery movement. Implement a calibration routine that centers each servo at 90 degrees when the joystick is released. Add speed control by scaling the servo angle increment based on joystick deflection, allowing both slow precise movements and fast sweeping motions.", code: "#include <Servo.h>\n\nServo base, shoulder, elbow, gripper;\nint baseAng = 90, shoulderAng = 90, elbowAng = 90;\n\nvoid setup() {\n  base.attach(3);\n  shoulder.attach(5);\n  elbow.attach(6);\n  gripper.attach(9);\n}\n\nvoid loop() {\n  int xVal = analogRead(A0) - 512;\n  int yVal = analogRead(A1) - 512;\n  if (abs(xVal) > 20) {\n    baseAng = constrain(baseAng + xVal / 50, 0, 180);\n    base.write(baseAng);\n  }\n  if (abs(yVal) > 20) {\n    shoulderAng = constrain(shoulderAng + yVal / 50, 0, 180);\n    shoulder.write(shoulderAng);\n  }\n  delay(20);\n}" }
    ],
    metaTitle: "Robot Arm with Arduino Servos - Complete Build Guide",
    metaDescription: "Build a 4-DOF robotic arm with Arduino and servo motors. Includes joystick control and programming tutorial."
  },
  {
    id: 10,
    title: "Smart Irrigation System with Raspberry Pi",
    slug: "smart-irrigation-raspberry-pi",
    description: "Automated garden irrigation system with soil moisture sensing, weather API integration, and scheduling.",
    content: "Build a smart irrigation system using an ESP32, soil moisture sensors, a solenoid valve, and a web dashboard that automatically waters your garden based on real-time soil conditions. This project goes beyond simple定时浇水 by incorporating multiple moisture zones, weather API integration to skip watering during rain, and a clean web interface that lets you monitor and override the system from your phone. You will learn how to wire soil moisture sensors to the ESP32's analog inputs, control a 12V solenoid valve through a relay module, and write firmware that sends data to ThingSpeak or Blynk for historical tracking. The tutorial covers waterproofing electronics for outdoor use, solar power integration for off-grid gardens, and expanding the system to support up to 8 independent watering zones.",
    difficulty: "Intermediate",
    timeEstimate: "5-7 hours",
    costEstimate: "$50-80",
    category: "raspberry-pi",
    author: "Alex Chen",
    tags: ["raspberry-pi", "irrigation", "gardening", "iot"],
    coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    partsList: [
      "Raspberry Pi Zero W",
      "Soil Moisture Sensors (x4)",
      "Solenoid Valves",
      "Relay Board",
      "Water Pump",
      "Tubing"
    ],
    steps: [
      { title: "Set Up Raspberry Pi", content: "Flash Raspbian Lite to the MicroSD card and boot the Raspberry Pi Zero W for initial configuration. Run sudo apt update && sudo apt upgrade, then install Python 3, pip, and the required GPIO libraries. Enable SSH and I2C interfaces through raspi-config to prepare for sensor communication and remote management." },
      { title: "Wire Moisture Sensors", content: "Connect the analog output of each soil moisture sensor to the ADS1115 ADC module since the Pi Zero W does not have native analog inputs. Wire the ADS1115 to the Pi via I2C (SDA to GPIO 2, SCL to GPIO 3) and mount the sensors in each garden zone at root depth. Calibrate each sensor by recording dry and wet baseline readings to set accurate moisture thresholds." },
      { title: "Configure Valves", content: "Wire each solenoid valve through the relay board, connecting the relay COM and NO terminals in series with the valve power supply. Assign each relay channel to a GPIO pin (GPIO 17, 27, 22, 23) and label each zone clearly on the tubing. Test each valve individually by toggling its relay from a Python script to confirm water flows only to the intended zone." },
      { title: "Write Scheduling Code", content: "Create a Python script that reads moisture levels from all four sensors at configurable intervals and triggers watering when readings fall below the calibrated threshold. Implement a time-based scheduler using the schedule library so each zone has independent watering windows. Add logging to record moisture history and watering events for later analysis and schedule optimization.", code: "import time\nimport schedule\nimport board\nimport adafruit_ads1x15.ads1115 as ADS\nfrom adafruit_ads1x15.analog_in import AnalogIn\n\nads = ADS.ADS1115(board.I2C())\nsensors = [AnalogIn(ads, ADS.P0), AnalogIn(ads, ADS.P1),\n           AnalogIn(ads, ADS.P2), AnalogIn(ads, ADS.P3)]\nVALVE_PINS = [17, 27, 22, 23]\nTHRESHOLD = 15000\n\ndef water_zone(zone):\n    import RPi.GPIO as GPIO\n    GPIO.setup(VALVE_PINS[zone], GPIO.OUT)\n    GPIO.output(VALVE_PINS[zone], GPIO.HIGH)\n    time.sleep(3)\n    GPIO.output(VALVE_PINS[zone], GPIO.LOW)\n\nfor i in range(4):\n    schedule.every().day.at(\"06:00\").do(water_zone, i)\n    schedule.every().day.at(\"18:00\").do(water_zone, i)\n\nwhile True:\n    schedule.run_pending()\n    time.sleep(1)" },
      { title: "Add Weather Integration", content: "Sign up for a free OpenWeatherMap API account and obtain an API key for your location. Modify the irrigation script to fetch forecast data and skip scheduled watering if rain is predicted within the next 24 hours. Add a manual override web interface so you can trigger or suspend watering from your phone when conditions change unexpectedly." }
    ],
    metaTitle: "Smart Irrigation System with Raspberry Pi - Garden IoT",
    metaDescription: "Build an automated garden irrigation system with Raspberry Pi. Soil moisture sensing, weather API, and scheduling."
  },
  {
    id: 11,
    title: "Bluetooth RC Car with Arduino",
    slug: "bluetooth-rc-car-arduino",
    description: "Build a smartphone-controlled RC car using Arduino, motor driver, and Bluetooth module.",
    content: "Build a Bluetooth-controlled RC car using an Arduino Uno, an HC-05 Bluetooth module, and an L298N motor driver that you can drive from any Android or iOS phone. This project combines basic robotics with wireless communication to create a fully maneuverable vehicle controlled through a custom Bluetooth app. You will wire DC motors to the L298N driver, pair the HC-05 with your phone, and write Arduino firmware that interprets serial Bluetooth commands into motor speed and direction. The tutorial covers chassis assembly, battery management for extended play time, adding LED headlights and a buzzer horn, and upgrading to a 4-wheel drive configuration for better off-road performance.",
    difficulty: "Beginner",
    timeEstimate: "3-4 hours",
    costEstimate: "$20-35",
    category: "arduino",
    author: "Sarah Mitchell",
    tags: ["arduino", "bluetooth", "robotics", "car"],
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    partsList: [
      "Arduino Uno",
      "L298N Motor Driver",
      "HC-05 Bluetooth Module",
      "DC Motors (x4)",
      "Car Chassis Kit",
      "Battery Pack (7.4V)"
    ],
    steps: [
      { title: "Assemble Chassis", content: "Attach the four DC motors to the car chassis using the included mounting brackets and screws. Press-fit the wheels onto the motor shafts, ensuring they spin freely without wobble. Secure the battery pack to the chassis base and route the power wires toward the motor driver location." },
      { title: "Wire Motor Driver", content: "Connect the two left-side motors to motor output A and the two right-side motors to motor output B on the L298N driver module. Wire the driver's input pins IN1-IN4 to Arduino digital pins 5, 6, 7, and 8 for direction control, and connect the ENA and ENB pins to PWM pins 9 and 10 for speed control. Connect the driver's 12V input to the battery pack and its 5V output to the Arduino Vin pin." },
      { title: "Connect Bluetooth", content: "Wire the HC-05 Bluetooth module's TX pin to Arduino pin 10 (SoftwareSerial RX) and RX pin to Arduino pin 11 through a voltage divider to step down to 3.3V logic. Connect VCC to 5V and GND to ground. Power on the HC-05 and pair it with your smartphone using the default PIN 1234 or 0000." },
      { title: "Program Controls", content: "Write an Arduino sketch that reads single-character commands from the Bluetooth serial interface and maps them to motor actions: 'F' for forward, 'B' for backward, 'L' for left, 'R' for right, and 'S' for stop. Add PWM speed control by accepting numeric values to adjust motor speed dynamically. Install a Bluetooth RC controller app on your phone and configure the button layout to send the matching characters.", code: "#include <SoftwareSerial.h>\nSoftwareSerial BT(10, 11);\n\nvoid setup() {\n  BT.begin(9600);\n  pinMode(5, OUTPUT); pinMode(6, OUTPUT);\n  pinMode(7, OUTPUT); pinMode(8, OUTPUT);\n  pinMode(9, OUTPUT); pinMode(10, OUTPUT);\n}\n\nvoid forward() {\n  digitalWrite(5, HIGH); digitalWrite(6, LOW);\n  digitalWrite(7, HIGH); digitalWrite(8, LOW);\n}\nvoid backward() {\n  digitalWrite(5, LOW); digitalWrite(6, HIGH);\n  digitalWrite(7, LOW); digitalWrite(8, HIGH);\n}\nvoid stopMotors() {\n  digitalWrite(5, LOW); digitalWrite(6, LOW);\n  digitalWrite(7, LOW); digitalWrite(8, LOW);\n}\n\nvoid loop() {\n  if (BT.available()) {\n    char cmd = BT.read();\n    switch(cmd) {\n      case 'F': forward(); break;\n      case 'B': backward(); break;\n      case 'S': stopMotors(); break;\n    }\n  }\n}" }
    ],
    metaTitle: "Bluetooth RC Car with Arduino - Beginner Robot Project",
    metaDescription: "Build a smartphone-controlled RC car with Arduino and Bluetooth. Easy beginner robotics project with step-by-step guide."
  },
  {
    id: 12,
    title: "Home Assistant on Raspberry Pi",
    slug: "home-assistant-raspberry-pi",
    description: "Set up Home Assistant on Raspberry Pi to create a unified smart home dashboard controlling all your devices.",
    content: "Deploy Home Assistant on a Raspberry Pi 4 and create a unified smart home dashboard that controls devices from every brand in one place. This project walks you through installing Home Assistant OS, configuring your first integrations with Philips Hue, Xiaomi sensors, and TP-Link smart plugs, and building a custom dashboard with Lovelace cards that shows the state of your entire home at a glance. You will learn how to set up automations that trigger based on time, sensor readings, or device states, create zones for different rooms, and expose your Home Assistant instance to the internet securely through the Nabu Casa cloud or a self-hosted reverse proxy with SSL certificates.",
    difficulty: "Beginner",
    timeEstimate: "1-2 hours",
    costEstimate: "$5-15 (software only)",
    category: "raspberry-pi",
    author: "Marcus Johnson",
    tags: ["raspberry-pi", "home-assistant", "smart-home", "dashboard"],
    coverImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800",
    partsList: [
      "Raspberry Pi 4",
      "MicroSD Card (32GB+)",
      "Power Supply",
      "Ethernet Cable (recommended)"
    ],
    steps: [
      { title: "Flash Home Assistant OS", content: "Download the latest Home Assistant OS image from the official website and write it to your MicroSD card using Raspberry Pi Imager. Insert the card into your Raspberry Pi 4 and connect the Ethernet cable for the most reliable initial setup experience. Plug in the power supply and wait approximately 5-10 minutes for the first boot to complete and the system to become accessible." },
      { title: "Initial Setup", content: "Open a web browser on any device connected to the same network and navigate to http://homeassistant.local:8123. Follow the onboarding wizard to create your administrator account, set your home location, and configure basic preferences like currency and timezone. Complete the network settings and enable advanced mode in the Add-on store for access to additional configuration options." },
      { title: "Add Integrations", content: "Navigate to Settings > Devices & Services and click Add Integration to discover devices on your network. Popular integrations include Philips Hue, Google Home, MQTT, and ESPHome for DIY sensors and switches. Follow each integration's setup wizard to authenticate and link your smart home devices to the Home Assistant hub." },
      { title: "Create Dashboards", content: "Go to Settings > Dashboards and create a new dashboard with a custom layout for your home controls. Add cards for each device type, such as light controls, thermostat adjustments, and sensor readings, arranging them in a logical groups. Customize each card's appearance and functionality by editing its YAML configuration or using the visual editor." }
    ],
    metaTitle: "Home Assistant on Raspberry Pi - Smart Home Hub Setup",
    metaDescription: "Set up Home Assistant on Raspberry Pi to create a unified smart home dashboard. Complete installation and configuration guide."
  },
  {
    id: 13,
    title: "RFID Door Lock System",
    slug: "rfid-door-lock-system",
    description: "Build an RFID-based door access system with Arduino, servo lock, and logging.",
    content: "Build a contactless RFID door lock system using an Arduino Uno, an MFRC522 RFID reader module, a SG90 servo motor, and a solenoid lock that grants access when you tap an authorized card or key fob. This project teaches you how to read and write MIFARE RFID tags, store authorized IDs in EEPROM for persistence across power cycles, and control a locking mechanism that physically secures your door. You will wire the MFRC522 to the Arduino's SPI pins, write firmware that compares scanned tag IDs against an authorized list, and drive either a servo arm or a solenoid bolt to unlock the door. The tutorial covers adding an LCD status display, a keypad for PIN-based backup entry, and a buzzer that sounds an alarm on unauthorized access attempts.",
    difficulty: "Beginner",
    timeEstimate: "2-3 hours",
    costEstimate: "$15-25",
    category: "arduino",
    author: "Alex Chen",
    tags: ["arduino", "rfid", "security", "access-control"],
    coverImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800",
    partsList: [
      "Arduino Uno",
      "MFRC522 RFID Module",
      "RFID Cards/Tags",
      "Servo Motor (SG90)",
      "LEDs (Red, Green)",
      "Buzzer"
    ],
    steps: [
      { title: "Wire RFID Module", content: "Connect the MFRC522 RFID module to the Arduino via the SPI interface. Wire SDA to pin 10, SCK to pin 13, MOSI to pin 11, MISO to pin 12, and RST to pin 9. Connect VCC to 3.3V and GND to ground, taking care not to connect VCC to 5V as this will damage the module." },
      { title: "Mount Servo Lock", content: "Attach the SG90 servo motor to your door frame or lock mechanism using double-sided tape or small screws. Connect the servo horn to the latch bolt so that rotating the servo 90 degrees moves the bolt between locked and unlocked positions. Wire the servo signal pin to Arduino pin 3, VCC to 5V, and GND to ground." },
      { title: "Program Access Logic", content: "Write an Arduino sketch that uses the MFRC522 library to read the UID of any presented RFID card. Store authorized UIDs in an array and compare each scanned card against the whitelist. If the card is recognized, rotate the servo to unlock the door for 5 seconds, illuminate the green LED, and sound a brief buzzer tone to indicate access granted.", code: "#include <SPI.h>\n#include <MFRC522.h>\n#include <Servo.h>\n\nMFRC522 rfid(10, 9);\nServo lock;\nbyte authorized[][4] = {{0xA1,0xB2,0xC3,0xD4}};\n\nvoid setup() {\n  SPI.begin();\n  rfid.PCD_Init();\n  lock.attach(3);\n  lock.write(0);\n  pinMode(4, OUTPUT);\n  pinMode(6, OUTPUT);\n}\n\nvoid loop() {\n  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;\n  bool auth = false;\n  for (int i = 0; i < 1; i++) {\n    if (memcmp(rfid.uid.uidByte, authorized[i], 4) == 0) auth = true;\n  }\n  if (auth) {\n    lock.write(90);\n    digitalWrite(4, HIGH);\n    tone(6, 1000, 200);\n    delay(5000);\n    lock.write(0);\n    digitalWrite(4, LOW);\n  }\n  rfid.PICC_HaltA();\n}" },
      { title: "Add Feedback", content: "Connect a green LED to pin 4 and a red LED to pin 5 to provide visual access status feedback. Wire a buzzer to pin 6 for audible confirmation of successful or denied access attempts. Add a short delay after each scan attempt to prevent rapid re-triggering, and implement a simple lockout that rejects all scans for 10 seconds after three consecutive failed attempts." }
    ],
    metaTitle: "RFID Door Lock System with Arduino - Access Control",
    metaDescription: "Build an RFID door access control system with Arduino. Includes servo lock, LED feedback, and access logging."
  },
  {
    id: 14,
    title: "Smart Light Switch with ESP32",
    slug: "smart-light-switch-esp32",
    description: "Replace your regular light switch with a WiFi-controlled smart switch using ESP32 and relay module.",
    content: "Build a smart light switch using an ESP32, a relay module, and a capacitive touch sensor that replaces your existing wall switch with WiFi-connected control. This project lets you control your lights from a phone app, voice assistant, or the physical touch panel while maintaining manual override capability so anyone in the house can still toggle the lights normally. You will learn how to safely wire the relay in series with your existing light circuit, install the capacitive touch sensor behind the wall plate for a seamless look, and flash ESPHome firmware that integrates directly with Home Assistant. The tutorial covers electrical safety when working with mains voltage, adding dimming capability with a TRIAC module, and setting up automations that turn lights on at sunset and off at bedtime.",
    difficulty: "Intermediate",
    timeEstimate: "3-4 hours",
    costEstimate: "$15-30",
    category: "esp32",
    author: "Sarah Mitchell",
    tags: ["esp32", "lighting", "smart-home", "relay"],
    coverImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800",
    partsList: [
      "ESP32 DevKit",
      "Relay Module (1-Channel)",
      "Momentary Push Button",
      "Wall Mount Box",
      "Wires"
    ],
    steps: [
      { title: "Safety First", content: "Turn off the circuit breaker controlling the light circuit you plan to modify and verify the power is off using a non-contact voltage tester. Never work on mains wiring while the circuit is energized, as this poses a serious risk of electric shock or fire. If you are not comfortable working with mains voltage, consult a licensed electrician to assist with the wiring portion of this project." },
      { title: "Wire Relay Module", content: "Disconnect the existing wall switch and wire the relay module's COM and NO terminals in series with the live wire feeding the light fixture. Connect the relay module's IN pin to GPIO pin 26 on the ESP32 and power it from the ESP32's 5V output. Secure all wire connections with wire nuts or terminal blocks and ensure no bare copper is exposed before closing the junction box." },
      { title: "Program ESP32", content: "Write an Arduino sketch that connects the ESP32 to your home WiFi network and starts a web server on port 80. Create a single toggle endpoint that switches the relay state between on and off when accessed. Store the current light state in a variable so the web interface can display the correct status and the relay knows its current position after a power cycle.", code: "#include <WiFi.h>\n#include <WebServer.h>\n\nconst int relayPin = 26;\nbool lightOn = false;\nWebServer server(80);\n\nvoid handleToggle() {\n  lightOn = !lightOn;\n  digitalWrite(relayPin, lightOn ? HIGH : LOW);\n  server.send(200, \"application/json\",\n    \"{\\\"on\\\":\" + String(lightOn ? \"true\" : \"false\") + \"}\");\n}\n\nvoid handleStatus() {\n  server.send(200, \"application/json\",\n    \"{\\\"on\\\":\" + String(lightOn ? \"true\" : \"false\") + \"}\");\n}\n\nvoid setup() {\n  pinMode(relayPin, OUTPUT);\n  WiFi.begin(\"SSID\", \"password\");\n  while (WiFi.status() != WL_CONNECTED) delay(500);\n  server.on(\"/toggle\", handleToggle);\n  server.on(\"/status\", handleStatus);\n  server.begin();\n}\n\nvoid loop() { server.handleClient(); }" },
      { title: "Add Physical Button", content: "Wire a momentary push button between GPIO pin 27 and ground, using the ESP32's internal pull-up resistor. Add an interrupt service routine that toggles the relay state on each button press, providing manual override capability independent of the web interface. Mount the button on the wall plate or enclosure so it is accessible without removing the cover." }
    ],
    metaTitle: "Smart Light Switch with ESP32 - WiFi Light Control",
    metaDescription: "Build a WiFi smart light switch with ESP32 and relay. Control your lights from your phone with this DIY smart home project."
  },
  {
    id: 15,
    title: "Weather Display with E-Ink Screen",
    slug: "weather-display-eink-raspberry-pi",
    description: "Build a low-power weather display using Raspberry Pi and an E-Ink screen that shows forecasts with zero light pollution.",
    content: "Create an E-Ink weather display using a Raspberry Pi Zero 2 W, a 7.5-inch E-Ink screen module, and a BME280 environmental sensor that updates your local weather conditions every 5 minutes while consuming almost no power. This project builds a beautiful, sunlight-readable information panel that shows temperature, humidity, barometric pressure, weather icons, and a 3-day forecast fetched from OpenWeatherMap. You will learn how to drive the E-Ink display using Python and the Waveshare library, wire the BME280 sensor to the Pi's I2C bus, and set up a cron job that triggers display refreshes at regular intervals. The tutorial covers full and partial refresh modes to prevent ghosting, designing custom weather icons for the monochrome display, and building a battery-powered version that lasts months on a single charge using deep sleep mode.",
    difficulty: "Intermediate",
    timeEstimate: "4-5 hours",
    costEstimate: "$50-80",
    category: "raspberry-pi",
    author: "Marcus Johnson",
    tags: ["raspberry-pi", "e-ink", "display", "weather"],
    coverImage: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800",
    partsList: [
      "Raspberry Pi Zero W",
      "7.5\" E-Ink Display HAT",
      "MicroSD Card",
      "Power Supply"
    ],
    steps: [
      { title: "Connect E-Ink Display", content: "Align the 7.5-inch E-Ink Display HAT with the 40-pin GPIO header on the Raspberry Pi Zero W and press it down firmly until all pins are seated. The HAT should sit flush against the Pi without any gaps or misaligned pins. Mount the assembly in a frame or enclosure that exposes the display while protecting the electronics behind it." },
      { title: "Install Display Library", content: "Clone the Waveshare e-Paper library from their GitHub repository and run the installation script to set up the Python dependencies. Test the display by running the provided example scripts to verify the screen refreshes correctly and all pixels are functioning. Configure the SPI interface in raspi-config if the display does not initialize properly on first boot." },
      { title: "Fetch Weather Data", content: "Sign up for a free OpenWeatherMap API account and generate an API key for your location. Write a Python script that queries the current weather endpoint and the 5-day forecast endpoint to retrieve temperature, humidity, conditions, and wind data. Parse the JSON responses and store the relevant values in variables that can be passed to the display rendering functions." },
      { title: "Render Weather Info", content: "Design a clean layout on the e-ink display using the Waveshare drawing functions, placing the current temperature prominently in the center with weather icons above it. Add forecast panels below showing the next three days with high/low temperatures and condition symbols. Schedule the script to run every 15 minutes using cron or a Python timer loop, which refreshes the display while consuming almost zero power between updates." }
    ],
    metaTitle: "Weather Display with E-Ink Screen and Raspberry Pi",
    metaDescription: "Build a zero-power-consumption weather display with Raspberry Pi and E-Ink screen. Shows forecasts without light pollution."
  },
  {
    id: 16,
    title: "Line Following Robot with Arduino",
    slug: "line-following-robot-arduino",
    description: "Build an autonomous line-following robot using Arduino and IR sensor array.",
    content: "Build an autonomous obstacle-avoiding robot using an Arduino Uno, an HC-SR04 ultrasonic sensor, and two DC gear motors mounted on a custom chassis that navigates around objects without human intervention. This project teaches you the fundamentals of robot navigation, sensor fusion, and closed-loop control systems. You will wire the ultrasonic sensor to the Arduino's digital pins, connect the motors through an L298N driver, and write firmware that continuously scans for obstacles and steers the robot away from collisions. The tutorial covers chassis design and assembly, adding a second ultrasonic sensor for 180-degree coverage, implementing a wall-following algorithm, and upgrading to a LiDAR sensor for more precise distance mapping in complex environments.",
    difficulty: "Beginner",
    timeEstimate: "3-4 hours",
    costEstimate: "$20-30",
    category: "arduino",
    author: "Alex Chen",
    tags: ["arduino", "robotics", "sensors", "autonomous"],
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    partsList: [
      "Arduino Uno",
      "IR Sensor Array (5 sensors)",
      "L298N Motor Driver",
      "DC Motors (x2)",
      "Robot Chassis",
      "Battery Pack"
    ],
    steps: [
      { title: "Build Chassis", content: "Attach the two DC motors to the robot chassis using the provided mounting brackets, positioning them symmetrically on the left and right sides. Press the wheels onto the motor shafts and add a caster wheel or ball bearing at the front for balance. Secure the battery pack underneath the chassis and route the power wires up to where the motor driver will be mounted." },
      { title: "Wire IR Sensors", content: "Mount the 5-sensor IR array on the underside of the chassis at the front, approximately 5mm above the ground surface for optimal detection. Connect the sensor output pins to Arduino analog pins A0 through A4, and wire VCC to 5V and GND to ground. Connect the L298N motor driver inputs IN1-IN4 to digital pins 5, 6, 7, and 8, and the ENA/ENB enable pins to PWM pins 9 and 10." },
      { title: "Program PID Control", content: "Write an Arduino sketch that reads all five IR sensor values and calculates a weighted average to determine the robot's position relative to the line. Implement a PID controller with proportional, integral, and derivative terms that adjust the differential motor speeds to steer the robot back toward the center of the line. Start with conservative PID gains (Kp=2, Ki=0, Kd=1) and tune incrementally while testing on your track.", code: "int pins[] = {A0, A1, A2, A3, A4};\nfloat Kp = 2, Ki = 0, Kd = 1;\nfloat error = 0, lastError = 0, integral = 0;\n\nfloat readLine() {\n  float sum = 0, weighted = 0;\n  for (int i = 0; i < 5; i++) {\n    float val = analogRead(pins[i]);\n    weighted += val * i;\n    sum += val;\n  }\n  return sum > 0 ? weighted / sum - 2.0 : 0;\n}\n\nvoid loop() {\n  error = readLine();\n  integral += error;\n  integral = constrain(integral, -50, 50);\n  float derivative = error - lastError;\n  float correction = Kp * error + Ki * integral + Kd * derivative;\n  lastError = error;\n\n  int baseSpeed = 150;\n  int leftSpeed = baseSpeed + correction;\n  int rightSpeed = baseSpeed - correction;\n  // Set motor speeds via L298N\n}" },
      { title: "Calibrate Sensors", content: "Place the robot over the line and record the sensor readings for both the line and the background surface to establish detection thresholds. Write a calibration routine that automatically sets the midpoint between line and background values for each sensor. Test the robot on straight sections first, then curves, adjusting the PID parameters until it follows the line smoothly without oscillating or losing the track." }
    ],
    metaTitle: "Line Following Robot with Arduino - Beginner Robotics",
    metaDescription: "Build an autonomous line-following robot with Arduino and IR sensors. Easy beginner robotics project with PID control."
  },
  {
    id: 17,
    title: "MQTT Sensor Network with ESP32",
    slug: "mqtt-sensor-network-esp32",
    description: "Build a distributed IoT sensor network using multiple ESP32 nodes communicating via MQTT protocol.",
    content: "Create an IoT sensor network using multiple ESP32 boards, BME280 environmental sensors, and MQTT messaging to monitor temperature, humidity, and air quality across different rooms in your home or office. This project teaches you how to build a distributed sensing system where each ESP32 node publishes sensor readings to a central Mosquitto MQTT broker, and a Raspberry Pi dashboard subscribed to those topics displays real-time data on a Grafana dashboard. You will learn how to wire BME280 sensors to each ESP32, configure PlatformIO for multi-board development, set up MQTT topics with meaningful naming conventions, and build alerting rules that send push notifications when conditions exceed your defined thresholds.",
    difficulty: "Advanced",
    timeEstimate: "6-8 hours",
    costEstimate: "$40-60",
    category: "esp32",
    author: "Sarah Mitchell",
    tags: ["esp32", "mqtt", "iot", "sensors", "networking"],
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    partsList: [
      "ESP32 DevKit (x3)",
      "DHT22 Temperature Sensors (x3)",
      "BMP280 Pressure Sensors (x2)",
      "MQTT Broker (Raspberry Pi or cloud)",
      "Breadboards"
    ],
    steps: [
      { title: "Set Up MQTT Broker", content: "Install the Mosquitto MQTT broker on a Raspberry Pi or a cloud server by running sudo apt install mosquitto mosquitto-clients on a Debian-based system. Configure the broker to listen on port 1883 for unencrypted connections and set up authentication with a username and password for security. Create topic namespaces such as home/sensors/temperature and home/sensors/pressure for organized data routing." },
      { title: "Build Sensor Nodes", content: "Program each ESP32 with a sketch that connects to WiFi and then to the MQTT broker using the PubSubClient library. Wire the DHT22 sensor data pin to GPIO 4 and the BMP280 sensor to the I2C bus on GPIO 21 (SDA) and GPIO 22 (SCL). Each node should read its sensors every 30 seconds and publish the readings as JSON payloads to its assigned MQTT topic." },
      { title: "Configure MQTT Topics", content: "Design a hierarchical topic structure that includes the location, sensor type, and node ID, such as home/livingroom/temperature/node1. Subscribe to a command topic on each node so you can remotely adjust reading intervals or trigger calibration from a central dashboard. Test the message flow by subscribing to all topics with the mosquitto_sub command-line tool and verifying data arrives correctly." },
      { title: "Create Dashboard", content: "Install Node-RED on your Raspberry Pi and access the flow editor at http://localhost:1880. Add MQTT input nodes configured to subscribe to your sensor topics, then connect them to chart and gauge nodes for real-time visualization. Arrange the dashboard widgets in logical groups by room or sensor type and deploy the flow to create a live monitoring dashboard accessible from any browser on your network." }
    ],
    metaTitle: "MQTT Sensor Network with ESP32 - IoT Mesh Tutorial",
    metaDescription: "Build a distributed IoT sensor network with ESP32 and MQTT. Multiple sensor nodes communicating through a central broker."
  },
  {
    id: 18,
    title: "Automatic Pet Feeder with Raspberry Pi",
    slug: "automatic-pet-feeder-raspberry-pi",
    description: "Build a WiFi-connected pet feeder that dispenses food on schedule with camera monitoring.",
    content: "Build a smart pet feeder using an Arduino Uno, a hobby servo motor, a HC-SR04 ultrasonic sensor for food level detection, and a real-time clock module that dispenses measured portions of dry food on a programmable schedule. This project ensures your pets are fed consistently even when you are away from home, with a clean web interface that lets you set feeding times, adjust portion sizes, and receive notifications when food runs low. You will learn how to mount and calibrate the servo as a dispensing gate, wire the ultrasonic sensor to monitor the food hopper level, and write Arduino firmware that triggers meals at specific times using the DS3231 RTC module. The tutorial covers building a gravity-fed hopper from common materials, adding a manual feed button for treats, and integrating with Home Assistant for a complete pet care automation system.",
    difficulty: "Intermediate",
    timeEstimate: "5-7 hours",
    costEstimate: "$40-70",
    category: "raspberry-pi",
    author: "Marcus Johnson",
    tags: ["raspberry-pi", "pet", "automation", "camera"],
    coverImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800",
    partsList: [
      "Raspberry Pi Zero W",
      "PiCamera Module",
      "SG90 Servo Motor",
      "3D Printed Hopper",
      "RTC Module (DS3231)",
      "Power Supply"
    ],
    steps: [
      { title: "Design Hopper", content: "Design a food hopper using TinkerCAD or Fusion 360 with a wide funnel top and a narrow dispensing slot at the bottom sized for your pet's kibble. 3D print the hopper using food-safe PLA filament at 20% infill, or build a prototype using a plastic bottle cut and shaped with a heat gun. Sand the interior surfaces smooth to prevent kibble from jamming as it flows through the funnel." },
      { title: "Mount Servo", content: "Install the SG90 servo motor at the base of the hopper with its horn connected to a gate or auger that controls the dispensing opening. Wire the servo signal pin to GPIO pin 18 on the Raspberry Pi, VCC to 5V, and GND to ground. Test the servo by sweeping it from 0 to 90 degrees to verify the gate opens fully to release food and closes completely to prevent overfeeding." },
      { title: "Set Up Camera", content: "Connect the PiCamera Module v2 to the Pi's CSI port and position it to view the food bowl area so you can visually confirm dispensing worked. Install the picamera library and write a quick test script to capture a still image and save it to disk. Adjust the camera angle and focus to ensure the bowl is clearly visible in the frame, then integrate snapshot capture into the feeding routine." },
      { title: "Program Schedules", content: "Wire the DS3231 RTC module to the Pi's I2C bus to maintain accurate time even when the Pi loses internet connectivity. Write a Python script that checks the current time against predefined feeding schedule entries and triggers the servo dispense routine at the correct moments. Add a web interface with time pickers for each meal so you can adjust the schedule remotely from your phone without editing code." }
    ],
    metaTitle: "Automatic Pet Feeder with Raspberry Pi - Smart Feeding",
    metaDescription: "Build a WiFi automatic pet feeder with Raspberry Pi. Scheduled dispensing with camera monitoring for pet owners."
  },
  {
    id: 19,
    title: "Ultrasonic Distance Meter with Arduino",
    slug: "ultrasonic-distance-meter-arduino",
    description: "Build a digital distance measuring tool using ultrasonic sensor and LCD display.",
    content: "Create a digital measuring tool using an Arduino Uno, an HC-SR04 ultrasonic distance sensor, an OLED display, and a push button that provides instant, accurate distance measurements for woodworking, crafting, and home improvement projects. This project replaces your traditional tape measure with an electronic device that displays measurements in both metric and imperial units, stores the last 10 readings in memory, and calculates the difference between two points with a single button press. You will learn how to wire the ultrasonic sensor and OLED display to the Arduino, write firmware that filters noise for stable readings, and design a 3D-printed enclosure that fits comfortably in your hand. The tutorial covers calibration techniques for sub-millimeter accuracy, adding a laser pointer for precise targeting, and extending the range by switching to a VL53L0X Time-of-Flight sensor for measurements up to 2 meters.",
    difficulty: "Beginner",
    timeEstimate: "1-2 hours",
    costEstimate: "$10-15",
    category: "arduino",
    author: "Alex Chen",
    tags: ["arduino", "sensors", "ultrasonic", "display"],
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    partsList: [
      "Arduino Uno",
      "HC-SR04 Ultrasonic Sensor",
      "16x2 LCD Display",
      "Potentiometer (10kΩ)",
      "Breadboard"
    ],
    steps: [
      { title: "Wire Ultrasonic Sensor", content: "Connect the HC-SR04 sensor's VCC pin to Arduino 5V and GND to ground. Wire the Trig pin to digital pin 9 and the Echo pin to digital pin 10 on the Arduino. Position the sensor facing the target surface and ensure nothing is blocking the path between the sensor and the object being measured." },
      { title: "Connect LCD", content: "Wire the 16x2 LCD display using the I2C backpack or direct parallel connection, connecting RS to pin 12, EN to pin 11, D4 to pin 5, D5 to pin 4, D6 to pin 3, and D7 to pin 2. Connect the LCD's VCC to 5V, GND to ground, and the backlight anode to 5V through a current-limiting resistor. Attach the 10kΩ potentiometer to the V0 contrast pin and adjust it until the display characters are clearly visible." },
      { title: "Write Distance Code", content: "Write an Arduino sketch that sends a 10-microsecond pulse on the Trig pin to trigger the ultrasonic measurement. Read the duration of the Echo pulse using pulseIn() and calculate the distance in centimeters by multiplying the duration by 0.034 and dividing by two. Filter out invalid readings by ignoring measurements outside the sensor's reliable range of 2-400 centimeters.", code: "const int trigPin = 9;\nconst int echoPin = 10;\nfloat minDist = 999, maxDist = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(trigPin, OUTPUT);\n  pinMode(echoPin, INPUT);\n}\n\nfloat measure() {\n  digitalWrite(trigPin, LOW);\n  delayMicroseconds(2);\n  digitalWrite(trigPin, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(trigPin, LOW);\n  long dur = pulseIn(echoPin, HIGH, 30000);\n  float dist = dur * 0.034 / 2.0;\n  if (dist >= 2 && dist <= 400) {\n    if (dist < minDist) minDist = dist;\n    if (dist > maxDist) maxDist = dist;\n    return dist;\n  }\n  return -1;\n}" },
      { title: "Display Results", content: "Initialize the LCD in the setup function and clear the display before each new reading. Format the distance value as a string with one decimal place and display it on the first line with a 'Distance:' label. Add a minimum/maximum tracker that records and displays the closest and farthest readings since the last reset, useful for measuring room dimensions or checking clearance." }
    ],
    metaTitle: "Ultrasonic Distance Meter with Arduino - Easy Project",
    metaDescription: "Build a digital distance meter with Arduino and HC-SR04 ultrasonic sensor. Quick and easy beginner project."
  },
  {
    id: 20,
    title: "Smart Thermostat with Raspberry Pi",
    slug: "smart-thermostat-raspberry-pi",
    description: "Build a learning thermostat that adapts to your schedule using Raspberry Pi and temperature sensors.",
    content: "Build a smart thermostat using an ESP32, a DHT22 temperature and humidity sensor, a 2.4-inch TFT touchscreen display, and relay modules that controls your heating and cooling systems based on customizable schedules and real-time room conditions. This project replaces your basic wall thermostat with a connected device that learns your preferences, responds to occupancy detection, and can be controlled from anywhere through a web interface or Home Assistant integration. You will learn how to wire the DHT22 sensor and relays to the ESP32, build a responsive touchscreen UI using the TFT_eSPI library, and implement PID temperature control that maintains your desired temperature without the overshooting and cycling that plagues cheap thermostats. The tutorial covers HVAC safety when working with furnace and air conditioning control wires, setting up multi-zone temperature monitoring with remote sensors, and creating automations that adjust the temperature when you leave or arrive home based on your phone's GPS location.",
    difficulty: "Advanced",
    timeEstimate: "8-10 hours",
    costEstimate: "$60-100",
    category: "raspberry-pi",
    author: "Sarah Mitchell",
    tags: ["raspberry-pi", "thermostat", "smart-home", "climate"],
    coverImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800",
    partsList: [
      "Raspberry Pi 4",
      "DS18B20 Temperature Sensors (x3)",
      "Relay Module (HVAC control)",
      "TFT Touchscreen Display",
      "Enclosure"
    ],
    steps: [
      { title: "Wire Temperature Sensors", content: "Connect each DS18B20 digital temperature sensor to GPIO pin 4 using the OneWire protocol, with a 4.7kΩ pull-up resistor between the data line and 3.3V. Mount one sensor in the main living area, one near the thermostat location, and one in an attic or basement zone for multi-zone monitoring. Verify each sensor's unique address using a scan script so you can identify which reading comes from which location." },
      { title: "Connect HVAC Relay", content: "Identify the R (24V power), W (heat call), and Y (cool call) wires on your HVAC system's low-voltage control terminal. Wire the relay module's COM and NO terminals to interrupt the W wire for heating control, and use a second relay channel on the Y wire for cooling. Connect the relay control pins to GPIO 17 (heat) and GPIO 27 (cool) on the Pi, and test with the system powered off by manually toggling relays with a multimeter." },
      { title: "Build UI", content: "Create a touchscreen interface using Python and PyQt or Kivy that displays the current temperature from all three sensors in large readable fonts. Add circular buttons or sliders to set the target temperature and select between heat, cool, and off modes. Design the layout with a dark theme and high-contrast colors so it is readable from across the room in both daylight and evening lighting." },
      { title: "Implement Schedule Learning", content: "Log temperature readings and manual adjustments to a SQLite database to build a history of your preferences. Write a simple learning algorithm that detects patterns in when you typically raise or lower the temperature and auto-adjusts the schedule accordingly. Display a weekly schedule view on the touchscreen showing the learned time blocks and allow manual overrides that feed back into the learning model." }
    ],
    metaTitle: "Smart Thermostat with Raspberry Pi - DIY Nest Alternative",
    metaDescription: "Build a learning smart thermostat with Raspberry Pi. DIY alternative to Nest with touchscreen display and schedule learning."
  },
  {
    id: 21,
    title: "IoT Air Quality Monitor",
    slug: "iot-air-quality-monitor",
    description: "Build a comprehensive indoor air quality monitor measuring CO2, PM2.5, temperature, and humidity.",
    content: "Monitor indoor air quality using an ESP32, a CCS811 VOC sensor, a Plantower PMS5003 particulate matter sensor, and a BME280 environmental sensor that tracks CO2 equivalent levels, PM2.5 particle counts, temperature, and humidity in your home or office. This project creates a comprehensive air quality monitoring system that alerts you when pollutants exceed safe levels and logs historical data to a cloud dashboard so you can identify patterns and take action. You will learn how to wire multiple sensors to the ESP32's I2C and UART interfaces, write firmware that handles the different data formats and polling rates of each sensor, and display real-time readings on a small OLED screen. The tutorial covers calibrating the CCS811 for your specific environment, interpreting PM2.5 readings against EPA air quality standards, and building a 3D-printed enclosure with filtered air intake for accurate particulate measurement.",
    difficulty: "Intermediate",
    timeEstimate: "4-5 hours",
    costEstimate: "$35-55",
    category: "esp32",
    author: "Marcus Johnson",
    tags: ["esp32", "air-quality", "sensors", "health"],
    coverImage: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800",
    partsList: [
      "ESP32 DevKit",
      "SCD30 CO2 Sensor",
      "PMS5003 PM2.5 Sensor",
      "BME280 Environmental Sensor",
      "OLED Display"
    ],
    steps: [
      { title: "Wire Sensors", content: "Connect the SCD30 CO2 sensor to the ESP32 via I2C with SDA on GPIO 21 and SCL on GPIO 22, powering it from the 3.3V rail. Wire the PMS5003 PM2.5 sensor to the hardware serial port (TX to GPIO 16, RX to GPIO 17) for UART communication. Add the BME280 environmental sensor to the same I2C bus as the SCD30, assigning it a different address to avoid conflicts." },
      { title: "Install Libraries", content: "Open the Arduino IDE Library Manager and install the SparkFun SCD30 library for CO2 readings, the Plantower PMS library for particulate matter, and the Adafruit BME280 library for temperature and humidity. Also install the Adafruit SSD1306 and Adafruit GFX libraries for the OLED display output. Verify all libraries compile together by including them in a blank sketch and uploading to the ESP32." },
      { title: "Read Sensor Data", content: "Initialize all three sensors in the setup function and wait for the SCD30 to complete its automatic calibration period of approximately 10 minutes. Read CO2 in parts per million, PM2.5 in micrograms per cubic meter, and temperature/humidity from the BME280 every 5 seconds in the main loop. Map the CO2 levels to air quality categories: below 600ppm is excellent, 600-1000ppm is good, and above 1000ppm is poor." },
      { title: "Send to Cloud", content: "Create a ThingSpeak account and obtain your API key and channel number for data logging. Add WiFi connection code using the WiFiMulti library to connect to your home network, then POST the sensor readings as numeric fields to the ThingSpeak API endpoint. Configure ThingSpeak MATLAB visualizations to create real-time charts and analytics dashboards that you can access from any device." }
    ],
    metaTitle: "IoT Air Quality Monitor - CO2, PM2.5, Temperature",
    metaDescription: "Build a comprehensive air quality monitor with ESP32. Measures CO2, PM2.5, temperature, and humidity with cloud dashboard."
  },
  {
    id: 22,
    title: "Raspberry Pi Media Center with Kodi",
    slug: "raspberry-pi-media-center-kodi",
    description: "Transform Raspberry Pi into a full-featured media center with Kodi, streaming, and library management.",
    content: "Set up a media center using a Raspberry Pi 4, LibreELEC Kodi, and a remote control app that transforms your TV into a smart entertainment hub for streaming movies, music, and photos from local storage or network shares. This project walks you through installing LibreELEC on a MicroSD card, configuring Kodi with your favorite add-ons for streaming services, connecting to your NAS or USB drives for local media playback, and setting up HDMI-CEC so your existing TV remote controls the Pi without any additional hardware. The tutorial covers optimizing Kodi performance for smooth 1080p and 4K playback, adding a Bluetooth audio receiver for wireless speaker connections, configuring a Samba server so other devices on your network can easily share files to the media center, and setting up a MySQL database to sync your watch history across multiple Kodi installations in different rooms.",
    difficulty: "Beginner",
    timeEstimate: "1-2 hours",
    costEstimate: "$5-15 (software only)",
    category: "raspberry-pi",
    author: "Alex Chen",
    tags: ["raspberry-pi", "media", "kodi", "streaming"],
    coverImage: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800",
    partsList: [
      "Raspberry Pi 4",
      "MicroSD Card (32GB+)",
      "HDMI Cable",
      "Remote Control (CEC-compatible TV remote works)"
    ],
    steps: [
      { title: "Install LibreELEC", content: "Download the LibreELEC image for Raspberry Pi 4 from the official website and write it to your MicroSD card using Etcher. Insert the card into your Pi and connect the HDMI cable to your TV or projector. Plug in the power supply and wait for Kodi to boot to the initial setup wizard, which takes approximately 2-3 minutes on first boot." },
      { title: "Initial Configuration", content: "Follow the LibreELEC setup wizard to configure your language, timezone, and network connection via Ethernet or WiFi. Enable SSH in the Services settings if you want remote access for future configuration. Navigate to Settings > Player > Videos and adjust the display resolution and refresh rate to match your TV's capabilities for smooth playback." },
      { title: "Add Media Sources", content: "Navigate to the Videos, Music, or Pictures sections and select Add Source to mount network shares, USB drives, or cloud storage locations. For NAS devices, select the SMB/NFS protocol, enter the device IP address, and provide credentials if required. For streaming, install the YouTube, Netflix, or Plex add-ons from the official Kodi repository to access your streaming accounts." },
      { title: "Install Add-ons", content: "Go to Settings > Add-ons > Install from repository and browse the official Kodi Add-on Repository for useful enhancements. Install the Trakt add-on to track your watching history across devices, and the Arctic Zephyr skin for a modern interface redesign. Configure each add-on by accessing its settings page to link accounts and customize behavior to your preferences." }
    ],
    metaTitle: "Raspberry Pi Media Center with Kodi - Complete Setup",
    metaDescription: "Transform Raspberry Pi into a media center with Kodi. Streaming, library management, and add-ons setup guide."
  },
  {
    id: 23,
    title: "Gesture-Controlled Robot with Arduino",
    slug: "gesture-controlled-robot-arduino",
    description: "Build a robot that follows hand gestures using MPU6050 accelerometer and Arduino.",
    content: "Create a gesture-controlled robot using an Arduino Mega, an MPU6050 accelerometer and gyroscope module, two DC gear motors, and an L298N motor driver that you steer by tilting your hand. This project combines wearable sensor technology with robotics to create a robot that mimics the movements of your wrist in real time, responding to tilt left, tilt right, forward lean, and backward lean gestures. You will wire the MPU6050 to the Arduino's I2C pins, write firmware that reads accelerometer data and maps tilt angles to motor speeds, and mount the sensor on a glove or wrist strap for comfortable hand-free control. The tutorial covers sensor calibration to eliminate drift, adding a dead zone to prevent unintended movement from hand tremors, and extending the system with a second MPU6050 for controlling a robotic arm gripper simultaneously.",
    difficulty: "Advanced",
    timeEstimate: "6-8 hours",
    costEstimate: "$35-55",
    category: "arduino",
    author: "Sarah Mitchell",
    tags: ["arduino", "robotics", "gesture", "mpu6050"],
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    partsList: [
      "Arduino Uno",
      "MPU6050 Accelerometer/Gyroscope",
      "L298N Motor Driver",
      "DC Motors (x2)",
      "Robot Chassis",
      "nRF24L01 Wireless Modules (x2)"
    ],
    steps: [
      { title: "Build Glove Controller", content: "Sew or attach a small protoboard with the MPU6050 sensor and an Arduino Nano to a fabric glove, positioning the sensor on the back of the hand for accurate tilt detection. Wire the MPU6050 to the Nano via I2C (SDA to A4, SCL to A5) and add the nRF24L01 radio module connected to SPI pins. Mount a 9V battery holder on the glove wrist strap to power the controller wirelessly." },
      { title: "Wire Robot Platform", content: "Assemble the robot chassis with two DC motors connected to the L298N motor driver's output terminals. Wire the motor driver inputs IN1-IN4 to the Arduino Uno's digital pins 5, 6, 7, and 8, and connect ENA/ENB to PWM pins 9 and 10 for speed control. Attach the second nRF24L01 radio module to the robot Arduino's SPI pins and mount it vertically with the antenna clear of metal components for best range." },
      { title: "Implement Wireless Communication", content: "Write paired Arduino sketches for both the glove and robot that configure the nRF24L01 modules on the same radio channel and data rate. Set up the glove transmitter to send 3-axis accelerometer and gyroscope data as a structured packet every 50 milliseconds. Program the robot receiver to parse incoming packets, validate the data checksum, and forward commands to the motor driver functions." },
      { title: "Map Gestures to Movement", content: "Calibrate the MPU6050 by recording the resting position values when the hand is flat and use these as the neutral reference point. Implement gesture mapping where tilting forward drives both motors forward, tilting backward reverses, tilting left turns left, and tilting right turns right. Add a dead zone around the neutral position to prevent accidental movements, and scale the motor speed proportionally to the tilt angle for intuitive proportional control.", code: "#include <Wire.h>\n\nconst int MPU = 0x68;\nint16_t ax, ay, az;\nint baseAx = 0, baseAy = 0;\n\nvoid readAccel() {\n  Wire.beginTransmission(MPU);\n  Wire.write(0x3B);\n  Wire.endTransmission(false);\n  Wire.requestFrom(MPU, 6);\n  ax = Wire.read() << 8 | Wire.read();\n  ay = Wire.read() << 8 | Wire.read();\n  az = Wire.read() << 8 | Wire.read();\n}\n\nvoid loop() {\n  readAccel();\n  int tiltX = (ax - baseAx) / 100;\n  int tiltY = (ay - baseAy) / 100;\n  int deadZone = 5;\n  if (abs(tiltX) < deadZone) tiltX = 0;\n  if (abs(tiltY) < deadZone) tiltY = 0;\n  int leftSpeed = constrain(150 + tiltY + tiltX, 0, 255);\n  int rightSpeed = constrain(150 + tiltY - tiltX, 0, 255);\n  // Send to L298N motor driver\n}" }
    ],
    metaTitle: "Gesture-Controlled Robot with Arduino - Motion Control",
    metaDescription: "Build a gesture-controlled robot with Arduino and MPU6050. Control robot movement with hand tilts wirelessly."
  },
  {
    id: 24,
    title: "Smart Door Lock with Keypad and RFID",
    slug: "smart-door-lock-keypad-rfid",
    description: "Dual-access smart door lock supporting both keypad PIN codes and RFID card authentication.",
    content: "Build a dual-access door lock using an ESP32, an MFRC522 RFID reader, a fingerprint sensor module, and a solenoid lock that grants entry through either a tapped RFID card or a registered fingerprint. This project creates a high-security door lock that provides two-factor authentication options without requiring a physical key, with a clean web dashboard that lets you manage authorized users, view access logs, and temporarily grant or revoke entry permissions remotely. You will wire the RFID reader and fingerprint sensor to the ESP32's SPI and serial pins, write firmware that handles both authentication methods, and control the solenoid lock through a relay module. The tutorial covers enrolling fingerprints into the sensor's onboard database, storing authorized RFID tag IDs in EEPROM, adding an LCD status screen that shows who accessed the door and when, and setting up a tamper alarm that triggers a buzzer when unauthorized access is attempted.",
    difficulty: "Intermediate",
    timeEstimate: "3-4 hours",
    costEstimate: "$20-35",
    category: "arduino",
    author: "Marcus Johnson",
    tags: ["arduino", "security", "rfid", "keypad"],
    coverImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800",
    partsList: [
      "Arduino Uno",
      "4x4 Keypad Module",
      "MFRC522 RFID Module",
      "Servo Motor",
      "LCD 16x2",
      "Buzzer"
    ],
    steps: [
      { title: "Wire Keypad", content: "Connect the 4x4 matrix keypad to Arduino digital pins 2 through 9, with the four rows on pins 2-5 and four columns on pins 6-9. Use the Keypad library to define the button layout map and configure the library to scan the matrix efficiently. Test each button by printing the detected key to the Serial Monitor before proceeding to the RFID module wiring." },
      { title: "Wire RFID Module", content: "Connect the MFRC522 RFID module to the Arduino via SPI: SDA to pin 10, SCK to pin 13, MOSI to pin 11, MISO to pin 12, and RST to pin 9. Power the module from the 3.3V pin and ground, ensuring no connection to 5V to prevent damage. Mount the RFID reader near the door frame at a comfortable scanning height and route the wiring neatly to avoid interference with the door mechanism." },
      { title: "Mount Servo Lock", content: "Attach the servo motor to the door frame or deadbolt mechanism using a custom 3D-printed bracket or strong double-sided mounting tape. Connect the servo horn to the deadbolt so that rotating to 0 degrees locks the door and rotating to 90 degrees unlocks it. Wire the servo signal pin to Arduino pin 3, VCC to 5V, and GND to ground, and test the full range of motion before final installation." },
      { title: "Write Dual Auth Code", content: "Write an Arduino sketch that supports two authentication modes: keypad PIN entry and RFID card scanning. Define a default PIN code and store authorized RFID UIDs in an array, comparing each input against the whitelist. Display the current mode on the LCD screen and provide a mode-switch button that toggles between PIN and RFID input, with buzzer feedback for successful and failed authentication attempts.", code: "#include <MFRC522.h>\n#include <Keypad.h>\n#include <LiquidCrystal.h>\n\nMFRC522 rfid(10, 9);\nLiquidCrystal lcd(A0, A1, 5, 4, 3, 2);\nbool rfidMode = true;\nchar pin[] = \"1234\";\nchar input[5];\nint pinIdx = 0;\n\nvoid setup() {\n  SPI.begin();\n  rfid.PCD_Init();\n  lcd.begin(16, 2);\n  pinMode(7, INPUT_PULLUP);\n  attachInterrupt(digitalPinToInterrupt(7), toggleMode, FALLING);\n}\n\nvoid loop() {\n  if (rfidMode) {\n    if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {\n      // Check authorized UIDs\n      lcd.print(\"RFID Scanned\");\n    }\n  } else {\n    char key = keypad.getKey();\n    if (key) {\n      input[pinIdx++] = key;\n      lcd.print('*');\n      if (pinIdx == 4) {\n        input[4] = '\\0';\n        if (strcmp(input, pin) == 0) unlock();\n        pinIdx = 0;\n      }\n    }\n  }\n}" }
    ],
    metaTitle: "Smart Door Lock with Keypad and RFID - Dual Access",
    metaDescription: "Build a smart door lock supporting both keypad PIN and RFID card access. Arduino security project with LCD display."
  },
  {
    id: 25,
    title: "Solar-Powered Weather Station",
    slug: "solar-powered-weather-station",
    description: "Off-grid weather station powered by solar energy, transmitting data wirelessly to a base station.",
    content: "Build an off-grid weather station using a Raspberry Pi, a solar panel, a lithium battery with charge controller, and a suite of environmental sensors including a Davis Instruments anemometer, a tipping bucket rain gauge, and a UV index sensor that operates entirely on renewable power in remote locations. This project creates a self-sustaining meteorological monitoring system that publishes data to Weather Underground, logs historical readings locally, and provides a low-power display that updates current conditions without requiring a wired internet or power connection. You will learn how to size your solar panel and battery for continuous operation, wire the anemometer and rain gauge to the Pi's GPIO pins through interrupt-driven counters, and configure the system to enter deep sleep between readings to conserve energy. The tutorial covers weatherproofing the enclosure to IP65 standards, setting up a cellular modem for internet access in areas without WiFi, and building a custom mounting pole that positions the wind sensors above nearby obstructions for accurate measurements.",
    difficulty: "Advanced",
    timeEstimate: "8-12 hours",
    costEstimate: "$60-100",
    category: "raspberry-pi",
    author: "Alex Chen",
    tags: ["raspberry-pi", "solar", "weather", "wireless", "outdoor"],
    coverImage: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800",
    partsList: [
      "Raspberry Pi Zero W (base station)",
      "Arduino Nano (remote station)",
      "nRF24L01+ Radio Modules (x2)",
      "Solar Panel (6V 3W)",
      "TP4056 Battery Charger",
      "18650 Battery",
      "Weatherproof Enclosure",
      "Wind/Rain Sensors"
    ],
    steps: [
      { title: "Build Remote Station", content: "Assemble the Arduino Nano, nRF24L01+ radio module, and sensors inside a weatherproof enclosure mounted on a pole in an open area away from buildings and trees. Wire the solar panel to the TP4056 battery charger module and connect the charger output to the Arduino's VIN pin for continuous off-grid power. Mount the 18650 battery alongside the charger and seal all cable entry points with silicone to prevent moisture intrusion." },
      { title: "Wire Weather Sensors", content: "Connect the DHT22 temperature and humidity sensor to Arduino digital pin 4, the BMP280 barometric pressure sensor to the I2C bus (A4/A5), and the wind speed and rain gauge sensors to interrupt-capable pins 2 and 3. Calibrate the wind sensor by recording pulses per revolution and calculate wind speed using the manufacturer's conversion factor. Mount the wind vane and anemometer at the top of the pole with the rain gauge positioned below to catch precipitation without obstruction." },
      { title: "Set Up Base Station", content: "Flash Raspberry Pi OS Lite to the MicroSD card and boot the Raspberry Pi Zero W with the nRF24L01+ radio module connected to its SPI pins. Install the Mosquitto MQTT broker and configure it to accept connections from the remote Arduino node. Set up a Python script that subscribes to incoming radio data, parses the sensor readings, and publishes them to MQTT topics for logging and visualization." },
      { title: "Program Data Relay", content: "Write an Arduino sketch for the remote node that reads all weather sensors, packages the data into a compact binary packet, and transmits it via the nRF24L01+ radio every 60 seconds. Implement a low-power sleep mode between transmissions using the Arduino's power-save features to extend battery life during cloudy periods. Add a watchdog timer that resets the Arduino if it hangs, and configure the base station to log all received data to a CSV file for long-term trend analysis.", code: "#include <SPI.h>\n#include <nRF24L01.h>\n#include <RF24.h>\n#include <DHT.h>\n\nRF24 radio(9, 10);\nDHT dht(4, DHT22);\nstruct WeatherPacket {\n  float temp, humidity, pressure;\n  float windSpeed;\n  int rainCount;\n};\n\nvoid setup() {\n  dht.begin();\n  radio.begin();\n  radio.openWritingPipe(0xF0F0F0F0E1LL);\n  radio.setChannel(108);\n  radio.powerDown();\n}\n\nvoid loop() {\n  radio.powerUp();\n  WeatherPacket data;\n  data.temp = dht.readTemperature();\n  data.humidity = dht.readHumidity();\n  // Read BMP280 pressure, wind, rain...\n  radio.write(&data, sizeof(data));\n  radio.powerDown();\n  // Enter low-power sleep for 60 seconds\n  for (int i = 0; i < 60; i++) {\n    set_sleep_mode(SLEEP_MODE_PWR_DOWN);\n    sleep_enable();\n    sleep_cpu();\n  }\n}" }
    ],
    metaTitle: "Solar-Powered Weather Station - Off-Grid IoT Project",
    metaDescription: "Build a solar-powered off-grid weather station with wireless data transmission. Advanced Raspberry Pi and Arduino project."
  }
];

export const categories = [
  {
    id: 1,
    name: "Arduino",
    slug: "arduino",
    description: "Microcontrollers, sensors, and actuators",
    icon: "cpu",
    color: "#00f0ff",
    tutorialCount: 10
  },
  {
    id: 2,
    name: "Raspberry Pi",
    slug: "raspberry-pi",
    description: "Projects, OS setup, and GPIO guides for Raspberry Pi",
    icon: "cpu",
    color: "#b44aff",
    tutorialCount: 10
  },
  {
    id: 3,
    name: "ESP32/ESP8266",
    slug: "esp32",
    description: "WiFi and Bluetooth IoT projects with ESP modules",
    icon: "wifi",
    color: "#00ff88",
    tutorialCount: 5
  },
  {
    id: 4,
    name: "Home Assistant",
    slug: "home-assistant",
    description: "Smart home automation with Home Assistant",
    icon: "home",
    color: "#ff8800",
    tutorialCount: 0
  }
];
