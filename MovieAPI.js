const { RESTDataSource } = require('apollo-datasource-rest');

class MovieAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.API_URL;
    }

    willSendRequest(request) {
        request.params.set('api_key', process.env.API_KEY);
    }

    async getPopularMovies(page = 1) {
        const data = await this.get('movie/popular', {
            page
        });

        if (data.results.length === 0) return [];

        return data.results.map(this.movieReducer);
    }

    movieReducer(movie) {
        return {
            title: movie.title,
            overview: movie.overview
        }
    }
}

module.exports = MovieAPI;