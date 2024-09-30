module.exports = {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',  // Transform JavaScript and JSX using babel-jest
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)',  // Transform axios even though it's inside node_modules
    ],
    testEnvironment: 'jsdom',  // Use jsdom if testing React components
    moduleFileExtensions: ['js', 'jsx'],
  };
  