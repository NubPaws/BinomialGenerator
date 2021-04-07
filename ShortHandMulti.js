// 4
/*
n = 4 | p = 0
n = 4 | p = 1
n = 4 | p = 2
n = 4 | p = 3
*/
let memo = {};
const binome = (n, p = 0) => {
	if (n == 0 || p == 0 || p == n)
		return 1;
	if (p == 1 || p == n - 1)
		return n;
	
	let key = `${n}, ${p}`;
	if (key in memo)
		return memo[key];
	
	memo[key] = binome(n -1, p -1) + binome(n -1, p);
	return memo[key];
};

const genBase = (base, power) => {
	if (power == 1)
		return `${base}`;
	return `${base}<sup>${power}</sup>`;
};

const genPolynom = (symbol, coeff, base1, power1, base2, power2) => {
	let sym = (symbol) ? "+" : "-";
	return ` ${sym} ${coeff}${genBase(base1, power1)}${genBase(base2, power2)}`;
};

/*
(a-b)^3 = a^3 - 3*a^2*b + 3*a*b^2 - b^3
(a+b)^4 = a^4 + 4*a^3*b + 6*a^2*b^2 + 4*a*b^3 + b^4
(a-b)^4 = a^4 - 4*a^3*b + 6*a^2*b^2 - 4*a*b^3 + b^4
*/

// symbol is either true for addition or false for subtraction
const binomialGenerator = (power, symbol, a = "a", b = "b") => {
	if (power == 0)
		return "1";
	
	let binomialStr = genBase(a, power);
	let sym, coeff, pA, pB;
	for (let i = 0; i < power -1; i++) {
		coeff = binome(power, i +1);
		sym = symbol || i %2 == 1;
		pA = power - i - 1;
		pB = i + 1;
		binomialStr += genPolynom(sym, coeff, a, pA, b, pB);
	}
	sym = (symbol || power %2 == 0) ? "+" : "-";
	binomialStr += ` ${sym} ${genBase(b, power)}`;
	
	return binomialStr;
};

const writeBinomial = (elementID, aID, bID, powerID, symID) => {
	const a = document.getElementById(aID).value;
	const b = document.getElementById(bID).value;
	const power = parseInt(document.getElementById(powerID).value);
	const sym = (document.getElementById(symID).value == "+") ? true : false;
	const element = document.getElementById(elementID);
	
	element.innerHTML = binomialGenerator(power, sym, a, b);
};

const generateBinomialLine = (ln) => {
	let line = "";
	for (let i = 0; i <= ln; i++)
		line += `${binome(ln, i)} `;
	
	return line;
};

const writeBiomialLine = (elementID, lnNumElem) => {
	const element = document.getElementById(elementID);
	const lnNum = parseInt(document.getElementById(lnNumElem).value);
	
	element.innerHTML = "";
	for (let i = 0; i <= lnNum; i++) {
		element.innerHTML += `${generateBinomialLine(i)}<br />`;
	}
};
