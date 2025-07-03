## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# landing-MVP
Repo for the AIMS Team Ltd website - Domain: `aims.team`.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# Tools, Software, and Setup

This project uses the following software and tools:

| Tool/Technology     | Description                                                                                                                            |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| **Figma**           | Interface design tool used for UI/UX testing. Also collaborative                                                                       |
| **React/Next.js**   | React is a JavaScript library for building UIs; Next.js is a React framework for SSR/SSG apps.                                         |
| **Lighthouse**      | An open-source tool from Google to audit web performance, accessibility, SEO, and best practices.                                      |
| **Axe core**        | A JavaScript library for automated accessibility testing in web applications.                                                          |
| **Jest**            | A JavaScript testing framework for unit and integration tests, primarily used with React.                                              |
| **Playwright**      | A framework for end-to-end testing of web apps across modern browsers.                                                                 |
| **Tailwind CSS**    | A utility-first CSS framework for rapidly building custom UI components.                                                               |
| **Supabase**        | An open-source backend-as-a-service (BaaS) providing Postgres, Auth, Storage, and more.                                                |
| **GitHub Actions**  | CI/CD automation feature in GitHub for building, testing, and deploying code.                                                          |
| **JWT**             | JSON Web Tokens – a compact and secure way to transmit information between parties as a JSON object, commonly used for authentication. |
| **ReactFlow**       | A library for building node-based UIs and flow diagrams using React.                                                                   |
| **Zustand**         | A small, fast state-management library for React applications.                                                                         |
| **ffmpeg**          | A powerful CLI tool for processing and converting multimedia files (audio/video).                                                      |

Setup guides for each of these tools can be found in `docs/Setup.md` [here](docs/Setup.md), but ``README.md`` remains as the page to describe setting up
this project as a whole.

# Set Up Project

## 1. First time setup

1. Clone repository using SSH

```bash
git git@github.com:pihu-aims/landing-MVP.git
cd landing-MVP
```

2. Configure your name and email (if you haven't already):

```bash
git config --global user.name  "Your Full Name"
git config --global user.email "you@example.com"
```

## 2. The branch model

| Branch              | Purpose                      | Who merges?                                   |
| ------------------- | ---------------------------- | --------------------------------------------- |
| `main`              | Always stable & deploy-ready | **Ben** (Maintain) or **Mike** (Admin) |
| `feat/<short-slug>` | One feature or bug-fix       | You create & push                             |
| `docs/<slug>`       | Docs-only tweaks             | You                                           |
| `hotfix/<slug>`     | Urgent patch to production   | Coordinate with senior dev                    |

> **Never** commit directly to `main`. Protected-branch rules reject it.
TODO: Implement branch protection on this repo
>

## 3. Project structure

> [!NOTE]  
> Update as the project develops

> [!NOTE]  
> Update gitignore every time something new needs to be ignored

```
aaims-websiteMVP/ 
├── docs/                     // General Documentation
│   └── Setup.md              // How to set up specific software
├── .gitignore                // Gitignore
└── README.md                 // YOU ARE HERE

```

```
InvestorWebsite/
├── public/         # Static assets
├── src/
│   ├── assets/     # Images and other assets
│   ├── components/ # React components
│   ├── App.jsx     # Root component
│   └── main.jsx    # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md

```

### 4. Daily workflow

1. **Sync** before you start

   ```bash
   git checkout main
   git pull origin main
   ```

3. **Create a feature branch**

   ```bash
   git checkout -b feat/my-awesome-feature
   ```

4. **Work in small commits** (clear messages, run tests/linters locally).

5. **Push** and open a **Pull Request (PR)**:

   ```bash
   git push -u origin feat/my-awesome-feature
   ```

    * GitHub auto-creates the PR page; fill in **What & Why**.
    * Link the relevant Issue (e.g. “Closes #42”).
    * Leave it in **Draft** if you’re still coding.

6. **Review phase**

    * GitHub requests review from the **CODEOWNERS** of the files you touched (usually your senior dev).
    * Respond to comments, push fixes → the PR updates automatically.

7. **Approval & merge**

    * Once Ben approves, they hit **Merge** (squash-merge into `main`).
    * If they’re unsure, they’ll add **@Mike N** (lead) for a second opinion.
    * After merge, GitHub auto-deletes your branch.

Start the next task from a fresh branch off an updated `main`.

### 5. Escalation path

* **Normal path**: You → Ben (reviews & merges)
* **If the senior dev needs help**: Ben adds **@Mike N** as reviewer → Mike decides/merges.
* **Do *not* ping the lead first**—always try Ben review before escalation.

---

### 6. Commit & PR etiquette

* **One logical change per PR** — easier to review & revert.
* Prefix commit titles with *feat:*, *fix:*, *docs:* etc.
* Use GitHub’s **Draft PR** when work is unfinished; convert to “Ready for review” when tests pass.
* Mark non-blocking comments with **(nit)** so reviewers know what’s optional.
	@FindBy(css="")
	private WebElement webElement;
	@FindBy(css="")
	private WebElement webElement;

