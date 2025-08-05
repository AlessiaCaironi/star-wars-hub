# Star Wars Hub

Star Wars Hub is a React application that lets you explore the Star Wars universe through films and related resources, using [swapi-ts](https://github.com/AlessiaCaironi/swapi-ts) as the data source.

## Technologies

- **React** with **TypeScript**
- **Vite** with **SWC** as the build tool
- **pnpm** as the package manager

## Dependencies

- **Material UI (MUI)** for customizable UI components and theming
- **react-router-dom** for client-side routing and navigation
- **swapi-ts** for fetching all film and resource data
- **Prettier** and **ESLint** for code formatting and linting

## Features

- **Home page:** Displays a list of Star Wars films as cards, ordered by release date, episode number or title. Each card shows the film's cover (with title and episode number), release date and director. Clicking a card navigates to the film details page.
- **Film details:** Shows general information about the film (episode number, director, producer, release date and opening crawl) and a list of related resources (characters, planets, starships, vehicles, species). Clicking on a resource navigates to its detail page.
- **Character details:** Shows general information about a character (gender, birth year, height, mass, hair color, eye color, skin color) and a list of related resources (homeworld, species, films, piloted vehicles and starships). Clicking on a resource navigates to its detail page.
- **Planet details:** Shows general information about a planet (climate, terrain, population, diameter, gravity, rotation period, orbital period, surface water) and a list of related resources (residents and films). Clicking on a resource navigates to its detail page.
- **Species details:** Shows general information about a species (classification, designation, average height, skin colors, hair colors, eye colors average lifespan, language) and a list of related resources (characters and films). Clicking on a resource navigates to its detail page.
- **Starship details:** Shows general information about a starship (model, manufacturer, cost in credits, length, crew, passengers, starship class, hyperdrive rating) and a list of related resources (pilots and films). Clicking on a resource navigates to its detail page.
- **Vehicle details:** Shows general information about a vehicle (model, manufacturer, cost in credits, length, crew, passengers, vehicle class) and a list of related resources (pilots and films). Clicking on a resource navigates to its detail page.

## Project Structure

- **public/** - Film cover images and other static assets
- **src/** - Source code
  - `main.tsx` - Application entry point
  - `App.tsx` - Main app component
  - **components/** - Reusable UI components
  - **router/** - Routing configuration
  - **routes/** - Page components (Film, Character, Planet, etc.)
  - **utils/** - Utility functions
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration

## Getting Started

### Prerequisites

- **Node.js** (see `.nvmrc` file for recommended version). Use the Node Version Manager [nvm](https://github.com/nvm-sh/nvm) to install and manage Node.js versions. For windows users, you can use [nvm-windows](https://github.com/coreybutler/nvm-windows).
- **pnpm** package manager. To install pnpm follow the instructions on the [pnpm website](https://pnpm.io/installation).

### Installation

Clone the repository and install dependencies:

```sh
pnpm install
```

### Running the App

```sh
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
pnpm build
```

### Linting & Formatting

```sh
pnpm lint
```

## API

Data is fetched from [swapi-ts](https://github.com/AlessiaCaironi/swapi-ts), a TypeScript wrapper for [SWAPI](https://swapi.py4e.com).  
This repository is a fork of [amitmtrn/swapi-ts](https://github.com/amitmtrn/swapi-ts); the only change is the API URL, since the original wrapper used swapi.dev, which currently has an invalid SSL certificate.

## Future Improvements

- Add a search feature to filter resources by type (e.g., characters, planets, etc.) and by name or title
