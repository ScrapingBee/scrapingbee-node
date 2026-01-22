# Changelog

## [1.8.2](https://github.com/ScrapingBee/scrapingbee-node/compare/v1.8.0...v1.8.2) (2026-01-22)

### Bugfix

-   Removed `"scrapingbee": "^1.1.0"` from `package.json` to prevent errors on Node Versions <24 caused by circular dependency.


## [1.8.1](https://github.com/ScrapingBee/scrapingbee-node/compare/v1.8.0...v1.8.1) (2026-01-21)

### Security

-   Fix npm vulnerabilities
-   Update Node version to use the last active LTS
-   Update GitHub Action workflows 

## [1.8.0](https://github.com/ScrapingBee/scrapingbee-node/compare/v1.7.5...v1.8.0) (2026-01-19)

### Features

-   Added `htmlApi()` method for HTML API
-   Added `googleSearch()` method for Google Search API
-   Added `amazonSearch()` method for Amazon Search API
-   Added `amazonProduct()` method for Amazon Product API
-   Added `walmartSearch()` method for Walmart Search API
-   Added `walmartProduct()` method for Walmart Product API
-   Added `youtubeSearch()` method for YouTube Search API
-   Added `youtubeMetadata()` method for YouTube Metadata API
-   Added `youtubeTranscript()` method for YouTube Transcript API
-   Added `youtubeTrainability()` method for YouTube Trainability API
-   Added `chatGPT()` method for ChatGPT API
-   Added `usage()` method for Usage endpoint
-   Added new HTML API parameters: `ai_query`, `ai_selector`, `return_page_markdown`, `return_page_text`, `scraping_config`
-   Refactored internal `request()` method to be API-agnostic

### Deprecated

-   `get()` and `post()` methods are deprecated in favor of `htmlApi()` method

## [1.7.5](https://github.com/ScrapingBee/scrapingbee-node/compare/v1.7.4...v1.7.5) (2023-06-06)

### Bugfix

-   Update `axios` to 1.7.7 to fix security vulnerabilities ([#14](https://github.com/ScrapingBee/scrapingbee-node/issues/14))

## [1.7.4](https://github.com/ScrapingBee/scrapingbee-node/compare/v1.7.3...v1.7.4) (2023-05-30)

### Bugfix

-   Fix bug with boolean query parameters

## [1.7.3](https://github.com/ScrapingBee/scrapingbee-node/compare/v1.7.2...v1.7.3) (2023-05-11)

### Features

-   Update Axios to 1.4.0

## [1.7.2](https://github.com/ScrapingBee/scrapingbee-node/compare/v1.7.1...v1.7.2) (2023-04-06)

### Bugfix

-   Fix typos in `README.md` ([#9](https://github.com/ScrapingBee/scrapingbee-node/pull/9))

## [1.7.1](https://github.com/ScrapingBee/scrapingbee-node/compare/v1.7.0...v1.7.1) (2023-03-23)

### Features

-   Added this `CHANGELOG.md` file
-   Added `wait_browser` parameter to `SpbParams` for auto completion purpose
-   Added `timeout` parameter to `SpbConfig` ([#7](https://github.com/ScrapingBee/scrapingbee-node/issues/7))

## [1.7.0](https://github.com/ScrapingBee/scrapingbee-node/compare/v1.6.2...v1.7.0) (2023-03-20)

### Features

-   Added `SpbConfig` and `SpbParams` to get hints when building an API call ([#4](https://github.com/ScrapingBee/scrapingbee-node/issues/4))
-   Added `retries` mechanism on 5XX API call ([#5](https://github.com/ScrapingBee/scrapingbee-node/issues/5))
