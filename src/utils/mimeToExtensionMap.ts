export const mimeToExtensionMap = {
  "vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};
type MimeToExtKey = keyof typeof mimeToExtensionMap;

export default function mimeToExt(mime: string) {
  return mimeToExtensionMap[mime as MimeToExtKey] || mime;
}
