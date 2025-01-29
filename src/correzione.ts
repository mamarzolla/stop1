;
import{readdirSync,statSync} from "node:fs"
import path from "node:path";
import {DateTime} from "luxon";
const chalk = require("chalk");
const adesso = DateTime.local();
export const esamina =(dir:string , liv:number=0)=>{
    let files:string[]=[];
    let subDirs:string[]=[];
    logDir(dir, liv);

    let entities =readdirSync(dir, {withFileTypes:true});

    subDirs= entities
    .filter(dirent =>dirent.isDirectory())  // prima filtro per directory
    .map(directory=>directory.name) // poi mappo il directory name   
    for (const subdir of subDirs) {  // arrivati al primo livello usiamo la funzione ricorsiva 
       esamina(path.join(dir,subdir), liv+1); // gestisco anche il livello
    }
    files= entities
    .filter(dirent =>dirent.isFile())  // prima filtro per file
    .map(file=>file.name) // poi mappo il file name 
    for (const file of files) {
        LogFile(path.join(dir,file), liv+1);
    }
}

const logDir  =(dir:string , liv:number)=>{ // aggiungo il parametro per il livello
    //console.log(dir);
    console.log(chalk.green(`${getLayout(liv)}${path.basename(dir)} `) );
}

const LogFile =(file:string,liv:number)=>{
    // andiamo ad aggiungere il tempo di modifica
    const modTime = DateTime.fromMillis(statSync(file).mtimeMs); // converto la data dai dati statistici del file 
    const t = adesso.diff(modTime,"minute");
   let logString= `${getLayout(liv)}${path.basename(file)} (${Math.floor(t.minutes)} minuti fa)`;
     if(t.minutes<5){
        logString=chalk.magenta(logString);
     }else if(t.minutes< 30){
        logString=chalk.blue(logString);
     }
    console.log(logString);
}

const getLayout = (livello:number)=>{
    let sep= "";
    for(let i=0; i< livello; i++){
        sep+="|  ";
    }
    sep+="|--";
    return sep;
}