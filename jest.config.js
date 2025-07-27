module.exports = {
    preset: 'ts-jest/presets/default',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.ts$': ['ts-jest', { babelConfig: true }],
        '^.+\\.vue$': 'vue-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.ts$',
};
