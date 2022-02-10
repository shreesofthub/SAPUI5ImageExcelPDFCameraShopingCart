sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/unified/FileUploader"],
    function (controller, JSONModel, fileuploader) {
        return controller.extend("ns.businesspartners.controller.excel", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                var oModel = new JSONModel({
                    excelData: []
                });
                this.getView().setModel(oModel, "excelModel");
            },
            onExcelUpload: function () {
                if (!this.popupDialog) {
                    this.popupDialog = new sap.m.Dialog("idPopup", {
                        title: "Choose .csv File for upload",
                        resizable: true,
                        beginButton: new sap.m.Button({
                            text: "Upload",
                            press: function (oEvent) {
                                this.popupDialog.close();
                            }.bind(this)
                        }),
                        content: [
                            new fileuploader("idExcelUploader") 
                        ],
                        endButton: new sap.m.Button({
                            text: "Cancel",
                            press: function () {
                                this.popupDialog.close();
                            }.bind(this)
                        })
                    });
                    this.getView().addDependent(this.popupDialog);
                    this.popupDialog.attachBeforeClose(this.setDatatoJSONfromExcel, this);
                }
                this.popupDialog.open();
            },
            setDatatoJSONfromExcel: function (oEvent) {
                debugger;
                var oUploader = oEvent.getSource().getContent()[0];
                var domRef = oUploader.getFocusDomRef();
                if (domRef.files.length === 0) {
                    return;
                }
                var excelFile = domRef.files[0];
                var that = this;
                this.fileName = excelFile.name;
                this.fileType = excelFile.type;
                var reader = new FileReader();
                reader.onload = function (e) {
                    debugger;
                    var arrCSV = e.currentTarget.result.match(/[\w .]+(?=,?)/g);
                    var noofCol = 4;
                    var headerRow = arrCSV.slice(0, noofCol);
                    var data = [];
                    while (arrCSV.length > 0) {
                        var record = {};
                        var eData = arrCSV.splice(0, noofCol);
                        for (var i = 0; i < eData.length; i++) {
                            record[headerRow[i]] = eData[i].trim();
                        }
                        data.push(record);
                    }
                    that.getView().getModel("excelModel").setProperty("/excelData", data);
                }
                reader.readAsBinaryString(excelFile);
            },
            onBack: function () {
                
                this.oRouter.navTo("Routesuppliers");
            }
        });
    });