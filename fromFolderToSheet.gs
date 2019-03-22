function fromFolderToFile() {
  var importedFileCount = 0;

  var transferOrders = {
    fileName: "IMFTransferOrders",
    sheetName: "IMFTransferOrders"
  };

  var invView = {
    fileName: "inventoryView",
    sheetName: "Items"
  };
  
  var originFolder = DriveApp.getFolderById("1GgXdCNU3tr-z-je0erCSIsm7lTJEarDx");
  var targetFile = SpreadsheetApp.openById("11ox2T9DCVDSvXzhl_ymRp6AGaXWNef3uzTh4Py60A5Y");

  [transferOrders,invView].forEach(function(query) { //for each item of the array this function will do the below

    var file = originFolder.getFilesByName(query.fileName).next();
    var csv = Utilities.parseCsv(file.getAs("text/csv").getDataAsString(), ","); //we transform each row in a string and each "," is a delimiter
    var targetSheet = targetFile.getSheetByName(query.sheetName);
    
    var lastRowPosition = csv.length;
    var lastColumnPosition = csv[0].length;
    var targetRange = targetSheet.getRange(1, 1, lastRowPosition, lastColumnPosition);
    targetRange.setValues(csv);

    importedFileCount += 1;
  });

  Logger.log("%s reports exported", importedFileCount);
}


  // this is what you get when you call Utilities.parseCsv

  //          row 1 (headers)           row 2                 row 3
  // [ [header1, header2, header3], [col1, col2, col3], [col1, col2, col3] ]     <-- This


