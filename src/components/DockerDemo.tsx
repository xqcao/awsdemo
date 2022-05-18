import React from 'react'
import { CopyBlock, dracula } from "react-code-blocks";


const dockerBody=`#Dockerfile
FROM ubuntu:20.04
WORKDIR /app
RUN apt update && apt install python3.8 -y && apt install python3-pip -y && apt install vim -y && apt install zip -y
COPY index.html app/
COPY requirements.txt app/
EXPOSE 8000
CMD ;["python3", "-m", "http.server", "8000"]
`
const buildBody=`#build and run
docker build -t adamcao/hellopython:1.0 .
docker run -d --name webapp -p 8000:8000 adamcao/hellopython:1.0
`
const zipBody=`#access container and run pip install to static folder
docker exec -it webapp bash
cd app && mkdir python
pip3 install -r requirements.txt -t python/
zip -r one_py.zip python
`
const cpBody=`#copy zip to local folder and this file ready to upload to s3 bucket
docker cp webapp:/app/one_py.zip ./
docker stop webapp
`
const installZipBody=`#If the zip command isn’t already installed on your system, then run:
sudo apt-get update
sudo apt-get install zip -y
sudo apt-get install unzip -y
`
const DockerDemo = () => {
  return (
    <div>DockerDemo
      <ol>
        <li>
          <p>create ubuntu dockerfile, this will create simple webapp </p>
          <CopyBlock
        text={dockerBody}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
        <li>
          <p>build docker image and run container</p>
          <CopyBlock
        text={buildBody}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
        <li>
          <p>install dependencies and create zip file</p>
          <CopyBlock
        text={zipBody}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
        <li>
          <p>copy zip file to local and ready to upload</p>
          <CopyBlock
        text={cpBody}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
        </ol>
        <ul>
        <li>
          <p> Install zip Ubuntu Linux, install unzip in Ubuntu</p>
          <CopyBlock
        text={installZipBody}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
        </ul>

    </div>
  )
}

export default DockerDemo