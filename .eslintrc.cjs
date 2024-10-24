module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/warnings",
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "18.2",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
      },
    },
  },
  plugins: [
    "import",
    "jsx-a11y",
    "react",
    "react-hooks",
    "react-refresh",
    "prettier",
    "tailwindcss",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      {
        allowConstantExport: true,
      },
    ],
    "no-unused-vars": "warn",
    eqeqeq: ["error", "always"],
    "tailwindcss/classnames-order": "warn",
    "tailwindcss/no-custom-classname": "off",
  },
};
