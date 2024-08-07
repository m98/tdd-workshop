module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['**/__tests__/**/*.(ts|tsx)', '**/?(*.)+(spec|test).(ts|tsx)'],
    collectCoverage: true, // Enable coverage collection
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}", // Specify the files for which you want to collect coverage
        "!src/**/*.d.ts"    // Exclude declaration files
    ],
    coverageDirectory: "coverage", // Directory where coverage information will be stored
    coverageReporters: ["json", "lcov", "text", "clover"], // Report formats
};
