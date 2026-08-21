# Imaginify AI

![Preview Image](https://github.com/Mubassim-Khan/Imaginify-AI/blob/master/public/assets/images/Preview.png)

<div align="center">
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" />
    <img src="https://img.shields.io/badge/-Stripe-%23563D7C.svg?style=for-the-badge&logo=stripe&logoColor=white" alt="stripe" />
    <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn-ui" />
    <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white" alt="cloudinary" />
</div>

## 📋 <a name="table">Table of Contents</a>

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## <a name="introduction">Introduction</a>

This repository contains the code of a powerful AI SaaS platform, image manipulation tool that leverages cutting-edge AI techniques effortlessly. It excels in image processing capabilities, integrates a secure payment infrastructure, offers advanced image search functionalities, and supports multiple AI features, including image restoration, recoloring, object removal, generative filling, and background removal.

## <a name="features">Features</a>

👉 **Authentication and Authorization**: Secure user access with registration, login, and route protection.

👉 **Community Image Showcase & Advanced Search**: Explore user transformations with pagination and quickly find images using advanced content-based or object-based search.

👉 **AI-Powered Image Editing**: Transform images with features like restoration, recoloring, generative fill, object removal, and background extraction.

👉 **Image Management & Downloads**: Save, share, view details, and manage (delete/update) your transformed images effortlessly.

👉 **Credits System & Purchase**: Earn, purchase, and track credits for image transformations securely through Stripe.

👉 **Profile Page**: Access personal transformed images, view credit info, and manage account details.

👉 **Responsive Design**: Enjoy a seamless experience across devices with an intuitive and user-friendly interface.

## <a name="tech-stack">Tech Stack 🛠️</a>

- [Next.js](https://nextjs.org/) - React.js Framework
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Shadcn](https://ui.shadcn.com/) - Open Source UI library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/) - Cloud Database
- [Stripe](https://stripe.com/) - Payment Processing Platform
- [Auth.js](https://authjs.dev/) - Credentials authentication and server sessions
- [Cloudinary](https://cloudinary.com/) - Cloud-based Image & Video management service
- [Prettier](https://prettier.io/) - Code Formatter

## <a name="#quick-start">Getting Started</a>

To get started with this project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Mubassim-Khan/Imaginify-AI.git
```

2. Open the project in your preferred code editor.

3. Install the project dependencies using npm:

```bash
npm install
```

4. Set Up Environment Variables by creating a new file named `.env.local` in the root of your project and add the following variables:

```env
#NEXT
NEXT_PUBLIC_SERVER_URL=

#MONGODB
MONGODB_URL=

#AUTH.JS (generate with: npx auth secret)
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

#CLOUDINARY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

#STRIPE
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

Replace the placeholder values with your MongoDB, Cloudinary, and Stripe credentials. Auth.js credentials are stored securely in MongoDB using bcrypt password hashes.

5. Run the project

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

7. To configure payment webhooks, refer to the [Stripe documentation](https://docs.stripe.com/webhooks).

## <a name="license">License</a>

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## <a name="contributing">Contributing</a>

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## <a name="acknowledgements">Acknowledgements</a>

- Copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

## <a name="contact">Contact</a>

If you have any questions, suggestions, or feedback, you can reach out to the project maintainer:

- LinkedIn : [Mubassim Ahmed Khan](https://www.linkedin.com/in/mubassim)
- Email: [mubassimkhan@gmail.com](mailto:mubassimkhan@gmail.com)

---

<!----->
