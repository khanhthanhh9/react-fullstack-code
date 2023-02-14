import React, { useEffect } from 'react'
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);

const CodeBlock = ({ code, language }) => {
  useEffect(() => {
    hljs.highlightBlock(document.getElementById('code'))
  }, [code, language])

  const codeBlockStyles = {
    backgroundColor: '#2b2b2b',
    color: '#f2f2f2',
    padding: '10px',
  };

  return (
    <pre style={codeBlockStyles}>
      <code id='code' className={language}>
        {code}
      </code>
    </pre>
  )
}

export default CodeBlock