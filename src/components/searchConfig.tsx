// import { CloudRegion, Environment } from "@yext/search-headless-react";

const searchConfig = {
  apiKey: import.meta.env.YEXT_PUBLIC_API_KEY,
  experienceKey: import.meta.env.YEXT_PUBLIC_EXP_KEY,
  locale: "en",
};
const searchConfig1 = {
  apiKey: import.meta.env.YEXT_PUBLIC_API_KEY2,
  experienceKey: import.meta.env.YEXT_PUBLIC_EXP_KEY2,
  locale: "en",
};

export { searchConfig, searchConfig1 };
