
locals {
  queryUsersLambda="queryUsers"
  saveUsersLambda = "saveUsers"

}

/// QUERY USERS LAMBDA

resource "aws_lambda_function" "query_users" {
  function_name    = "${local.PROJECT}-${local.queryUsersLambda}"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "${title(local.queryUsersLambda)}Handler.HANDLER"
  runtime          = "nodejs22.x"
  filename         = data.archive_file.query_users.output_path
  source_code_hash = data.archive_file.query_users.output_base64sha256
  timeout          = "180"
  memory_size      = 2048
  architectures = ["arm64"]

  environment {
    variables = local.ENVS
  }
  lifecycle {
    create_before_destroy = true
  }
}

data "archive_file" "query_users" {
  type        = "zip"
  source_file = "${path.module}/dist/handlers/${title(local.queryUsersLambda)}Handler.js"
  output_path = "${path.module}/dist/build/${title(local.queryUsersLambda)}Lambda.zip"
}


/// QUERY USERS LAMBDA


resource "aws_lambda_function" "save_users" {
  function_name    = "${local.PROJECT}-${local.saveUsersLambda}"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "${title(local.saveUsersLambda)}Handler.HANDLER"
  runtime          = "nodejs22.x"
  filename         = data.archive_file.save_users.output_path
  source_code_hash = data.archive_file.save_users.output_base64sha256
  timeout          = 180
  memory_size      = 2048
  architectures    = ["arm64"]

  environment {
    variables = local.ENVS
  }

  lifecycle {
    create_before_destroy = true
  }
}



data "archive_file" "save_users" {
  type        = "zip"
  source_file = "${path.module}/dist/handlers/${title(local.saveUsersLambda)}Handler.js"
  output_path = "${path.module}/dist/build/${title(local.saveUsersLambda)}Lambda.zip"
}