const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

// 1. Health Check Endpoint (Quan trọng cho Deploy)
// Hệ thống deploy sẽ gọi vào đây để biết server còn sống hay không.
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// 2. Xử lý Favicon: Trả về 204 No Content để tránh lỗi 404/502
// Trình duyệt luôn tự động tìm file này, nếu không xử lý server sẽ tốn tài nguyên vô ích.
app.get('/favicon.ico', (req, res) => res.status(204).end());

// 3. Phục vụ các file tĩnh
app.use(express.static(__dirname));

// 4. Fallback route cho Single Page Application (SPA)
// Mọi request không khớp với một file tĩnh sẽ được chuyển hướng về index.html.
// Router phía client (ví dụ: React Router, Vue Router) sẽ xử lý đường dẫn chi tiết.
app.get('*', (req, res) => {
    // Đảm bảo rằng index.html nằm trong thư mục 'public'
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err) {
            console.error("Lỗi khi gửi file index.html:", err);
            res.status(500).send("Lỗi Server: Không tìm thấy file index.html. Vui lòng kiểm tra lại quá trình deploy.");
        }
    });
});

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
    console.log(`Cũng có thể truy cập từ các thiết bị khác trong cùng mạng qua địa chỉ IP của máy.`);
});

// Bắt lỗi nếu server không thể khởi động (ví dụ: lỗi Port)
server.on('error', (e) => {
    console.error("LỖI KHỞI ĐỘNG SERVER:", e);
});