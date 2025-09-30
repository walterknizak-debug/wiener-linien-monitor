# 🚊 Wiener Linien Abfahrtsmonitor

Ein moderner, übersichtlicher Abfahrtsmonitor für die Wiener Linien mit Echtzeitdaten.

![Screenshot](screenshot.png)

## ✨ Features

- ✅ **Echtzeit-Abfahrtszeiten** direkt von der offiziellen Wiener Linien API
- ✅ **Automatische Aktualisierung** alle 30 Sekunden
- ✅ **Countdown in Minuten** bis zur Abfahrt
- ✅ **Barrierefreiheit-Anzeige** (♿)
- ✅ **Echtzeit-Indikator** (grüner Punkt bei Live-Daten)
- ✅ **Steig-Informationen**
- ✅ **Modernes, responsives Design**
- ✅ **Dark Mode Support**
- ✅ **Home Assistant Integration**

## 🚀 Schnellstart

### Standalone Version (Lokal)

```bash
git clone https://github.com/IhrUsername/wiener-linien-monitor.git
cd wiener-linien-monitor/standalone
node server.js
```

Öffnen Sie: `http://localhost:8000`

### Home Assistant Integration

```bash
cd wiener-linien-monitor/home-assistant
node server.js &
```

Dashboard-Karte hinzufügen:
```yaml
type: iframe
url: http://homeassistant.local:8000
aspect_ratio: 56%
```

Siehe [Home Assistant Dokumentation](home-assistant/README.md) für Details.

### Webspace Version

Laden Sie die Dateien aus dem `webspace/` Ordner auf Ihren Webspace hoch.

Siehe [Webspace Dokumentation](webspace/README.md) für Details.

## 📦 Verfügbare Versionen

| Version | Beschreibung | Dokumentation |
|---------|--------------|---------------|
| **Standalone** | Lokale Installation auf PC/Raspberry Pi | [README](standalone/README.md) |
| **Webspace** | PHP-basierte Version für Webhosting | [README](webspace/README.md) |
| **Home Assistant** | Optimiert für Home Assistant | [README](home-assistant/README.md) |
| **HA Add-on** | Vollständiges Home Assistant Add-on | [README](addon/README.md) |

## 🎨 Anpassungen

### Stationen ändern

Bearbeiten Sie `app.js`:

```javascript
STATIONS: {
    'Ihre Station': [RBL1, RBL2, RBL3]
}
```

RBL-Nummern finden Sie hier:
https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-ogd-haltepunkte.csv

### Linien ändern

```javascript
LINES_FILTER: ['2', '5', '12', 'U6']  // Ihre gewünschten Linien
```

### Aktualisierungsintervall

```javascript
REFRESH_INTERVAL: 30000  // Zeit in Millisekunden
```

## 🏠 Home Assistant Integration

Mehrere Integrationsmöglichkeiten:

1. **Webpage Card** - Einfachste Lösung
2. **Panel iFrame** - Eigener Menüpunkt
3. **REST Sensoren** - Native HA Sensoren
4. **Add-on** - Vollständige Integration

Siehe [Home Assistant Integration Guide](home-assistant/home-assistant-integration.md)

## 📱 Screenshots

### Desktop
![Desktop Screenshot](screenshots/desktop.png)

### Mobile
![Mobile Screenshot](screenshots/mobile.png)

### Home Assistant
![Home Assistant Screenshot](screenshots/homeassistant.png)

## 🔧 Technische Details

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js (Standalone/HA) oder PHP (Webspace)
- **API**: Wiener Linien Open Government Data
- **Aktualisierung**: Automatisch alle 30 Sekunden
- **Browser**: Alle modernen Browser (Chrome, Firefox, Safari, Edge)

## 📄 API Dokumentation

Die Wiener Linien API Dokumentation finden Sie hier:
https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-echtzeitdaten-dokumentation.pdf

## 🤝 Beitragen

Contributions sind willkommen! Bitte erstellen Sie einen Pull Request oder öffnen Sie ein Issue.

## 📝 Lizenz

MIT License - siehe [LICENSE](LICENSE) Datei

## 🙏 Credits

- Daten: [Wiener Linien Open Government Data](https://www.wienerlinien.at/open-data)
- Icons: Emoji
- Entwickelt mit ❤️ für Wien

## 📞 Support

Bei Fragen oder Problemen:
- Erstellen Sie ein [Issue](https://github.com/IhrUsername/wiener-linien-monitor/issues)
- Siehe [FAQ](FAQ.md)

## 🗺️ Roadmap

- [ ] Mobile App (React Native)
- [ ] Widget für iOS/Android
- [ ] Weitere Verkehrsbetriebe (z.B. ÖBB)
- [ ] Historische Datenanalyse
- [ ] Push-Benachrichtigungen

## ⭐ Star History

Wenn Ihnen dieses Projekt gefällt, geben Sie ihm einen Stern! ⭐

---

Made with ❤️ in Vienna 🇦🇹