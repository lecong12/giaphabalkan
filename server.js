const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

// 1. Phục vụ các file tĩnh (CSS, JS, Images, v.v.) từ thư mục hiện tại
// Điều này giúp các file trong thư mục con cũng có thể truy cập được
app.use(express.static(__dirname));

// 2. Route chính: Trả về index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 3. Fallback: Nếu truy cập đường dẫn lạ, vẫn trả về index.html (Hỗ trợ SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server Express đã chạy tại http://0.0.0.0:${port}`);
});