const express = require('express');
const path = require('path');
const app = express();

// Lấy Port từ môi trường Railway (quan trọng), nếu không có thì dùng 3000
const port = process.env.PORT || 3000;

// Phục vụ các file tĩnh (HTML, CSS, JS) trong thư mục hiện tại
app.use(express.static(__dirname));

// Luôn trả về index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', (err) => {
    if (err) {
        console.error("Không thể khởi động server:", err);
        return;
    }
    console.log(`Server đã chạy thành công tại http://0.0.0.0:${port}`);
});