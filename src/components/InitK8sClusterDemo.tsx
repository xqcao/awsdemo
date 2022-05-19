import React from "react";
import CopyBlockComponent from "./CopyBlockComponent";
const stepsDetails = [
  {
    description: "init kubeadm",
    textBody: `sudo kubeadm init --pod-network-cidr=192.168.0.0/16`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "init kubeadm",
  },
  {
    description: "need to allow and configure our user to run kubectl.",
    textBody: `mkdir -p $HOME/.kube
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
chown $(id -u):$(id -g) $HOME/.kube/config`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: " allow and configure our user to run kubectl",
  },
  {
    description: "Verify Running Pods",
    textBody: `watch kubectl get pods --all-namespaces`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "check cluster status",
  },
  {
    description: "print kubeadm token for workerNode",
    textBody: `sudo kubeadm token create --print-join-command`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "kubeadm token",
  },
  {
    description: "Install Calico host-based networking plugin",
    textBody: `kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "Install Calico",
  },
  {
    description: "workerNode join",
    textBody: `kubeadm join <ip-address>:6443\
--token=<token-from-step-2> \
--discovery-token-ca-cert-hash sha256:<ca-hash-from-step-1>`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "workerNode join kubeadm cluster",
  },
  {
    description: "Verify master node and worker node",
    textBody: `kubectl get nodes -o wide
kubectl get pod --All
`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "cluster Verify Configuration",
  },
  {
    description: "test webapp in cluster from master node",
    textBody: `kubectl create deployment mynginx --image=nginx
kubectl expose deployment mynginx --type=NodePort --port=8080 --target-port=80
`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "test webapp in kubeadm k8s cluster",
  },
  {
    description: "view k8s service",
    textBody: `kubectl get pod
kubectl get svc
`,
    language: "bash",
    showLineNumbers: false,
    sectionTitle: "check k8s service and pods",
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
