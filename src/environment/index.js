import * as development from "./development.json";
import * as production from "./production.json";
import * as staging from "./staging.json";

/* enum Environment{
  development = "development",
  production = "production",
  staging = "staging"
} */

//const mode: String | undefined = process.env.NODE_ENV;
const mode = "development";

let env = "production";
if (mode === "development") env = 'development';
else if (mode === "staging") env = 'staging';

const configuration = {
  development,
  production,
  staging
};

export default { ...configuration[env].default, env };
