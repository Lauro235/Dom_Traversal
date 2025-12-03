const clientDocument = fetch('./sample.html')
  .then(response => response.text())
  .then(data => {
    // Parse and use the HTML content
    const parser = new DOMParser();
    return parser.parseFromString(data, "text/html");
    // export default clientDocument;
  })
  .catch(error => console.error('Error:', error));
  
export default await clientDocument;