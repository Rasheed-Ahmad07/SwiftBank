# ⚡ SwiftBank

> A modern, feature-rich banking application built with vanilla JavaScript, HTML5, and CSS3


## 🌟 Overview

SwiftBank is a comprehensive banking simulation that provides a realistic banking experience with modern web technologies. Built with clean code architecture and best practices, it demonstrates advanced JavaScript concepts while offering a smooth user experience.

## ✨ Key Features

### 🔐 **User Authentication**
- Secure login system with username and PIN
- Multi-user support with individual accounts
- Session management with automatic logout

### 💰 **Account Management**
- Real-time balance calculation
- Transaction history with timestamps
- Multi-currency support (EUR, USD)
- Localized formatting for different regions

### 💸 **Money Transfers**
- Instant transfers between accounts
- Transfer validation and error handling
- Real-time balance updates
- Transfer history tracking

### 🏦 **Loan System**
- Smart loan approval based on deposit history
- Minimum 10% deposit requirement for loans
- Automated loan processing with delay simulation
- Interest calculation and display

### 📊 **Financial Overview**
- Income and expense summaries
- Interest calculations
- Transaction categorization (deposits/withdrawals)
- Sortable transaction history

### ⏰ **Security Features**
- Auto-logout timer (40 seconds)
- Session timeout with visual countdown
- Secure account closure with confirmation
- PIN-based authentication

### 🌍 **Internationalization**
- Multi-language date formatting
- Currency localization
- Regional number formatting
- Timezone-aware transactions

## 🚀 Demo Accounts

Use these credentials to test the application:

| Account         | Username | PIN    | Currency |
|---------------  |----------|--------|----------|
| Rasheed Ahmad   | `ra`     | `1111` | EUR      |
| Javid Ali Khan  | `jak`    | `2222` | USD      |
| Noor Ullah      | `nu`     | `3333` | EUR      |
| Rafiq Khan      | `rk`     | `4444` | USD      |

## 💻 Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Features**: DOM Manipulation, Local Storage Alternative, Internationalization API
- **Architecture**: Clean Code, DRY Principles, Modular Design

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rasheed-Ahmad07/SwiftBank.git
   ```

2. **Navigate to project directory**
   ```bash
   cd SwiftBank
   ```

3. **Open in browser**
   ```bash
   # Simply open index.html in your preferred browser
   # Or use a local server for better experience:
   npx serve .
   ```

4. **Start banking!** 🎉

## 📱 How to Use

### 1. **Login**
- Enter username and PIN from demo accounts
- Click the arrow button to login

### 2. **View Dashboard**
- See your current balance and recent transactions
- Check income, expenses, and interest earned

### 3. **Transfer Money**
- Enter recipient username
- Specify transfer amount
- Confirm transaction

### 4. **Request Loan**
- Enter desired loan amount
- System checks your deposit history
- Loan approved if you have 10% in deposits

### 5. **Sort Transactions**
- Click "SORT" to arrange transactions by amount
- Toggle between ascending and descending order

### 6. **Close Account**
- Enter your username and PIN for confirmation
- Account will be permanently deleted

## 🎯 Code Highlights

- **Clean Architecture**: Modular functions with single responsibilities
- **DRY Principle**: Reusable utility functions and consolidated DOM handling
- **Error Handling**: Comprehensive validation for all user inputs
- **Performance**: Efficient DOM manipulation and memory management
- **Security**: Input validation and session management

## 📂 Project Structure

```
SwiftBank/
├── index.html          # Main HTML structure
├── css/
│   └── style.css      # Styling and layout
├── js/
│   └── script.js      # Application logic
├── media/
│   ├── icon.png       # App icon
│   └── logo.png       # App logo
└── README.md          # Project documentation
```

## 🌟 Features Showcase

### Real-time Updates
- Balance updates instantly after transactions
- Live timer countdown for security
- Dynamic transaction history

### International Support
- Automatic currency formatting
- Localized date display
- Multi-region compatibility

### Smart Validations
- Transfer amount validation
- Sufficient balance checks
- Loan eligibility verification

## 🚀 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Transaction categories and filtering
- [ ] Export transaction history
- [ ] Mobile app version
- [ ] Email notifications
- [ ] Advanced security features

## 👨‍💻 Author

**Rasheed Ahmad**
- GitHub: [@Rasheed-Ahmad07](https://github.com/Rasheed-Ahmad07)
- Project Link: [SwiftBank Repository](https://github.com/Rasheed-Ahmad07/SwiftBank)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Rasheed-Ahmad07/SwiftBank/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show Your Support

Give a ⭐ if this project helped you learn something new!

---

<div align="center">
  <strong>Built with ❤️ by Rasheed Ahmad</strong>
</div>
