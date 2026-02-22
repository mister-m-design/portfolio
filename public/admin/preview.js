const ProjectPreview = ({ entry, widgetFor }) => {
    const data = entry.getIn(['data']).toJS();
    const title = data.title || 'Project Title';
    const category = data.category || 'Category';
    const role = data.role || 'Role';
    const studio = data.studio || 'Studio';
    const year = data.year || 'Year';
    const description = data.description || 'Description goes here...';
    const deliverables = data.deliverables || 'Deliverables...';
    const frames = data.frames || [];
    const vimeo = data.vimeo || [];
    const vimeoIds = Array.isArray(vimeo) ? vimeo : [vimeo];

    return h('div', { className: 'modal-content', style: { padding: '40px', background: '#0a0a0a', color: '#fff', fontFamily: 'Inter, sans-serif' } },
        h('div', { className: 'w-full flex flex-col gap-8 mb-12' },
            vimeoIds.map((vid, idx) => vid && h('div', { key: idx, style: { aspectRatio: '16/9', background: '#111', marginBottom: '20px', position: 'relative', overflow: 'hidden' } },
                h('iframe', {
                    src: `https://player.vimeo.com/video/${vid}?title=0&byline=0&portrait=0&color=ffffff`,
                    style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }
                })
            ))
        ),
        h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' } },
            h('div', {},
                h('h1', { style: { fontSize: '4rem', fontWeight: '900', textTransform: 'uppercase', lineHeight: '0.9', margin: '0 0 20px 0' } }, title),
                h('div', { style: { borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)' } },
                    h('p', {}, h('span', { style: { opacity: 0.4, marginRight: '10px' } }, 'Role'), role),
                    h('p', {}, h('span', { style: { opacity: 0.4, marginRight: '10px' } }, 'Client'), studio),
                    h('p', {}, h('span', { style: { opacity: 0.4, marginRight: '10px' } }, 'Year'), year),
                    h('p', {}, h('span', { style: { opacity: 0.4, marginRight: '10px' } }, 'Tasks'), h('span', { style: { textTransform: 'none', letterSpacing: 'normal', fontSize: '1rem', color: '#fff' } }, deliverables))
                )
            ),
            h('div', { style: { fontSize: '1.1rem', lineHeight: '1.6', fontWeight: '300', color: 'rgba(255,255,255,0.8)' } }, description)
        ),
        h('div', {},
            h('h2', { style: { fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.4, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px' } }, 'Style Frames'),
            h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' } },
                frames.map((frame, idx) => frame && h('img', { key: idx, src: frame, style: { width: '100%', borderRadius: '2px' } }))
            )
        )
    );
};

CMS.registerPreviewTemplate('projects', ProjectPreview);
CMS.registerPreviewStyle('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
