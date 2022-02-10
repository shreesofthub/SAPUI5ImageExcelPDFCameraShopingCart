sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("ns.businesspartners.controller.suppliers", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
            },
            onRBAction: function () {
                if (this.getView().byId("idrbg1").getSelectedIndex() === 0) {
                    this.oRouter.navTo("rbView", {
                        id: this.getView().byId("idrbg1").getSelectedIndex()
                    });
                } else if (this.byId("idrbg1").getSelectedIndex() === 1) {
                    this.oRouter.navTo("file", {
                        id: this.getView().byId("idrbg1").getSelectedIndex()
                    });
                } else if (this.byId("idrbg1").getSelectedIndex() === 2) {
                    this.oRouter.navTo("excel", {
                        id: this.byId("idrbg1").getSelectedIndex()
                    });
                } else if (this.byId("idrbg1").getSelectedIndex() === 3) {
                    this.oRouter.navTo("download", {
                        id: this.byId("idrbg1").getSelectedIndex()
                    });
                } else if (this.byId("idrbg1").getSelectedIndex() === 4) {
                    this.oRouter.navTo("pdfDisplay", {
                        id: this.byId("idrbg1").getSelectedIndex()
                    });
                } else if (this.byId("idrbg1").getSelectedIndex() === 5) {
                    this.oRouter.navTo("camera", {
                        id: this.byId("idrbg1").getSelectedIndex()
                    })
                } else if (this.byId("idrbg1").getSelectedIndex() === 6) {
                    this.oRouter.navTo("jsView", {
                        id: this.byId("idrbg1").getSelectedIndex()
                    })
                }
            }
        });
    });
