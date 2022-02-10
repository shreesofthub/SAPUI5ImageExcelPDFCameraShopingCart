sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/util/Export",
        "sap/ui/core/util/ExportTypeCSV",
        "sap/ui/export/Spreadsheet"],
    function (controller, Export, exportType, spreadSheet) {
        return controller.extend("ns.businesspartners.controller.download", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
            },
            onBack: function () {
                this.oRouter.navTo("Routesuppliers");
            },
            onExport: sap.m.Table.prototype.exportData || function (oEvent) {
                var oExport = new Export({
                    exportType: new exportType({
                        separatorChar: ",",
                        charset: "utf-8"
                    }),
                    models: this.getView().getModel("rawData"),
                    rows:
                    {
                        path: "/flowers"
                    },
                    columns: [{
                        name: "Name of the Fruit",
                        template: {
                            content: "{productId}-{name}"
                        }
                    },
                    {
                        name: "Instructions",
                        template: {
                            content: "{instructions}"
                        }
                    }, {
                        name: "Price",
                        template: {
                            content: "{price}"
                        }
                    }, {
                        name: "Unit",
                        template: {
                            content: "{unit}"
                        }
                    }, {
                        name: "category",
                        template: {
                            content: "{category}"
                        }
                    }]
                });
                oExport.saveFile().catch(function (oError) {
                    new sap.m.messageBox.error("Error when downloading the Data" + oError);
                }).then(function () {
                    oExport.destroy();
                });
            },
            onExportXLS: function () {
                var aCols = this.createColumnConfig();
                var oModelData = this.getView().getModel("rawData").getProperty("/flowers");
                // var oModelInterface = oModel.getInterface(); Incase of ODATA Service
                oSettings = {
                    workbook: { columns: aCols },
                    dataSource: oModelData
                };
                new spreadSheet(oSettings).build();
            },
            createColumnConfig: function () {
                var aCols = [];
                aCols.push({
                    label: 'Flower Name',
                    type: 'string',
                    property: 'name'
                });
                aCols.push({
                    type: 'string',
                    property: 'instructions',
                });
                aCols.push({
                    type: 'string',
                    property: 'price',
                    scale: 0
                });
                aCols.push({
                    type: 'string',
                    property: 'unit',
                });
                aCols.push({
                    type: 'string',
                    property: 'category',
                });
                return aCols;
            }
        });
    });