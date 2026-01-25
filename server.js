const express = require('express');
const path = require('path');
const app = express();

// Lấy Port từ môi trường Railway (quan trọng), nếu không có thì dùng 3000
const port = process.env.PORT || 3000;

console.log("Đang khởi động ứng dụng...");
console.log("Thư mục hiện tại:", __dirname);

// Phục vụ các file tĩnh (HTML, CSS, JS) trong thư mục hiện tại
app.use(express.static(__dirname));

// Luôn trả về index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server đã khởi động xong trên port ${port}`);
});

// Bắt lỗi nếu không khởi động được (ví dụ trùng port)
server.on('error', (e) => {
    console.error("LỖI KHỞI ĐỘNG SERVER:", e);
});