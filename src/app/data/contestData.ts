// ============================================================
// TKVM 2026 — Contest Data Layer
// Source: Noidung.txt
// ============================================================

export const CONTEST = {
  name: 'Thiết kế Vi mạch Bảo mật và An toàn Thông tin',
  shortName: 'TKVM',
  year: '2026',
  dateRange: 'Tháng 6/2026 – Tháng 11/2026',
  registerUrl: 'https://bit.ly/4nWUfCQ',
  contactEmail: '', // Tạm thời bỏ email theo yêu cầu (sau này sẽ thêm vào)
  finalDate: new Date('2026-11-07T00:00:00'),
};

export const intro = `Cuộc thi Thiết kế vi mạch bảo mật và an toàn thông tin nhằm tạo môi trường học thuật cho sinh viên các trường đại học nghiên cứu, sáng tạo và vận dụng kiến thức chuyên ngành thiết kế vi mạch, an toàn thông tin vào thực tiễn. Góp phần phát hiện, bồi dưỡng và phát triển nguồn nhân lực chất lượng cao trong lĩnh vực thiết kế vi mạch, đặc biệt là thiết kế vi mạch bảo mật và an toàn phần cứng. Tăng cường kết nối, trao đổi chuyên môn giữa sinh viên với đội ngũ giảng viên, chuyên gia trong lĩnh vực thiết kế vi mạch và an toàn thông tin.`;

export const targetAudience = [
  {
    title: 'Đối tượng',
    desc: 'Sinh viên tại các trường đại học, học viện trên toàn quốc có ý tưởng, dự án, đề tài nghiên cứu ứng dụng trong lĩnh vực thiết kế vi mạch bảo mật, an toàn phần cứng.',
    icon: '',
  },
  {
    title: 'Hình thức tham dự',
    desc: 'Thí sinh có thể đăng ký cá nhân hoặc theo nhóm; mỗi nhóm dự thi không quá 05 thành viên. Mỗi thí sinh chỉ được tham gia 01 nhóm dự thi; mỗi nhóm được đăng ký tối đa 01 sản phẩm dự thi.',
    icon: '',
  },
];

export const scheduleRows = [
  {
    time: '01/6/2026 – 15/7/2026',
    task: 'Phát động cuộc thi, mở cổng đăng ký',
    executor: 'Ban Tổ chức',
    result: 'Danh sách đội dự thi',
    phase: 'kickoff',
  },
  {
    time: '15/5/2026 – 09/9/2026',
    task: 'Huấn luyện, đào tạo và triển khai ý tưởng, thiết kế của từng đội dự thi',
    executor: 'Các đội thi',
    result: 'Sản phẩm dự thi',
    phase: 'develop',
  },
  {
    time: '10/9/2026 – 19/9/2026',
    task: 'Các đội nộp bài dự thi',
    executor: 'Các đội thi',
    result: 'Sản phẩm dự thi',
    phase: 'submit',
  },
  {
    time: '20/9/2026 – 30/9/2026',
    task: 'Vòng sơ loại',
    executor: 'Ban Giám khảo',
    result: 'Danh sách 08-10 đội vào chung kết',
    phase: 'prelim',
  },
  {
    time: '01/10/2026 – 19/10/2026',
    task: 'Các đội vào vòng chung kết chỉnh sửa hoàn thiện sản phẩm',
    executor: 'Các đội thi',
    result: 'Sản phẩm dự thi',
    phase: 'final-prep',
  },
  {
    time: '07/11/2026',
    task: 'Chung kết, trao giải',
    executor: 'Ban Tổ chức, Ban Giám khảo',
    result: 'Xếp hạng và trao giải',
    phase: 'final',
  },
];

