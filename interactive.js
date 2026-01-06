import inquirer from 'inquirer';

/**
 * @param {string} message 询问提示语句
 * @returns  {Object} 根据name属性获取用户输入的值{confirm: true/false}
 */
export const inquirerConfirm = async (message) => { 
  const answer = await inquirer.prompt({
    type: "confirm",
    name: "confirm",
    message,
  });
  return answer;
}


/**
 * @param {string} message 询问提示语句 
 * @param {Array} choices 选择列表 
 * @param {string} type 列表类型 
 * @returns {Object} 选择结果
 */
export const inquirerChoose = async (message,choices,type='rawlist') => { 
  const answer = await inquirer.prompt({
    name: 'choose',
    type,
    message,
    choices,
    default: choices[0]
  });
  return answer
}

/**
 * 和用户交互，获取用户输入，用来修改配置文件package.json
 * @param {Array} messages  询问提示语句数组
 * @returns {Object} 结果对象
 */
export const inquirerInputs = async (messages) => { 
  const answers = await inquirer.prompt(messages.map(msg => { 
    return {
      name: msg.name,
      type: "input",
      message: msg.message,
    }
  }));
  return answers
}