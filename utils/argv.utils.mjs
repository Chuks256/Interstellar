import axios from "axios";
import fs from "fs";
import os from "os";
import chalk from "chalk";
import crypto from "crypto";

const development = false;
const api_endpoint = development
  ? "http://localhost:3000"
  : "https://bits-engine.onrender.com";

// define machine utils and argv utils
class machineUtils {
  getMachineId() {
    const data = [
      os.hostname(),
      os.platform(),
      os.arch(),
      os.cpus()[0].model,
      os.totalmem(),
    ].join("|");
    return crypto.createHash("sha256").update(data).digest("hex");
  }
}

// define argv utils class that extends machine utils
class argvUtils extends machineUtils {
  // CREATE ACCOUNT
  async createAccount(params) {
    try {
      if (fs.existsSync("tempMemo.json")) {
        const data = fs.readFileSync("tempMemo.json", "utf-8");
        const tempMemo = JSON.parse(data);

        if (tempMemo.signingKey) {
          console.log(
            chalk.redBright("Account already exists for this machine."),
          );
          return;
        }
      }
      console.log(chalk.blueBright("Creating account..."));
      const payload = {
        userName: params.userName,
        userPasscode: params.passcode,
        machineId: this.getMachineId(),
      };
      const response = await axios.post(
        `${api_endpoint}/register-new-user`,
        payload,
      );
      if (response.data.exist) {
        console.log(
          chalk.redBright(
            "An account already exists with this username. Please choose a different username.",
          ),
        );
        return;
      }
      if (response.data.message) {
        const SigninKey = response.data.signingKey;
        fs.writeFileSync(
          "tempMemo.json",
          JSON.stringify({ signingKey: SigninKey }, null, 2),
        );

        console.log(chalk.greenBright("Account created successfully."));
      } else if (response.data.error) {
        console.log(chalk.redBright(response.data.error));
      }
    } catch (err) {
      console.log(chalk.redBright("Error creating account:", err.message));
    }
  }

  //   function to get user info
  async myInfo() {
    try {
      if (!fs.existsSync("tempMemo.json")) {
        console.log(
          chalk.redBright("No account found. Please create an account first."),
        );
        return;
      }
      const tempMemo = JSON.parse(fs.readFileSync("tempMemo.json", "utf-8"));
      if (!tempMemo.signingKey) {
        console.log(
          chalk.redBright("No signing key found. Please sign in first."),
        );
        return;
      }
      console.log(chalk.blueBright("Fetching user info..."));
      const payload = {
        userSigningKey: tempMemo.signingKey,
      };
      const response = await axios.post(
        `${api_endpoint}/get-user-info`,
        payload,
      );
      if (response.data) {
        console.log(chalk.blueBright("User Info:"));
        console.log(`${chalk.bgGreen("Username:")} ${response.data.userName}`);
        console.log(
          `${chalk.bgGreen("Machine ID:")} ${response.data.machineId}`,
        );
        console.log(
          `${chalk.bgGreen("IsBanned:")} ${response.data.isBanned ? "Yes" : "No"}`,
        );
        console.log(
          `${chalk.bgGreen("NodesDeployed:")} ${response.data.nodesDeployed}`,
        );
      } else if (response.data.error) {
        console.log(chalk.redBright(response.data.error));
      }
    } catch (err) {
      console.log(chalk.redBright("Error fetching user info:", err.message));
    }
  }

  // SIGN IN
  async signin(params) {
    try {
      if (!fs.existsSync("tempMemo.json")) {
        console.log(
          chalk.redBright("No account found. Please create an account first."),
        );
        return;
      }
      console.log(chalk.blueBright("Signing in..."));
      const payload = {
        userName: params.userName,
        userPasscode: params.passcode,
        machineId: this.getMachineId(),
      };
      const response = await axios.post(`${api_endpoint}/signin-user`, payload);
      if (response.data.message) {
        const SigninKey = response.data.signingKey;
        fs.writeFileSync(
          "tempMemo.json",
          JSON.stringify({ signingKey: SigninKey }, null, 2),
        );
        console.log(chalk.greenBright("Signed in successfully."));
      } else if (response.data.error) {
        console.log(chalk.redBright(response.data.error));
      }
    } catch (err) {
      console.log(chalk.redBright("Error signing in:", err.message));
    }
  }

  // CHANGE MACHINE
  async changeMachine(params) {
    try {
      if (!fs.existsSync("tempMemo.json")) {
        console.log(
          chalk.redBright("No account found. Please create an account first."),
        );
        return;
      }
      console.log(chalk.blueBright("Changing machine..."));
      const tempMemo = JSON.parse(fs.readFileSync("tempMemo.json", "utf-8"));
      if (!tempMemo.signingKey) {
        console.log(
          chalk.redBright("No signing key found. Please sign in first."),
        );
        return;
      }
      const payload = {
        userName: params.userName,
        userPasscode: params.passcode,
        newMachineId: this.getMachineId(),
      };
      const response = await axios.post(
        `${api_endpoint}/change-machine-id`,
        payload,
      );
      console.log(chalk.blueBright("Machine changed successfully."));
      if (response.data.message) {
        fs.writeFileSync(
          "tempMemo.json",
          JSON.stringify({ signingKey: response.data.signingKey }, null, 2),
        );
        console.log(chalk.greenBright("Machine changed successfully."));
      } else if (response.data.error) {
        console.log(chalk.redBright(response.data.error));
      }
    } catch (err) {
      console.log(chalk.redBright("Error changing machine:", err.message));
    }
  }

