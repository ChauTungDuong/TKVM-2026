import { useState, useRef } from 'react';
import './Submit.css';

export default function Submit() {
  const [formData, setFormData] = useState({
    teamName: '',
    unitName: '',
    topicName: '',
    instructor: '',
    phone: '',
    email: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'error' | 'success'>('error');
  const [popupMessage, setPopupMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const validate = () => {
    if (!formData.teamName || !formData.unitName || !formData.topicName || !formData.phone || !formData.email || !file) {
      return 'Vui lòng điền đầy đủ các trường bắt buộc và đính kèm file.';
    }
    
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      return 'Số điện thoại không hợp lệ. Phải gồm 10 chữ số và bắt đầu bằng 0.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Email không hợp lệ.';
    }

    return '';
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setPopupType('error');
      setPopupMessage(validationError);
      setShowPopup(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('teamName', formData.teamName);
      data.append('unitName', formData.unitName);
      data.append('topicName', formData.topicName);
      data.append('instructor', formData.instructor);
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      if (file) data.append('file', file);

      const response = await fetch('/api/submissions', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi nộp bài.');
      }

      setSuccess('Nộp sản phẩm thành công!');
      setPopupType('success');
      setPopupMessage('Nộp sản phẩm thành công!');
      setShowPopup(true);
      // Reset form
      setFormData({
        teamName: '',
        unitName: '',
        topicName: '',
        instructor: '',
        phone: '',
        email: '',
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (err: any) {
      const msg = err.message || 'Lỗi kết nối đến server.';
      setError(msg);
      setPopupType('error');
      setPopupMessage(msg);
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="submit-page page-sections">
      {showPopup && (
        <div className="submit-modal-overlay">
          <div className="submit-modal" style={{ borderTopColor: popupType === 'error' ? '#e53e3e' : '#38a169' }}>
            <h3 className="submit-modal-title" style={{ color: popupType === 'error' ? '#c53030' : '#2f855a' }}>
              {popupType === 'error' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              )}
              {popupType === 'error' ? 'Lưu ý' : 'Thành công'}
            </h3>
            <p className="submit-modal-msg">{popupMessage}</p>
            <button className="submit-modal-btn" onClick={closePopup}>Đã hiểu</button>
          </div>
        </div>
      )}

      <h1 className="page-title">Nộp sản phẩm</h1>
      <section className="section-block">
        <div className="form-container">
          <form ref={formRef} onSubmit={handleSubmit} className="submit-form">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            
            <div className="form-group">
              <label htmlFor="teamName">Tên đội thi <span className="required">*</span></label>
              <input type="text" id="teamName" name="teamName" value={formData.teamName} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label htmlFor="unitName">Tên đơn vị (Trường, Học viện) <span className="required">*</span></label>
              <input type="text" id="unitName" name="unitName" value={formData.unitName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="topicName">Tên đề tài <span className="required">*</span></label>
              <input type="text" id="topicName" name="topicName" value={formData.topicName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="instructor">Giảng viên hướng dẫn (nếu có)</label>
              <input type="text" id="instructor" name="instructor" value={formData.instructor} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại (Đội trưởng) <span className="required">*</span></label>
              <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="VD: 0912345678" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email (Đội trưởng) <span className="required">*</span></label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="file">File báo cáo sản phẩm (.rar) <span className="required">*</span></label>
              
              <div className="custom-file-upload">
                <input 
                  type="file" 
                  id="file" 
                  name="file" 
                  onChange={handleFileChange} 
                  required 
                  ref={fileInputRef}
                  accept=".rar"
                  style={{ display: 'none' }}
                />
                <button 
                  type="button" 
                  className="btn btn-outline btn-upload" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  Tải file lên
                </button>
                <span className="file-name-display">
                  {file ? file.name : 'Chưa chọn file nào'}
                </span>
              </div>
              
              <small className="help-text">Gồm file PDF báo cáo-thuyết minh, file video demo sản phẩm, file thiết kế, .... nén lại thành 1 file .rar (Dung lượng tối đa 500MB)</small>
            </div>

            <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang nộp...' : 'Gửi sản phẩm'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
