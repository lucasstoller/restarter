# RESTARTER JS
## A Cross plataform javascript tool to fast reset your station
![Dr. Strange](https://i.ytimg.com/vi/OYEfs8hUUu4/maxresdefault.jpg)
### Requirements:
* Windows
  - [Chocolatey Package Manager]('https://chocolatey.org/') Installed.
* MacOS
  - [Homebrew Package Manager]('https://brew.sh') Installed.
* Linux
  - [Apt Package Manager](https://askubuntu.com/questions/860375/installing-apt-get') installed.

### Usage
* Clone this repo
* Inside the repo:
* Run `npm install` inside the repo to install dependencies
* Run `npm link` inside the repo to create a symlink
* Run `restarter <option>` and be happy

### Options
* `up <setup>`:
  - Install all programs represented inside `<setup>` file.

#### Setup File
* Your setup image file. It's a JSON (.json) file that constains all your programs described.
* Example: `studio.json`
```
{
  "type": "__restarter",
  "programs":[
    {"name":"atom"},
    {"name":"zenkit"},
    {"name":"audacity"}
  ]
}
```
