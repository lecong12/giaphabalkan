const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

// 1. Phục vụ các file tĩnh từ thư mục 'public'
// Đây là một best practice để giữ cho thư mục gốc của dự án sạch sẽ và an toàn,
// tránh việc vô tình public các file của server hoặc file nhạy cảm.
app.use(express.static(path.join(__dirname, 'public')));

// 2. Fallback route cho Single Page Application (SPA)
// Mọi request không khớp với một file tĩnh sẽ được chuyển hướng về index.html.
// Router phía client (ví dụ: React Router, Vue Router) sẽ xử lý đường dẫn chi tiết.
app.get('*', (req, res) => {
    // Đảm bảo rằng index.html nằm trong thư mục 'public'
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
    console.log(`Cũng có thể truy cập từ các thiết bị khác trong cùng mạng qua địa chỉ IP của máy.`);
});