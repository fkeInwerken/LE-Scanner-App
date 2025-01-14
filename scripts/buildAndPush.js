// scripts/buildAndPush.js

const { exec } = require('child_process');

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
