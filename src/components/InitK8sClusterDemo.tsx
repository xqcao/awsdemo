import React from "react";
import CopyBlockComponent from "./CopyBlockComponent";
const stepsDetails = [
  {
    description: "aa",
    textBody: `aa`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "aa",
  },
];
const InitK8sClusterDemo = () => {
  return (
    <div>
      <h2>Init K8s Cluster Demo</h2>
      <ol>
        {stepsDetails.map((el, idx) => (
          <CopyBlockComponent
            key={idx}
            description={el.description}
            textBody={el.textBody}
            showLineNumbers={el.showLineNumbers}
            sectionTitle={el.sectionTitle}
            language={el.language}
          />
        ))}
      </ol>
    </div>
  );
};

export default InitK8sClusterDemo;
