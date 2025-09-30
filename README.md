# XTIP: All-In-One Threat Intelligence Platform 🛡️

<img width="994" height="374" alt="XTIP Logo" src="https://github.com/user-attachments/assets/0b8378e4-2595-46f2-acdd-867efe8b8029" />

---

## 📖 Overview

**XTIP** (All-in-One Threat Intelligence Platform) is an open-source solution that unifies multiple **Threat Intelligence** tools into one streamlined platform.

It enables **security researchers, SOC teams, and analysts** to investigate **indicators of compromise (IOCs)** such as IP addresses, domains, and file hashes with ease and efficiency.

XTIP integrates with industry-leading services, including:

* [VirusTotal](https://www.virustotal.com/)
* [AbuseIPDB](https://www.abuseipdb.com/)
* [Pulsedive](https://pulsedive.com/)
* [Shodan](https://www.shodan.io/)
* ...and more coming soon!

---

## 🚀 Key Features

* 🔍 **IOC Lookups**: Analyze IPs, domains, and hashes.
* 📊 **Multi-source Reports**: Aggregate results from top Threat Intelligence APIs.
* 🖥️ **Intuitive Dashboard**: Modern, user-friendly interface for investigations.
* 🔑 **Secure Authentication**: Supabase-powered user management + JWT authorization.
* 📩 **Email Alerts**: Automatic notifications for high-risk findings.
* 🗄️ **Data Persistence**: MongoDB storage for logs, history, and reporting.

---

## 📷 Screenshots

### Dashboard

<img width="1909" height="921" alt="Dashboard" src="https://github.com/user-attachments/assets/619c0d6e-0bc8-4f91-af14-8fb427a63b3e" />  

### IP Reputation & URL Lookup

<img width="1306" height="740" alt="IP Reputation" src="https://github.com/user-attachments/assets/ff9fcbc3-1165-459e-a63d-8d650ef32660" />  

### More Previews

<img width="1505" height="779" alt="image" src="https://github.com/user-attachments/assets/37a9977d-829b-4cdf-b166-186aa0fd145b" />  
<img width="1500" height="411" alt="image" src="https://github.com/user-attachments/assets/c3ac19dd-f59b-413c-b048-127e2c5502ae" />  
<img width="1645" height="834" alt="image" src="https://github.com/user-attachments/assets/a65e4903-7f78-4227-a3cf-411397221bab" />  
<img width="1914" height="888" alt="image" src="https://github.com/user-attachments/assets/e5fb5a05-7c77-4ed2-a3fc-23467c727fab" />  
<img width="1672" height="556" alt="image" src="https://github.com/user-attachments/assets/8706c3fc-6124-49bd-b743-7c08b5b2f0a6" />  

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

Create a `.env` file inside `client/` and add:

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

Create a `.env` file inside `server/` and configure:

```env
MONGO_URI=your_mongo_connection
VIRUSTOTAL_API_KEY=your_virustotal_key
ABUSEIPDB_API_KEY=your_abuseipdb_key
PULSEDIVE_API_KEY=your_pulsedive_key
SHODAN_API_KEY=your_shodan_api_key
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
PORT=5000
NODE_ENV=development
```

Run the backend:

```bash
npm start
```

---

## 🧪 Usage

1. Start both backend and frontend services.
2. Open the app in your browser at: [http://localhost:8080](http://localhost:8080).
3. Register or log in.
4. Submit an **IP, domain, or hash** to analyze.
5. Receive a unified report from VirusTotal, AbuseIPDB, Pulsedive, and Shodan.

---

## 🏗️ Tech Stack

* **Frontend**: React + Vite + TailwindCSS
* **Backend**: Node.js + Express.js
* **Database**: MongoDB
* **Authentication**: Supabase + JWT
* **Threat Intel Integrations**: VirusTotal, AbuseIPDB, Pulsedive, Shodan (with support for more APIs coming soon).

---

## 🤝 Contributing

Contributions are highly encouraged! 🎉

* Fork the repo
* Create a new branch (`feature/new-feature`)
* Commit your changes
* Open a pull request

Please check existing issues or open a new one to discuss improvements.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Authors

Developed with ❤️ by the **XTIP Team**
