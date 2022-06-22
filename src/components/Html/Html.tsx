const DOMPurify = require('dompurify')(window);

export default function html(html: any) {
  return DOMPurify.sanitize(html);
}
