import React from 'react';
import './App.css';
import { ReactTerminal } from "react-terminal";
import figlet from 'figlet';


const fonts:Array<string> = [
  "3-D",
  "3D Diagonal",
  "3D-ASCII",
  "3x5",
  "4Max",
  "5 Line Oblique",
  "Acrobatic",
  "Alligator",
  "Alligator2",
  "Alphabet",
  "AMC AAA01",
  "AMC Neko",
  "AMC Razor",
  "AMC Razor2",
  "AMC Slash",
  "AMC Slider",
  "AMC Thin",
  "AMC Tubes",
  "AMC Untitled",
  "ANSI Regular",
  "ANSI Shadow",
  "Arrows",
  "Avatar",
  "Banner",
  "Banner3-D",
  "Banner3",
  "Banner4",
  "Barbwire",
  "Basic",
  "Bear",
  "Bell",
  "Big Chief",
  "Big Money-ne",
  "Big Money-nw",
  "Big Money-se",
  "Big Money-sw",
  "Big",
  "Binary",
  "Block",
  "Bloody",
  "Bolger",
  "Braced",
  "Bright",
  "Broadway KB",
  "Broadway",
  "Bulbhead",
  "Caligraphy",
  "Caligraphy2",
  "Cards",
  "Catwalk",
  "Chiseled",
  "Chunky",
  "Coinstak",
  "Colossal",
  "Computer",
  "Contrast",
  "Cosmike",
  "Crawford",
  "Crawford2",
  "Cricket",
  "Cyberlarge",
  "Cybermedium",
  "Dancing Font",
  "Decimal",
  "Def Leppard",
  "Delta Corps Priest 1",
  "Diamond",
  "Digital",
  "Doom",
  "DOS Rebel",
  "Dot Matrix",
  "Double Shorts",
  "Double",
  "Dr Pepper",
  "Electronic",
  "Elite",
  "Epic",
  "Fender",
  "Filter",
  "Fire Font-k",
  "Fire Font-s",
  "Flower Power",
  "Fraktur",
  "Fun Faces",
  "Fuzzy",
  "Georgi16",
  "Georgia11",
  "Ghost",
  "Ghoulish",
  "Glenyn",
  "Gothic",
  "Graceful",
  "Gradient",
  "Graffiti",
  "Henry 3D",
  "Hex",
  "Hollywood",
  "Impossible",
  "Isometric1",
  "Isometric2",
  "Isometric3",
  "Isometric4",
  "Jacky",
  "Jazmine",
  "JS Bracket Letters",
  "JS Stick Letters",
  "Kban",
  "Keyboard",
  "Larry 3D 2",
  "Larry 3D",
  "Lean",
  "Letters",
  "Lil Devil",
  "Line Blocks",
  "Marquee",
  "Merlin1",
  "Merlin2",
  "Modular",
  "Morse",
  "Morse2",
  "Nancyj-Fancy",
  "Nancyj-Improved",
  "Nancyj-Underlined",
  "Nancyj",
  "Nipples",
  "NScript",
  "NV Script",
  "O8",
  "Octal",
  "Ogre",
  "Old Banner",
  "OS2",
  "Pagga",
  "Patorjk's Cheese",
  "Patorjk-HeX",
  "Pawp",
  "Peaks Slant",
  "Peaks",
  "Pebbles",
  "Poison",
  "Puffy",
  "Red Phoenix",
  "Reverse",
  "Roman",
  "Rounded",
  "Rowan Cap",
  "Rozzo",
  "S Blood",
  "Serifcap",
  "Shadow",
  "Shimrod",
  "Slant Relief",
  "Slant",
  "Slide",
  "Small Caps",
  "Small Isometric1",
  "Small Keyboard",
  "Small Poison",
  "Small Slant",
  "Soft",
  "Speed",
  "Spliff",
  "Stacey",
  "Standard",
  "Star Strips",
  "Star Wars",
  "Stellar",
  "Stick Letters",
  "Stop",
  "Stronger Than All",
  "Sub-Zero",
  "Swamp Land",
  "Swan",
  "Sweet",
  "Tanja",
  "The Edge",
  "Thick",
  "Thin",
  "THIS",
  "Thorned",
  "Ticks Slant",
  "Ticks",
  "Tiles",
  "Tinker-Toy",
  "Train",
  "Trek",
  "Tubular",
  "Twisted",
  "Univers",
  "USA Flag",
  "Varsity",
  "Wet Letter",
  "Whimsy",
];

class Command {
  readonly name: string;
  readonly description: string;
  readonly functionality: string | JSX.Element | Function;
  
  constructor(commandName: string, commandDescription: string, commandFunctionality: string | JSX.Element | Function) {
    this.name = commandName;
    this.description = commandDescription;
    this.functionality = commandFunctionality;
  }
}

function shuffleArray(array:Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}


function App() {
  const commands: Command[] = [
    new Command('help', 'Display information about builtin commands.', () => {
      return (
        <dl className='help-message'>
          {
            commands.map((command, index) => <React.Fragment key={index}><dt>{command.name}</dt><dd>{command.description}</dd></React.Fragment>)
          }
        </dl>
      );
    }),
    new Command('whoami', 'Print the user name associated with the current effective user ID.', 'guest')
  ];
  const commandsDict = Object.assign({}, ...commands.map((command) => ({[command.name]: command.functionality})));
  
  let fontStack:Array<string> = [...fonts];
  shuffleArray(fontStack);
  let font: string;
  
  let welcomeString: string;
  const loadFont = async () => {
    if (fontStack.length > 0) {
      font = fontStack.shift()!;
    } else {
      fontStack = [...fonts];
      shuffleArray(fontStack);
      font = fontStack.shift()!;
    }

    const module = await import(`figlet/importable-fonts/${font}`);
    figlet.parseFont('Standard', module.default);
    figlet.text("Work In Progress", function (err, data) {
        if (err) {
          console.error(err);
          return;
        } else if (data) {
          welcomeString = data;
          console.log(font);
        }
      }
    );

  };
  const afterLoadFont = () => {
    const welcomeMessageText:HTMLElement | null = document.getElementById('WelcomeMessageText');
    if (welcomeMessageText) {
      welcomeMessageText.innerText = welcomeString;
      welcomeMessageText.style.setProperty('font-size', `${font!='Binary'?115/welcomeString.indexOf('\n'):0.8}em`)
      // welcomeMessageText.style.setProperty('animation-duration', `${welcomeString.indexOf('\n')/115*50}s`)
      welcomeMessageText.onclick = () => {
        loadFont().then(afterLoadFont);
      }
    }
  };

  loadFont().then(afterLoadFont);

  const welcomeMessage = (
    <pre>
      <div id='WelcomeMessage'>
        <span id='WelcomeMessageText'></span>
      </div>
    <br/><br/>Welcome to my portfolio!<br/>This is currently a placeholder, until I finish with the final version.<br/>Type 'help' for available commands!<br/><br/></pre>);
  


  return (
    <div className='ReactTerminalContainer'>
      <div className='ReactTerminal'>
        <ReactTerminal
          welcomeMessage={welcomeMessage}
          commands={commandsDict}
          theme='dark'
        />
      </div>
    </div>
  );
}

export default App;
