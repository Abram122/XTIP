# XTIP: All-In-One Threat Intelligence Platform 🛡️

<img width="994" height="374" alt="XTIP Logo" src="https://github.com/user-attachments/assets/0b8378e4-2595-46f2-acdd-867efe8b8029" />

---

## 📖 Overview

**XTIP** is an open-source project that brings together multiple **Threat Intelligence** tools in a single platform.
It helps security researchers and SOC teams analyze indicators of compromise (**IOCs**) like IP addresses, domains, and hashes.

XTIP integrates with well-known services such as:

* [VirusTotal](https://www.virustotal.com/)
* [AbuseIPDB](https://www.abuseipdb.com/)
* [Pulsedive](https://pulsedive.com/)
* [Shodan](https://www.shodan.io/)
* And more...

---

## 🚀 Features

* 🔍 Lookup for **IP / Domain / Hashes**.
* 📊 Get detailed reports from multiple Threat Intelligence APIs.
* 🖥️ User-friendly dashboard with clean UI.
* 🔑 Authentication & JWT-based authorization.
* 📩 Email notifications for high-risk results.
* 🗄️ MongoDB integration for storing and reviewing records.

---

## 📷 Screenshots
<img width="1505" height="779" alt="image" src="https://github.com/user-attachments/assets/37a9977d-829b-4cdf-b166-186aa0fd145b" />
<img width="1500" height="411" alt="image" src="https://github.com/user-attachments/assets/c3ac19dd-f59b-413c-b048-127e2c5502ae" />
<img width="1645" height="834" alt="image" src="https://github.com/user-attachments/assets/a65e4903-7f78-4227-a3cf-411397221bab" />
<img width="1914" height="888" alt="image" src="https://github.com/user-attachments/assets/e5fb5a05-7c77-4ed2-a3fc-23467c727fab" />
<img width="1672" height="556" alt="image" src="https://github.com/user-attachments/assets/8706c3fc-6124-49bd-b743-7c08b5b2f0a6" />

### Dashboard

<img width="1909" height="921" alt="image" src="https://github.com/user-attachments/assets/619c0d6e-0bc8-4f91-af14-8fb427a63b3e" />

### IP Reputation & URL Lookup

<img width="1306" height="740" alt="image" src="https://github.com/user-attachments/assets/ff9fcbc3-1165-459e-a63d-8d650ef32660" />


---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/xtip.git
cd xtip
```

### 2. Setup Frontend

```bash
cd client
npm install
```

Add the following environment variables in a `.env` file inside `client/`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

### 3. Setup Backend

```bash
cd server
npm install
```

Add the following environment variables in a `.env` file inside `server/`:

```env
MONGO_URI=your_mongo_connection
VIRUSTOTAL_API_KEY=your_virustotal_key
ABUSEIPDB_API_KEY=your_abuseipdb_key
JWT_SECRET=your_jwt_secret
PULSEDIVE_API_KEY=your_pulsedive_key
PORT=5000
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
SHODAN_API_KEY=your_shodan_api_key
NODE_ENV=development
```

Run the backend:

```bash
npm start
```

---

## 🧪 Usage

1. Open the frontend in your browser (`http://localhost:8080` by default).
2. Sign up / Sign in.
3. Enter an **IP, Domain, or Hash** in the lookup form.
4. Get instant reports from VirusTotal, AbuseIPDB, Pulsedive, and Shodan.

---

## 🏗️ Tech Stack

* **Frontend**: React + Vite + TailwindCSS
* **Backend**: Node.js + Express.js
* **Database**: MongoDB
* **Auth**: Supabase (for user management) + JWT
* **Threat Intelligence APIs**: VirusTotal, AbuseIPDB, Pulsedive, Shodan and more.......

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request if you’d like to improve XTIP.

---

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 👨‍💻 Author

Developed with ❤️ by **XTIP Team**
