export default class ApiService {
    constructor() {
        this.page = 1;
        this.searchQuery = '';
    }
    fetchList() {
        const apiKey = '24120553-f8b1f79ab38ca933100336740';
        const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${apiKey}`
        return fetch(BASE_URL)
            .then(resp => {
                this.incrementPage()
                return resp.json()
            })
    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        return this.searchQuery = newQuery;
    }
    
}
