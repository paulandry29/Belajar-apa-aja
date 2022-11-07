
function btnTheme() {
    const metaTheme = document.getElementsByTagName("meta")[3].content;
    if (metaTheme == 'light') {
        document.getElementsByTagName("meta")[3].content = 'dark';
    } else {
        document.getElementsByTagName("meta")[3].content = 'light';
    }
}
function switchTheme() {
    const theme = document.getElementById("theme").value;
    document.getElementsByTagName("meta")[3].content = theme;
}