export default function transformWorkerPath() {
  return {
    name: 'rollup-plugin-transform-worker-path',

    // resolveId(importee, importer) {
    //   return resolveId(state, config, importee, importer);
    // },

    // load(id) {
    //   return load(state, config, this.addWatchFile, id);
    // },

    transform(code, id) {
      const workerRegexp = /(new Worker\(')(.*\/)([\w-]+)(.ts)/g;
      code = code.replace(workerRegexp, '$1/$3.js');

      return code;
    },
  };
}
