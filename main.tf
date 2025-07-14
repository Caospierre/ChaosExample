

provider "aws" {
  region ="us-east-1"
  default_tags {
    tags ={
      DEVELOPER = "ChaosPierre"
      PROJECT = "LAMBDA-EXAMPLE"
    }
  }
}

module "resources" {
  source = "./resources"
}