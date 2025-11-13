# E-commerce Landing (Next.js + Tailwind)

A demo **e-commerce landing page** built with **Next.js (App Router)**, **Tailwind CSS**, **Zustand**, **Radix UI**, **React Hook Form + Zod**, and **Axios**.  
This project showcases a fully interactive frontend with authentication, product management, and a shopping cart — all without a backend database.

---

## Features

### Landing Page
- Hero section with **carousel/slider** for featured products.
- Smooth **animations**: scroll, hover effects, and transitions.
- **Product grid** with lazy-loaded components.
- **Cart icon** with dynamic item count.
- Cart modal with product details, quantity controls, and checkout success popup.

### Authentication & Profile
- **Sign Up / Sign In** using React Hook Form + Zod for validation.
- **User state** stored in **Zustand** (simulated persistence, no DB required).
- **Profile completion**: upload avatar and complete profile, stored in localStorage.
- Profile image displayed in the navbar.

### Product Management
- **Logged-in users** can add products via modal form.
- Newly added products **appear dynamically** in the product grid.
- Any visitor can **add products to the cart**.

### API & Data
- Uses **Fake Store API** for initial product list via Axios.
- Error handling with **toast notifications** (Sonner).
- Clean separation of concerns:
  - `components/` – reusable UI components
  - `stores/` – Zustand stores for user, products, and cart
  - `hooks/` – custom hooks for API calls and state management
  - `lib/` – Axios instance & utilities

### UI & Styling
- Fully **responsive design** with Tailwind CSS.
- **Shadcn UI based on Radix UI modals** for authentication, profile completion, and product/cart modals.
- Smooth hover and animation effects for modern look.

---

## Live Demo
[View Live on Vercel](https://sentinel-inky.vercel.app/)

---

## Getting Started Locally

1. **Clone the repository**

```bash
git clone https://github.com/rayamenah/ecommerce-landing.git
cd sentinel
