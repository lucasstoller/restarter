// REQUIRES
const fs = require('fs');
const shell = require('shelljs');

// CONST
const OS = process.platform;
const PACKAGE_MANAGERS = {
  windows: {
    name: "Chocolatey", 
    command: "choco",
    site: "https://chocolatey.org/"
  },
  linux: {
    name: "Apt", 
    command: "apt",
    site: "https://askubuntu.com/questions/860375/installing-apt-get"
  },
  macos: {
    name: "Homebrew",
    command: "brew",
    site: "https://brew.sh"
  }
}

// FUNCTIONS
function commandExists(command){
  return shell.which(command);
}

function noPackageManagerAlert(os){
  console.log(`
    Restarter does not work on ${os} systems without ${PACKAGE_MANAGERS[os].name}.\n
    Please access ${PACKAGE_MANAGERS[os].site} to install it.
  `);
}

function install(programs, os){
  if (programs.length == 0) return;
  if (programs.length >= 1){
    program = programs.shift();
    shell.echo(`Preparing to install ${program.name.toUpperCase()}`);    
    
    const manager = os.command

    shell.echo(`Running: "${manager} install ${program.name}"...`);
    const command = shell.exec(`sudo ${manager} install ${program.name} --yes`, {silent: true});
    
    if (command.code !== 0) {
      shell.echo(`✖ ️Error: ${program.name} could not be istalled.\n`);
    } else {
      shell.echo(`✔️ ️${program.name} installed.\n`);
    }

    install(programs, os);
  }
}

// UP ITSELFES
module.exports = path => {
  if (!fs.existsSync(path)) return console.log('Error! File does not exists.');
  if (!path.match(/(.json)$/)) return console.log('Error! Not supported format.');

  const rawdata = fs.readFileSync(path);
  const setup = JSON.parse(rawdata);
  if (setup.type != "__restarter") return console.log('\nError! Not a restarter file.\n');
  
  shell.echo(`Setuping ${path} station\n`);

  switch (OS) {
    case 'win32':
      if (!commandExists(PACKAGE_MANAGERS.windows.command)) noPackageManagerAlert('windows');
      else {
        install(setup.programs, PACKAGE_MANAGERS.windows);
      }
      break;
      
    case 'linux':
      if (!commandExists(PACKAGE_MANAGERS.linux.command)) noPackageManagerAlert('linux');
      else {
        install(setup.programs, PACKAGE_MANAGERS.linux);
      }
      break;

    case 'darwin':
      if (!commandExists(PACKAGE_MANAGERS.macos.command)) noPackageManagerAlert('macos');
      else {
        install(setup.programs, PACKAGE_MANAGERS.macos);
      }
      break;
  }

  shell.echo("All done")
}