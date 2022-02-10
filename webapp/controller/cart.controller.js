sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function (controller) {
        return controller.extend("ns.businesspartners.controller.cart", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.attachRoutePatternMatched(this.getCartTable, this);
            },
            getCartTable: function () {
                var cartTableData = this.getView().getModel().getProperty("/cartTable");
                var cartTable = this.byId("idCartTable");
                var jsonModel = new sap.ui.model.json.JSONModel();
                jsonModel.setData({
                    cartTable: cartTableData
                });
                cartTable.setModel(jsonModel);
            },
            onBack: function () {
                this.oRouter.navTo("rbView",{
                    id:1
                });
            },
            onRefresh: function () {
                var cartTableBinding = this.byId("idCartTable").getItems();
                // for (var i = 0; i < cartTableBinding.length; i++) {
                cartTableBinding.splice(0, cartTableBinding.length);
                // }
                var model = this.getView().getModel();
                model.setProperty("/cartTable", cartTableBinding);
                var jsonEmptyModel = new sap.ui.model.json.JSONModel();
                jsonEmptyModel.setData({
                    empty: []
                });
                var cartTable = this.byId("idCartTable");
                cartTable.setModel(jsonEmptyModel);
                cartTable.length = 0;
            },
            onItemDeletion: function (event) {
                var deletedItemId = event.getParameters().id.length - 1;
                var deletedItemIndex = event.getParameters().id[deletedItemId];
                var cartTableModel = this.getView().getModel().getProperty("/cartTable");
                cartTableModel.splice(deletedItemIndex, 1);
                var jsonModel = new sap.ui.model.json.JSONModel();
                jsonModel.setData({
                    cartTable: cartTableModel
                });
                var cartTable = this.byId("idCartTable");
                cartTable.setModel(jsonModel);
            }
        });
    });
