var CsvUtility=new function(){  
  //---------------------------------------------------------
  /**
  * upload CSV Data  to  FIREBASE function     
  * @param  {string} auth token     
  * @param  {string} user uid on firebase
  * @param  {ARRAY} csvData
  */
  //---------------------------------------------------------
  this.elaborateData=function(userToken,values) {
    
    //retrive config
    var batchCSVMappingNode= 'config/batchConfig/ccbs/CSVMappingOrderFields';
    var batchCSVMapping = FirebaseConnector.getFireBaseDataParsed(batchCSVMappingNode, userToken);
    
    //the saving node
    var dataNode= 'dataCCBS';
    
    var lenght = values.length;    
    
    //inizialize the json array
    var jsonArray = []
    
   var elaborationResult= CsvValidator.validate(values,batchCSVMapping);
    //Logger.log(elaborationResult);
    //if the CSV is valid, proced with elaboration
    if(elaborationResult.result){
      
      for(var i=1; i<lenght;i++){
        Logger.log(values[i]);
        //jsonRow
        var jsonRow={};
        //Logger.log(batchCSVMapping);
        jsonRow.Database=values[i][batchCSVMapping.Database];
        jsonRow.Region_Code=values[i][batchCSVMapping.Region_Code];
        jsonRow.Region_Name=values[i][batchCSVMapping.Region_Name];
        jsonRow.Product_Code=values[i][batchCSVMapping.Product_Code];
        jsonRow.Product_Name=values[i][batchCSVMapping.Product_Name];
        jsonRow.Element_Code=values[i][batchCSVMapping.Element_Code];
        jsonRow.Element_Name=values[i][batchCSVMapping.Element_Name];
        jsonRow.Units=values[i][batchCSVMapping.Units]; 
        jsonRow.Year=values[i][batchCSVMapping.Year]; 
        jsonRow.Value=values[i][batchCSVMapping.Value];
        //jsonRow.Flag=values[i][batchCSVMapping.Flag];
        
        jsonArray.push(jsonRow);
        //break;
      }    
      //save data in FIREBASE
      FirebaseConnector.writeOnFirebase(jsonArray,dataNode,userToken);
    }
    
    return elaborationResult;
  }
  //---------------------------------------------------------
  // END Fetch Sheet Data from FIREBASE function
  //--------------------------------------------------------- 
}
