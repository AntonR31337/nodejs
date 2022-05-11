import colors from "colors";

// console.log(process.argv);
const [min, max] = process.argv.slice(2);
Number(min, max);

// console.log(colors.green(`Hello Node.js to ${vasy} and ${petya}`));

const a = Number(min);
const b = Number(max);

if ((a % a == 0) && ( a > 0)){
    for (let i = a; i <= b; i++ ) {
        console.log(colors.red(i));
    };
} else {
    console.log("Вы ввели неверное число");
}
