module.exports =
{
    "presets": ["env", "@babel/preset-react", '@babel/preset-typescript'],
    "test": [
        "jest"
    ],
    "plugins": [
        ["@babel/plugin-transform-react-jsx"],
        ["@babel/plugin-syntax-jsx"], 
        ["@babel/plugin-transform-runtime"],
        ["@babel/plugin-transform-typescript"]
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
      ]
  };
