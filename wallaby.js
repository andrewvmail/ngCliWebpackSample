var compilerOptions = Object.assign(
  require('./tsconfig.json').compilerOptions,
  require('./src/tsconfig.spec.json').compilerOptions);

compilerOptions.module = 'CommonJs';

module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'src/**/*.+(ts|css|less|scss|sass|styl|html|json|svg)', load: false},
      {pattern: 'src/**/*.d.ts', ignore: true},
      {pattern: 'src/**/*spec.ts', ignore: true}
    ],

    tests: [{ pattern: "src/**/*.spec.ts", load: true }],

    env: { type: "node", runner: "node" }, testFramework: "ava", debug: true,

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },

    // middleware: function (app, express) {
    //   var path = require('path');
    //   app.use('/favicon.ico', express.static(path.join(__dirname, 'src/favicon.ico')));
    //   app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
    // },

    // env: {
    //   kind: 'node'
    // },

    // postprocessor: webpackPostprocessor,

    setup: function () {
      // window.__moduleBundler.loadTests();
    },

    debug: true
  };
};
