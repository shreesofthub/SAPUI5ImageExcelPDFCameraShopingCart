sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function (Controller) {
        return Controller.extend("ns.businesspartners.controller.file", {
            onInit: function () {
                this.imageDisplay = this.byId("idImageButton");
                this.left = this.byId("idImageLeft");
                this.right = this.byId("idImageRight");
                this.imageDisplay.setVisible(false);
                this.left.setVisible(false);
                this.right.setVisible(false);
                this.oRouter = this.getOwnerComponent().getRouter();
                this.i = 0;
            },
            onBack: function () {
                this.oRouter.navTo("Routesuppliers");
            },
            onFileUpload: function () {
                var fileUploader = this.getView().byId("idFileUploader");
                var domRef = fileUploader.getFocusDomRef();
                var file = domRef.files[0];
                var that = this;
                this.fileName = file.name;
                this.fileType = file.type;
                var reader = new FileReader();
                reader.onload = function (e) {
                    debugger;
                    // var vContent = e.currentTarget.result.replace("data:image/jpeg;base64,", "");
                    var vContent = e.currentTarget.result;
                    that.postFiletoBackend("", that.fileName, that.fileType, vContent);
                };
                // File Reader will start reading thefile
                reader.readAsDataURL(file);
            },
            postFiletoBackend: function (productId, fileName, fileType, content) {
                var payload = {
                    "ProductId": productId,
                    // "Content": btoa(encodeURI(content)),
                    "Content": content,
                    "FileName": fileName,
                    "FileType": fileType
                };
                var oModel = this.getView().getModel();
                var fileupload = oModel.getProperty("/fileUpload");
                fileupload.push(payload);
                if (fileupload.length === 1) {
                    this.i = 0;
                    this.imageDisplay.setVisible(true);
                } else if (fileupload.length > 1) {
                    this.left.setVisible(true);
                    this.right.setVisible(true);
                }
            },
            onImageDisplay: function (oEvent) {
                var oModel = this.getView().getModel();
                var fileupload = oModel.getProperty("/fileUpload");
                this.imageDisplay.setVisible(false);
                if (oEvent.mParameters.id.includes("idImageLeft") === true) {
                    this.i = this.i + 1;
                    if (this.i === (fileupload.length - 1)) {
                        this.left.setVisible(false);
                        this.right.setVisible(true);
                    }
                } else if (oEvent.mParameters.id.includes("idImageRight") === true) {
                    this.i = this.i - 1;
                    if (this.i === 0) {
                        this.right.setVisible(false);
                        this.left.setVisible(true);
                    }
                }
                var imageContent = fileupload[this.i].Content;
                var image = this.byId("idImage");
                image.setSrc(imageContent)
            }
        });
    });