#!/usr/bin/env node
import argvUtils from "../utils/argv.utils.mjs";
import chalk from "chalk";
import helpInfo from "../utils/help.utils.mjs";

// define system info;
const sys_info = {
  version: "1.0.0",
  codeName: "Nebula",
  releaseDate: "2026-04-12",
  author: "Bits",
};

const flag = process.argv[2];
switch (flag) {
  // help
  case "--help" || "-h":
    console.log(helpInfo);
    break;

  // version
  case "--version" || "-v":
    console.log(sys_info.version);
    break;

  // get user info;
  case "--myInfo":
    argvUtils.myInfo();
    break;

  // create account
  case "--createAccount":
    if (flag.length < 5) {
      console.log(
        chalk.yellowBright(
          "Please provide username and passcode. E.g: --createAccount <username> <passcode>",
        ),
      );
      break;
    }
    if (process.argv[4] == undefined || process.argv[3] == undefined) {
      console.log(
        chalk.yellowBright(
          "Please provide both username and passcode. E.g: --createAccount <username> <passcode>",
        ),
      );
      break;
    }
    const payload = {
      userName: process.argv[3].toString(),
      passcode: process.argv[4].toString(),
    };
    argvUtils.createAccount(payload);
    break;

  // signin
  case "--signin":
    if (flag.length < 5) {
      console.log(
        chalk.yellowBright(
          "Please provide username and passcode. E.g: --signin <username> <passcode>",
        ),
      );
      break;
    }
    if (process.argv[4] == undefined || process.argv[3] == undefined) {
      console.log(
        chalk.yellowBright(
          "Please provide both username and passcode. E.g: --signin <username> <passcode>",
        ),
      );
      break;
    }
    const signinPayload = {
      userName: process.argv[3].toString(),
      passcode: process.argv[4].toString(),
    };
    argvUtils.signin(signinPayload);
    break;

  // change machine
  case "--changeMachine":
    if (flag.length < 5) {
      console.log(
        chalk.yellowBright(
          "Please provide username and passcode. E.g: --changeMachine <username> <passcode>",
        ),
      );
      break;
    }
    if (process.argv[4] == undefined || process.argv[3] == undefined) {
      console.log(
        chalk.yellowBright(
          "Please provide both username and passcode. E.g: --changeMachine <username> <passcode>",
        ),
      );
      break;
    }
    const changeMachinePayload = {
      userName: process.argv[3].toString(),
      passcode: process.argv[4].toString(),
    };
    argvUtils.changeMachine(changeMachinePayload);
    break;

  // create node
  case "--createNode":
    if (flag.length < 5) {
      console.log(
        chalk.yellowBright(
          "Please provide node name and node url. E.g: --createNode <nodeName> <nodeUrl>",
        ),
      );
      break;
    }
    if (process.argv[4] == undefined || process.argv[3] == undefined) {
      console.log(
        chalk.yellowBright(
          "Please provide both node name and node url. E.g: --createNode <nodeName> <nodeUrl>",
        ),
      );
      break;
    }
    const createNodePayload = {
      nodeName: process.argv[3].toString(),
      nodeUrl: process.argv[4].toString(),
    };
    argvUtils.createNode(createNodePayload);
    break;

  // list node
  case "--listNode":
    argvUtils.listNode();
    break;

  // delete node
  case "--deleteNode":
    if (flag.length < 4) {
      console.log(
        chalk.yellowBright(
          "Please provide node name. E.g: --deleteNode <nodeName>",
        ),
      );
      break;
    }
    if (process.argv[3] == undefined) {
      console.log(
        chalk.yellowBright(
          "Please provide node name. E.g: --deleteNode <nodeName>",
        ),
      );
      break;
    }
    const deleteNodePayload = {
      nodeName: process.argv[3].toString(),
    };
    argvUtils.deleteNode(deleteNodePayload);
    break;

  // update node name
  case "--updateNodeName":
    if (flag.length < 5) {
      console.log(
        chalk.yellowBright(
          "Please provide old node name and new node name. E.g: --updateNodeName <oldNodeName> <newNodeName>",
        ),
      );
      break;
    }
    if (process.argv[4] == undefined || process.argv[3] == undefined) {
      console.log(
        chalk.yellowBright(
          "Please provide both old node name and new node name. E.g: --updateNodeName <oldNodeName> <newNodeName>",
        ),
      );
      break;
    }
    const updateNodeNamePayload = {
      oldNodeName: process.argv[3].toString(),
      newNodeName: process.argv[4].toString(),
    };
    argvUtils.updateNodeName(updateNodeNamePayload);
    break;

  //  update node url
  case "--updateNodeUrl":
    if (flag.length < 5) {
      console.log(
        chalk.yellowBright(
          "Please provide node name and new node url. E.g: --updateNodeUrl <nodeName> <newNodeUrl>",
        ),
      );
      break;
    }
    if (process.argv[4] == undefined || process.argv[3] == undefined) {
      console.log(
        chalk.yellowBright(
          "Please provide both node name and new node url. E.g: --updateNodeUrl <nodeName> <newNodeUrl>",
        ),
      );
      break;
    }
    const updateNodeUrlPayload = {
      nodeName: process.argv[3].toString(),
      newNodeUrl: process.argv[4].toString(),
    };
    argvUtils.updateNodeUrl(updateNodeUrlPayload);
    break;

  default:
    console.log(
      chalk.yellowBright("Invalid flag. Use --help for usage information."),
    );
}
