# Habitable Exo Planets (HEP)

## Contents:

1. [Demo](#demo)
2. [Run Locally](#run-locally)
3. [Tech Stack](#tech-stack)
4. [Working](#working)

## Demo

### You can view our project live here:

https://nasa-space-app-2024-final-submission.vercel.app/

### Demo video:

https://drive.google.com/file/d/10c2zV_csBfEZvCe-Avd9ZUCWMHQlkMwU/view?usp=sharing

### PPT presentation:

https://docs.google.com/presentation/d/116jPHr5646btvyXds6QsIfEes21duy2d/edit#slide=id.p1

## Run Locally

### 1. Prerequisites Installation

Make sure you have the following things installed in your Local Machine. Or just have Docker installed.

1. **NodeJS** - [Click here to install it from their official website](https://nodejs.org/en).
2. **Python3** - [Install it from their official website](https://www.python.org/downloads/).
3. **Git** - [Install it from their official website](https://git-scm.com/downloads).

Or just have Docker installed.

4. **Docker** - [Install it from their official website](https://www.docker.com/).

Now you can clone this repository.

```bash
git clone https://github.com/ManojaD2004/nasa-space-app-2024-final-submission.git
```

### 2. Run the Client

Go to the project root directory, and run these commands

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Run NextJS development server

```bash
  npm run dev
```

If you need production build

```bash
  npm run build
  npm start
```

Go to [**_localhost:3000_**](http://localhost:3000) in any browser of your choice. And you will see your Application running.

### 3. Run the Server

Go to the project root directory, and run these commands

```bash
  cd server
```

Install dependencies and run the server

```bash
  npm install
  node server.js
```

The server is running in [**_localhost:5000_**](http://localhost:5000). You can test the APIs using [Postman](https://www.postman.com/) or any other software of your choice.

### 4. Alternative: Start with Docker

Be in the project root directory, and run this command

```bash
  docker compose up
```

### 5. Python Algorithm Function

If you want to see Python detection Algorithm function,
Be in the project root directory, and run this command

```bash
  cd extra/python
```

You can delete **data_clean.json, table_clean.csv, data.json, result.json, and result_log.txt**.

```bash
  rm data_clean.json
  rm table_clean.csv
  rm data.json
  rm result.json
  rm result_log.txt
```

Have main.py, convert.py, and table.csv. **table.csv** is the main data given by NASA.

First run the convert.py. See the changes.

```bash
  python convert.py
```

This should give you **data_clean.json, table_clean.csv, and data.json** in the current directory, for you to run main.py. You only need **data_clean.json** to run the main.py. Now run main.py.

```bash
  python main.py
```

You will get a **result.json** file that is used in a client side Web App for 3D Universe of ExoPlanet mapping. You can set the IS_LOGGING to True or False. This will log all the planets if it is habitable or not, and also store the log results in **result_log.txt**.

## Tech Stack

**Client:** [![](https://skillicons.dev/icons?i=threejs,react,tailwindcss,nextjs)](https://skillicons.dev)

1. [ThreeJS](https://threejs.org/) - 3D World Models and Animations in web using WebGL

2. [React Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) - ReactJS component level ThreeJS

3. [NextJS](https://nextjs.org/) - [ReactJS](https://react.dev/) framework for multiple pages with advance features

4. [TailwindCSS](https://tailwindcss.com/) - CSS framework

5. And many other dependencies. See **package.json** in the ./client directory

**Server:** [![](https://skillicons.dev/icons?i=nodejs,expressjs,python)](https://skillicons.dev)

1. [NodeJS](https://nodejs.org/en) - A JS runtime

2. [ExpressJS](https://expressjs.com/) - Minimalist HTTP server library

3. [Python](https://www.python.org) - Multi-purpose language used for algorithm function that calculates if a ExoPlanet is habitable or not

4. And many other dependencies. See **package.json** in the ./server directory

## Working

Approach to Solving the Problem Statement Methodology:

**Data Acquisition & Preprocessing:** We utilized the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars) to gather detailed information on exoplanetary systems, including stellar and planetary properties like stellar radius, planetary radius, planet-star distance, and more.

**Algorithmic Calculation:** A custom Python algorithm was developed to evaluate the habitability and detectability of exoplanets. Key calculations include:

- **Habitable Zone**: Calculated using stellar luminosity.

- **Equilibrium Temperature**: Determined based on stellar effective temperature, Planet-star distance, and planetary albedo.
- **Angular Separation & Contrast**: Used to assess the detectability of the planet with various telescope parameters (e.g., HWO telescope diameter).

**Visualization with Three.js:** We employed Three.js with react-three-fiber to create an interactive 3D visualization of the habitability exoplanets.

**Exoplanet material textures:** were sourced from [solarsystemscope.com](https://www.solarsystemscope.com/textures/), enhancing realism. The 3D models illustrate the position and potential habitability of the planets within their respective systems.

**Postprocessing & Drei**: Used to enhance visuals with post-processing effects (e.g., lens flares and depth of field).
