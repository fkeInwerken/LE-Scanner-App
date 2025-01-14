// scripts/buildAndPush.js

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Funktion zum Erhöhen der Versionsnummer
function incrementVersion(version) {
  const parts = version.split('.');
  parts[2] = (parseInt(parts[2], 10) + 1).toString(); // Erhöht die Patch-Version
  return parts.join('.');
}

// Schritt 2: Versionsnummer erhöhen
const packageJsonPath = path.join(__dirname, '../package.json');
fs.readFile(packageJsonPath, 'utf8', (readError, data) => {
  if (readError) {
    console.error(`Fehler beim Lesen der package.json: ${readError.message}`);
    return;
  }

  const packageJson = JSON.parse(data);
  const newVersion = incrementVersion(packageJson.version);
  packageJson.version = newVersion;

  // Aktualisierte package.json speichern
  fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8', (writeError) => {
    if (writeError) {
      console.error(`Fehler beim Schreiben der package.json: ${writeError.message}`);
      return;
    }
    console.log(`Neue Version: ${newVersion}`);
  });
});

// Schritt 2: Git add . ausführen
exec('git add .', (addError, addStdout, addStderr) => {
  if (addError) {
    console.error(`Git add-Fehler: ${addError.message}`);
    return;
  }
  console.log(`Git add-Ausgabe:\n${addStdout}`);

  // Schritt 3: Git commit ausführen
  exec('git commit -am "build"', (commitError, commitStdout, commitStderr) => {
    if (commitError) {
      console.error(`Git Commit-Fehler: ${commitError.message}`);
      return;
    }
    console.log(`Git Commit-Ausgabe:\n${commitStdout}`);

    // Schritt 4: Git push ausführen
    exec('git push origin le_scanner', (pushError, pushStdout, pushStderr) => {
      if (pushError) {
        console.error(`Git Push-Fehler: ${pushError.message}`);
        return;
      }
      console.log(`Git Push-Ausgabe:\n${pushStdout}`);
    });
  });
});
