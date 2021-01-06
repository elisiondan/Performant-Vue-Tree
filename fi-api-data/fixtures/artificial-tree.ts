import ITreeNode from '@/models/tree-node';

let nodeCount = 1;
let id = 0;

function generateChildren(remainingDepth: number) {
  nodeCount += 1;
  id += 1;
  const node: ITreeNode = {
    id,
    name: remainingDepth > 0 ? `Folder ${id}` : `File ${id}`,
    children: [],
  };

  if (remainingDepth <= 0) {
    return node;
  }

  const nonFoldersCount = 2000;
  const foldersCount = 15;

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

function generateRoots(count: number) {
  const roots: ITreeNode[] = [];
  for (let i = 0; i < count; i += 1) {
    id += 1;
    const root = {
      id,
      name: `Root ${id}`,
      children: [generateChildren(2)],
    };
    roots.push(root);
  }
  return roots;
}

export default function largeTree(): ITreeNode[] {
  const roots = generateRoots(3);
  console.log(nodeCount);

  return roots;
}
