app.controller("contrast", function ($scope) {
    let codeEle = document.getElementById("erupt-code");
    // codeEle.getElementsByTagName("code")[0].innerText ="";
    Prism.highlightAllUnder(codeEle);

    Split(['#code', '#view'], {
        sizes: [35, 65],
        minSize: [200, 400],
        expandToMin: true,
        gutterSize: 2
    })
});