  // CREATE NODE
  async createNode(params) {
    try {
      if (!fs.existsSync("tempMemo.json")) {
        console.log(
          chalk.redBright("No account found. Please create an account first."),
        );
        return;
      }
      const tempMemo = JSON.parse(fs.readFileSync("tempMemo.json", "utf-8"));
      if (!tempMemo.signingKey) {
        console.log(
          chalk.redBright("No signing key found. Please sign in first."),
        );
        return;
      }
      console.log(chalk.blueBright("Creating node..."));
      const payload = {
        nodeName: params.nodeName,
        userNodeUrl: params.nodeUrl,
        userSigningKey: tempMemo.signingKey,
      };
      const response = await axios.post(
        `${api_endpoint}/create-new-node`,
        payload,
      );
      if (response.data.message) {
        console.log(chalk.greenBright("Node created successfully."));
      } else if (response.data.error) {
        console.log(chalk.redBright(response.data.error));
      }
    } catch (err) {
      console.log(chalk.redBright("Error creating node:", err.message));
    }
  }

  // LIST NODES
  async listNode() {
    try {
      if (!fs.existsSync("tempMemo.json")) {
        console.log(
          chalk.redBright("No account found. Please create an account first."),
        );
        return;
      }
      const tempMemo = JSON.parse(fs.readFileSync("tempMemo.json", "utf-8"));
      const payload = {
        userSigningKey: tempMemo.signingKey,
      };
      console.log(chalk.blueBright("Listing nodes..."));
      const response = await axios.post(
        `${api_endpoint}/get-user-nodes`,
        payload,
      );
      if (response.data.nodes) {
        if (response.data.nodes.length === 0) {
          console.log(
            chalk.yellowBright("No nodes found. Please create a node first."),
          );
          return;
        }
        console.log("Nodes:");
        response.data.nodes.forEach((node, index) => {
          console.log(
            `${index + 1}. ${node.nodeName} - ${node.userNodeUrl} : health [${node.healthPercentage < 100 ? chalk.redBright(node.healthPercentage + "%") : chalk.greenBright(node.healthPercentage + "%")}]`,
          );
        });
      } else if (response.data.error) {
        console.log(chalk.redBright(response.data.error));
      }
    } catch (err) {
      console.log(chalk.redBright("Error listing nodes:", err.message));
    }
  }

  // DELETE NODE
  async deleteNode(params) {
    try {
      if (!fs.existsSync("tempMemo.json")) {
        console.log(
          chalk.redBright("No account found. Please create an account first."),
        );
        return;
      }
      const tempMemo = JSON.parse(fs.readFileSync("tempMemo.json", "utf-8"));
      console.log(chalk.blueBright("Deleting node..."));
      const payload = {
        nodeName: params.nodeName,
        userSigningKey: tempMemo.signingKey,
      };
      const response = await axios.post(`${api_endpoint}/remove-node`, payload);
      if (response.data.message) {
        console.log(chalk.greenBright("Node deleted successfully."));
      } else if (response.data.error) {
        console.log(chalk.redBright(response.data.error));
      }
    } catch (err) {
      console.log(chalk.redBright("Error deleting node:", err.message));
    }
  }

  // UPDATE NODE NAME
  async updateNodeName(params) {
    try {
      if (!fs.existsSync("tempMemo.json")) {
        console.log(
          chalk.redBright("No account found. Please create an account first."),
        );
        return;
      }
      console.log(chalk.blueBright("Updating node name..."));
      const tempMemo = JSON.parse(fs.readFileSync("tempMemo.json", "utf-8"));
      const payload = {
        oldNodeName: params.oldNodeName,
        newNodeName: params.newNodeName,
        userSigningKey: tempMemo.signingKey,
      };
      const response = await axios.post(`${api_endpoint}/rename-node`, payload);
      if (response.data.message) {
        console.log(chalk.greenBright("Node name updated successfully."));
      } else if (response.data.error) {
        console.log(chalk.redBright(response.data.error));
      }
    } catch (err) {
      console.log(chalk.redBright("Error updating node name:", err.message));
    }
  }

  // UPDATE NODE URL
  async updateNodeUrl(params) {
    try {
      if (!fs.existsSync("tempMemo.json")) {
        console.log(
          chalk.redBright("No account found. Please create an account first."),
        );
        return;
      }
      console.log(chalk.blueBright("Updating node URL..."));
      const tempMemo = JSON.parse(fs.readFileSync("tempMemo.json", "utf-8"));
      const payload = {
        nodeName: params.nodeName,
        newNodeUrl: params.newNodeUrl,
        userSigningKey: tempMemo.signingKey,
      };
      const response = await axios.post(
        `${api_endpoint}/update-node-url`,
        payload,
      );
      if (response.data.message) {
        console.log(chalk.greenBright("Node URL updated successfully."));
      } else if (response.data.error) {
        console.log(chalk.redBright(response.data.error));
      }
    } catch (err) {
      console.log(chalk.redBright("Error updating node URL:", err.message));
    }
  }
}

export default new argvUtils();
