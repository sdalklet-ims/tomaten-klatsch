# Tomatenklatsch

Einmaleins-Reaktionsspiel fürs iPad: bunte Heirloom-Tomaten schweben durchs All, wer die mit dem richtigen Ergebnis zuerst antippt, pflückt sie. Solo (60 Sekunden) oder Duell zu zweit (20 Runden, iPad flach auf dem Tisch).

## Dateien
- `index.html` – das komplette Spiel (HTML, CSS, JS in einer Datei, keine externen Abhängigkeiten)
- `sw.js` – Service Worker für den Offline-Start
- `manifest.webmanifest`, `icons/` – App-Icon und Home-Bildschirm-Daten

## Aufs iPad
Seite in Safari öffnen → Teilen → „Zum Home-Bildschirm“. Nach dem ersten Laden läuft das Spiel auch offline.

## Updates
1. Dateien ändern.
2. In `sw.js` die Zeile `const VERSION = 'tk-v1';` hochzählen (z. B. `tk-v2`).
3. Committen und pushen. Die iPads zeigen die neue Fassung beim nächsten Start mit Internet (ohne Internet läuft die zuletzt geladene Fassung).

## Tests
`index.html?test` prüft die Rundenlogik (alle 100 Aufgaben, Fehlerwerte ohne Duplikate und ohne zweite richtige Lösung).
`index.html?icon` zeigt nur das App-Icon (zum Neuerzeugen der PNGs in `icons/`).
