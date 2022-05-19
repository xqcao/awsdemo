import React from "react";
import CopyBlockComponent from "./CopyBlockComponent";
const stepDetails = [
  {
    textBody: `#variable.
variable "region" {
  default="us-east-2"
}
variable "main_vpc_cidr" {}
variable "public_subnets" {}
variable "private_subnets" {}
variable "default_cidr_block" {}
variable "ingresses" {
  default=[
    {from_port=0, to_port=0,protocol="-1",description="public in"},
    {from_port=22, to_port=22,protocol="tcp",description="public in ssh"},
    {from_port=80, to_port=80,protocol="tcp",description="public in http"},
    {from_port=443, to_port=443,protocol="tcp",description="public in https"}
  ]
}
variable "egresses" {
  default=[
    {from_port=0, to_port=0,protocol="-1",description="public out"}
  ]
}
variable "acl_ingresses" {
  default=[
    {from_port=22, to_port=22,protocol="tcp",action="allow",rule_no=100},
    {from_port=80, to_port=80,protocol="tcp",action="allow",rule_no=200},
    {from_port=1024, to_port=65535,protocol="tcp",action="allow",rule_no=300}
  ]
}
variable "acl_egresses" {
  default=[
    {from_port=22, to_port=22,protocol="tcp",action="allow",rule_no=100},
    {from_port=80, to_port=80,protocol="tcp",action="allow",rule_no=200},
    {from_port=1024, to_port=65535,protocol="tcp",action="allow",rule_no=300}
  ]
}
`,
    description: "variable in variables.tf",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "variable configurations",
  },
  {
    textBody: `main_vpc_cidr = "10.0.0.0/24"
public_subnets = "10.0.0.128/26"
private_subnets = "10.0.0.192/26"
default_cidr_block="0.0.0.0/0`,
    description: "variables",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "variables in terraform.tfvars file",
  },
  {
    textBody: `#Region.
provider "aws" {
  region = var.region
}`,
    description: "Region",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Region",
  },
  {
    textBody: `#create ssh-key
resource "tls_private_key" "pk" {
    algorithm = "RSA"
    rsa_bits  = 4096
}
    
resource "aws_key_pair" "kp" {
    key_name   = "myKey"       # Create "myKey" to AWS!!
    public_key = tls_private_key.pk.public_key_openssh
  
    provisioner "local-exec" { # Create "myKey.pem" to your computer!!
      command = <<EOF
      echo '\${tls_private_key.pk.private_key_pem}' > ./myKey.pem"
      chmod 
      EOF
    }
}`,
    description: "creates myKey to AWS and myKey.pem to your computer",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Create SSH and save *.pem to your computer",
  },
  {
    textBody: `#create main vpc
resource "aws_vpc" "Main" {                # Creating VPC here
    cidr_block       = var.main_vpc_cidr     # Defining the CIDR block use 10.0.0.0/24 for demo
    instance_tenancy = "default"
    enable_dns_support=true
    enable_dns_hostnames=true
}`,
    description: "Creating VPC",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Creating main VPC",
  },
  {
    textBody: `#Create a Public Subnets.
    resource "aws_subnet" "public_subnets" {    # Creating Public Subnets
      vpc_id =  aws_vpc.Main.id
      cidr_block = var.public_subnets       # CIDR block of public subnets
    }`,
    description: "Creating public subnet",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Creating public subnet",
  },
  {
    textBody: `#Create a private Subnets.
resource "aws_subnet" "private_subnets" {    # Creating Public Subnets
  vpc_id =  aws_vpc.Main.id
  cidr_block = var.private_subnets       # CIDR block of public subnets
}`,
    description: "Creating private subnet",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Creating private subnet",
  },
  {
    textBody: `#internet gateway.
resource "aws_internet_gateway" "IGW" {    # Creating Internet Gateway
  vpc_id =  aws_vpc.Main.id               # vpc_id will be generated after we create VPC
  tags = {
    Name = "My VPC Internet Gateway"
  }
}`,
    description: "Create Internet Gateway and attach it to VPC",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Create Internet Gateway",
  },
  {
    textBody: `#Route table for Public Subnet's.
resource "aws_route_table" "PublicRT" {    # Creating RT for Public Subnet
  vpc_id =  aws_vpc.Main.id
  route {
    cidr_block = var.default_cidr_block               # Traffic from Public Subnet reaches Internet via Internet Gateway
    gateway_id = aws_internet_gateway.IGW.id
  }
  tags = {
    Name = "My VPC Route Table"
  }
}`,
    description: "Creating public subnet",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Creating public subnet",
  },
  {
    textBody: `#Creating the NAT Gateway using subnet_id and allocation_id.
resource "aws_nat_gateway" "NATgw" {
  allocation_id = aws_eip.nateIP.id
  subnet_id = aws_subnet.private_subnets.id
}`,
    description:
      "Creating the NAT Gateway using private subnet_id and allocation_id",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Creating Gateway for private subnet",
  },
  {
    textBody: `# Route table for Private Subnet's
resource "aws_route_table" "PrivateRT" {    # Creating RT for Private Subnet
  vpc_id = aws_vpc.Main.id
  route {
  cidr_block = var.default_cidr_block             # Traffic from Private Subnet reaches Internet via NAT Gateway
  nat_gateway_id = aws_nat_gateway.NATgw.id
  }
}`,
    description: "Route table for Private Subnet's",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Route table for Private Subnet's",
  },
  {
    textBody: `#Route table Association with Public Subnet's
resource "aws_route_table_association" "PublicRTassociation" {
  subnet_id = aws_subnet.public_subnets.id
  route_table_id = aws_route_table.PublicRT.id
}`,
    description: "Route table Association with Public Subnet's",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Route table Association with Public Subnet's",
  },
  {
    textBody: `#Route table Association with Private Subnet's.
resource "aws_route_table_association" "PrivateRTassociation" {
  subnet_id = aws_subnet.private_subnets.id
  route_table_id = aws_route_table.PrivateRT.id
}`,
    description: "Route table Association with Private Subnet's",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Private Subnet's Route table Association",
  },
  {
    textBody: `#ELP.
resource "aws_eip" "nateIP" {
  vpc   = true
}`,
    description: "Creating elp",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Creating elp",
  },
  {
    textBody: `#create VPC Security Group.
resource "aws_security_group" "VPC_Security_Group" {
  vpc_id = aws_vpc.Main.id
  name = "My VPC Security Group"
  description = "My VPC Security Group"
  dynamic "ingress" {
    for_each = var.ingresses
    content {
      from_port=ingress.value.from_port
      to_port=ingress.value.to_port
      protocol=ingress.value.protocol
      cidr_blocks=[var.value.default_cidr_block]
    }
  }
  dynamic "egress" {
    for_each = var.egresses
    content {
      from_port=egress.value.from_port
      to_port=egress.value.to_port
      protocol=egress.value.protocol
      cidr_blocks=[var.value.default_cidr_block]
    }
  }
  tags={
    Name = "My VPC Security Group"
    Description = "My VPC Security Group"
  }
}`,
    description: "Creating Security Group",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Creating Security Group",
  },
  {
    textBody: `#create VPC Network access control list.
resource "aws_network_acl" "VPC_Security_ACL" {
  vpc_id = aws_vpc.Main.id
  subnet_ids = [aws_subnet.public_subnets.id]
  dynamic "ingress" {
    for_each = var.acl_ingresses
    content{
      from_port=ingress.value.from_port
      to_port=ingress.value.to_port
      protocol=ingress.value.protocol
      rule_no=ingress.value.rule_no
      action=ingress.value.action
      cidr_block=ingress.value.default_cidr_block
    }
  }
  dynamic "egress" {
    for_each = var.acl_egresses
    content{
      from_port=egress.value.from_port
      to_port=egress.value.to_port
      protocol=egress.value.protocol
      rule_no=egress.value.rule_no
      action=egress.value.action
      cidr_block=egress.value.default_cidr_block
    }
  }
  tags = {
    Name = "My VPC ACL"
  }
}`,
    description: "create VPC Network access control list",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "create VPC Network access control list",
  },
  {
    textBody: `#ELP.
resource "aws_eip" "nateIP" {
  vpc   = true
}`,
    description: "Creating elp",
    language: "go",
    showLineNumbers: false,
    sectionTitle: "Creating elp",
  },
];
const TerraformDemo = () => {
  return (
    <div>
      <h2>TerraformDemo</h2>
      <ol>
        {stepDetails.map((el, idx) => (
          <CopyBlockComponent
            key={idx}
            sectionTitle={el.sectionTitle}
            textBody={el.textBody}
            description={el.description}
            language={el.language}
            showLineNumbers={el.showLineNumbers}
          />
        ))}
      </ol>
    </div>
  );
};

export default TerraformDemo;
