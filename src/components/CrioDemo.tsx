import React from "react";
import CopyBlockComponent from "./CopyBlockComponent";
const stepDetails = [
  {
    description: "Update System",
    textBody: "sudo apt update && sudo apt upgrade",
    language: "shell",
    showLineNumbers: false,
    sectionTitle: "Update System",
  },
  {
    description: "Ensure you load modules",
    textBody: `sudo modprobe overlay
sudo modprobe br_netfilter`,
    language: "shell",
    showLineNumbers: false,
    sectionTitle: "Ensure you load modules",
  },
  {
    description: "Set up required sysctl params",
    textBody: `# Set up required sysctl params
sudo tee /etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
`,
    language: "shell",
    showLineNumbers: true,
    sectionTitle: "Set up required sysctl params",
  },
  {
    description:
      "Add the Kubic repository which host binary packages for Debian based systems. If using CRI-O with Kubernetes, install the version matching Kubernetes version you’ll setup.",
    textBody: `#Ubuntu 22.04/20.04:
OS=xUbuntu_20.04
CRIO_VERSION=1.23
echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/$OS/ /"|sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
echo "deb http://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable:/cri-o:/$CRIO_VERSION/$OS/ /"|sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable:cri-o:$CRIO_VERSION.list

#Ubuntu 18.04:
OS=xUbuntu_18.04
CRIO_VERSION=1.23
echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/$OS/ /"|sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
echo "deb http://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable:/cri-o:/$CRIO_VERSION/$OS/ /"|sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable:cri-o:$CRIO_VERSION.list
`,
    language: "shell",
    showLineNumbers: true,
    sectionTitle: "Add CRI-O Kubic repository",
  },
  {
    description: "Once the repository is added to your system, import GPG key:",
    textBody: `#if not install curl
sudo apt-get install curl -y
curl -L https://download.opensuse.org/repositories/devel:kubic:libcontainers:stable:cri-o:$CRIO_VERSION/$OS/Release.key | sudo apt-key add -
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/$OS/Release.key | sudo apt-key add -
`,
    language: "shell",
    showLineNumbers: false,
    sectionTitle: "import GPG key",
  },
  {
    description:
      "When repository is added, update apt cache and install CRI-O on Ubuntu.",
    textBody: `sudo apt update
sudo apt install cri-o cri-o-runc cri-tools -y`,
    language: "shell",
    showLineNumbers: false,
    sectionTitle: "Install CRI-O on Ubuntu22.04|20.04|18.04",
  },
  {
    description: "verify CRI-O",
    textBody: "apt show cri-o",
    language: "shell",
    showLineNumbers: false,
    sectionTitle: "Checking the version of CRI-O installed on Ubuntu:",
  },
  {
    description: "starting crio service:",
    textBody: `sudo systemctl daemon-reload
sudo systemctl enable crio --now`,
    language: "shell",
    showLineNumbers: false,
    sectionTitle: "Start and enable crio service:",
  },
  {
    description: "test one image from crictl",
    textBody: "sudo crictl run -d  hello-world",
    language: "shell",
    showLineNumbers: false,
    sectionTitle: "Test cri-0",
  },
];
const CrioDemo = () => {
  return (
    <div>
      <h2>Install CRI-O Container Runtime on Ubuntu 22.04|20.04|18.04</h2>
      <ol>
        {stepDetails.map((el, idx) => (
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

export default CrioDemo;
