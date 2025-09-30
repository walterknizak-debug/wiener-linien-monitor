# 📤 GitHub Upload Anleitung

## 🎯 Schritt-für-Schritt: Dateien auf GitHub hochladen

### Methode 1: Über die GitHub Webseite (EINFACHSTE)

#### Schritt 1: Repository vorbereiten
1. Gehen Sie zu https://github.com/IhrUsername/wiener-linien-monitor
2. Klicken Sie auf "Add file" → "Upload files"

#### Schritt 2: Ordnerstruktur erstellen

**WICHTIG**: GitHub erlaubt nur das Hochladen von Dateien, nicht von Ordnern direkt.
Sie müssen die Ordnerstruktur über "Create new file" erstellen.

##### Hauptdateien hochladen:
1. Klicken Sie auf "Add file" → "Upload files"
2. Laden Sie hoch:
   - `README.md`
   - `LICENSE`
   - `.gitignore`

##### Standalone Ordner erstellen:
1. Klicken Sie auf "Add file" → "Create new file"
2. Geben Sie ein: `standalone/README.md`
3. Fügen Sie den Inhalt ein und klicken Sie "Commit"
4. Wiederholen Sie für alle Dateien in `standalone/`:
   - `standalone/index.html`
   - `standalone/style.css`
   - `standalone/app.js`
   - `standalone/server.js`

##### Webspace Ordner erstellen:
1. Klicken Sie auf "Add file" → "Create new file"
2. Geben Sie ein: `webspace/README.md`
3. Wiederholen Sie für:
   - `webspace/index.html`
   - `webspace/style.css`
   - `webspace/app.js`
   - `webspace/proxy.php`

##### Home Assistant Ordner erstellen:
1. Erstellen Sie: `home-assistant/README.md`
2. Wiederholen Sie für:
   - `home-assistant/index.html`
   - `home-assistant/style.css`
   - `home-assistant/app.js`
   - `home-assistant/server.js`
   - `home-assistant/home-assistant-integration.md`
   - `home-assistant/home-assistant-setup.yaml`

##### Add-on Ordner erstellen:
1. Erstellen Sie: `addon/README.md`
2. Wiederholen Sie für:
   - `addon/config.yaml`
   - `addon/Dockerfile`
   - `addon/run.sh`
   - `addon/rootfs/app/index.html`
   - `addon/rootfs/app/style.css`
   - `addon/rootfs/app/app.js`
   - `addon/rootfs/app/server.js`

---

### Methode 2: Mit Git (EMPFOHLEN für viele Dateien)

#### Voraussetzungen:
- Git installiert (Download: https://git-scm.com/)
- GitHub Account

#### Schritt 1: Git konfigurieren
```bash
git config --global user.name "Ihr Name"
git config --global user.email "ihre.email@example.com"
```

#### Schritt 2: Repository klonen
```bash
git clone https://github.com/IhrUsername/wiener-linien-monitor.git
cd wiener-linien-monitor
```

#### Schritt 3: Dateien kopieren
Kopieren Sie alle Dateien aus dem `github-structure/` Ordner in Ihr lokales Repository:

```bash
# Auf Windows (PowerShell):
Copy-Item -Path "C:\Pfad\zu\github-structure\*" -Destination "." -Recurse

# Auf Mac/Linux:
cp -r /pfad/zu/github-structure/* .
```

#### Schritt 4: Dateien hinzufügen und committen
```bash
git add .
git commit -m "Initial commit: Wiener Linien Monitor"
```

#### Schritt 5: Auf GitHub hochladen
```bash
git push origin main
```

Falls Sie nach einem Passwort gefragt werden:
- Verwenden Sie einen **Personal Access Token** statt Ihres Passworts
- Erstellen Sie einen unter: https://github.com/settings/tokens

---

### Methode 3: GitHub Desktop (EINFACH für Anfänger)

#### Schritt 1: GitHub Desktop installieren
Download: https://desktop.github.com/

#### Schritt 2: Repository klonen
1. Öffnen Sie GitHub Desktop
2. File → Clone Repository
3. Wählen Sie Ihr Repository aus

#### Schritt 3: Dateien kopieren
Kopieren Sie alle Dateien aus `github-structure/` in den lokalen Repository-Ordner

#### Schritt 4: Commit und Push
1. GitHub Desktop zeigt alle Änderungen an
2. Geben Sie eine Commit-Message ein: "Initial commit"
3. Klicken Sie auf "Commit to main"
4. Klicken Sie auf "Push origin"

---

## 📋 Checkliste: Was hochladen?

### Hauptverzeichnis:
- [ ] README.md
- [ ] LICENSE
- [ ] .gitignore

### standalone/:
- [ ] README.md
- [ ] index.html
- [ ] style.css
- [ ] app.js
- [ ] server.js

### webspace/:
- [ ] README.md
- [ ] index.html
- [ ] style.css
- [ ] app.js
- [ ] proxy.php

### home-assistant/:
- [ ] README.md
- [ ] index.html
- [ ] style.css
- [ ] app.js
- [ ] server.js
- [ ] home-assistant-integration.md
- [ ] home-assistant-setup.yaml

### addon/:
- [ ] README.md
- [ ] config.yaml
- [ ] Dockerfile
- [ ] run.sh
- [ ] rootfs/app/index.html
- [ ] rootfs/app/style.css
- [ ] rootfs/app/app.js
- [ ] rootfs/app/server.js

---

## 🎨 Nach dem Upload

### 1. Repository-Beschreibung hinzufügen
1. Gehen Sie zu Ihrem Repository
2. Klicken Sie auf das Zahnrad-Symbol neben "About"
3. Fügen Sie hinzu:
   - **Description**: "Abfahrtsmonitor für Wiener Linien mit Echtzeitdaten"
   - **Website**: Ihre Demo-URL (falls vorhanden)
   - **Topics**: `wiener-linien`, `vienna`, `public-transport`, `home-assistant`, `realtime`

### 2. README anpassen
Ersetzen Sie in der README.md:
- `IhrUsername` → Ihr GitHub Username
- Fügen Sie Screenshots hinzu (optional)

### 3. Releases erstellen (optional)
1. Gehen Sie zu "Releases" → "Create a new release"
2. Tag: `v1.0.0`
3. Title: "Initial Release"
4. Laden Sie die ZIP-Dateien als Assets hoch

---

## 🔧 Troubleshooting

### "Permission denied"
→ Verwenden Sie einen Personal Access Token statt Passwort

### "Large files"
→ Dateien über 100MB müssen mit Git LFS hochgeladen werden

### "Failed to push"
→ Pullen Sie zuerst: `git pull origin main`

---

## 💡 Tipps

1. **Commit Messages**: Verwenden Sie aussagekräftige Messages
   - ✅ "Add Home Assistant integration"
   - ❌ "Update"

2. **Branches**: Für größere Änderungen einen Branch erstellen
   ```bash
   git checkout -b feature/neue-funktion
   ```

3. **Issues**: Aktivieren Sie Issues für Bug-Reports

4. **Wiki**: Erstellen Sie ein Wiki für ausführliche Dokumentation

5. **.gitignore**: Achten Sie darauf, dass keine sensiblen Daten hochgeladen werden

---

## 📞 Hilfe benötigt?

- GitHub Docs: https://docs.github.com/
- Git Tutorial: https://git-scm.com/book/de/v2
- GitHub Desktop Guide: https://docs.github.com/en/desktop

---

Viel Erfolg mit Ihrem GitHub Repository! 🚀