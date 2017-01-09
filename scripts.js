/*
  Appends custom flag function to the console
  Node | Vanilla
 */
console = (function () {
    "use strict";
    //Grabs console for Web or Node
    var CONSOLE = console.prototype || console;

    /*
     Prints a star border around the specified text.
     There is an 80 character limit per line before it wraps.
     */
    function flag() {
        var me = this;
        var args = Array.prototype.slice.call(arguments);
        args.map(function (arg) {
            arg = arg.toString();
            var message = "";
            var length = ((arg.length < 80) ? arg.length : 80) + 4;
            for (var i = 0; i < length; i++) message += "*";
            var sections = arg.match(/.{1,80}/g);
            sections.map(function (section) {
                message += "\n*";
                var minlen = (length - section.length) - 2;
                for (var i = 0; i < minlen / 2; i++) message += " ";
                message += section;
                for (var i = 0; i < (minlen / 2) - minlen % 2; i++) message += " ";
                message += "*";
            });
            message += "\n";
            for (var i = 0; i < length; i++) message += "*";
            me.log(message);
        });
    }
    CONSOLE.flag = flag;
    return CONSOLE;
}());

/*
 Array Iterator
 Node | Vanilla
 Breaks an array into chunks and then preforms a process for each chunk
 of the array. After preforming the task on a chunk it waits for the
 specified durration to pass before preforming the process on the next chunk.
 Once all the chunks have been processed, it calls your callback.
 
 Example:
 var numbers = [1,2,3,4,5,6,7,8,9];
 function leftShift(array, callback){
	var items = array.map(function(item){
        return item;
    });
    console.log(items);
    callback(items);
 }
 function finish(){
    console.log("|Task Completed|");
 }

 iterateProcess(numbers, 0 ,3, 2000)(leftShift, finish);

 Console:
	[0, 1, 2 ]
	(2s delay)
	[ 3, 4, 5 ]
	(2s delay)
	[ 6, 7, 8 ]
	|Task Completed|
 */
 function iterateProcess(array, index, amount, delay){
    return function(process, done){
        var selection = array.slice(index, (index + amount < array.length) ? index+amount : index.length),
            completed = false;
        process(selection, function(){
           if(index+amount < array.length)
               if(!delay)
                    iterateProcess(array, index+amount, amount)(process, done);
                else
                    setTimeout(function(){
                        iterateProcess(array, index+amount, amount, delay)(process, done);
                    }, delay);
            else{
                if(!completed){
                    completed = true;
                    done();
                }
            }
        });
    };
}

/*	
	Delete Folder
	Node
	Deletes a specified folder in Node
 */
 const fs = require("fs");
 function deleteFolder(path) {
    try{
        fs.statSync(path);
    }catch(e){
        console.log("Error deleting the specified path.");
        return;
    }
    var items = fs.readdirSync(path);
    items.forEach(function(file){
      var currentDir = currentDir + "/" + file;
      if(fs.statSync(currentDir).isDirectory()) { 
        deleteFolder(currentDir);
      } else { 
        fs.unlinkSync(currentDir);
      }
    });
    fs.rmdirSync(path);
};
