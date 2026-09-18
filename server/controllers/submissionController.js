import dbPromise from '../config/db.js';
import fs from 'fs';
import bcrypt from 'bcrypt';

export const submitProduct = async (req, res) => {
  try {
    const db = await dbPromise;
    const { teamName, unitName, topicName, instructor, phone, email } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Vui lòng đính kèm file báo cáo (.rar hoặc .zip).' });
    }

    if (!teamName || !unitName || !topicName || !phone || !email) {
      if (file.path && fs.existsSync(file.path)) {
        try { fs.unlinkSync(file.path); } catch (_) {}
      }
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ các thông tin bắt buộc.' });
    }

    const result = await db.run(`INSERT INTO submissions (teamName, unitName, topicName, instructor, phone, email, fileName, filePath) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
      [teamName, unitName, topicName, instructor || '', phone, email, file.filename, file.path]);
      
    res.status(201).json({ message: 'Nộp sản phẩm thành công!', id: result.lastID });
  } catch (error) {
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (_) {}
    }
    console.error('Error in submitProduct:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi máy chủ khi lưu sản phẩm.' });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all('SELECT * FROM submissions ORDER BY createdAt DESC');
    res.json(rows);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi truy xuất cơ sở dữ liệu.' });
  }
};

export const deleteSubmissions = async (req, res) => {
  try {
    const { ids, password } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Không có bản ghi nào được chọn.' });
    }

    const db = await dbPromise;
    
    const adminUser = await db.get("SELECT * FROM users WHERE username = ?", [req.user.username]);
    if (!adminUser || !(await bcrypt.compare(password, adminUser.password))) {
      return res.status(403).json({ error: 'Mật khẩu xác nhận không chính xác.' });
    }

    const placeholders = ids.map(() => '?').join(',');
    const rows = await db.all(`SELECT filePath FROM submissions WHERE id IN (${placeholders})`, ids);

    for (const row of rows) {
      if (row.filePath) {
        try {
          if (fs.existsSync(row.filePath)) fs.unlinkSync(row.filePath);
        } catch (err) {
          console.error(err);
        }
      }
    }

    await db.run(`DELETE FROM submissions WHERE id IN (${placeholders})`, ids);

    res.json({ message: 'Đã xóa các bản ghi thành công.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa.' });
  }
};
