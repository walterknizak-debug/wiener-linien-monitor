# 🏠 Home Assistant - Schnellstart-Anleitung

## 🎯 Einfachste Lösung (5 Minuten)

### Schritt 1: Server starten

Auf Ihrem Home Assistant System (z.B. via SSH oder Terminal):

```bash
# Dateien hochladen (z.B. via File Editor Add-on oder SCP)
# Dann im Verzeichnis mit den Dateien:

node server.js &
```

Der Server läuft jetzt auf Port 8000.

### Schritt 2: Dashboard-Karte hinzufügen

1. Öffnen Sie Ihr Home Assistant Dashboard
2. Klicken Sie auf die drei Punkte (⋮) oben rechts
3. Wählen Sie "Dashboard bearbeiten"
4. Klicken Sie auf "+ Karte hinzufügen"
5. Suchen Sie nach "Webpage" oder scrollen Sie zu "Webpage"
6. Geben Sie ein:
   - **URL**: `http://homeassistant.local:8000`
   - **Aspect Ratio**: `56%`
7. Klicken Sie auf "Speichern"

### ✅ Fertig!

Die Abfahrtszeiten werden jetzt in Ihrem Dashboard angezeigt!

---

## 🚀 Professionelle Lösung: Eigener Menüpunkt

### Schritt 1: configuration.yaml bearbeiten

1. Öffnen Sie **Einstellungen** → **Add-ons** → **File Editor**
2. Öffnen Sie die Datei `configuration.yaml`
3. Fügen Sie am Ende hinzu:

```yaml
panel_iframe:
  wiener_linien:
    title: "Wiener Linien"
    icon: mdi:tram
    url: "http://homeassistant.local:8000"
    require_admin: false
```

4. Speichern Sie die Datei

### Schritt 2: Home Assistant neu starten

1. Gehen Sie zu **Einstellungen** → **System** → **Neu starten**
2. Klicken Sie auf "Neu starten"

### ✅ Fertig!

Nach dem Neustart erscheint "Wiener Linien" in Ihrer Seitenleiste!

---

## 🔧 Server automatisch starten

### Option A: Über Home Assistant Terminal Add-on

1. Installieren Sie das "Terminal & SSH" Add-on
2. Erstellen Sie ein Startskript:

```bash
# In /config/scripts/start-wiener-linien.sh
#!/bin/bash
cd /config/www/wiener-linien
node server.js > /config/www/wiener-linien/server.log 2>&1 &
```

3. Machen Sie es ausführbar:
```bash
chmod +x /config/scripts/start-wiener-linien.sh
```

4. Fügen Sie eine Automation hinzu:

```yaml
automation:
  - alias: "Start Wiener Linien Monitor"
    trigger:
      - platform: homeassistant
        event: start
    action:
      - service: shell_command.start_wiener_linien

shell_command:
  start_wiener_linien: "/config/scripts/start-wiener-linien.sh"
```

### Option B: Systemd Service (für Home Assistant OS)

Wenn Sie Home Assistant OS verwenden, ist die Add-on-Lösung am besten.

---

## 📱 Mobile App Integration

Die Webseite funktioniert auch in der Home Assistant Mobile App!

1. Öffnen Sie die App
2. Navigieren Sie zu Ihrem Dashboard
3. Die Webpage-Karte wird automatisch angezeigt

---

## 🎨 Anpassungen

### Andere Stationen hinzufügen

1. Finden Sie die RBL-Nummer Ihrer Station:
   https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-ogd-haltepunkte.csv

2. Bearbeiten Sie `app.js`:
```javascript
STATIONS: {
    'Blindengasse': [272, 377],
    'Josefstädter Straße': [249, 273, 365, 458, 4607, 4622, 5661, 5667],
    'Ihre Station': [RBL1, RBL2]  // Hier hinzufügen
}
```

3. Server neu starten

### Andere Linien anzeigen

Bearbeiten Sie `app.js`:
```javascript
LINES_FILTER: ['2', '5', '12', 'U6', '43']  // Ihre Linien
```

---

## 🔍 Fehlerbehebung

### "Fehler beim Laden der Daten"

**Problem**: Server läuft nicht oder ist nicht erreichbar

**Lösung**:
```bash
# Prüfen ob Server läuft
ps aux | grep node

# Server neu starten
pkill node
node server.js &
```

### "Connection refused"

**Problem**: Falsche URL oder Port

**Lösung**:
- Prüfen Sie die URL in der Karte
- Verwenden Sie `http://homeassistant.local:8000`
- Oder die IP-Adresse: `http://192.168.1.XXX:8000`

### Server stoppt nach Neustart

**Problem**: Server läuft nicht automatisch

**Lösung**: Verwenden Sie die Autostart-Automation (siehe oben)

---

## 💡 Tipps & Tricks

### Vollbild auf Tablet

1. Erstellen Sie ein dediziertes Dashboard
2. Fügen Sie nur die Webpage-Karte hinzu
3. Setzen Sie Aspect Ratio auf `100%`
4. Aktivieren Sie Kiosk-Modus in der Home Assistant App

### Mehrere Monitore

Sie können mehrere Instanzen mit verschiedenen Stationen starten:

```bash
# Monitor 1 auf Port 8000
node server.js &

# Monitor 2 auf Port 8001 (server.js anpassen)
# const PORT = 8001;
node server2.js &
```

### Dark Mode

Die Home Assistant Version unterstützt automatisch Dark Mode!

---

## 📞 Support

Bei Fragen oder Problemen:
1. Prüfen Sie die Logs: `cat /config/www/wiener-linien/server.log`
2. Prüfen Sie die Browser-Konsole (F12)
3. Erstellen Sie ein Issue auf GitHub

---

## ✨ Nächste Schritte

- [ ] Server automatisch starten einrichten
- [ ] Weitere Stationen hinzufügen
- [ ] Automationen erstellen (z.B. Benachrichtigungen)
- [ ] REST Sensoren für erweiterte Funktionen

Viel Spaß mit Ihrem Wiener Linien Monitor! 🚊