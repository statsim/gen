# StatSim Gen. Generate synthetic tabular datasets in the browser.

Generate synthetic tabular datasets in the browser and save them as CSV or JSON.

Artificial data is a fast way to test statistical and machine learning methods before real data is available, shareable, or clean enough to use. StatSim Gen keeps the generating rules visible and runs locally, so no data needs to be uploaded.

## Supported Datasets

| Dataset | Type | Variables | Description |
|---|---|---:|---|
| Friedman 1 | Regression | 10 + 1 | `y = 10 * sin(Pi * x1 * x2) + 20 * (x3 - 0.5) ** 2 + 10 * x4 + 5 * x5 + e` |
| Friedman 2 | Regression | 4 + 1 | `y = sqrt(x1 ** 2 + (x2 * x3 - 1 / (x2 * x4)) ** 2) + e` |
| Friedman 3 | Regression | 4 + 1 | `y = atan((x2 * x3 - 1 / (x2 * x4)) / x1) + e` |
| Peak | Regression | 10 + 1 | Peak benchmark problem from `mlbench` |
| Hastie | Classification | 10 + 1 | Binary classification problem used in Hastie et al. |
| Moons | Classification | 2 + 1 | Two interleaving half circles |
| Spirals | Classification | 2 + 1 | Two entangled spirals |
| Ringnorm | Classification | 10 + 1 | Breiman, L. (1996). Bias, variance, and arcing classifiers |

## Unlimited Data Size

In the real world, data collection is almost always an expensive and complex process. Artificial data is an easier and faster alternative for testing statistical and machine learning methods. As long as you have enough RAM and disk space, you can generate any number of records.

## Known Generating Functions

In many practical cases, observations are noisy and the data generating function is not fully known. That makes model evaluation harder. Synthetic datasets help because their rules and procedures are transparent. StatSim Gen uses `mkdata`, an open-source library with transparent generating functions. `model.js` imports `mkdata`; `jsee --bundle` folds that dependency into the generated `index.html` so the final app still runs as a standalone browser artifact.

## Save Results as CSV or JSON

The comma-separated format is probably the most popular format for storing tabular data. Most data processing libraries and programs support it. Save results as a CSV file and load it into another app. You can preview or profile CSV files using StatSim Preview and StatSim Profile, or fit an XGBoost model in StatSim Fit.

JSON output is available from the `Format` field when you want structured records instead of delimited text.

## Source Files

The maintained source is only:

- `schema.json` - JSEE schema
- `model.js` - JSEE model function; imports `mkdata`
- `README.md` - app documentation used as the generated page description
- `package.json` - npm metadata, `mkdata` dependency, and JSEE build script
- `.github/workflows/pages.yml` - GitHub Pages build and deploy workflow

`dist/index.html` is generated output. Do not edit it by hand.

## Build

```bash
npm install
npm run build
```

The generated `dist/index.html` is a bundled standalone app with the JSEE runtime, schema, model, `mkdata`, and this README embedded. GitHub Actions runs the same `npm run build` command and publishes `dist/` to GitHub Pages.

## Run Locally

From this repository:

```bash
npm install
npm run serve
```

From npm, after `@statsim/gen` is published:

```bash
npx @statsim/gen
npx @statsim/gen -p 8080
npx @statsim/gen -o gen.html --bundle
```
