const prodEnv = process.env.NODE_ENV == "production";
let plugins = [];
if (prodEnv) {
  plugins.push("transform-remove-console");
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins,
};
