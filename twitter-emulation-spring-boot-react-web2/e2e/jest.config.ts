import type { Config } from 'jest';

const config: Config = {
    // roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.js$": "babel-jest"
    },
    testRegex: "(/e2e/.*\\.(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    preset: "jest-puppeteer",
    transformIgnorePatterns: [
        "node_modules/(?!(@bundled-es-modules|msw)/)"
    ]
}

export default config;
