import chalk from "chalk";
const help_info = `
Usage:
----------------------------------------------------------------------------
--help, -h         Show this help message

--version, -v      Show the version number
  
--createAccount    Create new interstellar account for new users E.g: --createAccount <username> <passcode>
  
--createNode       Create new node E.g: --createNode <nodeName> <nodeUrl>
  
--listNode         List all users created nodes
  
--deleteNode       Delete a node E.g: --deleteNode <nodeName>
  
--updateNodeName   Update a node name E.g: --updateNodeName <oldNodeName> <newNodeName>

--updateNodeUrl    Update a node url E.g: --updateNodeUrl <nodeName> <newNodeUrl>

--signin           Signin in for you already have an account E.g: --signin <username> <passcode>

--changeMachine     Change machine if you got a new pc or machine to run interstellar on E.g: --changeMachine <username> <passcode>

------------------------------------------------------------------------------
${chalk.blueBright("For more information, please visit our documentation send us an email @ chuksisonchain@gmail.com")}
`;

export default help_info;
