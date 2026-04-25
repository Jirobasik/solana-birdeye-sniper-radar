const BirdeyeAPI = require('./birdeye_api');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.BIRDEYE_API_KEY;
const api = new BirdeyeAPI(API_KEY);

async function scanForGems() {
    console.log('🚀 Starting Meme-Gems Sniper Radar...');
    const tokens = await api.getTrendingTokens();
    
    for (const token of tokens.slice(0, 50)) {
        console.log(`\n🔍 Checking token: ${token.symbol} (${token.address})`);
        
        const security = await api.getTokenSecurity(token.address);
        const liquidity = await api.getTokenLiquidity(token.address);
        
        if (security && security.ownerBalance < 5 && liquidity && liquidity.liquidity > 10000) {
            console.log(`✅ GEM FOUND: ${token.symbol}!`);
            console.log(`   Liquidity: $${liquidity.liquidity}`);
            console.log(`   Security Score: ${security.vulnerabilityCount === 0 ? 'SAFE' : 'RISKY'}`);
        } else {
            console.log(`❌ Skipping ${token.symbol} - does not meet criteria.`);
        }
    }
}

scanForGems().catch(console.error);
