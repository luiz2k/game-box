import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-1": "#141412",
        "black-2": "#32322F",
        "black-3": "#3A3A35",
        "white-1": "#F3F4F6",
        "accent-1": "#0284C7",
        "accent-2": "#036BA1",
        "accent-3": "#075A85",
      },
    },
  },
  plugins: [],
} satisfies Config;
