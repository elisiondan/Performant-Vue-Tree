/*
* Find all occurences of worker initiation through new Worker
* and replace the file path to relative path that is accesed in published version
*/
export default function transformWorkerPath() {
  return {
    name: 'rollup-plugin-transform-worker-path',
    transform(code, id) {
      const workerRegexp = /(new Worker\(')(.*\/)([\w-]+)(.ts)/g;
      code = code.replace(workerRegexp, '$1/$3.js');

      return code;
    },
  };
}
