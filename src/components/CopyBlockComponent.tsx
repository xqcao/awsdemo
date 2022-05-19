import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";

interface OptionProps {
  description: string;
  textBody: string;
  language: string;
  showLineNumbers: boolean;
  sectionTitle: string;
}
const CopyBlockComponent = (props: OptionProps) => {
  const { textBody, sectionTitle, description, language, showLineNumbers } =
    props;
  return (
    <li>
      <h3>{sectionTitle}</h3>
      <p>{description}</p>
      <CopyBlock
        text={textBody}
        language={language}
        showLineNumbers={showLineNumbers}
        theme={dracula}
        codeBlock
      />
    </li>
  );
};

export default CopyBlockComponent;
