export function loadMathJaxWithMathML() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/mml-chtml.js';
  script.id = 'MathJax-script';
  document.head.appendChild(script);
  console.log('loadMathJaxWithMathML executed');
}
export default loadMathJaxWithMathML;
