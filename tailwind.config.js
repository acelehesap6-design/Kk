/** @type {import('tailwindcss').Config} *//** @type {import('tailwindcss').Config} */

module.exports = {module.exports = {

  darkMode: ["class"],  darkMode: ["class"],

  content: [  content: [

    './pages/**/*.{ts,tsx}',    './pages/**/*.{ts,tsx}',

    './components/**/*.{ts,tsx}',    './components/**/*.{ts,tsx}',

    './app/**/*.{ts,tsx}',    './app/**/*.{ts,tsx}',

    './src/**/*.{ts,tsx}',    './src/**/*.{ts,tsx}',

    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',  ],

  ],  theme: {

  prefix: "",    container: {

  theme: {      center: true,

    container: {      padding: "2rem",

      center: true,      screens: {

      padding: "2rem",        "2xl": "1400px",

      screens: {      },

        "2xl": "1400px",    },

      },    extend: {

    },      colors: {

    extend: {        border: "hsl(var(--border))",

      colors: {        input: "hsl(var(--input))",

        tremor: {        ring: "hsl(var(--ring))",

          brand: {        background: "hsl(var(--background))",

            faint: "#eff6ff", // blue-50        foreground: "hsl(var(--foreground))",

            muted: "#bfdbfe", // blue-200        primary: {

            subtle: "#60a5fa", // blue-400          DEFAULT: "hsl(var(--primary))",

            DEFAULT: "#3b82f6", // blue-500          foreground: "hsl(var(--primary-foreground))",

            emphasis: "#1d4ed8", // blue-700        },

            inverted: "#ffffff", // white        secondary: {

          },          DEFAULT: "hsl(var(--secondary))",

          background: {          foreground: "hsl(var(--secondary-foreground))",

            muted: "#f9fafb", // gray-50        },

            subtle: "#f3f4f6", // gray-100        destructive: {

            DEFAULT: "#ffffff", // white          DEFAULT: "hsl(var(--destructive))",

            emphasis: "#374151", // gray-700          foreground: "hsl(var(--destructive-foreground))",

          },        },

          border: {        muted: {

            DEFAULT: "#e5e7eb", // gray-200          DEFAULT: "hsl(var(--muted))",

          },          foreground: "hsl(var(--muted-foreground))",

          ring: {        },

            DEFAULT: "#e5e7eb", // gray-200        accent: {

          },          DEFAULT: "hsl(var(--accent))",

          content: {          foreground: "hsl(var(--accent-foreground))",

            subtle: "#9ca3af", // gray-400        },

            DEFAULT: "#6b7280", // gray-500        popover: {

            emphasis: "#374151", // gray-700          DEFAULT: "hsl(var(--popover))",

            strong: "#111827", // gray-900          foreground: "hsl(var(--popover-foreground))",

            inverted: "#ffffff", // white        },

          },        card: {

        },          DEFAULT: "hsl(var(--card))",

        border: "hsl(var(--border))",          foreground: "hsl(var(--card-foreground))",

        input: "hsl(var(--input))",        },

        ring: "hsl(var(--ring))",      },

        background: "hsl(var(--background))",      borderRadius: {

        foreground: "hsl(var(--foreground))",        lg: "var(--radius)",

        primary: {        md: "calc(var(--radius) - 2px)",

          DEFAULT: "hsl(var(--primary))",        sm: "calc(var(--radius) - 4px)",

          foreground: "hsl(var(--primary-foreground))",      },

        },      keyframes: {

        secondary: {        "accordion-down": {

          DEFAULT: "hsl(var(--secondary))",          from: { height: 0 },

          foreground: "hsl(var(--secondary-foreground))",          to: { height: "var(--radix-accordion-content-height)" },

        },        },

        destructive: {        "accordion-up": {

          DEFAULT: "hsl(var(--destructive))",          from: { height: "var(--radix-accordion-content-height)" },

          foreground: "hsl(var(--destructive-foreground))",          to: { height: 0 },

        },        },

        muted: {      },

          DEFAULT: "hsl(var(--muted))",      animation: {

          foreground: "hsl(var(--muted-foreground))",        "accordion-down": "accordion-down 0.2s ease-out",

        },        "accordion-up": "accordion-up 0.2s ease-out",

        accent: {      },

          DEFAULT: "hsl(var(--accent))",    },

          foreground: "hsl(var(--accent-foreground))",  },

        },  plugins: [require("tailwindcss-animate")],

        popover: {}
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      fontSize: {
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require("tailwindcss-animate")],
}