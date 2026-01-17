<script>
    // Update current time
    function updateTime() {
        document.getElementById('currentTime').textContent = new Date().toLocaleString('fr-FR');
    }
    updateTime();
    setInterval(updateTime, 60000);

    // Login handling
    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple demo authentication
        if (username && password) {
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('mainApp').classList.remove('hidden');
            showNotification('✓ Connexion réussie', `Bienvenue ${username}`);
        }
    }

    // Notification system
    function showNotification(title, message, duration = 3000) {
        const notif = document.getElementById('notification');
        document.getElementById('notifTitle').textContent = title;
        document.getElementById('notifMessage').textContent = message;
        notif.classList.add('show');
        setTimeout(() => notif.classList.remove('show'), duration);
    }

    // Modal management
    function openModal(modalId) {
        document.getElementById(modalId).classList.add('show');
    }

    function closeModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
    }

    // Server details modal
    function viewDetails(serverName) {
        document.getElementById('modalServerName').textContent = serverName;
        
        // Sample data based on server
        if (serverName === 'serveur-A') {
            document.getElementById('modalServerIP').textContent = '192.168.10.15';
            document.getElementById('modalLastBackup').textContent = '2025-12-08 02:00';
            document.getElementById('modalServerStatus').innerHTML = '<span class="badge badge-ok">✓ OK</span>';
            
            // Archives
            const archiveList = document.getElementById('modalArchiveList');
            archiveList.innerHTML = `
                <div class="archive-item">
                    <div class="archive-item-header">
                        <span class="archive-name">AJ.0</span>
                        <span class="badge badge-ok">✓ OK</span>
                    </div>
                    <div class="archive-details">
                        <div>📅 Date: 2025-12-08 02:00</div>
                        <div>💾 Taille: 17.2 Go</div>
                        <div>🔒 Checksum: a3f2e9...</div>
                    </div>
                </div>
                <div class="archive-item">
                    <div class="archive-item-header">
                        <span class="archive-name">AJ.1</span>
                        <span class="badge badge-ok">✓ OK</span>
                    </div>
                    <div class="archive-details">
                        <div>📅 Date: 2025-12-07 02:00</div>
                        <div>💾 Taille: 17.1 Go</div>
                        <div>🔒 Checksum: b7c4d1...</div>
                    </div>
                </div>
                <div class="archive-item">
                    <div class="archive-item-header">
                        <span class="archive-name">AJ.2</span>
                        <span class="badge badge-ok">✓ OK</span>
                    </div>
                    <div class="archive-details">
                        <div>📅 Date: 2025-12-06 02:00</div>
                        <div>💾 Taille: 17.0 Go</div>
                        <div>🔒 Checksum: c8e5f3...</div>
                    </div>
                </div>
            `;
        } else {
            document.getElementById('modalServerIP').textContent = '192.168.10.20';
            document.getElementById('modalLastBackup').textContent = '2025-12-01 03:15';
            document.getElementById('modalServerStatus').innerHTML = '<span class="badge badge-ko">✗ ERREUR</span>';
            
            const archiveList = document.getElementById('modalArchiveList');
            archiveList.innerHTML = `
                <div class="archive-item">
                    <div class="archive-item-header">
                        <span class="archive-name">AJ.0</span>
                        <span class="badge badge-ok">✓ OK</span>
                    </div>
                    <div class="archive-details">
                        <div>📅 Date: 2025-12-01 03:15</div>
                        <div>💾 Taille: 20.5 Go</div>
                        <div>🔒 Checksum: d9f6a2...</div>
                    </div>
                </div>
                <div class="archive-item">
                    <div class="archive-item-header">
                        <span class="archive-name">AJ.1</span>
                        <span class="badge badge-ok">✓ OK</span>
                    </div>
                    <div class="archive-details">
                        <div>📅 Date: 2025-11-24 03:15</div>
                        <div>💾 Taille: 19.8 Go</div>
                        <div>🔒 Checksum: e1a7b3...</div>
                    </div>
                </div>
            `;
        }
        
        openModal('serverDetailsModal');
    }

    // Schedule management
    function addSchedule() {
        document.getElementById('scheduleModalTitle').textContent = '➕ Nouvelle planification';
        document.querySelector('#scheduleModal form').reset();
        openModal('scheduleModal');
    }

    function editSchedule(serverName) {
        document.getElementById('scheduleModalTitle').textContent = `✏️ Modifier la planification - ${serverName}`;
        document.getElementById('scheduleServer').value = serverName;
        
        // Pre-fill with existing data
        if (serverName === 'serveur-A') {
            document.getElementById('scheduleFrequency').value = 'daily';
            document.getElementById('scheduleTime').value = '02:00';
            document.getElementById('retentionType').value = 'days';
            document.getElementById('retentionCount').value = '7';
            updateFrequencyOptions();
            updateRetentionOptions();
        } else {
            document.getElementById('scheduleFrequency').value = 'weekly';
            document.getElementById('scheduleTime').value = '03:00';
            document.getElementById('retentionType').value = 'weeks';
            document.getElementById('retentionCount').value = '4';
            updateFrequencyOptions();
            updateRetentionOptions();
        }
        
        openModal('scheduleModal');
    }

    function deleteSchedule(serverName) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer la planification pour ${serverName} ?`)) {
            showNotification('🗑️ Suppression', `Planification supprimée pour ${serverName}`);
        }
    }

    function saveSchedule(e) {
        e.preventDefault();
        const serverName = document.getElementById('scheduleServer').value;
        showNotification('✓ Succès', `Planification enregistrée pour ${serverName}`);
        closeModal('scheduleModal');
    }

    function updateFrequencyOptions() {
        const frequency = document.getElementById('scheduleFrequency').value;
        const weekdaysGroup = document.getElementById('weekdaysGroup');
        const monthdayGroup = document.getElementById('monthdayGroup');
        
        weekdaysGroup.style.display = frequency === 'weekly' ? 'flex' : 'none';
        monthdayGroup.style.display = frequency === 'monthly' ? 'flex' : 'none';
    }

    function updateRetentionOptions() {
        const retentionType = document.getElementById('retentionType').value;
        const retentionCountGroup = document.getElementById('retentionCountGroup');
        
        retentionCountGroup.style.display = retentionType ? 'flex' : 'none';
        
        // Update placeholder based on type
        const input = document.getElementById('retentionCount');
        if (retentionType === 'days') {
            input.placeholder = 'Ex: 7 pour conserver 7 jours';
        } else if (retentionType === 'weeks') {
            input.placeholder = 'Ex: 4 pour conserver 4 semaines';
        } else if (retentionType === 'months') {
            input.placeholder = 'Ex: 12 pour conserver 12 mois';
        }
    }

    function toggleWeekday(btn) {
        btn.classList.toggle('selected');
    }

    // SSH Key upload
    function handleSSHKeyUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('sshKeyContent').value = e.target.result;
                document.getElementById('sshKeyUpload').classList.add('has-file');
                document.getElementById('sshKeyUpload').innerHTML = `<p>✓ Fichier chargé: ${file.name}</p>`;
            };
            reader.readAsText(file);
        }
    }

    function testSSHConnection() {
        const ip = document.getElementById('serverIP').value;
        const port = document.getElementById('sshPort').value;
        const user = document.getElementById('sshUser').value;
        
        if (!ip || !user) {
            showNotification('⚠️ Erreur', 'Veuillez remplir l\'adresse IP et l\'utilisateur SSH');
            return;
        }
        
        showNotification('🔌 Test en cours', 'Connexion SSH en cours...', 2000);
        setTimeout(() => {
            showNotification('✓ Succès', `Connexion SSH établie avec ${user}@${ip}:${port}`);
        }, 2000);
    }

    // Action handlers
    function refreshData() { 
        showNotification('✓ Actualisation', 'Données actualisées avec succès'); 
    }

    function saveServer(e) {
        e.preventDefault();
        const serverName = document.getElementById('serverName').value;
        showNotification('✓ Succès', `Serveur ${serverName} enregistré avec succès`);
        e.target.reset();
    }

    function startBackup(server) { 
        showNotification('▶️ Démarrage', `Sauvegarde lancée pour ${server}`, 4000); 
    }

    function startScan() {
        showNotification('🔍 Scan', 'Analyse des archives en cours...', 4000);
        setTimeout(() => {
            document.getElementById('scanResults').style.display = 'block';
            showNotification('✓ Scan terminé', 'Le scan est terminé avec succès');
        }, 3000);
    }

    function quickScan() { 
        showNotification('⚡ Scan rapide', 'Scan rapide en cours...', 2000); 
    }

    function filterLogs() {
        showNotification('🔍 Filtrage', 'Logs filtrés selon vos critères');
    }

    function exportLogs() {
        showNotification('💾 Export', 'Logs exportés en fichier texte');
    }

    function clearLogs() {
        if (confirm('Voulez-vous vraiment effacer les anciens logs ?')) {
            showNotification('🗑️ Suppression', 'Logs anciens supprimés');
        }
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Pie Chart Class
    class PieChart {
        constructor(canvasId, data, colors, labels) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) return;
            
            this.ctx = this.canvas.getContext('2d');
            this.data = data;
            this.colors = colors;
            this.labels = labels;
            this.centerX = this.canvas.width / 2;
            this.centerY = this.canvas.height / 2;
            this.radius = 80;
            this.hoveredSlice = -1;
            this.animationProgress = 0;
            
            this.canvas.style.cursor = 'pointer';
            this.setupEventListeners();
            this.animate();
        }

        setupEventListeners() {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const dx = x - this.centerX;
                const dy = y - this.centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.radius && distance > this.radius * 0.6) {
                    let angle = Math.atan2(dy, dx);
                    if (angle < 0) angle += 2 * Math.PI;
                    angle = (angle + Math.PI / 2) % (2 * Math.PI);
                    
                    const total = this.data.reduce((sum, val) => sum + val, 0);
                    let currentAngle = 0;
                    let newHoveredSlice = -1;
                    
                    for (let i = 0; i < this.data.length; i++) {
                        const sliceAngle = (2 * Math.PI * this.data[i]) / total;
                        if (angle >= currentAngle && angle < currentAngle + sliceAngle) {
                            newHoveredSlice = i;
                            break;
                        }
                        currentAngle += sliceAngle;
                    }
                    
                    if (newHoveredSlice !== this.hoveredSlice) {
                        this.hoveredSlice = newHoveredSlice;
                        this.draw();
                    }
                } else if (this.hoveredSlice !== -1) {
                    this.hoveredSlice = -1;
                    this.draw();
                }
            });

            this.canvas.addEventListener('mouseleave', () => {
                if (this.hoveredSlice !== -1) {
                    this.hoveredSlice = -1;
                    this.draw();
                }
            });

            this.canvas.addEventListener('click', () => {
                if (this.hoveredSlice !== -1) {
                    showNotification('📊 Détails', this.labels[this.hoveredSlice]);
                }
            });
        }

        animate() {
            if (this.animationProgress < 1) {
                this.animationProgress += 0.02;
                this.draw();
                requestAnimationFrame(() => this.animate());
            }
        }

        draw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            const total = this.data.reduce((sum, val) => sum + val, 0);
            let currentAngle = -Math.PI / 2;

            this.data.forEach((value, index) => {
                const sliceAngle = (2 * Math.PI * value * this.animationProgress) / total;
                const isHovered = index === this.hoveredSlice;
                const radiusToUse = isHovered ? this.radius + 10 : this.radius;
                
                let offsetX = 0, offsetY = 0;
                if (isHovered) {
                    const midAngle = currentAngle + sliceAngle / 2;
                    offsetX = Math.cos(midAngle) * 5;
                    offsetY = Math.sin(midAngle) * 5;
                }
                
                this.ctx.beginPath();
                this.ctx.arc(
                    this.centerX + offsetX, 
                    this.centerY + offsetY, 
                    radiusToUse, 
                    currentAngle, 
                    currentAngle + sliceAngle
                );
                this.ctx.lineTo(this.centerX + offsetX, this.centerY + offsetY);
                this.ctx.fillStyle = this.colors[index];
                this.ctx.fill();
                
                this.ctx.strokeStyle = 'white';
                this.ctx.lineWidth = 3;
                this.ctx.stroke();

                if (isHovered) {
                    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
                    this.ctx.shadowBlur = 10;
                    this.ctx.shadowOffsetX = 2;
                    this.ctx.shadowOffsetY = 2;
                }

                currentAngle += sliceAngle;
                
                this.ctx.shadowColor = 'transparent';
                this.ctx.shadowBlur = 0;
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
            });

            // Draw center hole
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, this.radius * 0.6, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();
        }
    }

    // Initialize charts
    new PieChart('statusChart', [1, 1], ['#28a745', '#dc3545'], 
        ['Sauvegardes OK: 1 serveur', 'Erreurs: 1 serveur']);
    
    new PieChart('storageChart', [160, 540], ['#667eea', '#e0e0e0'], 
        ['Utilisé: 160 Go', 'Disponible: 540 Go']);
    
    new PieChart('memoryChart', [12, 4], ['#ff9800', '#e0e0e0'], 
        ['Mémoire utilisée: 12 Go', 'Mémoire disponible: 4 Go']);

    // Scroll spy for navigation
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    function updateActiveLink() {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        let current = "";
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                current = section.id;
            }
        });

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            current = sections[sections.length - 1].id;
        }

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    window.addEventListener("scroll", () => {
        requestAnimationFrame(updateActiveLink);
    }, { passive: true });

    updateActiveLink();
</script>