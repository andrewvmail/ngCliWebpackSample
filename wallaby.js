var compilerOptions = Object.assign(
  require('./tsconfig.json').compilerOptions,
  require('./src/tsconfig.spec.json').compilerOptions);

compilerOptions.module = 'CommonJs';

const process = require('ts-jest/preprocessor.js').process;
const TEMPLATE_URL_REGEX = /templateUrl\s*:\s*('|")(\.\/){0,}(.*)('|")/g;
const STYLE_URLS_REGEX = /styleUrls\s*:\s*\[[^\]]*\]/g;
const ESCAPE_TEMPLATE_REGEX = /(\${|\`)/g;

module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'src/**/*.+(ts|css|less|scss|sass|styl|html|json|svg)', load: true},
      {pattern: 'src/**/*.d.ts', ignore: true},
      {pattern: 'src/**/*spec.ts', ignore: true}
    ],

    tests: [{ pattern: "src/**/*.spec.ts", load: true }],

    env: { type: "node", runner: "node" }, testFramework: "ava", debug: true,

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },
    preprocessors: {
      '**/*.html': (file, done) => {

        // file.content = file.content.replace(ESCAPE_TEMPLATE_REGEX, '\\$1');
        //
        // file.content = file.content
        //   .replace(TEMPLATE_URL_REGEX, 'template: require($1./$3$4)')
        //   .replace(STYLE_URLS_REGEX, 'styles: []');
        //
        // done(file.content + '// modified')
        // return process(src, path, config, transformOptions);

      }
      // '**/*.jsx': file => require('babel')
      //   .transform(file.content, {sourceMap: true, filename: file.path})
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
