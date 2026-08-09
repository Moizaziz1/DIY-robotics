export interface ForumReply {
  id: number;
  threadId: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  createdAt: string;
  isSolution?: boolean;
}

export interface ForumThread {
  id: number;
  title: string;
  author: string;
  avatar: string;
  content: string;
  category: string;
  replies: number;
  views: number;
  likes: number;
  lastActive: string;
  createdAt: string;
  pinned?: boolean;
  solved?: boolean;
  tags: string[];
}

export const forumCategories = [
  'All',
  'Arduino',
  'Raspberry Pi',
  'ESP32',
  'Home Assistant',
  'Projects',
  'General',
  'Tools',
  '3D Printing',
];

export const forumThreads: ForumThread[] = [
  {
    id: 1,
    title: 'Best power supply for Raspberry Pi 4 projects?',
    author: 'MakerMike',
    avatar: 'MM',
    content: `I'm building a home automation hub with my Raspberry Pi 4 Model B and I'm unsure about the power supply. The official one is 5.1V/3A USB-C, but I've seen some cheaper alternatives on Amazon.\n\nHas anyone had experience with third-party power supplies? I'm worried about under-voltage issues causing SD card corruption. My setup includes the Pi, a Zigbee USB dongle, a Z-Wave stick, and about 15 sensors connected via GPIO.\n\nWhat are you using for your Pi 4 setups?`,
    category: 'Raspberry Pi',
    replies: 12,
    views: 234,
    likes: 8,
    lastActive: '2 hours ago',
    createdAt: '2026-07-25',
    pinned: true,
    tags: ['raspberry-pi', 'power-supply', 'hardware'],
  },
  {
    id: 2,
    title: 'Arduino vs ESP32 for home automation in 2026',
    author: 'TechTina',
    avatar: 'TT',
    content: `I'm starting a new smart home project and trying to decide between Arduino and ESP32. I know ESP32 has built-in WiFi and Bluetooth, which is a huge plus.\n\nBut I already have a bunch of Arduino shields and sensors. What would you recommend for someone who wants to:\n- Control lights and switches remotely\n- Monitor temperature/humidity in each room\n- Keep it under $50 total\n\nLeaning towards ESP32 but would love to hear from people who've used both.`,
    category: 'General',
    replies: 28,
    views: 567,
    likes: 15,
    lastActive: '4 hours ago',
    createdAt: '2026-07-24',
    pinned: true,
    tags: ['arduino', 'esp32', 'comparison', 'home-automation'],
  },
  {
    id: 3,
    title: 'Help: Servo jittering on Arduino Mega',
    author: 'RoboRaj',
    avatar: 'RR',
    content: `I'm building a pan-tilt camera mount using two SG90 servos connected to my Arduino Mega 2560. The servos work but they jitter constantly, even when no movement commands are being sent.\n\nI've tried:\n- Separate power supply for the servos (5V 2A)\n- Adding 100uF capacitors across the servo power pins\n- Using the Servo library's writeMicroseconds() for smoother control\n- Different PWM pins\n\nNothing seems to help. Has anyone dealt with this? Could it be a ground loop issue?`,
    category: 'Arduino',
    replies: 8,
    views: 145,
    likes: 3,
    lastActive: '6 hours ago',
    createdAt: '2026-07-26',
    tags: ['arduino', 'servo', 'troubleshooting'],
  },
  {
    id: 4,
    title: 'My smart mirror build - lessons learned',
    author: 'MirrorMaker',
    avatar: 'MR',
    content: `Just finished my MagicMirror project after 3 months of work. Here's what I learned:\n\n**What went well:**\n- Raspberry Pi 4 runs the MagicMirror software perfectly\n- The two-way mirror from a local glass shop was way cheaper than ordering online\n- Using Home Assistant for voice control was a game changer\n\n**What I'd do differently:**\n- Start with a bigger frame (mine is 24x36 and feels cramped)\n- Plan cable management from day one\n- Use a proper relay board instead of individual MOSFET modules\n\nTotal cost was about $180 including the mirror. Happy to answer questions!`,
    category: 'Projects',
    replies: 15,
    views: 312,
    likes: 22,
    lastActive: '1 day ago',
    createdAt: '2026-07-22',
    tags: ['project', 'raspberry-pi', 'magic-mirror', 'home-assistant'],
  },
  {
    id: 5,
    title: 'Setting up MQTT on Raspberry Pi - step by step',
    author: 'IoTian',
    avatar: 'Io',
    content: `I wrote a comprehensive guide for setting up Mosquitto MQTT broker on Raspberry Pi with proper security. Here's the summary:\n\n1. Install Mosquitto: \`sudo apt install mosquitto mosquitto-clients\`\n2. Enable authentication: \`sudo mosquitto_passwd -c /etc/mosquitto/passwd username\`\n3. Configure TLS for secure connections\n4. Set up ACL for topic-based access control\n5. Configure systemd for auto-start\n\nFull config files and troubleshooting tips in the thread below. This setup has been running稳定 for 6 months with 20+ IoT devices.`,
    category: 'Tutorials',
    replies: 6,
    views: 89,
    likes: 12,
    lastActive: '1 day ago',
    createdAt: '2026-07-23',
    tags: ['mqtt', 'raspberry-pi', 'tutorial', 'mosquitto'],
  },
  {
    id: 6,
    title: 'Best budget oscilloscope for beginners?',
    author: 'ScopeSeeker',
    avatar: 'SS',
    content: `I'm looking to buy my first oscilloscope for electronics projects. My budget is around $50-100. I've been looking at:\n\n- Hantek 6022BE (~$70) - USB scope, 24MHz\n- FNIRSI DSO-TC3 (~$40) - handheld, combo scope/multimeter\n- Rigol DS1054Z (~$350) - overkill but future-proof\n\nI mostly work with Arduino/ESP32 projects, so I need to see I2C, SPI, and UART signals. Nothing too fast.\n\nWhat do you use? Is a cheap USB scope good enough for hobby work?`,
    category: 'Tools',
    replies: 19,
    views: 278,
    likes: 7,
    lastActive: '2 days ago',
    createdAt: '2026-07-20',
    tags: ['tools', 'oscilloscope', 'budget', 'beginner'],
  },
  {
    id: 7,
    title: 'ESP32 deep sleep power consumption optimization',
    author: 'PowerNerd',
    avatar: 'PN',
    content: `I've been testing different ESP32 deep sleep configurations for a battery-powered weather station. Here are my findings:\n\n| Mode | Current Draw |\n|------|-------------|\n| Active (WiFi on) | 80-240mA |\n| Active (WiFi off) | 20mA |\n| Light sleep | 800uA |\n| Deep sleep | 10uA |\n| Deep sleep + RTC GPIO | 6uA |\n\nUsing a 3.7V 18650 battery (3400mAh), I can get:\n- 2 weeks with 5-minute wake intervals\n- 3 months with 15-minute intervals\n- 6+ months with 1-hour intervals\n\nThe trick is to use RTC GPIO to wake on button press AND periodic timer.`,
    category: 'ESP32',
    replies: 11,
    views: 156,
    likes: 18,
    lastActive: '2 days ago',
    createdAt: '2026-07-21',
    tags: ['esp32', 'power', 'battery', 'deep-sleep'],
  },
  {
    id: 8,
    title: '3D printing robot parts - PLA vs PETG?',
    author: 'PrintMaster',
    avatar: 'PM',
    content: `I'm designing a robot chassis that I want to 3D print. The parts need to be durable enough to handle some impacts and support the weight of motors and batteries.\n\nI've been using PLA for everything so far, but I'm worried it might be too brittle for a robot that moves around.\n\nShould I switch to PETG for better impact resistance? Or is PLA good enough for indoor robots?\n\nAlso interested in hearing about TPU for wheels and flexible parts.`,
    category: '3D Printing',
    replies: 7,
    views: 98,
    likes: 5,
    lastActive: '3 days ago',
    createdAt: '2026-07-19',
    tags: ['3d-printing', 'pla', 'petg', 'robotics'],
  },
  {
    id: 9,
    title: 'How I automated my entire home with $200',
    author: 'BudgetBot',
    avatar: 'BB',
    content: `Here's how I set up a full smart home without breaking the bank:\n\n**Hub:** Raspberry Pi 4 ($35)\n**Protocol:** Zigbee via SONOFF Zigbee 3.0 USB Dongle ($16)\n**Sensors:** Aqara door/window sensors x4 ($40)\n**Plugs:** IKEA TRADFRI smart plugs x6 ($48)\n**Lights:** IKEA TRADFRI bulbs x4 ($40)\n**Software:** Home Assistant (free)\n\nTotal: ~$179\n\nI avoided WiFi devices because they crowd the 2.4GHz band and need cloud accounts. Zigbee runs on its own mesh network and everything works locally.\n\nHappy to share my Home Assistant configs!`,
    category: 'Projects',
    replies: 23,
    views: 445,
    likes: 31,
    lastActive: '12 hours ago',
    createdAt: '2026-07-26',
    tags: ['home-assistant', 'zigbee', 'budget', 'project'],
  },
  {
    id: 10,
    title: 'Arduino IDE 2.0 vs PlatformIO - which do you prefer?',
    author: 'CodeCrafter',
    avatar: 'CC',
    content: `I've been using Arduino IDE for years but recently tried PlatformIO in VS Code. The experience is completely different.\n\n**Arduino IDE 2.0 pros:**\n- Familiar interface\n- Easy library management\n- Built-in serial monitor\n\n**PlatformIO pros:**\n- IntelliSense code completion\n- Multi-board project support\n- Better debugging\n- Library dependency management\n- Test framework built in\n\nI'm leaning towards PlatformIO for anything serious, but Arduino IDE for quick prototyping. What's your workflow?`,
    category: 'General',
    replies: 14,
    views: 203,
    likes: 9,
    lastActive: '1 day ago',
    createdAt: '2026-07-23',
    tags: ['arduino', 'platformio', 'ide', 'development'],
  },
];

