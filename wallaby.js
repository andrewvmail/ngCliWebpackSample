var compilerOptions = Object.assign(
  require('./tsconfig.json').compilerOptions,
  require('./src/tsconfig.spec.json').compilerOptions);

compilerOptions.module = 'CommonJs';

const TEMPLATE_URL_REGEX = /templateUrl\s*:\s*('|")(\.\/){0,}(.*)('|")/g;
const STYLE_URLS_REGEX = /styleUrls\s*:\s*\[[^\]]*\]/g;
const ESCAPE_TEMPLATE_REGEX = /(\${|\`)/g;

module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.html',
      {pattern: 'src/**/*.+(ts|css|less|scss|sass|styl|html|json|svg)', load: true},
      {pattern: 'src/**/*.d.ts', ignore: true},
      {pattern: 'src/**/*spec.ts', ignore: true}
    ],

    tests: [{ pattern: "src/**/*.spec.ts", load: true }],

    env: { type: "node", runner: "node" }, testFramework: "ava", debug: true,

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions),
    },
    preprocessors: {
      '**/*.ts': (file, done) => {
        // from https://github.com/thymikee/jest-preset-angular/blob/master/setupJest.js
        file.content = file.content
          .replace(TEMPLATE_URL_REGEX, 'template: require($1./$3$4)')
          .replace(STYLE_URLS_REGEX, 'styles: []');
        done(file.content + '//modified')
      },
      '**/*.html': (file, done) => {
        if(file.path.endsWith('index.html')) {
          return done(file.content)
        }
        file.content = file.content.replace(ESCAPE_TEMPLATE_REGEX, '\\$1');
        file.content = 'module.exports=`' + file.content  + '`;'
        done(file.content + '//modified')
      },
    },
    debug: true
  };
};
