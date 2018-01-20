const map = {
    '&' : '&amp;',
    '<' : '&lt;',
    '>' : '&gt;',
    '"' : '&quot;',
    '\'' : '&#39;'
};

export default html => {
    return String( html ).replace( /[&<>"']/g, m => map[ m ] );
};
