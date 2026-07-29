import dbPromise from '../config/db.js';

export const submitProduct = async (req, res) => {
  try {
    const db = await dbPromise;
    const { teamName, unitName, topicName, instructor, phone, email } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Vui lòng đính kèm file báo cáo.' });
    }

    const result = await db.run(`INSERT INTO submissions (teamName, unitName, topicName, instructor, phone, email, fileName, filePath) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
      [teamName, unitName, topicName, instructor || '', phone, email, file.filename, file.path]);
      
    res.status(201).json({ message: 'Nộp sản phẩm thành công!', id: result.lastID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi server.' });
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
