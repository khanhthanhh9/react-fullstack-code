import React, { useEffect } from 'react'
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'

import "highlight.js/styles/github.css";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);




const CodeBlock = ({ code, language }) => {
  useEffect(() => {
    // hljs.highlightBlock(document.getElementById('code'))
    hljs.highlightAll()
  }, [code, language])

  return (
    <pre>
      <code id='code' className={language}>
        {code}
      </code>
    </pre>
  )
}

export default CodeBlock