module.exports = {
    transform: {
      '^.+\\.(ts|js)$': 'babel-jest',  // Utilise babel-jest pour transpiler TS et JS
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/test/**/*.test.ts'],  // Spécifie l'extension .test.ts pour les tests
    extensionsToTreatAsEsm: ['.ts'],      // Indique que les fichiers .ts sont des modules ES
  };
  