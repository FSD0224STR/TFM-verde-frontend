module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [   
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'react/prop-types': 'off',
    //Añadir reglas, el nombre de la regla lo vemos en la doc.
    quotes: ['warn', 'single'], //Cuando pones 0 es para quitar una regla que viene por defecto.
    indent: ["warn",8],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
     
    //Esto es para evitar los saltos de lineas vacios.

    
    "no-unused-vars": ["warn", { "vars": "local"}]
  
  
  }
}