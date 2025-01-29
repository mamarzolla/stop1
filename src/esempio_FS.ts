import fs from "node:fs";
import path from "node:path";
import {DateTime} from "luxon";
const chalk = require("chalk");


export default () => {
 
    const now = DateTime.now();
    const listDirectory = (dir:string, depth = 0) => {
        try {
            const entities = fs.readdirSync(dir, { withFileTypes: true });
    
            for (const entity of entities) {
                const fullPath = path.join(dir, entity.name);
                const prefix = "--|".repeat(depth); // spaziatura

                if(entity.isDirectory()){
                    console.log(prefix,chalk.blue.bold("📂 " + entity.name));
                }
                else if (! entity.isDirectory()){
                    const infoFile = fs.statSync(fullPath);
                  //  console.log(infoFile.mtime);
                    const modifcationTime= DateTime.fromJSDate(infoFile.mtime);
                   // console.log(modifcationTime);
                    const differences = now.diff(modifcationTime,["days", "hours", "minutes"]).toObject();
                    //console.log(differences);
                    // deve avere un numero numerico altrimenti gli mettiamo di default 0  
                    const minutesDiff = differences.minutes ?? 0;
                    if (minutesDiff<=5){    
                         console.log( prefix,chalk.red("📄 " + entity.name));
                     }else {
                        console.log(prefix, chalk.green("📄 " + entity.name));
                     }

                } if (entity.isDirectory()) {
                    
                    listDirectory(fullPath, depth + 1); // Chiamata ricorsiva
                }
            }
        } catch (error) {
            console.error("Errore nell'accesso alla directory:");
        }
    };
    
    // Imposta la directory di partenza
    const dataFs = "Utilities";
    const workDir = process.cwd();
    const rootDirectory = path.join(workDir, dataFs);
    
    console.log(`📂 Root: ${rootDirectory}`);
    listDirectory(rootDirectory);
}

   // const dataFs= "Utilities";
    // const workDir= process.cwd();
    // const directory = path.join(workDir,dataFs);
    // //const leggereFile = fs.readFileSync(path.join(directory,"nome_File.txt"), "utf8");// leggere file in formato utf8 da mettere in try catch per evitare errori nel trovare o legere file 
    // console.log(directory);

    // try {
    //     const entities= fs.readdirSync(directory , {withFileTypes: true});
    //     for (const element of entities) {
    //         console.log(element.isDirectory()? "DIRECTORY":"FILE", element.name);
    //         if (element.isDirectory()== true){
    //             const pathDir= element.t
    //             for (const e of element) {
    //                 console.log(e.isDirectory()? "DIRECTORY":"FILE", e.name); 
                
    //             }
    //         }
            
    //     }
    // } catch (error) {
        
    // }