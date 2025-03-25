//Global variables
variable "aws_region" {  
  description = "The ID of the VPC"
  type        = string
  default       = "eu-west-1"
}


variable "vpc_cidr" {
  description = "CIDR block for the LampStack VPC"
  type        = string
  default     = "172.16.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the LampStack public subnets"
  type        = list(string)
  default     = ["172.16.1.0/24", "172.16.2.0/24"]
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["eu-west-1a", "eu-west-1b"]
}

//Security group variables
variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
  default = null
}

//ECR variables
variable "docker_app_uri" {
  description = "The URI of the ECR backend"
  type        = string
  default = "godcandidate/qr-code-app:latest"
}

//ECS variables
variable "app_port" {
  description = "The port for the frontend"
  type        = number
  default = 80
}