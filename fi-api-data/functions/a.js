/* eslint-disable  */


function parseNode(node) {
  return {
    id: node.uzel_id,
    name: getNodeName(node),
    url: getUrlForNode(node), // empty if node is file
    children: [],
  };
}


function onArrowClick(node) {
  if (node.url) {
    const parsedData = fetchParsedData(node.url);
    node.children = parseNode(parsedData);
  }
}


