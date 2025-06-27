export function factorial(n) {
  if (n < 0) throw new Error("Tidak bisa faktorial negatif");
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

export function evaluateExpression(expr) {
  try {
    // Ganti fungsi-fungsi matematika ke versi JavaScript
    let exp = expr
      .replace(/sin\(/g, "Math.sin(degToRad(")
      .replace(/cos\(/g, "Math.cos(degToRad(")
      .replace(/tan\(/g, "Math.tan(degToRad(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/\^/g, "**")
      .replace(/(\d+(\.\d+)?|\([^()]+\))!/g, "factorial($1)") // Tangani faktorial dengan ekspresi atau angka
      .replace(/%/g, "*0.01");

    // Buat dan jalankan fungsi dari ekspresi
    const func = new Function("factorial", "degToRad", `return ${exp};`);
    return func(factorial, degToRad);
  } catch (e) {
    console.error("Gagal evaluasi ekspresi:", expr, e);
    throw new Error("Ekspresi tidak valid");
  }
}
