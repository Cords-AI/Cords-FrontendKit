module.exports = class {
  apply(compiler) {
    compiler.hooks.entryOption.tap('FrontendKitPlugin', (context, entry) => {
      entry.main.import.push('./lib/cordsfrontendkit/modules/PageNotFound/PageNotFoundModule.ts');
    });
  }
}
