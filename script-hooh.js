

        // Datos para los turnos de la batalla
        const battleTurns = [
            {
                turn: 1,
                actions: [
                    { pokemon: "Chandelure", action: "Velo Sagrado", color: "var(--ghost)" },
                    { pokemon: "Rotom-Calor", action: "Maquinación", color: "var(--fire)" },
                    { pokemon: "Lunatone", action: "Protección", color: "var(--rock)" }
                ]
            },
            {
                turn: 2,
                actions: [
                    { pokemon: "Chandelure", action: "Protección", color: "var(--ghost)" },
                    { pokemon: "Rotom-Calor", action: "Maquinación", color: "var(--fire)" },
                    { pokemon: "Lunatone", action: "Espacio Raro", color: "var(--rock)" }
                ]
            },
            {
                turn: 3,
                actions: [
                    { pokemon: "Chandelure", action: "Cambia con Lunatone (sacrifica Chandelure)", color: "var(--ghost)" },
                    { pokemon: "Rotom-Calor", action: "Mata Bestia Legendaria", color: "var(--fire)" },
                    { pokemon: "Lunatone", action: "Más Psique (en Rotom)", color: "var(--rock)", important: true }
                ]
            },
            {
                turn: 4,
                actions: [
                    { pokemon: "Lunatone", action: "Joya de Luz (a Ho-Oh)", color: "var(--rock)" },
                    { pokemon: "Rotom-Calor", action: "Mata Bestia Legendaria", color: "var(--fire)" },
                    { pokemon: "Chandelure", action: "Cambia con Lunatone (sacrifica Lunatone)", color: "var(--ghost)" }
                ]
            },
            {
                turn: 5,
                actions: [
                    { pokemon: "Chandelure", action: "Cambia con Lunatone (sacrifica Chandelure)", color: "var(--ghost)" },
                    { pokemon: "Rotom-Calor", action: "Rayo", color: "var(--fire)" },
                    { pokemon: "Lunatone", action: "Joya de Luz (a Ho-Oh)", color: "var(--rock)" }
                ]
            },
            {
                turn: 6,
                actions: [
                    { pokemon: "Lunatone", action: "Joya de Luz (a Ho-Oh) ¡SIN CRÍTICO!", color: "var(--rock)", warning: true },
                    { pokemon: "Rotom-Calor", action: "Mata Bestia Legendaria", color: "var(--fire)" },
                    { pokemon: "Chandelure", action: "Cambia con Lunatone (sacrifica Lunatone)", color: "var(--ghost)" }
                ]
            },
            {
                turn: 7,
                actions: [
                    { pokemon: "Chandelure", action: "Cambia con Lunatone (sacrifica Chandelure)", color: "var(--ghost)" },
                    { pokemon: "Rotom-Calor", action: "Pantalla de Luz", color: "var(--fire)" },
                    { pokemon: "Lunatone", action: "Espacio Raro", color: "var(--rock)" }
                ]
            },
            {
                turn: 8,
                actions: [
                    { pokemon: "Lunatone", action: "Joya de Luz (a Ho-Oh)", color: "var(--rock)" },
                    { pokemon: "Rotom-Calor", action: "Maquinación", color: "var(--fire)" },
                    { pokemon: "Chandelure", action: "Más Psique (en Rotom)", color: "var(--ghost)", important: true }
                ]
            },
            {
                turn: 9,
                actions: [
                    { pokemon: "Lunatone", action: "Joya de Luz (a Ho-Oh)", color: "var(--rock)" },
                    { pokemon: "Rotom-Calor", action: "Rayo (a Ho-Oh)", color: "var(--fire)" },
                    { pokemon: "Chandelure", action: "Bola Sombra (a Ho-Oh)", color: "var(--ghost)" }
                ]
            },
            {
                turn: 10,
                actions: [
                    { pokemon: "Cualquiera", action: "Daño", color: "var(--primary)" },
                    { pokemon: "Cualquiera", action: "Daño", color: "var(--primary)" },
                    { pokemon: "Cualquiera", action: "Golpe Final a Ho-Oh", color: "var(--primary)", important: true }
                ]
            }
        ];
        
        // Datos para las notas sobre bestias legendarias
        const legendaryBeasts = [
            { name: "Entei", weakness: "Poder Oculto (Tierra)", color: "var(--fire)" },
            { name: "Raikou", weakness: "Poder Oculto (Tierra)", color: "var(--electric)" },
            { name: "Suicune", weakness: "Rayo", color: "#3498db" }
        ];
        
        // Función para generar los turnos de batalla
        function generateBattleTurns() {
            const container = document.getElementById('turns-container');
            if (!container) return;
            
            container.innerHTML = '';
            
            battleTurns.forEach(turnData => {
                const turnElement = document.createElement('div');
                turnElement.className = 'turn';
                
                let actionsHTML = '';
                turnData.actions.forEach(action => {
                    let warningHTML = '';
                    if (action.warning) {
                        warningHTML = '<div style="color: var(--warning); font-size: 0.9rem; margin-top: 5px;"><i class="fas fa-exclamation-triangle"></i> ¡Importante!</div>';
                    }
                    
                    let importantHTML = '';
                    if (action.important) {
                        importantHTML = '<div style="color: var(--success); font-size: 0.9rem; margin-top: 5px;"><i class="fas fa-star"></i> Acción clave</div>';
                    }
                    
                    actionsHTML += `
                        <div class="action">
                            <div class="pokemon-indicator" style="background-color: ${action.color}">${action.pokemon}</div>
                            <div class="action-desc">${action.action}</div>
                            ${warningHTML}
                            ${importantHTML}
                        </div>
                    `;
                });
                
                turnElement.innerHTML = `
                    <div class="turn-header">
                        <div class="turn-number">Turno ${turnData.turn}</div>
                        <div><i class="fas fa-chevron-down"></i></div>
                    </div>
                    <div class="turn-actions">
                        ${actionsHTML}
                    </div>
                `;
                
                // Añadir funcionalidad de toggle para los turnos
                const header = turnElement.querySelector('.turn-header');
                header.addEventListener('click', () => {
                    const actions = turnElement.querySelector('.turn-actions');
                    const icon = header.querySelector('i');
                    
                    if (actions.style.display === 'none') {
                        actions.style.display = 'flex';
                        icon.className = 'fas fa-chevron-down';
                        turnElement.style.maxHeight = '500px';
                    } else {
                        actions.style.display = 'none';
                        icon.className = 'fas fa-chevron-right';
                        turnElement.style.maxHeight = '60px';
                    }
                });
                
                // Inicialmente mostrar solo los primeros 3 turnos expandidos
                if (turnData.turn <= 3) {
                    turnElement.querySelector('.turn-actions').style.display = 'flex';
                } else {
                    turnElement.querySelector('.turn-actions').style.display = 'none';
                    turnElement.querySelector('.turn-header i').className = 'fas fa-chevron-right';
                }
                
                container.appendChild(turnElement);
            });
        }
        
        // Función para manejar la navegación entre secciones
        function setupNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.section');
            
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Remover clase active de todos los enlaces
                    navLinks.forEach(l => l.classList.remove('active'));
                    
                    // Añadir clase active al enlace clickeado
                    link.classList.add('active');
                    
                    // Ocultar todas las secciones
                    sections.forEach(section => section.classList.remove('active'));
                    
                    // Mostrar la sección correspondiente
                    const targetId = link.getAttribute('data-section');
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        targetSection.classList.add('active');
                        
                        // Para móviles: asegurarse de que la sección sea visible
                        if (window.innerWidth <= 768) {
                            // Cerrar todos los toggles
                            document.querySelectorAll('.toggle-section').forEach(toggle => {
                                toggle.checked = false;
                            });
                            
                            // Abrir el toggle correspondiente
                            const toggleId = `toggle-${targetId}`;
                            const toggle = document.getElementById(toggleId);
                            if (toggle) {
                                toggle.checked = true;
                            }
                        }
                    }
                });
            });
        }
        
        // Función para añadir información sobre bestias legendarias
        function addLegendaryBeastsInfo() {
            const notesSection = document.getElementById('notes');
            if (!notesSection) return;
            
            const notesContainer = notesSection.querySelector('.important-notes');
            
            const beastsInfo = document.createElement('div');
            beastsInfo.className = 'note-item';
            beastsInfo.innerHTML = `
                <i class="fas fa-paw"></i>
                <div>
                    <strong>Bestias Legendarias - Debilidades:</strong>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                        ${legendaryBeasts.map(beast => `
                            <div style="background-color: ${beast.color}; color: white; padding: 5px 10px; border-radius: 5px; font-size: 0.9rem;">
                                ${beast.name}: ${beast.weakness}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            notesContainer.insertBefore(beastsInfo, notesContainer.children[1]);
        }
        
        // Inicializar cuando el DOM esté cargado
        document.addEventListener('DOMContentLoaded', () => {
            generateBattleTurns();
            setupNavigation();
            addLegendaryBeastsInfo();
            
            // Inicializar la funcionalidad de toggle para móviles
            if (window.innerWidth <= 768) {
                // Mostrar solo la primera sección
                document.querySelectorAll('.section').forEach((section, index) => {
                    if (index !== 0) {
                        section.style.display = 'none';
                    }
                });
            }
            
            // Añadir funcionalidad de acordeón para los turnos en móviles
            document.querySelectorAll('.turn-header').forEach(header => {
                header.addEventListener('click', function() {
                    const turn = this.parentElement;
                    const isExpanded = turn.classList.contains('expanded');
                    
                    // Cerrar todos los turnos primero (opcional)
                    // document.querySelectorAll('.turn').forEach(t => {
                    //     t.classList.remove('expanded');
                    //     t.querySelector('.turn-actions').style.display = 'none';
                    //     t.querySelector('.turn-header i').className = 'fas fa-chevron-right';
                    // });
                    
                    // Alternar el turno clickeado
                    if (!isExpanded) {
                        turn.classList.add('expanded');
                        turn.querySelector('.turn-actions').style.display = 'flex';
                        turn.querySelector('.turn-header i').className = 'fas fa-chevron-down';
                    } else {
                        turn.classList.remove('expanded');
                        turn.querySelector('.turn-actions').style.display = 'none';
                        turn.querySelector('.turn-header i').className = 'fas fa-chevron-right';
                    }
                });
            });
        });
        
        // Manejar cambios de tamaño de ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                // En escritorio, mostrar todas las secciones
                document.querySelectorAll('.section').forEach(section => {
                    section.style.display = 'block';
                });
                
                // En escritorio, expandir todos los turnos
                document.querySelectorAll('.turn').forEach(turn => {
                    turn.querySelector('.turn-actions').style.display = 'flex';
                    turn.querySelector('.turn-header i').className = 'fas fa-chevron-down';
                });
            }
        });