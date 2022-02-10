sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"],
    function (controller, jsonModel) {
        return controller.extend("ns.businesspartners.controller.pdfDisplay", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.idLocal = this.byId("idLocal");
                this.idLocal.setVisible(false);
            },
            onBack: function () {

                this.oRouter.navTo("Routesuppliers");
            },
            onShowPdf: function (oEvent) {
                var selectedIndex = oEvent.getParameters().selectedIndex;
                if (selectedIndex === 0) {
                    this._source = "model/mockData/ABAPonHANA.pdf";
                    this.title = "Display the Local PDF which is in same project";
                    this.idLocal.setVisible(true);
                } else if (selectedIndex === 1) {
                    // this._source = sap.ui.require.toUrl("sap/m/sample/PDFViewerMultiple/sample.pdf");
                    this._source = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
                    this.title = "Display the Remote PDF file";
                    this.idLocal.setVisible(true);                    
                }
                this._oModel = new jsonModel({
                    Source: this._source,
                    Title: this.title,
                    Height: "700px"
                });
                this.getView().setModel(this._oModel);

            }
        });
    });