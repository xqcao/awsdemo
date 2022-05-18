import React from 'react'
import { CopyBlock, dracula } from "react-code-blocks";
const pyBody=`

`

const PandasDemo = () => {
  return (
    <div>
      <h2>PandasDemo</h2>
      <ol>
        <li>
          <p>from <a href="/docker">how create pandas dependencies zip file</a></p>
        </li>
        <li>
        <CopyBlock
        text={pyBody}
        language="python"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>

      </ol>
    </div>
  )
}

export default PandasDemo