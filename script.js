document.addEventListener('DOMContentLoaded', function () {
    // Stock items functionality
    const stockItems = document.querySelectorAll('.stock-item');
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');

    // Mock stock data
    const stockData = {
        'AAPL': {
            price: '$218.63',
            change: '+1.24 (0.57%)',
            changeStatus: 'positive',
            sector: 'Technology • Consumer Electronics',
            investors: [
                { initials: 'WB', name: 'Warren Buffett', type: 'Fund Manager', date: 'February 15, 2025', amount: '+10,240,000 shares', status: 'buy' },
                { initials: 'BF', name: 'BlackRock Fund', type: 'Institutional Investor', date: 'January 30, 2025', amount: '+3,750,000 shares', status: 'buy' },
                { initials: 'TC', name: 'Tim Cook', type: 'CEO • Insider Trading', date: 'January 12, 2025', amount: '-50,000 shares', status: 'sell' }
            ]
        },
        'TSLA': {
            price: '$467.25',
            change: '-12.33 (2.57%)',
            changeStatus: 'negative',
            sector: 'Automotive • Electric Vehicles',
            investors: [
                { initials: 'CW', name: 'Cathie Wood (ARK Invest)', type: 'Fund Manager', date: 'February 28, 2025', amount: '+235,000 shares', status: 'buy' },
                { initials: 'VG', name: 'Vanguard Group', type: 'Institutional Investor', date: 'February 10, 2025', amount: '+1,200,000 shares', status: 'buy' },
                { initials: 'EM', name: 'Elon Musk', type: 'CEO • Insider Trading', date: 'January 25, 2025', amount: '-1,250,000 shares', status: 'sell' }
            ]
        },
        'MSFT': {
            price: '$452.87',
            change: '+5.23 (1.17%)',
            changeStatus: 'positive',
            sector: 'Technology • Software',
            investors: [
                { initials: 'BG', name: 'Bill Gates', type: 'Founder', date: 'March 3, 2025', amount: '+500,000 shares', status: 'buy' },
                { initials: 'SS', name: 'State Street', type: 'Institutional Investor', date: 'February 18, 2025', amount: '+2,340,000 shares', status: 'buy' },
                { initials: 'SN', name: 'Satya Nadella', type: 'CEO • Insider Trading', date: 'January 22, 2025', amount: '-35,000 shares', status: 'sell' }
            ]
        },
        'NVDA': {
            price: '$1,225.37',
            change: '+32.14 (2.69%)',
            changeStatus: 'positive',
            sector: 'Technology • Semiconductors',
            investors: [
                { initials: 'JH', name: 'Jensen Huang', type: 'CEO & Founder • Insider Trading', date: 'March 1, 2025', amount: '+25,000 shares', status: 'buy' },
                { initials: 'BF', name: 'BlackRock Fund', type: 'Institutional Investor', date: 'February 22, 2025', amount: '+1,250,000 shares', status: 'buy' },
                { initials: 'CW', name: 'Cathie Wood (ARK Invest)', type: 'Fund Manager', date: 'February 15, 2025', amount: '+345,600 shares', status: 'buy' },
                { initials: 'TC', name: 'Timothy Chen', type: 'Director • Insider Trading', date: 'February 8, 2025', amount: '-12,500 shares', status: 'sell' }
            ]
        },
        'AMZN': {
            price: '$182.94',
            change: '-0.56 (0.31%)',
            changeStatus: 'negative',
            sector: 'E-commerce • Cloud Computing',
            investors: [
                { initials: 'JB', name: 'Jeff Bezos', type: 'Founder', date: 'February 26, 2025', amount: '-1,000,000 shares', status: 'sell' },
                { initials: 'CG', name: 'Capital Group', type: 'Institutional Investor', date: 'February 12, 2025', amount: '+2,750,000 shares', status: 'buy' },
                { initials: 'AJ', name: 'Andy Jassy', type: 'CEO • Insider Trading', date: 'January 18, 2025', amount: '+15,000 shares', status: 'buy' }
            ]
        }
    };

    // Function to update stock details
    function updateStockDetails(symbol) {
        const stock = stockData[symbol];
        if (!stock) return;

        // Update stock header
        const stockHeader = document.querySelector('.stock-details h2');
        const stockSector = document.querySelector('.stock-details p');
        const stockPrice = document.querySelector('.stock-price');
        const priceChange = document.querySelector('.price-change');

        stockHeader.textContent = `${symbol} - ${document.querySelector(`.stock-item[data-symbol="${symbol}"] .stock-name`).textContent}`;
        stockSector.textContent = stock.sector;
        stockPrice.textContent = stock.price;

        priceChange.textContent = stock.change;
        priceChange.className = `price-change ${stock.changeStatus}`;

        // Update investor activity
        const activityContainer = document.querySelector('.investor-activity');
        activityContainer.innerHTML = ''; // Clear existing content

        stock.investors.forEach(investor => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';

            activityItem.innerHTML = `
                <div class="investor-avatar">${investor.initials}</div>
                <div class="activity-details">
                    <div class="investor-name">${investor.name}</div>
                    <div class="activity-type">${investor.type}</div>
                    <div class="activity-date">${investor.date}</div>
                </div>
                <div class="activity-amount ${investor.status}">${investor.amount}</div>
            `;

            activityContainer.appendChild(activityItem);
        });
    }

    // Add click event listeners to stock items
    stockItems.forEach(item => {
        item.addEventListener('click', function () {
            const symbol = this.getAttribute('data-symbol');
            updateStockDetails(symbol);

            // Add active class to selected stock
            stockItems.forEach(si => si.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show selected tab content
            document.getElementById(`${tabId}-content`).classList.add('active');

            // Set active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Filter functionality
    const filterPills = document.querySelectorAll('.filter-pill');

    filterPills.forEach(pill => {
        pill.addEventListener('click', function () {
            // Set active filter
            filterPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');

            const filter = this.textContent.toLowerCase();

            // Filter stocks
            stockItems.forEach(item => {
                const sector = item.getAttribute('data-sector').toLowerCase();

                if (filter === 'all' || sector.includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Chat functionality
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : ''}`;

        messageDiv.innerHTML = `
            <div class="message-header">${isUser ? 'You' : 'AI Assistant'}</div>
            <div class="message-content">${text}</div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, true);

        // Clear input
        chatInput.value = '';

        // Simulate AI response
        setTimeout(() => {
            let response;

            // Simple keyword matching for demo purposes
            const lowerText = text.toLowerCase();
            if (lowerText.includes('nvidia') || lowerText.includes('nvda')) {
                response = "NVIDIA (NVDA) has seen strong insider buying recently, with CEO Jensen Huang purchasing 25,000 shares on March 1, 2025. This could be a positive signal about the company's future prospects.";
            } else if (lowerText.includes('tesla') || lowerText.includes('tsla')) {
                response = "Tesla (TSLA) has seen mixed insider activity, with CEO Elon Musk selling 1.25 million shares in January, but institutional investors like ARK Invest continuing to add to their positions.";
            } else if (lowerText.includes('apple') || lowerText.includes('aapl')) {
                response = "Warren Buffett's Berkshire Hathaway increased its Apple (AAPL) position by over 10 million shares in February, suggesting continued confidence in the company despite recent volatility.";
            } else if (lowerText.includes('insider')) {
                response = "Looking at recent insider trading patterns, CEOs of tech companies have been more active than usual. Notable purchases include Jensen Huang (NVIDIA) and Andy Jassy (Amazon), while Elon Musk (Tesla) and Jeff Bezos (Amazon) have been selling portions of their holdings.";
            } else {
                response = "I can help you analyze stock data and insider trading patterns. Try asking about specific companies like NVIDIA, Tesla, or Apple, or about general insider trading trends.";
            }

            addMessage(response);
        }, 1000);
    }

    // Send button click
    sendButton.addEventListener('click', handleUserMessage);

    // Enter key press in textarea
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleUserMessage();
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('input', function () {
        const searchText = this.value.toLowerCase();

        stockItems.forEach(item => {
            const symbol = item.getAttribute('data-symbol').toLowerCase();
            const name = item.getAttribute('data-name').toLowerCase();
            const sector = item.getAttribute('data-sector').toLowerCase();

            // Get investor badges
            const investors = Array.from(item.querySelectorAll('.investor-badge'))
                .map(badge => badge.textContent.toLowerCase());

            if (symbol.includes(searchText) ||
                name.includes(searchText) ||
                sector.includes(searchText) ||
                investors.some(inv => inv.includes(searchText))) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Initialize with NVDA selected
    const nvdaStock = document.querySelector('.stock-item[data-symbol="NVDA"]');
    if (nvdaStock) {
        nvdaStock.classList.add('active');
        updateStockDetails('NVDA');
    }

    // Create a simple chart placeholder
    function createSimpleChart() {
        const chartPlaceholder = document.querySelector('.chart-placeholder');
        chartPlaceholder.textContent = 'Loading chart...';

        // Simulate chart loading
        setTimeout(() => {
            chartPlaceholder.textContent = 'Chart data loaded';
            chartPlaceholder.innerHTML = `
                <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
                    <div style="flex: 1; background: linear-gradient(to top right, #e2e8f0, #f8fafc, #e2e8f0);"></div>
                    <div style="height: 60px; display: flex; align-items: flex-end;">
                        <div style="flex: 1; height: 40%; background-color: var(--primary-light); margin: 0 1px;"></div>
                        <div style="flex: 1; height: 60%; background-color: var(--primary-light); margin: 0 1px;"></div>
                        <div style="flex: 1; height: 45%; background-color: var(--primary-light); margin: 0 1px;"></div>
                        <div style="flex: 1; height: 70%; background-color: var(--primary-light); margin: 0 1px;"></div>
                        <div style="flex: 1; height: 55%; background-color: var(--primary-light); margin: 0 1px;"></div>
                        <div style="flex: 1; height: 80%; background-color: var(--primary-light); margin: 0 1px;"></div>
                        <div style="flex: 1; height: 95%; background-color: var(--primary-light); margin: 0 1px;"></div>
                    </div>
                </div>
            `;
        }, 1500);
    }

    createSimpleChart();
});