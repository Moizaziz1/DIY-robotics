export interface VideoData {
  id: number;
  title: string;
  slug: string;
  description: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  category: string;
  duration: string;
  transcript?: string;
}

export const videos: VideoData[] = [
  {
    id: 1,
    title: "Building a Smart Doorbell - Full Build",
    slug: "smart-doorbell-full-build",
    description: "Complete walkthrough of building a Raspberry Pi smart doorbell from start to finish. Covers hardware setup, camera configuration, and mobile notifications.",
    youtubeUrl: "https://www.youtube.com/watch?v=RWo8wn1XcdQ",
    thumbnailUrl: "https://i.ytimg.com/vi/RWo8wn1XcdQ/hqdefault.jpg",
    category: "Raspberry Pi",
    duration: "15:32"
  },
  {
    id: 2,
    title: "Arduino Home Automation - Beginner Guide",
    slug: "arduino-home-automation-guide",
    description: "Getting started with Arduino home automation. Learn to control lights and appliances from your phone using Arduino and IoT.",
    youtubeUrl: "https://www.youtube.com/watch?v=QaumP_booa8",
    thumbnailUrl: "https://i.ytimg.com/vi/QaumP_booa8/hqdefault.jpg",
    category: "Arduino",
    duration: "22:15"
  },
  {
    id: 3,
    title: "ESP32 vs ESP8266 - Which One to Choose?",
    slug: "esp32-vs-esp8266-comparison",
    description: "Detailed comparison of ESP32 and ESP8266 for IoT projects. Specs, features, and project recommendations to help you pick the right board.",
    youtubeUrl: "https://www.youtube.com/watch?v=NAlA-Khu4kY",
    thumbnailUrl: "https://i.ytimg.com/vi/NAlA-Khu4kY/hqdefault.jpg",
    category: "Arduino",
    duration: "12:48"
  },
  {
    id: 4,
    title: "Raspberry Pi Security Camera Setup",
    slug: "rpi-security-camera-setup",
    description: "Set up MotionEyeOS on Raspberry Pi for a complete security camera system with motion detection and remote viewing.",
    youtubeUrl: "https://www.youtube.com/watch?v=JXxGwSLLAGs",
    thumbnailUrl: "https://i.ytimg.com/vi/JXxGwSLLAGs/hqdefault.jpg",
    category: "Raspberry Pi",
    duration: "18:22"
  },
  {
    id: 5,
    title: "Smart Mirror - MagicMirror Tutorial",
    slug: "smart-mirror-magicmirror-tutorial",
    description: "Build a beautiful smart mirror displaying weather, news, and your calendar using Raspberry Pi and MagicMirror software.",
    youtubeUrl: "https://www.youtube.com/watch?v=UZji77ywzp8",
    thumbnailUrl: "https://i.ytimg.com/vi/UZji77ywzp8/hqdefault.jpg",
    category: "Raspberry Pi",
    duration: "25:10"
  },
  {
    id: 6,
    title: "Robot Arm Build - Arduino Servos",
    slug: "robot-arm-build-arduino",
    description: "Constructing a 2-axis robotic arm controlled by Arduino with servo motors. Full build from scratch with code.",
    youtubeUrl: "https://www.youtube.com/watch?v=N55iZ4B1D-Y",
    thumbnailUrl: "https://i.ytimg.com/vi/N55iZ4B1D-Y/hqdefault.jpg",
    category: "Arduino",
    duration: "30:45"
  },
  {
    id: 7,
    title: "MQTT IoT Sensor Network Setup",
    slug: "mqtt-iot-sensor-network",
    description: "Creating a distributed sensor network with ESP32 nodes and MQTT protocol. WiFi-enabled MQTT sensor data publishing tutorial.",
    youtubeUrl: "https://www.youtube.com/watch?v=x5A5S0hoyJ0",
    thumbnailUrl: "https://i.ytimg.com/vi/x5A5S0hoyJ0/hqdefault.jpg",
    category: "Arduino",
    duration: "20:33"
  },
  {
    id: 8,
    title: "Home Assistant Dashboard Customization",
    slug: "home-assistant-dashboard",
    description: "Set up Home Assistant on Raspberry Pi and create custom dashboards. Step-by-step guide for beginners.",
    youtubeUrl: "https://www.youtube.com/watch?v=x2Liz3eUvMI",
    thumbnailUrl: "https://i.ytimg.com/vi/x2Liz3eUvMI/hqdefault.jpg",
    category: "Raspberry Pi",
    duration: "16:55"
  },
  {
    id: 9,
    title: "Bluetooth RC Car - Complete Build",
    slug: "bluetooth-rc-car-build",
    description: "Step-by-step build of a smartphone-controlled RC car with Arduino and Bluetooth. Low-cost beginner robotics project.",
    youtubeUrl: "https://www.youtube.com/watch?v=NBwCQK5-slA",
    thumbnailUrl: "https://i.ytimg.com/vi/NBwCQK5-slA/hqdefault.jpg",
    category: "Arduino",
    duration: "14:20"
  },
  {
    id: 10,
    title: "Smart Plant Watering - ESP32 Project",
    slug: "smart-plant-watering-esp32",
    description: "Automated plant watering with soil moisture sensors and cloud dashboard using ESP32. Beginner-friendly IoT project.",
    youtubeUrl: "https://www.youtube.com/watch?v=ky7VVLUW0HE",
    thumbnailUrl: "https://i.ytimg.com/vi/ky7VVLUW0HE/hqdefault.jpg",
    category: "Arduino",
    duration: "11:40"
  },
  {
    id: 11,
    title: "E-Ink Weather Display Build",
    slug: "eink-weather-display-build",
    description: "Build a low-power E-Ink weather display with Raspberry Pi Zero. Zero light pollution, always-on weather dashboard.",
    youtubeUrl: "https://www.youtube.com/watch?v=HXBlY2QFdj0",
    thumbnailUrl: "https://i.ytimg.com/vi/HXBlY2QFdj0/hqdefault.jpg",
    category: "Raspberry Pi",
    duration: "17:28"
  },
  {
    id: 12,
    title: "Smart Garage Door Controller - ESP32",
    slug: "smart-garage-door-esp32",
    description: "WiFi garage door controller for $10 using ESP32. Status monitoring, auto-close timer, and Home Assistant integration.",
    youtubeUrl: "https://www.youtube.com/watch?v=vvZ5edYLNZs",
    thumbnailUrl: "https://i.ytimg.com/vi/vvZ5edYLNZs/hqdefault.jpg",
    category: "Arduino",
    duration: "13:15"
  }
];