export const venue = {
  name: 'Học viện Kỹ thuật mật mã',
  address: '141 đường Chiến Thắng, phường Thanh Liệt, thành phố Hà Nội',
  mapsUrl: 'https://maps.app.goo.gl/T4Y8VpMhQh9g4s7z6',
  mapEmbed: 'https://maps.google.com/maps?q=Học+viện+Kỹ+thuật+mật+mã,+141+Chiến+Thắng,+Thanh+Liệt,+Hà+Nội&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

export const contentAreas = [
  { label: 'Vi mạch thực thi thuật toán mật mã', icon: '' },
  { label: 'Vi mạch xác thực, nhận dạng an toàn', icon: '' },
  { label: 'Quản lý và bảo vệ khóa phần cứng', icon: '' },
  { label: 'Bảo mật chống tấn công kênh kề (SCA)', icon: '' },
  { label: 'Bảo mật chống tấn công tiêm lỗi (FIA)', icon: '' },
  { label: 'Phát hiện xâm nhập & chống can thiệp vật lý', icon: '' },
  { label: 'Bảo mật bộ nhớ và giao tiếp nội bộ', icon: '' },
  { label: 'Bảo vệ sở hữu trí tuệ vi mạch (IP)', icon: '' },
];

export const technicalLevels = [
  {
    id: 'min',
    level: 'Mức tối thiểu (Bắt buộc)',
    color: 'min',
    items: [
      'Thiết kế logic / RTL (Verilog, VHDL...)',
      'Kết quả mô phỏng và kiểm tra thiết kế',
      'Dạng sóng kiểm chứng và đánh giá chức năng bảo mật',
    ],
  },
  {
    id: 'mid',
    level: 'Mức nâng cao (Khuyến khích)',
    color: 'mid',
    items: [
      'Triển khai, đánh giá hiệu năng thiết kế trên phần cứng FPGA',
      'Video trình diễn kết quả trên FPGA',
    ],
  },
  {
    id: 'max',
    level: 'Mức cao nhất (Xuất sắc)',
    color: 'max',
    items: [
      'Thiết kế vật lý hoàn thiện đến mức layout',
      'Tệp GDS/GDSII (*.gds)',
      'Kết quả kiểm chứng: báo cáo timing, DRC, LVS',
    ],
  },
];

export const evaluationCriteria = [
  { icon: '', title: 'Mục tiêu ứng dụng', desc: 'Tính rõ ràng, thực tiễn và ý nghĩa của bài toán bảo mật được giải quyết.' },
  { icon: '', title: 'Kiến trúc thiết kế', desc: 'Tính hợp lý, hiệu quả và khoa học của kiến trúc vi mạch đề xuất.' },
  { icon: '', title: 'Điểm mới & sáng tạo', desc: 'Mức độ sáng tạo, cải tiến so với các giải pháp hiện có.' },
  { icon: '', title: 'Khả năng phát triển', desc: 'Tiềm năng mở rộng, ứng dụng thực tế và khả năng thương mại hóa.' },
];

export const rounds = [
  {
    id: 'prelim',
    label: 'Vòng sơ loại',
    icon: '',
    color: 'teal',
    description: 'Các nhóm dự thi nộp báo cáo và sản phẩm để Ban Giám khảo đánh giá, chọn 08–10 dự án tốt nhất vào chung kết.',
    requirements: [
      'Tệp báo cáo định dạng PDF trình bày: ý tưởng, mục tiêu bảo vệ, kiến trúc thiết kế, thiết kế logic/RTL, kết quả mô phỏng, dạng sóng kiểm chứng.',
      'Đối với thiết kế vật lý: bổ sung hình ảnh layout, tệp GDS/GDSII, kết quả DRC, LVS và báo cáo timing.',
      'Khuyến khích nộp thêm video trình diễn kết quả mô phỏng, kết quả triển khai trên FPGA.',
    ],
    result: 'Ban Giám khảo lựa chọn 08–10 dự án tốt nhất tham gia Vòng chung kết.',
  },
  {
    id: 'final',
    label: 'Vòng chung kết',
    icon: '',
    color: 'amber',
    description: 'Các đội vào chung kết hoàn thiện sản phẩm, trình bày poster và thuyết trình trực tiếp trước Ban Giám khảo.',
    requirements: [
      'Nộp lại tệp báo cáo PDF hoàn thiện theo góp ý của Ban Giám khảo ở vòng sơ loại.',
      'Nộp thêm video trình diễn trên FPGA hoặc hình ảnh layout, tệp GDS/GDSII kèm báo cáo timing, DRC, LVS nếu có.',
      'Trưng bày poster giới thiệu dự án.',
      'Trình bày thuyết trình trước Ban Giám khảo trong 20 phút (qua công cụ thuyết trình, video clip, hình ảnh minh họa và minh chứng kỹ thuật).',
    ],
    result: 'Ban Giám khảo đánh giá, xếp hạng các nhóm dự thi để lựa chọn những nhóm xuất sắc.',
  },
  {
    id: 'ceremony',
    label: 'Lễ Tổng kết & Trao giải',
    icon: '',
    color: 'navy',
    description: 'Lễ tổng kết, tri ân các đơn vị đồng hành và trao giải cho các nhóm dự án xuất sắc.',
    requirements: [
      'Tổng kết các hoạt động trong khuôn khổ Cuộc thi.',
      'Tri ân các đơn vị tài trợ, đồng hành.',
      'Trao giải cho các nhóm dự án xuất sắc.',
    ],
    result: 'Các nhóm xuất sắc nhận giải thưởng và giấy chứng nhận.',
  },
];

export const prizes = [
  { rank: 'Giải Nhất', qty: 1, icon: '', type: 'first', desc: 'Tiền thưởng, giấy chứng nhận và biểu trưng' },
  { rank: 'Giải Nhì', qty: 1, icon: '', type: 'second', desc: 'Tiền thưởng, giấy chứng nhận và biểu trưng' },
  { rank: 'Giải Ba', qty: 2, icon: '', type: 'third', desc: 'Tiền thưởng, giấy chứng nhận và biểu trưng' },
  { rank: 'Giải Khuyến khích', qty: 4, icon: '', type: 'consolation', desc: 'Tiền thưởng, giấy chứng nhận và biểu trưng' },
];

export const navLinks = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Thời gian', path: '/thoigian' },
  { label: 'Hình thức thi', path: '/hinhthuc' },
  { label: 'Nội dung', path: '/noidung' },
  { label: 'Giải thưởng', path: '/giaithuong' },
  { label: 'Nộp sản phẩm', path: '/nop-san-pham' },
  { label: 'Địa điểm', path: '/diadiem' },
];
