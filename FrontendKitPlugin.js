module.exports = class {
  apply(compiler) {
    compiler.hooks.entryOption.tap('FrontendKitPlugin', (context, entry) => {
      entry.main.import.push('./src/frontendkit/modules/PageNotFound/PageNotFoundModule.ts');
    });
  }
}
