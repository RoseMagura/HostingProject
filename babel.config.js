module.exports =
{
    "presets": ["env", "@babel/preset-react"],
    "test": [
        "jest"
    ],
    "plugins": [
        ["@babel/plugin-transform-react-jsx"],
        ["@babel/plugin-syntax-jsx"], 
        ["@babel/plugin-transform-runtime"],
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
      ]
  };
//  {
//     presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
//     plugins: ["@babel/plugin-syntax-jsx"]
// };
