
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/MessageBox"
],
    function (Controller, filter, filterOperator, Fragment, sorter, label, input, msgBox) {
        "use strict";

        return Controller.extend("ns.businesspartners.controller.radioButton", {
            sDialogTab: null,
            _descending: "false",
            flag: null,
            no_of_ItemsAdded: null,
            that: null,
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
            },
            onItemSelection: function (event) {
                var listItem = event.getParameter("listItem");
                var sPath = listItem.getBindingContextPath();
                var index = sPath.split("/")[sPath.split("/").length - 1];
                this.oRouter.navTo("detailSupplier", {
                    id: index
                });
            },
            onSearch: function (oEvent) {
                if (oEvent.getParameter("refreshButtonPressed")) {
                    this.byId("list0").getBinding("items").refresh();
                }
                var sQuery = oEvent.getParameter("query");
                var nameSearch = new filter("name", filterOperator.Contains, sQuery);
                var descriptionSearch = new filter("description", filterOperator.Contains, sQuery);
                var concatSearch = new filter({
                    filters: [nameSearch, descriptionSearch],
                    and: false
                });
                var aSearch = [concatSearch];
                var list = this.byId("list0");
                var listBinding = list.getBinding("items");
                listBinding.filter(aSearch);

            },
            onDialogOpen: function (oEvent) {
                this.sDialogTab = "filter";
                if (oEvent.getSource() instanceof sap.m.Button) {
                    var sButtonId = oEvent.getSource().getId();
                    if (sButtonId.match("sort")) {
                        this.sDialogTab = "sort";
                    } else if (sButtonId.match("group")) {
                        this.sDialogTab = "group";
                    }
                }
                if (!this.byId("idViewDialog")) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "ns.businesspartners.fragments.dialog",
                        controller: this
                    }).then(function (viewDialog) {
                        this.getView().addDependent(viewDialog);
                        viewDialog.open(this.sDialogTab);
                    }.bind(this));
                }
                else {
                    this.byId("idViewDialog").open(this.sDialogTab);
                }
            },
            onViewDialogSelection: function (event) {
                var listId = this.getView().byId("list0");
                var oSorter = [];
                if (this.sDialogTab === "sort" || this.sDialogTab === "group") {
                    // var oSorter = [new sorter({
                    //     path: event.getParameters().sortItem.mProperties.key,
                    //     descending: event.getParameters().sortDescending,
                    //     group: true
                    // })];
                    if (event.getParameters().groupItem) {
                        oSorter.push(new sorter(event.getParameters().groupItem.getKey(),
                            event.getParameters().groupDescending, true));
                    } else {
                        oSorter.push(new sorter(
                            event.getParameters().sortItem.mProperties.key,
                            event.getParameters().sortDescending,
                            true
                        ));
                    }
                    listId.getBinding("items").sort(oSorter);
                } else if (this.sDialogTab === "filter") {
                    if (event.getParameters().filterItems[0].mProperties.key === "LT") {
                        var priceFilter = new filter("price", filterOperator.LT, 100);
                    } else if (event.getParameters().filterItems[0].mProperties.key === 'GE') {
                        var priceFilter = new filter("price", filterOperator.GE, 100);
                    }
                    listId.getBinding("items").filter(priceFilter);
                }
            },
            onMySort: function (event) {
                if (this._descending === "true") {
                    var oSorter = new sorter({
                        path: "id",
                        descending: false
                    });
                    this._descending = "false";
                } else if (this._descending === "false") {
                    var oSorter = new sorter({
                        path: "id",
                        descending: true
                    });
                    this._descending = "true";
                }
                this.getView().byId("list0").getBinding("items").sort(oSorter);

            },
            onCall: function (oEvent) {
                window.location.replace("https://www.drdo.gov.in/labs-and-establishments/research-centre-imarat-rci");
            },
            onAddition: function (event) {
                var selItem = event.getSource().getBindingContext().getObject();
                var oModel = this.getView().getModel();
                var ocartTable = oModel.getProperty("/cartTable");
                if (ocartTable.length > 0) {
                    for (var i = 0; i < ocartTable.length; i++) {
                        if (ocartTable[i].id === selItem.id) {
                            this.flag = "false";
                            ocartTable[i].qty = ocartTable[i].qty + 1;
                            var total = ocartTable[i].qty * ocartTable[i].price;
                            ocartTable[i].total = total;
                            break;
                        } else {
                            this.flag = "true";
                        }
                    }
                } else {
                    ocartTable.push(selItem);
                    ocartTable[0].qty = 1;
                    var total = ocartTable[0].qty * ocartTable[0].price;
                    ocartTable[0].total = total;
                }
                if (this.flag === "true") {
                    ocartTable.push(selItem);
                    ocartTable[i].qty = 1;
                    var total = ocartTable[i].qty * ocartTable[i].price;
                    ocartTable[i].total = total;
                    this.flag = "false";
                }
                oModel.setProperty("/cartTable", ocartTable);
            },
            onOpenCart: function (oEvent) {
                this.oRouter.navTo("cartView");
            },
            onLogin: function () {
                if (!this.loginDialog) {
                    this.loginDialog = new sap.m.Dialog("idDialog", {
                        title: "Login Details",
                        resizable: true,
                        content: [new sap.ui.layout.form.SimpleForm("idDialogsf", {
                            content: [
                                new label({ text: "UserName" }),
                                new input({ id: "idUname" }),
                                new label({ text: "Password" }),
                                new input({ id: "idPass", type: sap.m.InputType.Password })
                            ]
                        })],
                        subHeader: new sap.m.Toolbar({
                            content: [new sap.m.Button({
                                text: "New User?",
                                press: function () {
                                    if (!this.signUp) {
                                        this.that = this;
                                        this.signUp = new sap.ui.xmlfragment("ns.businesspartners.fragments.login", this);
                                        var password = sap.ui.getCore().byId("idDialogPass");
                                        sap.ui.getCore().byId("idDialog").addDependent(this.signUp);
                                        sap.ui.getCore().byId("idDialogConfirm").setVisible(false);
                                    }
                                    this.signUp.open();
                                },
                                onDialogClose: function () {
                                    this.that.signUp.close();
                                }.bind(this.that)
                            })]
                        }),
                        beginButton: new sap.m.Button({
                            type: sap.m.ButtonType.Emphasized,
                            text: "Login",
                            press: function () {
                                var oModel = this.getView().getModel().getProperty("/signin");
                                for (var i = 0; i < oModel.length; i++) {
                                    if ((oModel[i].uName === sap.ui.getCore().byId("idUname").getValue()) &&
                                        (oModel[i].password === sap.ui.getCore().byId("idPass").getValue())) {
                                        new msgBox.success("Successfully Loggedin");
                                        this.loginDialog.close();
                                    } else {
                                        new sap.m.MessageToast.show("Invalid Credentials");
                                    }
                                }
                            }.bind(this)
                        }),
                        endButton: new sap.m.Button({
                            text: "Close",
                            press: function () {
                                this.loginDialog.close();
                            }.bind(this)
                        })
                    })
                    this.getView().addDependent(this.loginDialog);
                }
                this.loginDialog.open();
            },
            onBack: function () {
                this.oRouter.navTo("Routesuppliers");
            }
        });
    });
