function TextScan(){
    var strings = document.getElementById("maintext").value;
    var text = strings.split(" ");
    console.log(text);
    return text;
}