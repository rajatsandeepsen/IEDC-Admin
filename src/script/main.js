export function closeLoading() {
    document.getElementById("loading").style.display = "none";
    // $("#app").load("../dist/forms/login.html"); 
}

export function OpenLoading() {
    document.getElementById("loading").style.display = 'block';
}

export function clearValue(id) {
    document.getElementById(id).value = "";
}

export const verifyUPDATE = (URL)=>{
    document.getElementById('verifyUPDATE').href = URL;
}
 export const relativeDATE = (value) => {
    return Date.parse(value) - 19800000;
 }