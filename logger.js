const meta = import.meta;

/**
 * fixed 15MAY2022
 */
const errorArray = []
const logArray = []
const errorPath = new URL('error.log',meta.url);
const logPath = new URL('log.log',meta.url)
const maxItem = 1

/**returning current Date and Time in localString
 * @returns {string}
*/
function DateTime() {
    const date = new Date()
    const dateOpt = {
        weekday: "short",
        year: "numeric",
        month:"short",
        day:"2-digit"
        }
    const dateStr = date.toLocaleDateString('id-ID',dateOpt)

    const timeOpt = {
        timeZone:"Asia/Jakarta",
        hour12 : false,
        hour:  "2-digit",
        minute: "2-digit",
       second: "2-digit"
     }

     const timeStr = date.toLocaleTimeString('id-ID',timeOpt)
    return `${dateStr} ${timeStr}`
}

/** log Error to Array
 *  and update to file every 5 new item
 * @param {Error} err 
 */
function logError(err){
    console.error(err)
    errorArray.push(`${DateTime()} ${err}`)
    if(errorArray.length % maxItem === 0){
        updateFile(errorPath,errorArray.join('\n'))
        errorArray.length = 0 // emptying 
    }
}

/** log activities to array and update it to file 
 * every 5 new items
 * @param {string} t
*/
function log(t) {
    //console.log(t)
    //debugger;
    logArray.push(`${DateTime()} ${t}`)
    if(logArray.length % maxItem === 0){
        updateFile(logPath,logArray.join('\n'))
        logArray.length = 0 // emptying
    }
}

/** Update text file
 * 
 * @param {string} p file path
 * @param {string} d text to add
 */
function updateFile(p,d){
    /**@type {string} text from file */
    const f = Deno.readTextFileSync(p)
    Deno.writeTextFileSync(p, d+'\r'+f)
}


export {logError,log}