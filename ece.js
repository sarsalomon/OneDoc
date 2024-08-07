const { exec } = require('child_process');
const path = require('path');

// Параметры для передачи
const file = 'logo.pdf';
const password = '1111';
const exePath = path.resolve(__dirname, 'python/dist', 'index');
console.log(exePath)
// Запуск Python-скрипта или исполняемого файла с параметрами
exec(`"${exePath}" "${file}" "${password}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Execution error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Standard error: ${stderr}`);
    return;
  }
  console.log(stdout);
});
