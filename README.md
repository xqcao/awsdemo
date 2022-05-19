# AWS lambda function in python, AWS Lambda use Amazon Linux operating system, so the python dependencies need build and package from EC2 Linux instance or Linux system(like ubuntu), check python and pip version matches, and make sure dependencies installed in "python" folder
## if zip package big then 10MB, upload zip file to S3 bucket,
## use layer to load dependencies zip package, 

# use terraform setup kubeadm on AWS
## EC2 instance is ubuntu20.04
## instance type t2.micro
## use CRIO to run containers
## kubernetes version in 1.23+