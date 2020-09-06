import parser from 'fast-xml-parser';
import FiApiResponse from '~/models/fi-api-response';

export default function (xmlData: any): FiApiResponse {
  const jsonObj = parser.parse(xmlData, {
    attributeNamePrefix: '@_',
    ignoreNameSpace: true,
    parseAttributeValue: true,
    allowBooleanAttributes: true,
    ignoreAttributes: false,
  });
  return jsonObj.fmgr;
}
