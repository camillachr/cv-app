import "@testing-library/jest-dom";

globalThis.importMetaEnv = {
  VITE_API_BASE_URL: "http://localhost:3000",
  VITE_API_KEY: "mocked-api-key",
};
