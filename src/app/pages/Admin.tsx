import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './Admin.css';

interface Submission {
  id: number;
  teamName: string;
  unitName: string;
  topicName: string;
  instructor: string;
  phone: string;
  email: string;
  fileName: string;
  filePath: string;
  createdAt: string;
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setToken] = useState('');
  
  // Selection and Delete State
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Table controls state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'teamName' | 'createdAt'>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Check if already logged in via localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchSubmissions(savedToken);
    }
  }, []);

  // Reset to first page when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortField, sortDir]);

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAllOnPage = () => {
    const pageIds = currentItems.map(item => item.id);
    const allSelected = pageIds.length > 0 && pageIds.every(id => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
    } else {
      const newSelections = pageIds.filter(id => !selectedIds.includes(id));
      setSelectedIds(prev => [...prev, ...newSelections]);
    }
  };

  const handleConfirmDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deletePassword) {
      setError('Vui lòng nhập mật khẩu xác nhận.');
      return;
    }
    setIsDeleting(true);
    setError('');
    
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/submissions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids: selectedIds, password: deletePassword })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Lỗi khi xóa.');
      }
      
      setShowDeleteModal(false);
      setDeletePassword('');
      setSelectedIds([]);
      if (token) fetchSubmissions(token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        throw new Error('Tài khoản hoặc mật khẩu không đúng');
      }

      const data = await res.json();
      setToken(data.accessToken);
      localStorage.setItem('adminToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setIsLoggedIn(true);
      fetchSubmissions(data.accessToken);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      // Optional: Call backend to revoke refresh token
      await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken })
      }).catch(() => {});
    }
    
    localStorage.removeItem('adminToken');
    localStorage.removeItem('refreshToken');
    setToken('');
    setIsLoggedIn(false);
    setSubmissions([]);
  };

  const fetchSubmissions = async (authToken: string) => {
    setLoading(true);
    try {
      let res = await fetch('/api/submissions', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      // If token expired, try to refresh it
      if (res.status === 401 || res.status === 403) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          handleLogout();
          throw new Error('Phiên đăng nhập hết hạn.');
        }

        const refreshRes = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: refreshToken })
        });

        if (!refreshRes.ok) {
          handleLogout();
          throw new Error('Phiên đăng nhập hết hạn.');
        }

        const refreshData = await refreshRes.json();
        const newAccessToken = refreshData.accessToken;
        
        // Save new token and retry fetching
        setToken(newAccessToken);
        localStorage.setItem('adminToken', newAccessToken);
        
        res = await fetch('/api/submissions', {
          headers: {
            'Authorization': `Bearer ${newAccessToken}`
          }
        });

        if (!res.ok) {
          throw new Error('Không thể tải dữ liệu.');
        }
      } else if (!res.ok) {
        throw new Error('Không thể tải dữ liệu.');
      }
      
      const data = await res.json();
      setSubmissions(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort logic
  const filteredSubmissions = submissions.filter(sub => 
    sub.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.topicName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    let valA: any = a[sortField];
    let valB: any = b[sortField];
    
    if (sortField === 'createdAt') {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    } else {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }
    
    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedSubmissions.slice(startIndex, startIndex + itemsPerPage);

  if (!isLoggedIn) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-wrapper">
          <div className="admin-login-container">
            <h1 className="page-title">Đăng nhập Admin</h1>
          <form onSubmit={handleLogin} className="admin-login-form">
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="admin-login-action">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1 className="page-title">Sản phẩm đã nộp</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/" className="btn btn-outline" style={{ textDecoration: 'none' }}>Trang chủ</Link>
          <button onClick={handleLogout} className="btn btn-outline">Đăng xuất</button>
        </div>
      </div>

      <section className="section-block">
        {error && <div className="alert alert-error">{error}</div>}
        
        {showDeleteModal && (
          <div className="admin-login-overlay" style={{ zIndex: 1100 }}>
            <div className="admin-login-wrapper">
              <div className="admin-login-container" style={{ maxWidth: '400px' }}>
                <h3 style={{ color: '#c53030', marginBottom: '16px', fontSize: '1.25rem' }}>Xác nhận xóa</h3>
                <p style={{ marginBottom: '20px' }}>Bạn đang chuẩn bị xóa <strong>{selectedIds.length}</strong> mục. Hành động này sẽ xóa vĩnh viễn dữ liệu và file đính kèm, không thể khôi phục.</p>
                <form onSubmit={handleConfirmDelete} className="admin-login-form">
                  <div className="form-group">
                    <label htmlFor="deletePassword">Nhập mật khẩu Admin để xác nhận:</label>
                    <input 
                      type="password" 
                      id="deletePassword" 
                      value={deletePassword} 
                      onChange={(e) => setDeletePassword(e.target.value)} 
                      required 
                      autoFocus
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => {
                      setShowDeleteModal(false);
                      setDeletePassword('');
                    }} disabled={isDeleting}>Hủy</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, backgroundColor: '#c53030', color: 'white' }} disabled={isDeleting}>
                      {isDeleting ? 'Đang xóa...' : 'Xóa vĩnh viễn'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="admin-controls">
          <div className="admin-search-wrapper">
            <input 
              type="text" 
              className="admin-search" 
              placeholder="Tìm theo Tên đội, Đơn vị, Đề tài..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </span>
          </div>
          <div className="admin-sort">
            <label>Sắp xếp theo: </label>
            <select value={`${sortField}-${sortDir}`} onChange={(e) => {
              const [field, dir] = e.target.value.split('-');
              setSortField(field as 'teamName' | 'createdAt');
              setSortDir(dir as 'asc' | 'desc');
            }}>
              <option value="createdAt-desc">Ngày nộp (Mới nhất trước)</option>
              <option value="createdAt-asc">Ngày nộp (Cũ nhất trước)</option>
              <option value="teamName-asc">Tên đội (A-Z)</option>
              <option value="teamName-desc">Tên đội (Z-A)</option>
            </select>
          </div>
        </div>

        {selectedIds.length > 0 && (
          <div style={{ padding: '12px', backgroundColor: '#fff5f5', border: '1px solid #feb2b2', borderRadius: '8px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#c53030', fontWeight: 'bold' }}>Đã chọn {selectedIds.length} mục</span>
            <button onClick={() => setShowDeleteModal(true)} className="btn btn-primary" style={{ backgroundColor: '#c53030', color: 'white', padding: '6px 16px', fontSize: '14px' }}>
              Xóa mục đã chọn
            </button>
          </div>
        )}

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    onChange={toggleAllOnPage}
                    checked={currentItems.length > 0 && currentItems.every(item => selectedIds.includes(item.id))}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                </th>
                <th>STT</th>
                <th>Tên đội</th>
                <th>Tên đơn vị</th>
                <th>Tên đề tài</th>
                <th>Thông tin liên hệ</th>
                <th>Ngày nộp</th>
                <th>File báo cáo</th>
              </tr>
            </thead>
            <tbody>
              {loading && submissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center">Đang tải dữ liệu...</td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center">Chưa có dữ liệu phù hợp.</td>
                </tr>
              ) : (
                currentItems.map((sub, index) => (
                  <tr key={sub.id} style={{ backgroundColor: selectedIds.includes(sub.id) ? '#f0fff4' : '' }}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(sub.id)}
                        onChange={() => toggleSelection(sub.id)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                    </td>
                    <td>{startIndex + index + 1}</td>
                    <td><strong>{sub.teamName}</strong></td>
                    <td>{sub.unitName}</td>
                    <td>{sub.topicName}</td>
                    <td>
                      <div>{sub.instructor && `GVHD: ${sub.instructor}`}</div>
                      <div>SĐT: {sub.phone}</div>
                      <div>Email: {sub.email}</div>
                    </td>
                    <td>{new Date(sub.createdAt).toLocaleString('vi-VN')}</td>
                    <td>
                      <a 
                        href={`/api/uploads/${sub.fileName}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="download-link"
                      >
                        Tải xuống
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button 
                key={i + 1} 
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Sau
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
