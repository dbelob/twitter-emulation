import type { Config } from 'jest';

const config: Config = {
    // roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        // "node_modules/@bundled-es-modules.+\\.js$": "babel-jest",
        // "node_modules/msw.+\\.js$": "babel-jest",
        "\\.js$": "babel-jest"
    },
    testRegex: "(/e2e/.*\\.(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    preset: "jest-puppeteer",
    transformIgnorePatterns: [
        "node_modules/(?!(@bundled-es-modules|msw)/)"
    ]
}

export default config;
