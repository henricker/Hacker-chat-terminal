const PRODUCTION_URL = 'https://hacker-chat-hvc.herokuapp.com'
export default class CliCommands {
  
  constructor({username, hostUri = PRODUCTION_URL, room}) {
    this.username = username;
    this.room = room;

    const { hostname, port, protocol } = new URL(hostUri);
    this.host = hostname;
    this.port = port;
    this.protocol = protocol.replace(/\W/, '');
  }

  static parseArguments(commands) {
    const cmd = new Map();
    const preffix = '--';
    for(let key in commands) {
      const index = parseInt(key);
      const command = commands[key];

      if(!command.includes(preffix))
        continue;
      
      cmd.set(
        command.replace(preffix, ''),
        commands[index + 1]
      )
    }

    return new CliCommands(Object.fromEntries(cmd));
  }
}