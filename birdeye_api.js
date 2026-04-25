const axios = require('axios');

class BirdeyeAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://public-api.birdeye.so';
    }

    async getTrendingTokens() {
        try {
            const response = await axios.get(`${this.baseUrl}/public/trending`, {
                headers: { 'X-API-KEY': this.apiKey }
            });
            return response.data.data.tokens;
        } catch (error) {
            console.error('Error fetching trending tokens:', error);
            return [];
        }
    }

    async getTokenSecurity(address) {
        try {
            const response = await axios.get(`${this.baseUrl}/public/security?address=${address}`, {
                headers: { 'X-API-KEY': this.apiKey }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching security for ${address}:`, error);
            return null;
        }
    }

    async getTokenLiquidity(address) {
        try {
            const response = await axios.get(`${this.baseUrl}/public/liquidity?address=${address}`, {
                headers: { 'X-API-KEY': this.apiKey }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching liquidity for ${address}:`, error);
            return null;
        }
    }
}

module.exports = BirdeyeAPI;
