sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/m/Dialog"],
    function (controller, dialog) {
        return controller.extend("ns.businesspartners.controller.cameraIntegration", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
            },
            onPhotoTaking: function () {
                var that = this;
                this._oDialog = new dialog({
                    resizable: true,
                    title: "Click on Capture to take a Photo",
                    beginButton: new sap.m.Button({
                        text: "Capture",
                        press: function () {
                            that.imageVal = document.getElementById("idPlayer");
                            that._oDialog.close();
                        }
                    }),
                    content: [
                        new sap.ui.core.HTML({
                            content: "<video id='idPlayer' autoplay />"
                        }),
                        new sap.m.Input({
                            id:"idInput",
                            placeholder: "Please Enter Image Here",
                            required: true
                        })
                    ],
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: function () {
                            that._oDialog.close();
                        }
                    })
                })

                this.getView().addDependent(this._oDialog);
                this._oDialog.open();
                this._oDialog.attachBeforeClose(this.setImage, this);
                var handleSuccess = function (stream) {
                    idPlayer.srcObject = stream;
                }
                navigator.mediaDevices.getUserMedia({
                    video: true
                }).then(handleSuccess);
            },
            setImage: function () {
                var oVBox = this.byId("idBox");
                var items = oVBox.getItems();
                var snapId = 'Snap' + items.length;
                var textId = snapId + '-Text';
                var imageVal = this.imageVal;
                // set that as aconvas element on HTML Page
                var oCanvas = new sap.ui.core.HTML({
                    content: "<canvas id='" + snapId + "' width='320px' height='320px' " + "style='2px solid red'></canvas> " +
                        " <label id='" + textId + "'>" + sap.ui.getCore().byId("idInput").getValue() + "</label>"
                });
                oVBox.addItem(oCanvas);
                oCanvas.addEventDelegate({
                    onAfterRendering: function () {
                        var snapshot = document.getElementById(snapId);
                        var oContext = snapshot.getContext('2d');
                        oContext.drawImage(imageVal, 0, 0, snapshot.width, snapshot.height);
                    }
                });
            },
            onBack: function () {
                this.oRouter.navTo("Routesuppliers");
            },
            onSave:function(){
                var oModel = this.getView().getModel();
                var oBox = this.byId("idBox");
                var oItem = oBox.getItems()[0];
                oModel.setProperty("/fileUpload/0/content",oItem);
            }
        })

    });