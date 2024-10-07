
# Habitable Exo Planets (HEP)

Approach to Solving the Problem Statement Methodology: 

**Data Acquisition & Preprocessing:** We utilized the NASA Exoplanet Archive to gather detailed information on exoplanetary systems, including stellar and planetary properties like stellar radius, planetary radius, planet-star distance, and more. 

**Algorithmic Calculation:** A custom Python algorithm was developed to evaluate the habitability and detectability of exoplanets. Key calculations include: 

* Habitable Zone: Calculated using stellar luminosity.

* Equilibrium Temperature: Determined based on stellar effective temperature, Planet-star distance, and planetary albedo.
  
* Angular Separation & Contrast: Used to assess the detectability of the planet with various telescope parameters (e.g., HWO telescope diameter). 
  
**Visualization with Three.js:** We employed Three.js with react-three-fiber to create an interactive 3D visualization of the habitability exoplanets. 

Exoplanet material textures were sourced from [solarsystemscope.com](https://www.google.com/), enhancing realism. The 3D models illustrate the position and potential habitability of the planets within their respective systems. 

Postprocessing & Drei: Used to enhance visuals with post-processing effects (e.g., lens flares and depth of field).


## Run Locally

Make sure you have **git** and **nodejs** installed in your system, clone the project

```bash
git clone https://github.com/ManojaD2004/nasa-space-app-2024-final-submission.git
```
### 1. Run the Client

Go to the project directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```
```bash
  npm run dev
```
If you need production build
```bash
  npm run build
```
```bash
  npm Start
```
### 2. Run the Server
Start the server

```bash
  cd server
```
```bash
  npm install
```
```bash
  node server.js
```

### 3. Alternative: Start with Docker
Be in the main directory, and run this command
```bash
  docker compose up
```

### 3. Python Algorithm Function
If you want to see Python detection Algorithm function, 
Be in the main directory, and run this command
```bash
  cd extra/python
```
You can delete data_clean.json, table_clean.csv, data.json, result.json, result_log.txt. 

Have main.py, convert.py, and table.csvtable.csv is the main data given by NASA. 

First run the convert.py and then main.py. See the changes.
```bash
  python convert.py
```
```bash
  python main.py
```

## Tech Stack

**Client:** [![](https://skillicons.dev/icons?i=threejs,react,tailwindcss,nextjs)](https://skillicons.dev)

ThreeJS (3d world models and animation in web using webgl), 

React Fiber (ReactJS, component level ThreeJS), 

TailwindCSS (CSS framework),

NextJS (ReactJS framework for multiple pages)

and many other dependencies.

**Server:** [![](https://skillicons.dev/icons?i=nodejs,expressjs,python)](https://skillicons.dev)

NodeJS, ExpressJS, Python (for algorithm function that calculates if the planet is habitable or not)

and many other dependencies.

## Demo

### You can view our project live here:

https://nasa-space-app-2024-final-submission.vercel.app/

(Habitable Calculator needs local hosting because APIs cannot be hosted in the cloud due to NodeJS and Python. Use Docker, to get full experience.)

### Demo video:

https://drive.google.com/file/d/10c2zV_csBfEZvCe-Avd9ZUCWMHQlkMwU/view?usp=sharing

### PPT presentation: 

https://docs.google.com/presentation/d/116jPHr5646btvyXds6QsIfEes21duy2d/edit#slide=id.p1

