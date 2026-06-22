# 🏠 TroHub — Nền tảng cho thuê phòng trọ trực tuyến

> **Luận văn tốt nghiệp** — Hệ thống đăng tin và quản lý phòng trọ cho thuê sử dụng React.js + Node.js + PostgreSQL.

---

## 📋 Tài liệu đính kèm

| Tài liệu | Mô tả |
|---|---|
| 📄 `1ReportThesis_NSPhi_final_ver_3_edit1.pdf` | Báo cáo luận văn (PDF) |
| 📖 `README.md` | Hướng dẫn cài đặt và chạy dự án |

---

## 🛠️ Công nghệ sử dụng

| Layer | Công nghệ |
|---|---|
| **Frontend** | React.js, Vite, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL, Sequelize ORM |
| **Deploy** | Docker, Cloudflare Tunnel |
| **Auth** | JWT, Google OAuth2 |
| **Payment** | VNPay, Momo, PayPal |

---

## ⚙️ Hướng dẫn cài đặt & chạy Local

Để chạy được web cần 3 thành phần:
- **PostgreSQL** — Database server
- **Server** — Node.js backend (xử lý logic)
- **Client** — React.js frontend (giao diện)

---

### 1. Cài đặt PostgreSQL — Database

Tải PostgreSQL tại: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

Sau khi cài, kiểm tra PostgreSQL đã chạy trong **Services** của máy. Nếu chưa, start nó lên.

Tạo database mới bằng `psql`:

```bash
# Mở psql, nhập password khi được yêu cầu
psql -U postgres

# Tạo database
CREATE DATABASE phongtroxanh;
```

> **Lưu ý:** Ghi nhớ `username` và `password` PostgreSQL để điền vào file `.env` ở bước sau.

---

### 2. Cài đặt & chạy Server (Node.js)

Kiểm tra Node.js và npm đã cài:

```bash
node -v
npm -v
```

**Bước 1** — Mở terminal tại thư mục `server/`, cài thư viện:

```bash
cd server
npm install
```

**Bước 2** — Tạo file cấu hình môi trường:

```bash
# Copy file mẫu
cp .env.example .env
```

Mở file `server/.env` và điền đầy đủ thông tin (DB host, port, username, password, các API key...).

**Bước 3** — Chạy server:

```bash
npm run dev
```

**Bước 4** — Khởi tạo bảng và dữ liệu mẫu:

```bash
npm run mockup
```

✅ Server chạy thành công!

---

### 3. Cài đặt & chạy Client (React.js)

**Bước 1** — Mở terminal tại thư mục `client/`, cài thư viện:

```bash
cd client
npm install
```

**Bước 2** — Tạo file cấu hình môi trường:

Tạo file `client/.env` và điền thông tin cần thiết (xem `.env.example` nếu có).

**Bước 3** — Chạy client:

```bash
npm run dev
```

**Bước 4** — Mở trình duyệt và truy cập:

```
http://localhost:5173
```

✅ Website chạy thành công!

---

## 🐳 Chạy bằng Docker (tuỳ chọn)

```bash
# Copy file cấu hình môi trường Docker
cp .env.docker.example .env

# Chạy toàn bộ stack
docker-compose up -d
```

---

## 📁 Cấu trúc thư mục

```
TroHub/
├── client/          # React.js frontend
├── server/          # Node.js backend
├── deploy/          # Cấu hình deploy (Docker, Cloudflare)
├── docker-compose.yml
└── README.md
```

---

## 👨‍💻 Tác giả

**Nguyễn Sỹ Phi** — Luận văn tốt nghiệp
