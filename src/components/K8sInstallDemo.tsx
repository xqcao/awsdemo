import React from "react";
import CopyBlockComponent from "./CopyBlockComponent";

const stepsDetails = [
  {
    description: "Update Ubuntu 20.04 System",
    textBody: `sudo apt update
sudo apt -y full-upgrade
`,
    language: "bash",
    showLineNumbers: true,
    sectionTitle: "Update System",
  },
  {
    description: "add Kubernetes repository for Ubuntu 20.04",
    textBody: `#if curl not exist
sudo apt install curl -y
sudo apt -y install curl apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list`,
    language: "bash",
    showLineNumbers: true,
    sectionTitle: "add Kubernetes repository",
  },
  {
    description: "update and Install kubelet, kubeadm and kubectl",
    textBody: `sudo apt update
sudo apt -y install vim git curl wget kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
`,
    language: "bash",
    showLineNumbers: true,
    sectionTitle: "Install kubelet, kubeadm and kubectl",
  },
  {
    description: "kubectl version check",
    textBody: "kubectl version --client && kubeadm version",
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "Confirm installation by checking the version of kubectl.",
  },
  {
    description: "Turn off swap",
    textBody: `sudo swapoff -a`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "Disable Swap",
  },
  {
    description: "Enable kernel modules",
    textBody: `# Enable kernel modules
sudo modprobe overlay
sudo modprobe br_netfilter

# Add some settings to sysctl
sudo tee /etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
# Reload sysctl
sudo sysctl --system
`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "Enable kernel modules and configure sysctl.",
  },
  {
    description: "Enable kubelet service. and test",
    textBody: `sudo systemctl enable kubelet
sudo kubeadm config images pull  
`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "Enable kubelet service.",
  },
];
const K8sInstallDemo = () => {
  return (
    <div>
      <h2>Install kubeadm on Ubuntu 22.04|20.04|18.04</h2>
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

export default K8sInstallDemo;