export const forumReplies: ForumReply[] = [
  // Thread 1 - Power supply
  { id: 1, threadId: 1, author: 'PiWizard', avatar: 'PW', content: 'I use the official Raspberry Pi PSU and it has been rock solid. But I also tried a CanaKit 5.1V/3.5A supply that worked fine. Just make sure it provides at least 3A.', likes: 4, createdAt: '2 hours ago' },
  { id: 2, threadId: 1, author: 'ElecEng', avatar: 'EE', content: 'For your setup with 15 sensors, I\'d recommend a 5V/4A supply minimum. The official one might struggle. Check the Anker PowerPort series.', likes: 2, createdAt: '1 hour ago', isSolution: true },

  // Thread 2 - Arduino vs ESP32
  { id: 3, threadId: 2, author: 'ESP32Fan', avatar: 'EF', content: 'ESP32 all the way. Built-in WiFi/BT, faster processor, more RAM, and it\'s cheaper than an Arduino Uno. The only downside is the 3.3V logic level.', likes: 8, createdAt: '3 hours ago' },
  { id: 4, threadId: 2, author: 'ArduinoFan', avatar: 'AF', content: 'Don\'t dismiss Arduino if you already have shields. An Arduino Mega with an ESP8266 for WiFi is a solid combo and uses your existing hardware.', likes: 5, createdAt: '2 hours ago' },
  { id: 5, threadId: 2, author: 'TechTina', avatar: 'TT', content: 'Thanks everyone! I think I\'ll go with ESP32 for new projects and keep the Arduino for my existing sensor network.', likes: 3, createdAt: '1 hour ago', isSolution: true },

  // Thread 3 - Servo jitter
  { id: 6, threadId: 3, author: 'ServoPro', avatar: 'SP', content: 'This sounds like a PWM timing issue. Try using a library like ServoEasing which uses smoother acceleration curves instead of the standard Servo library.', likes: 3, createdAt: '5 hours ago' },
  { id: 7, threadId: 3, author: 'RoboRaj', avatar: 'RR', content: 'ServoEasing helped a lot! The jitter is much reduced now. Still slight movement but way better than before.', likes: 2, createdAt: '3 hours ago', isSolution: true },

  // Thread 9 - Budget home automation
  { id: 8, threadId: 9, author: 'HomeAssistantPro', avatar: 'HA', content: 'This is a great setup! I\'d add a Shelly relay for hardwired switches. Much more reliable than smart bulbs for main lighting.', likes: 6, createdAt: '10 hours ago' },
  { id: 9, threadId: 9, author: 'BudgetBot', avatar: 'BB', content: 'Good call! I actually added a Shelly 1PM for my hallway lights last week. Works perfectly with Home Assistant.', likes: 4, createdAt: '8 hours ago', isSolution: true },
];
