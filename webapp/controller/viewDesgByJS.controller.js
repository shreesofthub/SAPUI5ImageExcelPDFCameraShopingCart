sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/m/Button",
        "sap/m/Label",
        "sap/m/Input"],
    function (controller, button, label, input) {
        controller.extend("ns.businesspartners.controller.viewDesgByJS", {
            onInit: function () {
                this._oPanel = this.byId("idPanel");
                this.oRouter = this.getOwnerComponent().getRouter();
                this.getViewElements();
                var empJsonModel = new sap.ui.model.json.JSONModel({
                    "empData": {
                        "id": "1000",
                        "empName": "Shree",
                        "Phone": "09987764221",
                        "city": "Godavarikhani",
                        "salary": "10000"
                    },
                    "empTable": []
                });
                this.getView().setModel(empJsonModel, "employee");
                this.getElement("idUId").setEditable(false);
                this.getElement("idName").setEditable(false);
                this.getElement("idPhone").setEditable(false);
                this.getElement("idCity").setEditable(false);
            },
            onBack: function () {
                this.oRouter.navTo("Routesuppliers");
            },
            getViewElements: function () {
                var that = this;
                var oBox = new sap.m.VBox({
                    id: "idInputBox",
                    items: [
                        new sap.ui.layout.form.SimpleForm({
                            id: "idSimpleForm",
                            title: "Data display from JSON File",
                            layout: "ResponsiveGridLayout",
                            content: [
                                new label({
                                    text: "UserId"
                                }),
                                new input({
                                    id: "idUId",
                                    value: "{employee>/empData/id}"
                                }),
                                new label({
                                    text: "User Name",
                                }),
                                new input({
                                    id: "idName",
                                    value: "{employee>/empData/empName}",
                                    valueState: "{= ${employee>/empData/salary} >= 10000 ? 'Error' : 'Success'}"
                                }),
                                new label({
                                    text: "Phone Number"
                                }),
                                new input({
                                    id: "idPhone",
                                }),
                                new label({
                                    text: "City"
                                }),
                                new input({
                                    id: "idCity"
                                }),
                                new label({
                                    text: "Salary"
                                }),
                                new input({
                                    id: "idSalary",
                                    value: "{employee>/empData/salary}"
                                })
                            ]
                        }),
                        new sap.m.Button({
                            text: "GetFullData",
                            press: function () {
                                sap.ui.getCore().byId("idPhone").bindProperty("value", "employee>/empData/Phone");
                                sap.ui.getCore().byId("idCity").bindValue("employee>/empData/city");
                            }
                        }),
                        new sap.m.Button({
                            text: "Edit",
                            press: function () {
                                that.getElement("idUId").setEditable(true);
                                that.getElement("idName").setEditable(true);
                                that.getElement("idPhone").setEditable(true);
                                that.getElement("idCity").setEditable(true);
                            }
                        }),
                        new sap.m.Button({
                            text: "Insert",
                            press: function () {
                                that.insertData();

                            }
                        })
                    ]
                });
                var oTable = new sap.ui.table.Table({
                    id: "idTable",
                    alternateRowColors: true,
                    rows: "{employee>/empTable}",
                    columns: [
                        new sap.ui.table.Column({
                            label: new sap.m.Label({ text: "Employee ID" }),
                            template: new sap.m.Text({ text: "{employee>id}" })
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({ text: "Employee Name" }),
                            template: new sap.m.Text({ text: "{employee>empName}" })
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({ text: "Phone Number" }),
                            template: new sap.m.Text({ text: "{employee>Phone}" })
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({ text: "City" }),
                            template: new sap.m.Text({ text: "{employee>city}" })
                        })
                    ]
                });
                this._oPanel.addContent(oBox);
                this.byId("idTablePanel").addContent(oTable);
            },
            getElement: function (id) {
                return sap.ui.getCore().byId(id);
            },
            insertData: function () {
                var oModel = this.getView().getModel("employee");
                var empTable = oModel.getProperty("/empTable");
                var empStr = oModel.getProperty("/empData");
                empTable.push(empStr);
            }
        })
    });