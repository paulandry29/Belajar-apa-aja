var qrcode = new QRCode(document.querySelector(".qrcode"));
qrcode.makeCode("You Ugly!");
function generateQr(){
    qrcode.makeCode(document.querySelector("input").value);
}