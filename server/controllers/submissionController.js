import db from '../config/db.js';

export const submitProduct = (req, res) => {
  try {
    const { teamName, unitName, topicName, instructor, phone, email } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Vui lòng đính kèm file báo cáo.' });
    }

    const stmt = db.prepare(`INSERT INTO submissions (teamName, unitName, topicName, instructor, phone, email, fileName, filePath) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    stmt.run(teamName, unitName, topicName, instructor || '', phone, email, file.filename, file.path, function(err) {
      if (err) {
        return res.status(500).json({ error: 'Lỗi khi lưu vào cơ sở dữ liệu.' });
      }
      res.status(201).json({ message: 'Nộp sản phẩm thành công!', id: this.lastID });
    });
    stmt.finalize();
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi server.' });
  }
};

export const getSubmissions = (req, res) => {
  db.all('SELECT * FROM submissions ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy xuất cơ sở dữ liệu.' });
    } else {
      res.json(rows);
    }
  });
};
