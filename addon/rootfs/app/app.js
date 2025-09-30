// Konfiguration
const CONFIG = {
    API_URL: '/api/departures',
    REFRESH_INTERVAL: 30000, // 30 Sekunden
    STATIONS: {
        'Blindengasse': [272, 377],
        'Josefstädter Straße': [249, 273, 365, 458, 4607, 4622, 5661, 5667]
    },
    LINES_FILTER: ['2', '5', '12', 'U6']
};

// Globale Variablen
let refreshTimer = null;

// Hilfsfunktionen
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
}

function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('de-AT', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    document.getElementById('lastUpdate').textContent = timeString;
}

// API-Abfrage
async function fetchDepartures(stopIds) {
    const params = stopIds.join(',');
    const url = `${CONFIG.API_URL}?stopIds=${params}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        throw error;
    }
}

// Datenverarbeitung
function processDepartures(apiData, stationName) {
    if (!apiData.data || !apiData.data.monitors) {
        return [];
    }

    const departures = [];
    
    apiData.data.monitors.forEach(monitor => {
        if (!monitor.lines) return;
        
        monitor.lines.forEach(line => {
            // Nur gewünschte Linien anzeigen
            if (!CONFIG.LINES_FILTER.includes(line.name)) {
                return;
            }
            
            if (!line.departures || !line.departures.departure) return;
            
            line.departures.departure.forEach(dep => {
                departures.push({
                    station: stationName,
                    line: line.name,
                    towards: line.towards,
                    platform: line.platform || '',
                    countdown: dep.departureTime.countdown,
                    timePlanned: dep.departureTime.timePlanned,
                    timeReal: dep.departureTime.timeReal,
                    barrierFree: line.barrierFree || false,
                    realtimeSupported: line.realtimeSupported || false
                });
            });
        });
    });
    
    // Sortieren nach Countdown
    departures.sort((a, b) => a.countdown - b.countdown);
    
    return departures;
}

// UI-Rendering
function renderDepartures(departuresByStation) {
    const content = document.getElementById('content');
    
    if (Object.keys(departuresByStation).length === 0) {
        content.innerHTML = '<div class="error">Keine Daten verfügbar</div>';
        return;
    }
    
    let html = '<div class="stations-grid">';
    
    for (const [stationName, departures] of Object.entries(departuresByStation)) {
        html += `
            <div class="station-card">
                <div class="station-header">
                    <div class="station-icon">📍</div>
                    <div class="station-name">${stationName}</div>
                </div>
                <div class="departures-list">
        `;
        
        if (departures.length === 0) {
            html += '<div class="no-departures">Keine Abfahrten in den nächsten 70 Minuten</div>';
        } else {
            // Nur die nächsten 6 Abfahrten pro Station anzeigen
            const limitedDepartures = departures.slice(0, 6);
            
            limitedDepartures.forEach(dep => {
                const lineClass = `line-${dep.line}`;
                const barrierFreeIcon = dep.barrierFree ? '<span class="barrier-free">♿</span>' : '';
                const realtimeIndicator = dep.realtimeSupported && dep.timeReal ? 
                    '<span class="realtime-indicator"></span>' : '';
                
                html += `
                    <div class="departure-item">
                        <div class="line-badge ${lineClass}">${dep.line}</div>
                        <div class="departure-info">
                            <div class="destination">
                                ${dep.towards}${barrierFreeIcon}${realtimeIndicator}
                            </div>
                            ${dep.platform ? `<div class="platform">Steig ${dep.platform}</div>` : ''}
                        </div>
                        <div class="countdown">
                            <div class="countdown-time">${dep.countdown}</div>
                            <div class="countdown-label">min</div>
                        </div>
                    </div>
                `;
            });
        }
        
        html += `
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    content.innerHTML = html;
}

// Hauptfunktion zum Laden und Anzeigen der Daten
async function loadAndDisplayDepartures() {
    try {
        const departuresByStation = {};
        
        // Daten für jede Station abrufen
        for (const [stationName, stopIds] of Object.entries(CONFIG.STATIONS)) {
            const apiData = await fetchDepartures(stopIds);
            const departures = processDepartures(apiData, stationName);
            departuresByStation[stationName] = departures;
        }
        
        // UI aktualisieren
        renderDepartures(departuresByStation);
        updateLastUpdateTime();
        
    } catch (error) {
        console.error('Fehler beim Laden der Abfahrten:', error);
        document.getElementById('content').innerHTML = `
            <div class="error">
                ⚠️ Fehler beim Laden der Daten<br>
                <small>${error.message}</small>
            </div>
        `;
    }
}

// Auto-Refresh einrichten
function startAutoRefresh() {
    if (refreshTimer) {
        clearInterval(refreshTimer);
    }
    
    refreshTimer = setInterval(() => {
        loadAndDisplayDepartures();
    }, CONFIG.REFRESH_INTERVAL);
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    // Erste Ladung
    loadAndDisplayDepartures();
    
    // Auto-Refresh starten
    startAutoRefresh();
    
    // Seite neu laden bei Sichtbarkeitsänderung (z.B. Tab-Wechsel)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            loadAndDisplayDepartures();
        }
    });
});