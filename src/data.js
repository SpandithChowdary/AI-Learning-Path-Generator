import automationImg from './img/automation.webp';
import avionicsEngineerImg from './img/avonics engineer.webp';
import blockchainImg from './img/blockchain.webp';
import cfdImg from './img/cfd.webp';
import communicationEngineerImg from './img/communication engineer.webp';
import datascienceImg from './img/datascience.webp';
import droneDeveloperImg from './img/drone developer.webp';
import fullstackImg from './img/fullstack.webp';
import roboticsImg from './img/robotics.webp';
import thermalEngineeringImg from './img/thermal engineering.webp';

  const cardData = [
    {
      title: "Full Stack Developer",
      desc: "Build modern web applications from front to back",
      duration: "8–12 months",
      img: fullstackImg
    },
    {
      title: "Data Scientist",
      desc: "Master data analysis, machine learning, and statistical modeling",
      duration: "6–9 months",
      img: datascienceImg
    },
    {
      title: "Blockchain Developer",
      desc: "Build decentralized apps and smart contracts",
      duration: "6–8 months",
      img: blockchainImg
    },
    {
      title: "Automation Engineer",
      desc: "Design industrial automation and control systems",
      duration: "6–9 months",
      img: automationImg
    },
    {
      title: "Avionics Engineer",
      desc: "Develop electronic systems for aviation and spacecraft",
      duration: "7–10 months",
      img: avionicsEngineerImg
    },
    {
      title: "CFD Engineer",
      desc: "Simulate fluid and airflow dynamics in design",
      duration: "6–9 months",
      img: cfdImg
    },
    {
      title: "Communication Systems Engineer",
      desc: "Work on wireless, satellite, and optical networks",
      duration: "6–9 months",
      img: communicationEngineerImg
    },
    {
      title: "Drone Developer",
      desc: "Design and operate unmanned aerial vehicles (UAVs)",
      duration: "5–8 months",
      img: droneDeveloperImg
    },
    {
      title: "Robotics Engineer",
      desc: "Build intelligent and automated robotic systems",
      duration: "8–10 months",
      img: roboticsImg
    },
    {
      title: "Thermal Engineer",
      desc: "Work on heat transfer, cooling, and HVAC systems",
      duration: "6–9 months",
      img: thermalEngineeringImg
    }
  ];
  const courseList = [
    // Computer Science / IT / Software
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Cybersecurity Analyst",
    "AI/ML Engineer",
    "Blockchain Developer",
    "Cloud Architect",
    "Game Developer",
    "AR/VR Developer",
    "Quantum Computing Specialist",
    "Data Engineer",
    "UI/UX Designer",
    "Software Tester",
    "Database Administrator",
    "Network Engineer",
    "Ethical Hacker",
    "Digital Forensics Expert",
    "Bioinformatics Specialist",
    "Cloud Security Specialist",
    "5G Network Specialist",

    // Electronics & Communication
    "Embedded Systems Engineer",
    "VLSI Design Engineer",
    "Communication Systems Engineer",
    "IoT Developer",
    "RF Engineer",
    "Signal Processing Engineer",
    "Telecom Engineer",
    "PCB Design Engineer",
    "Robotics Hardware Engineer",
    "Satellite Communications Engineer",
    "Radar Systems Engineer",
    "Semiconductor Process Engineer",

    // Electrical Engineering
    "Electrical Design Engineer",
    "Power Systems Engineer",
    "Automation Engineer",
    "Renewable Energy Engineer",
    "Smart Grid Engineer",
    "High Voltage Engineer",
    "Electrical Safety Engineer",
    "Control Systems Engineer",
    "Power Electronics Engineer",
    "Energy Storage Specialist",
    "Electrical Maintenance Engineer",
    "Wiring Harness Designer",

    // Mechanical & Automotive
    "CAD Design Engineer",
    "Thermal Engineer",
    "Automobile Engineer",
    "Robotics Engineer",
    "HVAC Engineer",
    "Mechatronics Engineer",
    "Piping Design Engineer",
    "CNC Programming Specialist",
    "Quality Control Engineer",
    "Industrial Engineer",
    "Maintenance Engineer",
    "Hydraulics Engineer",
    "Marine Engineer",
    "Tool Design Engineer",
    "Composite Materials Engineer",

    // Aerospace & Aeronautical
    "Aerospace Engineer",
    "CFD Engineer",
    "Avionics Engineer",
    "Drone Developer",
    "Aircraft Maintenance Engineer",
    "Propulsion Engineer",
    "Flight Test Engineer",
    "Space Systems Engineer",
    "Satellite Systems Engineer",
    "Aerodynamics Specialist",
    "Missile Guidance Engineer",

    // Civil & Construction
    "Structural Engineer",
    "Geotechnical Engineer",
    "Transportation Engineer",
    "Environmental Engineer",
    "Water Resource Engineer",
    "Construction Manager",
    "Urban Planner",
    "Quantity Surveyor",
    "Land Surveyor",
    "Earthquake Engineer",
    "Highway Engineer",
    "Bridge Engineer",
    "Tunnel Engineer",
    "Offshore Structure Engineer",

    // Chemical & Process
    "Process Engineer",
    "Petroleum Engineer",
    "Polymer Engineer",
    "Biochemical Engineer",
    "Pharmaceutical Engineer",
    "Food Process Engineer",
    "Nanotechnology Engineer",
    "Corrosion Engineer",
    "Fertilizer Technology Specialist",
    "Oil & Gas Pipeline Engineer",

    // Biomedical & Healthcare
    "Biomedical Engineer",
    "Clinical Engineer",
    "Medical Imaging Specialist",
    "Prosthetics Designer",
    "Healthcare Data Analyst",
    "Tissue Engineering Specialist",
    "Biomechanics Engineer",
    "Rehabilitation Engineer",
    "Medical Device Designer",
    "Neural Engineer",

    // Agriculture & Food Technology
    "Agricultural Engineer",
    "Food Technologist",
    "Dairy Technology Specialist",
    "Irrigation Engineer",
    "Precision Agriculture Specialist",
    "Post-Harvest Technology Engineer",
    "Aquaculture Engineer",
    "Agricultural Robotics Engineer",

    // Textile & Fashion
    "Textile Engineer",
    "Fashion Technology Specialist",
    "Apparel Production Manager",
    "Technical Textiles Developer",
    "Color Matching Specialist",
    "Fabric Quality Controller",

    // Marine & Ocean
    "Naval Architect",
    "Ocean Engineer",
    "Underwater Robotics Engineer",
    "Offshore Engineer",
    "Marine Systems Engineer",
    "Port Management Specialist",

    // Mining & Metallurgy
    "Mining Engineer",
    "Metallurgical Engineer",
    "Mineral Processing Engineer",
    "Geological Engineer",
    "Tunneling Engineer",
    "Mine Safety Engineer",

    // Environmental & Sustainability
    "Environmental Engineer",
    "Sustainability Consultant",
    "Waste Management Specialist",
    "Air Quality Engineer",
    "Water Treatment Specialist",
    "Environmental Data Analyst",
    "Carbon Footprint Analyst",
    "Renewable Energy Consultant",

    // Business & Management
    "Project Manager",
    "Product Manager",
    "Business Analyst",
    "Supply Chain Manager",
    "Operations Manager",
    "HR Specialist",
    "Digital Marketing Specialist",
    "Financial Analyst",
    "Risk Management Consultant",
    "Entrepreneurship Coach",

    // Design & Creative
    "Graphic Designer",
    "3D Modeling Artist",
    "Animation Specialist",
    "Video Editor",
    "Architectural Visualizer",
    "Game Designer",
    "Sound Engineer",
    "Lighting Designer",
    "Exhibition Designer",

    // Emerging Technologies
    "Metaverse Developer",
    "Web3 Developer",
    "Generative AI Specialist",
    "Autonomous Vehicle Engineer",
    "Human-Robot Interaction Designer",
    "Smart City Planner",
    "Digital Twin Specialist",
    "Edge Computing Engineer",

    "Computational Biologist",
    "Neurotechnology Engineer",
    "Space Tourism Specialist",
    "Cryogenic Systems Engineer",
    "Exoskeleton Designer",
    "Vertical Farming Technologist",
    "Disaster Management Engineer",
    "Sports Technology Analyst",
    "Forensic Engineer",
    "Circular Economy Specialist",
    "Blue Energy Engineer",
    "Haptic Technology Developer",
    "Smart Textiles Engineer",
    "Digital Health Architect",
    "Quantum Cryptographer",

    // Industrial & Manufacturing
    "Additive Manufacturing Expert (3D Printing)",
    "Industrial Robotics Programmer",
    "Lean Manufacturing Specialist",
    "Six Sigma Black Belt",
    "Packaging Technology Engineer",
    "Ergonomics Consultant",
    "Non-Destructive Testing Engineer",
    "Metrology Engineer",
    "Factory Automation Specialist",
    "Process Optimization Engineer",
    "Industrial IoT Solutions Architect",

    // Energy Sector
    "Nuclear Energy Engineer",
    "Wind Turbine Technician",
    "Solar Power Plant Designer",
    "Hydroelectric Systems Engineer",
    "Biofuel Production Engineer",
    "Energy Efficiency Consultant",
    "Carbon Capture Specialist",
    "Hydrogen Fuel Cell Engineer",
    "Geothermal Energy Technician",
    "Energy Storage System Designer",
    "Microgrid Engineer",

    // Transportation & Logistics
    "Hyperloop Systems Engineer",
    "EV Battery Technologist",
    "Autonomous Vehicle Software Engineer",
    "Rail Systems Engineer",
    "Transportation Planner",
    "Drone Traffic Manager",
    "Maritime Logistics Specialist",
    "Fleet Management Analyst",
    "Intelligent Transport Systems Engineer",
    "Last-Mile Delivery Solutions Architect",

    // Materials Science
    "Graphene Applications Specialist",
    "Nanomaterials Engineer",
    "Biomaterials Developer",
    "Smart Materials Researcher",
    "Ceramics Engineering Specialist",
    "Corrosion Prevention Engineer",
    "Composite Materials Designer",
    "Metallurgical Failure Analyst",
    "Polymer Scientist",
    "Semiconductor Materials Expert",

    // Construction Tech & Real Estate
    "BIM (Building Information Modeling) Specialist",
    "Green Building Consultant",
    "Construction Robotics Engineer",
    "Prefabrication Technology Expert",
    "Real Estate Tech Developer",
    "Facility Management Professional",
    "Acoustical Engineering Consultant",
    "Fire Protection Engineer",
    "Seismic Retrofitting Specialist",
    "Smart Home Systems Integrator",

    // Media & Entertainment Tech
    "Virtual Production Specialist",
    "Motion Capture Technician",
    "Game Engine Developer",
    "Digital Audio Workstation Specialist",
    "Streaming Technology Engineer",
    "Broadcast Systems Engineer",
    "Cinema Projection Technologist",
    "Lighting Control Programmer",
    "Stage Automation Engineer",
    "Theme Park Ride Designer",

    // Defense & Security
    "Ballistics Engineer",
    "Military Communications Specialist",
    "Surveillance Systems Engineer",
    "Electronic Warfare Technician",
    "Armored Vehicle Designer",
    "Cryptographic Systems Engineer",
    "Border Security Technology Expert",
    "Unmanned Systems Operator",
    "CBRN (Chemical, Biological, Radiological, Nuclear) Defense Specialist",
    "Cyber-Physical Systems Security Analyst",

    // Food Tech & Culinary Science
    "Food Robotics Engineer",
    "Alternative Protein Developer",
    "Precision Fermentation Technologist",
    "Food Packaging Innovator",
    "Sensory Science Specialist",
    "Brewing Technology Expert",
    "Food Safety Auditor",
    "Agricultural Drone Operator",
    "Vertical Farm Designer",
    "Smart Kitchen Systems Engineer",

    // Space Tech
    "Space Habitat Designer",
    "Satellite Constellation Engineer",
    "Space Mining Technologist",
    "Rocket Propulsion Specialist",
    "Planetary Rover Designer",
    "Space Tourism Hospitality Manager",
    "Space Law Consultant",
    "Astrobiology Researcher",
    "Space Weather Analyst",
    "Zero-G Manufacturing Specialist",

    // Vocational & Technical
    "Industrial Welding Specialist",
    "HVAC-R Technician",
    "Elevator & Escalator Mechanic",
    "Robotics Maintenance Technician",
    "CNC Machine Operator",
    "Industrial Electrician",
    "Automotive Diagnostics Expert",
    "Aviation Maintenance Technician",
    "Marine Diesel Mechanic",
    "Photonics Technician",

    // Education & Research
    "STEM Education Specialist",
    "Technical Curriculum Developer",
    "Research Methodology Consultant",
    "Laboratory Design Engineer",
    "Science Communication Specialist",
    "Patent Analyst",
    "Technology Transfer Officer",
    "Experimental Physicist",
    "Computational Chemistry Specialist",
    "Museum Technology Conservator",

    // Government & Policy
    "Technology Policy Analyst",
    "Urban Innovation Officer",
    "Digital Infrastructure Planner",
    "Standards & Compliance Engineer",
    "Public Health Technologist",
    "Disaster Recovery Planner",
    "Critical Infrastructure Protection Specialist",
    "Government Cybersecurity Auditor",
    "Smart Nation Solutions Architect",
    "Digital Governance Consultant",

    // Specialized IT Fields
    "Mainframe Modernization Specialist",
    "Legacy Systems Migration Expert",
    "Low-Code/No-Code Developer",
    "Edge AI Engineer",
    "Data Privacy Consultant",
    "Fintech Solutions Architect",
    "RegTech Compliance Developer",
    "Conversational AI Designer",
    "Digital Twin Developer",
    "Neuromorphic Computing Engineer",

    // Human-Centered Tech
    "Assistive Technology Designer",
    "Gerontechnology Specialist",
    "Child Safety Tech Developer",
    "Universal Design Consultant",
    "Cognitive Accessibility Engineer",
    "Wearable Health Tech Designer",
    "Emotional AI Researcher",
    "Brain-Computer Interface Developer",
    "HCI (Human-Computer Interaction) Expert",
    "Digital Wellness Consultant"

  ];


  export  { cardData, courseList };