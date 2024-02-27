class Command {
  constructor(commandType, value) {
    if (!commandType) {
      throw new Error('Command type required.');
    }

    this.commandType = commandType;

    // if (commandType === 'MOVE' && typeof value !== 'number') {
    //   throw new Error('Value must be a number.');
    // }

    this.value = value;
  }
}

module.exports = Command;