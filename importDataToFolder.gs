function importDataToFolder() {
  var importFileCount = 0

  var transferOrders = {
    fileName: "label:imftransferorders ",
    newName: "IMFTransferOrders"
  }
  
  var inventoryView = {
    fileName: "label:jw---items",
    newName: "inventoryView"
  }
  
  var driveFolder = "1GgXdCNU3tr-z-je0erCSIsm7lTJEarDx";
  
  [transferOrders, inventoryView].forEach(function(query) {
    var threads = GmailApp.search(query.fileName, 0, 1); //looking for the most recent thread and only 1 thread
  
    // loop through all threads matching above query
    threads.forEach(function(thread) {
      var messages = thread.getMessages();

      // loop through all messages in current thread
      messages.forEach(function(message) {
        var attachments = message.getAttachments();

        // loop through all attachments in current messages
        for (var i = 0; i < attachments.length; i++) {
          var attachment = attachments[i];
          
           if (checkIfCSV(attachment)) { // check if attachment is CSV by refering to the function
                    DriveApp.getFolderById(driveFolder).createFile(query.newName, attachment.getDataAsString(), "text/csv"); 
        
              importFileCount +=1
           }
        }
      });
    });
  });

  Logger.log("%s reports imported", importFileCount);
};
//this function will check for filextension type.
// and return boolean
function checkIfCSV(attachment){
  var fileName = attachment.getName();
  var temp = fileName.split('.');
  var fileExtension = temp[temp.length-1].toLowerCase();
  if(fileExtension == 'csv') return true;
  else return false;
}
