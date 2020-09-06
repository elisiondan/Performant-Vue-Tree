import parser from 'fast-xml-parser';

export default function (xmlData: any) {
  const jsonObj = parser.parse(xmlData, {
    attributeNamePrefix: '@_',
    ignoreNameSpace: true,
    parseAttributeValue: true,
    allowBooleanAttributes: true,
    ignoreAttributes: false,
  });
  return jsonObj.fmgr;
}
