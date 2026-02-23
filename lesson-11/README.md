# Lesson 11: Work Session

## Before You Start: Sync Your Fork

Because you are working from a fork, make sure your fork (and your Codespace) are up to date.

1. In the GitHub website, open **your fork** of this repo.
2. Click **Sync fork** (or **Fetch upstream**) and complete the prompts.
3. In your Codespace terminal (inside VS Code), pull the latest changes:

```bash
git pull
```

---

## Setup (2 Terminals)

1. Open **two terminals** in VS Code.

2. In **Terminal 1 (Client)**, run:

```bash
cd /workspaces/c2c-full-stack-102/lesson-11/app/client
```

Create `client/.env`:

```bash
cat > .env <<'EOF'
REACT_APP_API_BASE_URL=http://localhost:3001
EOF
```

Start the client:

```bash
npm install
npm start
```

This launches the React app on **http://localhost:3000**.

3. In **Terminal 2 (Server)**, run:

```bash
cd /workspaces/c2c-full-stack-102/lesson-11/app/server
```

Create `server/.env` (update `DB_PASSWORD` and `DB_NAME` to match your MySQL setup):

```bash
cat > .env <<'EOF'
# Environment configuration for the Express server
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=password
DB_NAME=ecommerce
PORT=3001
EOF
```

Start the server:

```bash
npm install
npm run dev
```

This runs the Express server with `nodemon` on **http://localhost:3001**.

---

## Section 1.1: Homepage Work

Update your featured products list by making changes to the `FeaturedProducts` component.

**Instructions:**

- **Locate the component:**
  - Find the `FeaturedProducts` component in your client codebase (commonly in `src/components/FeaturedProducts.js` or similar).

- **Where it appears:**
  - The `FeaturedProducts` component is rendered on the main shopping page (for example, in `src/pages/Shop.js` or `src/App.js`).
  - The area of the shopping page that displays featured products, product cards, or a gallery is directly controlled by this component.

- **What to update:**
  - Update the logic in `FeaturedProducts` to fetch products from your product database and render a small subset (e.g., five) as “featured.”
  - Any changes you make to this component will be visible in the featured products section of the shopping page.

**Tip:**
- Focus on how the component receives product data and how it displays each product.
- You do not need to include finished code here—use this README as a guide to help you identify what needs to be changed and where those changes will be visible in the app.

---

## Section 1.2: Open Work Time

Take the next 18 minutes to work on any aspect of your site that isn’t complete. This could be general styling, or addition of more components or features. Look through each of your pages and try to find points of improvement.

---

## Section 2.1: Feedback Session

View classmates’ websites and provide actionable feedback. Use the shared Google doc to leave “glow” (what works well) and “grow” (areas for improvement) feedback, plus general comments.

---

## Section 2.2: Using the Feedback

Take the next 10 minutes to use the feedback provided by your classmates and continue working on your site. Ask questions if you need help.

---

## Exit Ticket

Complete the exit ticket in Canvas. Review-based questions for today.

---

## Extension (Homework)

Continue working on your site outside of class. Prepare for the final day where you will present your website.
