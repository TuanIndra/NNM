const cron = require('node-cron');
const fetchAndUpdateTmdbData = require('./fetchTmdbData');

// Chạy mỗi ngày lúc 1:00 AM
cron.schedule('0 1 * * *', () => {
    console.log('Đang kiểm tra và cập nhật phim mới từ TMDb...');
    fetchAndUpdateTmdbData();
});

console.log('Scheduler đã được khởi động!');