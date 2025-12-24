import { Trie } from './dsa/Trie';
import { PriorityQueue } from './dsa/PriorityQueue';

// --- Global Search System (TRIE) ---
const searchTrie = new Trie();

function initSearchSystem() {
    // 1. Index Sidebar Links
    const links = document.querySelectorAll('.nav-item');
    links.forEach(link => {
        const text = (link as HTMLElement).innerText.trim();
        const href = (link as HTMLElement).getAttribute('href') || '#';
        const onclick = (link as HTMLElement).getAttribute('onclick');

        if (text && text !== 'Logout') {
            searchTrie.insert(text, { type: 'Module', title: text, href, onclick });
        }
    });

    // 2. Index Students (Simulated Data)
    const students = [
        { name: "Rahul Patel", id: "101" },
        { name: "Amit Shah", id: "102" },
        { name: "Priya Sharma", id: "103" },
        { name: "Ketan Mehta", id: "104" }
    ];
    students.forEach(s => {
        searchTrie.insert(s.name, { type: 'Student', title: s.name, detail: `ID: ${s.id}` });
    });

    // 3. Setup UI
    const header = document.querySelector('.header') || document.querySelector('.page-header');
    if (header) {
        const searchContainer = document.createElement('div');
        searchContainer.style.position = 'relative';
        searchContainer.style.marginRight = 'auto'; // Push title to left
        searchContainer.style.marginLeft = '2rem';
        searchContainer.innerHTML = `
            <div style="position: relative;">
                <i class="fa-solid fa-search" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #888;"></i>
                <input type="text" id="globalSearch" placeholder="Search modules, students..." 
                    style="padding: 0.6rem 0.6rem 0.6rem 2.2rem; border: 1px solid #ddd; border-radius: 20px; width: 300px; outline: none;">
            </div>
            <div id="searchResults" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 1000; overflow: hidden; margin-top: 5px;"></div>
        `;

        // Insert after the title section (first child of header)
        header.insertBefore(searchContainer, header.children[1]);

        // Event Listener
        const input = document.getElementById('globalSearch') as HTMLInputElement;
        const resultsBox = document.getElementById('searchResults') as HTMLElement;

        input.addEventListener('input', (e) => {
            const query = (e.target as HTMLInputElement).value;
            if (query.length < 2) {
                resultsBox.style.display = 'none';
                return;
            }

            const matches = searchTrie.search(query);
            if (matches.length > 0) {
                resultsBox.innerHTML = matches.slice(0, 5).map(m => `
                    <div class="search-item" style="padding: 0.8rem; border-bottom: 1px solid #f4f4f4; cursor: pointer; transition: background 0.2s;">
                        <div style="font-weight: bold; font-size: 0.9rem;">${m.title}</div>
                        <div style="font-size: 0.75rem; color: #888;">${m.type} ${m.detail ? '| ' + m.detail : ''}</div>
                    </div>
                `).join('');

                // Add click handlers
                resultsBox.querySelectorAll('.search-item').forEach((el, index) => {
                    el.addEventListener('click', () => {
                        const m = matches[index];
                        if (m.type === 'Module') {
                            if (m.onclick) {
                                // Extract function name and args safely
                                const match = m.onclick.match(/showSection\('([^']*)'/);
                                if (match) {
                                    // @ts-ignore
                                    if (window.showSection) window.showSection(match[1]);
                                }
                            } else if (m.href && m.href !== '#') {
                                window.location.href = m.href;
                            }
                        } else {
                            alert(`Showing details for Student: ${m.title}`);
                        }
                        resultsBox.style.display = 'none';
                        input.value = '';
                    });

                    // Hover effect
                    (el as HTMLElement).onmouseenter = () => (el as HTMLElement).style.background = '#f9f9f9';
                    (el as HTMLElement).onmouseleave = () => (el as HTMLElement).style.background = 'white';
                });

                resultsBox.style.display = 'block';
            } else {
                resultsBox.innerHTML = `<div style="padding: 1rem; color: #888; text-align: center;">No results found</div>`;
                resultsBox.style.display = 'block';
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target as Node)) {
                resultsBox.style.display = 'none';
            }
        });
    }
}

// --- Task Priority System (HEAP) ---
const taskQueue = new PriorityQueue();

function initActionCenter() {
    // 1. Simulate finding tasks from LocalStorage
    // High Priority: Gatepass Pending (Priority 1)
    // Low Priority: Maintenance Request (Priority 5)

    // Check Gatepass
    const gatepassData = JSON.parse(localStorage.getItem('baps_gatepass') || '[]');
    gatepassData.forEach((gp: any) => {
        if (gp.status === 'Pending') {
            const priority = gp.reason.toLowerCase().includes('medical') ? 0 : 2;
            taskQueue.enqueue({
                id: `gp-${Math.random()}`,
                title: `Gatepass: ${gp.student}`,
                description: `Reason: ${gp.reason} | Time: ${gp.time}`,
                priority: priority,
                timestamp: Date.now(),
                action: () => {
                    // @ts-ignore
                    if (window.showSection) window.showSection('gatepass');
                }
            });
        }
    });

    // Check Maintenance (Simulation)
    taskQueue.enqueue({
        id: 'maint-1',
        title: 'Room 101 Fan Repair',
        description: 'Reported 2 days ago',
        priority: 5,
        timestamp: Date.now(),
        action: () => alert('Redirecting to Maintenance Module...')
    });

    // 2. Render Widget
    const dashboardSection = document.getElementById('section-dashboard');
    if (dashboardSection && !taskQueue.isEmpty()) {
        const topTask = taskQueue.peek();
        if (!topTask) return;

        const widget = document.createElement('div');
        widget.className = 'action-center-widget';
        widget.style.cssText = `
            background: linear-gradient(135deg, #fff 0%, #fef3e3 100%);
            border: 1px solid var(--c-gold);
            border-left: 5px solid ${topTask.priority === 0 ? 'red' : 'orange'};
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            animation: slideDown 0.5s ease-out;
        `;

        widget.innerHTML = `
            <div>
                <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.5rem;">
                     <span style="background: ${topTask.priority === 0 ? '#ffebee' : '#fff3e0'}; color: ${topTask.priority === 0 ? '#d32f2f' : '#ef6c00'}; padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: bold;">
                        ${topTask.priority === 0 ? 'URGENT ACTION' : 'RECOMMENDED ACTION'}
                     </span>
                     <h3 style="margin: 0; font-size: 1.2rem; color: #333;">${topTask.title}</h3>
                </div>
                <p style="margin: 0; color: #666;">${topTask.description}</p>
            </div>
            <button id="actionBtn" style="background: var(--c-gold); border: none; padding: 0.8rem 1.5rem; border-radius: 6px; font-weight: bold; cursor: pointer; transition: transform 0.2s;">
                Resolve Now <i class="fa-solid fa-arrow-right" style="margin-left: 5px;"></i>
            </button>
        `;

        // Insert before Stats Grid
        const statsGrid = dashboardSection.querySelector('.stats-grid');
        if (statsGrid) {
            dashboardSection.insertBefore(widget, statsGrid);
        }

        // Action Listener
        widget.querySelector('#actionBtn')?.addEventListener('click', () => {
            topTask.action();
        });
    }
}

import { seedData } from './seed-data';

// --- Initialization ---
// Wait for DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        seedData();
        initSearchSystem();
        initActionCenter();
    });
} else {
    seedData();
    initSearchSystem();
    initActionCenter();
}
