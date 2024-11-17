const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const ispis = document.getElementById("ispis");

let koorX = [];
let koorY = [];
let tackaX, tackaY;

function crtajProveri() {
    const brojTemena = parseInt(document.getElementById("brojTemena").value);
    const brojTemenaP = document.getElementById("brojTemena");
    const koordinate = document.getElementById("koordinate").value.split(";");
    const koordinateP = document.getElementById("koordinate");
    const tacka = document.getElementById("tacka").value.split(",");
    const tackaP = document.getElementById("tacka");

    koorX = [];
        koorY = [];
        koordinate.forEach(krd => {
            const [x, y] = krd.trim().split(",").map(Number);
            koorX.push(x);
            koorY.push(y);
        });
    
    if(brojTemena==null || koordinate=="" || tacka==""){
        brojTemenaP.style.borderColor="red";
        koordinateP.style.borderColor="red";
        tackaP.style.borderColor="red";   
        alert("Nepravilan unos podataka!\nPokušajte ponovo!"); 
    }
    else if (brojTemena<=10 && brojTemena>2 && koorX.length==brojTemena && koorY.length==brojTemena){                              
        tackaX = parseFloat(tacka[0].trim());
        tackaY = parseFloat(tacka[1].trim());
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(koorX[0], koorY[0]);
       
            for (let i = 1; i < brojTemena; i++) {
                ctx.lineTo(koorX[i], koorY[i]);
            }
            ctx.closePath();
            ctx.strokeStyle = "black";
            ctx.stroke();
    
            if (isPointInPolygon(tackaX, tackaY)) {
                ctx.fillStyle = "green";
                ispis.textContent = "Tačka je unutar mnogougla.";
            } else {
                ctx.fillStyle = "red";
                ispis.textContent = "Tačka je izvan mnogougla.";
            }
            ctx.beginPath();
            ctx.arc(tackaX, tackaY, 5, 0, 2 * Math.PI);
            ctx.fill();
            brojTemenaP.style.borderColor="grey";
            koordinateP.style.borderColor="grey";
            tackaP.style.borderColor="grey";           
        }
        else{
            brojTemenaP.style.borderColor="red";
            koordinateP.style.borderColor="red";
            tackaP.style.borderColor="red";   
            alert("Nepravilan unos podataka!\nPokušajte ponovo!");      
        }               
}

function isPointInPolygon(x, y) {
    let preseci = 0;
    
    for (let i = 0, j = koorX.length - 1; i < koorX.length; j = i++) {
        const x1 = koorX[i], y1 = koorY[i];
        const x2 = koorX[j], y2 = koorY[j];
        
        if ((y1 > y) !== (y2 > y)) {
            const presekX = x1 + (y - y1) * (x2 - x1) / (y2 - y1);
            if (x < presekX){
                preseci++;
            }
        }
    }
    return (preseci % 2 !== 0);
}

