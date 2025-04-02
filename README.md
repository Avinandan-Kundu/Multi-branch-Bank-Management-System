# Project Readme

## Project Pre-requisites
### Install Node.js® (Version 16.20.2 or higher)
In case you do not have Node.js already installed on your machine, please visit [this website](https://nodejs.org/en/download "Node.js Official Download Page") to download Node.js Version 16.20.2 or higher (latest LTS version is recommended). Once downloaded, install Node.js by following this [video tutorial](https://youtu.be/NqANV4wXhx4).

### Install Visual Studio Code (VS Code)
This project was created in VS Code development environment. Feel free to use any other code editor as per your choice. To download VS Code, please visit [this website](https://code.visualstudio.com/download) and download the latest and suitable version for your operating system. Once downloaded, install VS Code by following the on-screen instructions. Here is a [video tutorial](https://youtu.be/cu_ykIfBprI) to guide you during the installation process.

### Optional Requirements (Recommended)
#### Install Prettier Extension
Prettier is a VS Code extension used for formatting your code in an efficient and aesthetic manner. Refer to the screenshots provided below.

![image](https://github.com/user-attachments/assets/ff2e2be0-ec17-456d-ba25-1029c14ac1f4)

![image](https://github.com/user-attachments/assets/d12557b5-6dba-4da1-8b55-68d7e8cc4666)

![Screenshot 2025-04-01 144430](https://github.com/user-attachments/assets/8868c065-fb70-4f05-8cf0-b2b0f3af2f2d)

## Running the Project
### Download the Project ZIP folder
First, download the project folder to your PC. Refer to the screenshot below.

![image](https://github.com/user-attachments/assets/a864be22-0eae-48b2-8dea-0f03fb978139)

### Open the Project folder in VS Code
Next, extract the zip folder and open the extracted folder in VS Code.

### Run the project
To run the project, open a terminal in VS Code and then execute the following commands:

a) `npm install` OR `npm i`

![image](https://github.com/user-attachments/assets/cc9c3145-2c54-4470-8b21-e52a048583f6)

b) `npm run dev` and then `Ctrl + click` on the link to view the web application on your browser

![Screenshot 2025-04-01 151757](https://github.com/user-attachments/assets/41b6e9ef-6d4e-4ee3-97ef-115562381702)

![image](https://github.com/user-attachments/assets/d0c7b931-b699-4d69-ae87-c79bc7d4d0d0)

Refer to this [video tutorial](https://youtu.be/WIBSPhffOHI) to help guide you during running the project.

### Install Vite (Optional)
If you want to further develop and test the project, it is recommended that you install the Vite frontend tool by running the following command on the VS Code terminal:

`npm create vite@latest` and then typing 'y' upon request

## Viewing the Project Only
If you want to just view the web app (without the intention of further developing or testing it), simply visit [techfinance.netlify.app](https://techfinance.netlify.app)

***

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
