import React from 'react'
import { CopyBlock, dracula } from "react-code-blocks";

const pyBody:String=`import requests
import json
import pandas as pd
import numpy as np


def lambda_handler(event,context):
  pandas_version=pd.__version__
  numpy_version = np.__version__
  r = requests.get("https://support.apple.com")
  status = r.status_code
  data=json.dumps({
      "pandas Version":pandas_version,
      "numpy Version":numpy_version,
      "apple support url":status
    })
  return {
    'statusCode':200,
    'body':data
  }`
const PyLambda = () => {
  return (
    <div>
      <h2>python and lambda</h2>
      <h3>AWS Lambda use Amazon Linux operating system. Idea is download Pandas and NumPy compatible with Amazon Linux, so make sure pandas and numpy are packaged from Linux like ubuntu</h3>
      <i>this page show <a href="/docker">use ubuntu docker image container to create the dependencies zip package</a> and upload to s3 bucket</i>
      <ol>
      <li>
        <p>Update zip file to s3 bucket</p>
        <img width="650" height="400"src="/images/upload.png" alt="upload"/>
      </li>
  
      <li>
        <p>new one lambda layer and link to s3 bucket zip file use objectUrl(image source from web)</p>
        <img width="650" height="400"src="/images/layer.png" alt="layer"/>
      </li>
      <li>
        <p>Create new lambda python function(image source from web)</p>
        <img width="650" height="400"src="/images/func.png" alt="func"/>
        <CopyBlock
        text={pyBody}
        language="python"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
      </li>
      <li>add this layer to this function, and deploy it</li>
        <li>run one task for this function</li>
     </ol>
    </div>
  )
}

export default PyLambda