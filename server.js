const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

// 1. Phục vụ các file tĩnh từ thư mục gốc hiện tại
app.use(express.static(__dirname));

// 2. Fallback route cho Single Page Application (SPA)
app.get('*', (req, res) => {
    // Gửi file index.html và log lỗi nếu không tìm thấy
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err) {
            console.error("Lỗi: Không tìm thấy file index.html tại", __dirname);
            res.status(500).send("Lỗi Server: Không tìm thấy file index.html");
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
    console.log(`Cũng có thể truy cập từ các thiết bị khác trong cùng mạng qua địa chỉ IP của máy.`);
});