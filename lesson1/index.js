import colors from "colors";

// console.log(process.argv);
const [min, max] = process.argv.slice(2);
Number(min, max);

const green = colors.green;
const yellow = colors.yellow;
const red = colors.red;
const blue = colors.blue;

let currentColor = green;

// console.log(colors.green(`Hello Node.js to ${vasy} and ${petya}`));

const a = Number(min);
const b = Number(max);

const changeColor = ()=> {
    switch (currentColor) {
        case green:
            currentColor = yellow;
            break;
        case yellow:
            currentColor = red;
            break;
        case red:
            currentColor = green;
            break
    }
};

if ((a % a == 0) && ( a > 0)){
    for (let i = a; i <= b; i++ ) {
        let j = 2;
        if (i % j == 0 && j <= i) {
            console.log(currentColor(i));
            changeColor();
            j++;
        }
    };
} else {
    console.log(blue("Вы ввели неверное число"));
}

