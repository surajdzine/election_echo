// script.js

// --- Data ---
const PROMISES = [
    {
        id: 1,
        politician: "CM of Maharashtra",
        promise: "Create 2 million jobs in the tech sector by 2025",
        category: "Employment",
        status: "in-progress",
        progress: 45,
        datePromised: "Jan 2024",
        lastUpdate: "Oct 2024",
        evidence: "1.2M jobs created via MAITRI scheme; 800K target remaining",
        state: "Maharashtra"
    },
    {
        id: 2,
        politician: "UP Government",
        promise: "Provide free tablets to 10 lakh students",
        category: "Education",
        status: "fulfilled",
        progress: 100,
        datePromised: "Feb 2024",
        lastUpdate: "Sep 2024",
        evidence: "11.2 lakh tablets distributed across 75 districts",
        state: "Uttar Pradesh"
    },
    {
        id: 3,
        politician: "Karnataka CM",
        promise: "Launch 500 new milk collection centers in rural areas",
        category: "Agriculture",
        status: "delayed",
        progress: 20,
        datePromised: "Mar 2024",
        lastUpdate: "Nov 2024",
        evidence: "Only 98 centers operational; budget allocation pending",
        state: "Karnataka"
    },
    {
        id: 4,
        politician: "Tamil Nadu Government",
        promise: "Establish universal free bus travel for women",
        category: "Transport",
        status: "fulfilled",
        progress: 100,
        datePromised: "Jan 2024",
        lastUpdate: "Aug 2024",
        evidence: "Scheme operational across all 38 districts since August",
        state: "Tamil Nadu"
    }
];

const STATS = [
    { label: "Promises Tracked", value: "1,247", icon: "file-text", color: "blue" },
    { label: "Fulfilled", value: "389", icon: "check-circle", color: "green" },
    { label: "In Progress", value: "624", icon: "clock", color: "yellow" },
    { label: "Active Users", value: "87K+", icon: "users", color: "purple" }
];

const TABS = ['all', 'fulfilled', 'in-progress', 'delayed'];

// --- State Variables ---
let activeTab = 'all';
let searchQuery = '';

// --- Helper Functions ---

const getStatusColor = (status) => {
    switch(status) {
        case 'fulfilled': return 'bg-green-100 text-green-800 border-green-300';
        case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'delayed': return 'bg-red-100 text-red-800 border-red-300';
        default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
};

const getProgressBarColor = (status) => {
    switch(status) {
        case 'fulfilled': return 'bg-green-500';
        case 'in-progress': return 'bg-yellow-500';
        case 'delayed': return 'bg-red-500';
        default: return 'bg-gray-500';
    }
};

const getStatusIcon = (status) => {
    switch(status) {
        case 'fulfilled': return '<i data-lucide="check-circle" class="w-5 h-5"></i>';
        case 'in-progress': return '<i data-lucide="clock" class="w-5 h-5"></i>';
        case 'delayed': return '<i data-lucide="x-circle" class="w-5 h-5"></i>';
        default: return '';
    }
};

const formatTabLabel = (tab) => {
    return tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ');
}

// --- Rendering Functions ---

function renderPromises() {
    const list = document.getElementById('promises-list');
    if (!list) return;

    const filteredPromises = PROMISES.filter(p => {
        const matchesTab = activeTab === 'all' || p.status === activeTab;
        const lowerQuery = searchQuery.toLowerCase();
        const matchesSearch = p.promise.toLowerCase().includes(lowerQuery) ||
                              p.politician.toLowerCase().includes(lowerQuery) ||
                              p.state.toLowerCase().includes(lowerQuery);
        return matchesTab && matchesSearch;
    });

    list.innerHTML = filteredPromises.map(promise => `
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <span class="px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(promise.status)} flex items-center gap-2">
                            ${getStatusIcon(promise.status)}
                            ${formatTabLabel(promise.status)}
                        </span>
                        <span class="text-sm text-gray-500">${promise.state}</span>
                    </div>
                    <h4 class="text-xl font-bold text-gray-900 mb-2">${promise.promise}</h4>
                    <p class="text-sm text-gray-600 mb-3">
                        <strong>By:</strong> ${promise.politician} • <strong>Category:</strong> ${promise.category}
                    </p>
                </div>
            </div>

            <div class="mb-4">
                <div class="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress: ${promise.progress}%</span>
                    <span>Promised: ${promise.datePromised}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                    <div
                        class="h-3 rounded-full transition-all ${getProgressBarColor(promise.status)}"
                        style="width: ${promise.progress}%"
                    ></div>
                </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-700 mb-2">
                    <strong>Latest Evidence (${promise.lastUpdate}):</strong>
                </p>
                <p class="text-sm text-gray-600">${promise.evidence}</p>
            </div>

            <div class="mt-4 flex gap-3">
                <button class="text-blue-600 text-sm font-semibold hover:underline">View Full Timeline</button>
                <button class="text-blue-600 text-sm font-semibold hover:underline">Share Report</button>
            </div>
        </div>
    `).join('');

    // Re-initialize Lucide icons for the newly injected content
    lucide.createIcons();
}

// Custom Tailwind JIT fix (since CDN can't handle string interpolation)
const COLOR_MAP = {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    green: { bg: "bg-green-100", text: "text-green-600" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" }
};

function renderStats() {
    const container = document.getElementById('stats-container');
    if (!container) return;

    container.innerHTML = STATS.map(stat => `
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
            <div class="w-12 h-12 ${COLOR_MAP[stat.color].bg} rounded-lg flex items-center justify-center mb-4">
                <i data-lucide="${stat.icon}" class="w-6 h-6 ${COLOR_MAP[stat.color].text}"></i>
            </div>
            <p class="text-3xl font-bold text-gray-900 mb-1">${stat.value}</p>
            <p class="text-sm text-gray-600">${stat.label}</p>
        </div>
    `).join('');

    lucide.createIcons();
}

function renderTabs() {
    const container = document.getElementById('tabs-container');
    if (!container) return;

    container.innerHTML = TABS.map(tab => `
        <button
            data-tab="${tab}"
            class="tab-button px-4 py-3 rounded-lg font-medium whitespace-nowrap transition 
            ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        >
            ${formatTabLabel(tab)}
        </button>
    `).join('');

    // Attach event listeners to new tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (e) => {
            activeTab = e.target.getAttribute('data-tab');
            renderTabs();
            renderPromises();
        });
    });
}

// --- Event Handlers ---

function setupEventListeners() {
    // 1. Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuButton.querySelector('.menu-icon');
    const closeIcon = mobileMenuButton.querySelector('.close-icon');

    mobileMenuButton.addEventListener('click', () => {
        const isClosed = mobileMenu.classList.contains('hidden');
        if (isClosed) {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
        lucide.createIcons(); // Re-render icons to ensure they switch
    });

    // 2. Search Input Filtering
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderPromises();
        });
    }
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderTabs();
    renderPromises();
    setupEventListeners();
});