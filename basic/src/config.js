require('dotenv').config({ path: require('find-config')('.env') });

module.exports = {
    API_PORT: process.env.PORT || 4000,
    MONGODB_URI: process.env.MONGODB_URI || '...',
};
