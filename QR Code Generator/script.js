const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img");
let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
        createDownloadLink(qrImg.src);
    });
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
        removeDownloadLink();
    }
});

function createDownloadLink(qrCodeUrl) {
    let downloadLink = document.createElement("a");
    downloadLink.href = qrCodeUrl;
    downloadLink.download = "qr-code.png";
    downloadLink.innerText = "Download QR Code";
    downloadLink.classList.add("download-link");
    wrapper.appendChild(downloadLink);
}

function removeDownloadLink() {
    let downloadLink = wrapper.querySelector(".download-link");
    if (downloadLink) {
        downloadLink.remove();
    }
}
