// Sample feedback data — replace with real data / fetch from backend as needed
const sampleFeedback = [
    { id: 1, project: 'Website Redesign', client: 'Acme Corp', rating: 5, comment: 'Great work — delivered on time and exceeded expectations.', date: '2025-11-01' },
    { id: 2, project: 'Mobile App', client: 'Blue Ocean', rating: 4, comment: 'Solid implementation; a few UI tweaks needed.', date: '2025-10-20' },
    { id: 3, project: 'API Integration', client: 'Acme Corp', rating: 5, comment: 'Seamless integration and excellent documentation.', date: '2025-09-30' },
    { id: 4, project: 'Landing Page', client: 'Nova LLC', rating: 3, comment: 'Good effort but requires more polish on responsiveness.', date: '2025-08-12' },
    { id: 5, project: 'E-commerce', client: 'RetailPro', rating: 4, comment: 'Feature rich and stable; inventory sync could be faster.', date: '2025-07-22' },
    { id: 6, project: 'Mobile App', client: 'GreenFarm', rating: 5, comment: 'Fantastic UX work and clear communication.', date: '2025-06-15' }
];

const feedbackListEl = document.getElementById('feedback-list');
const projectFilterEl = document.getElementById('project-filter');
const globalSearchEl = document.getElementById('global-search');

function createStarMarkup(rating){
    let out = '';
    for(let i=1;i<=5;i++){
        if(i<=rating) out += '<i class="fas fa-star"></i>';
        else out += '<i class="far fa-star"></i>';
    }
    return `<span class="rating-stars">${out}</span>`;
}

function renderFeedback(list){
    feedbackListEl.innerHTML = '';
    if(!list.length){
        feedbackListEl.innerHTML = '<div class="no-feedback">No feedback found.</div>';
        return;
    }

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'feedback-item';
        div.innerHTML = `
            <div class="feedback-top">
                <div class="feedback-client">
                    <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=${encodeURIComponent(item.client)}" alt="">
                    <div>
                        <div style="font-weight:600">${item.client}</div>
                        <div style="font-size:13px;color:#65676b">${new Date(item.date).toLocaleDateString()}</div>
                    </div>
                </div>
                <div style="text-align:right">
                    <div class="project-badge">${item.project}</div>
                    <div>${createStarMarkup(item.rating)}</div>
                </div>
            </div>
            <div class="feedback-comment">${escapeHtml(item.comment)}</div>
        `;
        feedbackListEl.appendChild(div);
    });
}

function escapeHtml(str){
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function populateProjectFilter(){
    const projects = Array.from(new Set(sampleFeedback.map(f => f.project)));
    projects.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        projectFilterEl.appendChild(opt);
    });
}

function filterByProject(e){
    const value = e.target.value;
    let filtered = sampleFeedback.slice();
    if(value !== 'all') filtered = filtered.filter(f => f.project === value);
    applySearchAndRender(filtered);
}

function applySearchAndRender(source){
    const q = (globalSearchEl && globalSearchEl.value || '').toLowerCase().trim();
    let filtered = source;
    if(q){
        filtered = source.filter(f => (
            f.client.toLowerCase().includes(q) ||
            f.project.toLowerCase().includes(q) ||
            f.comment.toLowerCase().includes(q)
        ));
    }
    renderFeedback(filtered);
}

// events
if(projectFilterEl){ populateProjectFilter(); }
if(globalSearchEl){ globalSearchEl.addEventListener('input', ()=> applySearchAndRender(sampleFeedback)); }

// initial render
renderFeedback(sampleFeedback);
