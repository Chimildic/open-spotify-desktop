let params = new URLSearchParams(location.search);
window.open(params.get('url'));
window.close();