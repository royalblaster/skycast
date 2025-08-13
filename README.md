# SkyCast 🌤️

A modern, responsive weather application built with **Next.js** and powered by the [OpenWeatherMap API](https://openweathermap.org/api).  
SkyCast delivers accurate, real-time weather data with an elegant UI, featuring interactive charts and smooth design components.

---

## 🔥 Project Overview

SkyCast provides users with real-time weather updates and interactive visualizations tailored for any location worldwide. It is built with performance, scalability, and user experience in mind.

Key highlights include:

- Seamless integration with OpenWeatherMap API using secure serverless functions.
- Intuitive and responsive UI designed with Tailwind CSS and Shadcn components.
- Advanced state and data management using TanStack Query to optimize performance.
- Visual representation of weather data through dynamic, interactive Recharts graphs.
- Fully typed with TypeScript to ensure code robustness and maintainability.

---

## 🚀 Tech Stack

- **[Next.js](https://nextjs.org/)** – React framework for server-side rendering & static site generation
- **[React.js](https://react.dev/)** – UI library for building components
- **[TypeScript](https://www.typescriptlang.org/)** – Type safety and better developer experience
- **[TanStack Query](https://tanstack.com/query)** – Data fetching, caching & state management
- **[Recharts](https://recharts.org/en-US/)** – Charting library for weather data visualization
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework
- **[Shadcn/UI](https://ui.shadcn.com/)** – Beautiful, accessible UI components
- **[OpenWeatherMap API](https://openweathermap.org/api)** – Weather data provider

---

## 📦 Features

- 🌍 **Current weather data** by location
- 📈 **Interactive charts** for temperature, humidity, and more
- 📱 **Responsive design** for mobile, tablet, and desktop
- 🎨 **Modern UI** using Shadcn + Tailwind CSS

## Access the App

[https://skycast-fawn.vercel.app/](https://skycast-fawn.vercel.app/)

## ⚙️ Getting Started in Development Mode

1. **Clone the repository:**

```bash
git clone https://github.com/royalblaster/skycast.git
cd skycast
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables:**

- Create a `.env.local` file in the root directory.
- Add your OpenWeatherMap API key:

```
OPENWEATHER_API_KEY=your_api_key_here
```

> _Note:_ You need to obtain your own API key from [OpenWeatherMap](https://openweathermap.org/appid). This key is kept secure and is not included in the repository.

4. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

---

## 🛡️ Security

- Environment variables with sensitive data are excluded via `.gitignore`.
- Do not commit `.env.local` or any secret keys to version control.

---

## 📞 Contact

**Ehsan Ahmed**  
GitHub: [royalblaster](https://github.com/royalblaster)
