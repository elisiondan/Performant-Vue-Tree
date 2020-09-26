/* eslint-disable class-methods-use-this */
import { INodeEvaluator } from '@/services/tree-traversal-service';
import TreeNode from '@/models/tree-node';

// const MatchTermEvaluator: INodeEvaluator = (node: TreeNode, searchTerm: string) => {
//   const regex = new RegExp(searchTerm, 'ig');
//   if (node.obj.name && regex.exec(node.obj.name)) {
//     // eslint-disable-next-line no-param-reassign
//     node.obj.name = node.obj.name.replace(regex, '<span class="bg-medium-gold">$&</span>');
//   }
// };

// export default MatchTermEvaluator;

const test: INodeEvaluator = {
  handleNode(node: TreeNode, payload: any): void {
    const { searchTerm } = payload;

    if (!searchTerm) { return; }
    const regex = new RegExp(payload.searchTerm, 'ig');

    if (node.obj.name && regex.exec(node.obj.name)) {
      // eslint-disable-next-line no-param-reassign
      node.obj.name = node.obj.name.replace(regex, '<span class="bg-yellow-400">$&</span>');
    }

    // if (!this.searchOptions.term) {
    //   return;
    // }

    // super.searchByLookup(this.searchOptions, node);
  },
};

export default test;

// export default class MatchTermEvaluator implements INodeEvaluator {
// //   public isMatch(nodeParam: RcTreeNode, searchOptions: ITreeSearch): boolean {
// //     if (searchOptions.term) {
// //       const regex = new RegExp(escapeRegExp(searchOptions.term), 'ig');
// //       nodeParam.obj.name = nodeParam.obj.
// // name.replace(regex, '<span class="bg-medium-gold">$&</span>');
// //       return nodeParam.obj.name.search(regex) !== -1;
// //     }
// //     return true;
// //   }

//     private term = '';

//     public setSearchTerm(term: string) {
//       this.term = term;
//     }

//     public handleNode(node: TreeNode, searchTerm = 'Akce a aktuality'): void {
//       const regex = new RegExp(searchTerm, 'ig');
//       if (node.obj.name && regex.exec(node.obj.name)) {
//         // eslint-disable-next-line no-param-reassign
//         node.obj.name = node.obj.name.replace(regex, '<span class="bg-medium-gold">$&</span>');
//       }

//       // if (!this.searchOptions.term) {
//       //   return;
//       // }

//     // super.searchByLookup(this.searchOptions, node);
//     }
// }
