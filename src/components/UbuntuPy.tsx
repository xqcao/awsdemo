import React from 'react'

import { CopyBlock, dracula } from "react-code-blocks";

const s1Body = `sudo apt update`;
const s2Body=`sudo apt install software-properties-common -y`
const s3Body = `sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
`
const s4Body=`#install python3.8 from terminal
sudo apt install python3.8 -y
`
const s41Body=`#Allow the process to complete and verify the Python version was installed sucessfully::
python --version
#output
Python 3.8.0
`;
const s5Body = `#install pip3 from terminal
sudo apt update
sudo apt install python3-pip -y
`
const s6Body=`#check version
pip3 --version
`
const s7Body=`#output 
pip 20.0.2 from /usr/lib/python3/dist-packages/pip (python 3.8)
`
const UbuntuPy = () => {
  return (
    <div>
      <h2>Ubuntu 18.04 or Ubuntu 20.04 install python and pip</h2>
      <ol>
        <li>
          <p>Open a terminal window, and enter the following:</p>
        <CopyBlock
        text={s1Body}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
        <li>
          <p>Install Supporting Software</p>
        <CopyBlock
        text={s2Body}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
        <li>
          <p>Add Deadsnakes PPA</p>
          <i>Deadsnakes is a PPA with newer releases than the default Ubuntu repositories. Add the PPA by entering the following:</i>
        <CopyBlock
        text={s3Body}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
        <li>
          <p>Install Python 3</p>
          <i>Now you can start the installation of Python 3.8 with the command:</i>
        <CopyBlock
        text={s4Body}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
        <li>
          <p>check Python version</p>
          <i>Verify that the installation was successful by typing:</i>
        <CopyBlock
        text={s41Body}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
        <li>
          <p>Install pip3</p>
          <i>To install pip for Python 3 on Ubuntu 20.04 run the following commands as root or sudo user in your terminal:</i>
        <CopyBlock
        text={s5Body}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
        <li>
          <p>check pip3</p>
          <i>The command above will also install all the dependencies required for building Python modules.Once the installation is complete, verify the installation by checking the pip version:            </i>
        <CopyBlock
        text={s6Body}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
        <li>
          <p>version pip3</p>
          <i>The version number may vary, but it will look something like this:</i>
        <CopyBlock
        text={s7Body}
        language="shell"
        showLineNumbers={false}
        theme={dracula}
        codeBlock
      />
        </li>
      </ol>
     
    </div>
  )
}

export default UbuntuPy