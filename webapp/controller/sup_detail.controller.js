    sap.ui.define(
        ["sap/ui/core/mvc/Controller"],
        function (controller) {
            return controller.extend("ns.businesspartners.controller.sup_detail", {
                onInit: function () {
                    this.oRouter = this.getOwnerComponent().getRouter();
                    this.oRouter.attachRoutePatternMatched(this.getData, this);
                    this.lineItem;
                },
                getData: function (params) {
                    sPath = params.getParameters().arguments.id;
                    this.lineItem = sPath;
                    sPath = "/fruits/" + sPath;
                    this.getView().bindElement(sPath);
                },
                onBack: function () {
                    this.oRouter.navTo("rbView", {
                        id: this.lineItem
                    });
                }
            });
        });