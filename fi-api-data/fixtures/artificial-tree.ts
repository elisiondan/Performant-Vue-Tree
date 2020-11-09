import ITreeNode from '@/models/tree-node';

let nodeCount = 1;
let id = 1;

function randomNDigitNumber(digits: number) {
  return Number((`${Math.random()}`).substring(2, 2 + digits));
}

function generateChildren(remainingDepth: number) {
  nodeCount += 1;
  id += 1;
  const node: ITreeNode = {
    id,
    obj: {
      name: remainingDepth > 0 ? `Folder ${id}` : `File ${id}`,
    },
    children: [],
  };

  if (remainingDepth <= 0) {
    return node;
  }

  const nonFoldersCount = 11000;
  const foldersCount = 17;

  for (let i = 0; i < foldersCount; i += 1) {
    node.children.push(
      generateChildren(remainingDepth - 1),
    );
  }

  for (let i = 0; i < nonFoldersCount; i += 1) {
    node.children.push(
      generateChildren(0),
    );
  }

  return node;
}

export default function largeTree(): ITreeNode {
  const root: ITreeNode = {
    id: 1,
    obj: {
      name: 'Artificial root',
    },
    children: [generateChildren(2)],
  };
  console.log(nodeCount);

  return root;
}
