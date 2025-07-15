// Market Research Dashboard JavaScript
class MarketDashboard {
    constructor() {
        this.currentSection = 'overview';
        this.charts = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboard();
    }

    setupEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('href').substring(1);
                this.showSection(section);
                this.updateActiveLink(link);
            });
        });

        // Export functionality
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportReport();
        });

        // Refresh functionality
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshDashboard();
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            this.currentSection = sectionId;
            
            // Load section-specific data
            this.loadSectionData(sectionId);
        }
    }

    updateActiveLink(activeLink) {
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.remove('sidebar-active');
        });
        activeLink.classList.add('sidebar-active');
    }

    loadDashboard() {
        this.showLoadingOverlay(true);
        
        // Simulate loading delay
        setTimeout(() => {
            this.loadOverviewData();
            this.showLoadingOverlay(false);
        }, 1000);
    }

    loadSectionData(sectionId) {
        switch(sectionId) {
            case 'overview':
                this.loadOverviewData();
                break;
            case 'industry-trends':
                this.loadIndustryTrendsData();
                break;
            case 'customer-segments':
                this.loadCustomerSegmentsData();
                break;
            case 'competitive-landscape':
                this.loadCompetitiveLandscapeData();
                break;
            case 'regional-analysis':
                this.loadRegionalAnalysisData();
                break;
            case 'recommendations':
                // Recommendations are static HTML
                break;
        }
    }

    loadOverviewData() {
        this.createKPICards();
        this.createMarketSizeChart();
        this.createRevenueGrowthChart();
    }

    createKPICards() {
        const container = document.getElementById('kpi-cards');
        container.innerHTML = '';

        marketData.kpis.current.forEach(kpi => {
            const trendIcon = kpi.trend === 'up' ? 'fa-arrow-up trend-up' : 'fa-arrow-down trend-down';
            const trendColor = kpi.trend === 'up' ? 'text-green-600' : 'text-red-600';
            
            const card = document.createElement('div');
            card.className = 'bg-white rounded-xl shadow-lg p-6 card-hover';
            card.innerHTML = `
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">${kpi.metric}</p>
                        <p class="text-2xl font-bold text-gray-900">${kpi.value}</p>
                        <p class="text-sm ${trendColor}">
                            <i class="fas ${trendIcon} mr-1"></i>
                            ${kpi.change}
                        </p>
                    </div>
                    <div class="bg-blue-100 rounded-full p-3">
                        <i class="fas fa-chart-line text-blue-600"></i>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    createMarketSizeChart() {
        const ctx = document.getElementById('marketSizeChart').getContext('2d');
        
        if (this.charts.marketSize) {
            this.charts.marketSize.destroy();
        }

        this.charts.marketSize = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: marketData.industryTrends.marketSize.segments.map(s => s.name),
                datasets: [{
                    data: marketData.industryTrends.marketSize.segments.map(s => s.value),
                    backgroundColor: ['#4f46e5', '#06b6d4', '#10b981'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createRevenueGrowthChart() {
        const ctx = document.getElementById('revenueGrowthChart').getContext('2d');
        
        if (this.charts.revenueGrowth) {
            this.charts.revenueGrowth.destroy();
        }

        this.charts.revenueGrowth = new Chart(ctx, {
            type: 'line',
            data: {
                labels: marketData.industryTrends.revenue.map(r => r.year),
                datasets: [{
                    label: 'Revenue ($B)',
                    data: marketData.industryTrends.revenue.map(r => r.value),
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    loadIndustryTrendsData() {
        this.createIndustryRevenueChart();
        this.createEmergingTrendsChart();
        this.createTrendsAnalysis();
    }

    createIndustryRevenueChart() {
        const ctx = document.getElementById('industryRevenueChart').getContext('2d');
        
        if (this.charts.industryRevenue) {
            this.charts.industryRevenue.destroy();
        }

        this.charts.industryRevenue = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: marketData.industryTrends.revenue.map(r => r.year),
                datasets: [
                    {
                        label: 'Revenue ($B)',
                        data: marketData.industryTrends.revenue.map(r => r.value),
                        backgroundColor: '#4f46e5',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Growth Rate (%)',
                        data: marketData.industryTrends.revenue.map(r => r.growth),
                        type: 'line',
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    }

    createEmergingTrendsChart() {
        const ctx = document.getElementById('emergingTrendsChart').getContext('2d');
        
        if (this.charts.emergingTrends) {
            this.charts.emergingTrends.destroy();
        }

        this.charts.emergingTrends = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: marketData.industryTrends.emergingTrends.map(t => t.trend),
                datasets: [
                    {
                        label: 'Impact Score',
                        data: marketData.industryTrends.emergingTrends.map(t => t.impact),
                        borderColor: '#4f46e5',
                        backgroundColor: 'rgba(79, 70, 229, 0.2)',
                        pointBackgroundColor: '#4f46e5'
                    },
                    {
                        label: 'Adoption Rate',
                        data: marketData.industryTrends.emergingTrends.map(t => t.adoption),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        pointBackgroundColor: '#10b981'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    createTrendsAnalysis() {
        const container = document.getElementById('trends-analysis');
        container.innerHTML = '';

        marketData.industryTrends.emergingTrends.forEach(trend => {
            const impactColor = trend.impact >= 80 ? 'text-red-600' : trend.impact >= 60 ? 'text-yellow-600' : 'text-green-600';
            const adoptionColor = trend.adoption >= 80 ? 'text-green-600' : trend.adoption >= 60 ? 'text-yellow-600' : 'text-red-600';
            
            const card = document.createElement('div');
            card.className = 'bg-gray-50 rounded-lg p-4';
            card.innerHTML = `
                <h4 class="font-semibold mb-2">${trend.trend}</h4>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Impact:</span>
                        <span class="text-sm font-medium ${impactColor}">${trend.impact}%</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Adoption:</span>
                        <span class="text-sm font-medium ${adoptionColor}">${trend.adoption}%</span>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    loadCustomerSegmentsData() {
        this.createSegmentPerformanceChart();
        this.createChannelPreferenceChart();
        this.createSegmentsTable();
    }

    createSegmentPerformanceChart() {
        const ctx = document.getElementById('segmentPerformanceChart').getContext('2d');
        
        if (this.charts.segmentPerformance) {
            this.charts.segmentPerformance.destroy();
        }

        this.charts.segmentPerformance = new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: [{
                    label: 'Customer Segments',
                    data: marketData.customerSegments.demographics.map(segment => ({
                        x: segment.satisfaction,
                        y: segment.revenue,
                        r: segment.size / 2,
                        label: segment.segment
                    })),
                    backgroundColor: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b'].map(color => color + '80'),
                    borderColor: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Customer Satisfaction'
                        },
                        min: 3.5,
                        max: 5
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Revenue ($M)'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const point = context.raw;
                                return `${point.label}: Satisfaction ${point.x}, Revenue $${point.y}M, Size ${context.raw.r * 2}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    createChannelPreferenceChart() {
        const ctx = document.getElementById('channelPreferenceChart').getContext('2d');
        
        if (this.charts.channelPreference) {
            this.charts.channelPreference.destroy();
        }

        this.charts.channelPreference = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: marketData.customerSegments.behaviorPatterns.channelPreference.map(c => c.channel),
                datasets: [{
                    data: marketData.customerSegments.behaviorPatterns.channelPreference.map(c => c.percentage),
                    backgroundColor: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createSegmentsTable() {
        const tbody = document.getElementById('segments-tbody');
        tbody.innerHTML = '';

        marketData.customerSegments.demographics.forEach(segment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${segment.segment}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${segment.size}%</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${segment.revenue}M</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${segment.satisfaction}/5</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${segment.churn < 15 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${segment.churn}%
                    </span>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadCompetitiveLandscapeData() {
        this.createMarketShareChart();
        this.createCompetitorGrowthChart();
        this.createSWOTAnalysis();
        this.createCompetitorCards();
    }

    createMarketShareChart() {
        const ctx = document.getElementById('marketShareChart').getContext('2d');
        
        if (this.charts.marketShare) {
            this.charts.marketShare.destroy();
        }

        this.charts.marketShare = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: marketData.competitiveLandscape.marketShare.map(c => c.company),
                datasets: [{
                    data: marketData.competitiveLandscape.marketShare.map(c => c.share),
                    backgroundColor: ['#4f46e5', '#ef4444', '#10b981', '#f59e0b', '#6b7280'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createCompetitorGrowthChart() {
        const ctx = document.getElementById('competitorGrowthChart').getContext('2d');
        
        if (this.charts.competitorGrowth) {
            this.charts.competitorGrowth.destroy();
        }

        this.charts.competitorGrowth = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: marketData.competitiveLandscape.marketShare.map(c => c.company),
                datasets: [{
                    label: 'Growth Rate (%)',
                    data: marketData.competitiveLandscape.marketShare.map(c => c.growth),
                    backgroundColor: marketData.competitiveLandscape.marketShare.map(c => 
                        c.company === 'Our Company' ? '#4f46e5' : '#e5e7eb'
                    ),
                    borderColor: marketData.competitiveLandscape.marketShare.map(c => 
                        c.company === 'Our Company' ? '#4f46e5' : '#9ca3af'
                    ),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createSWOTAnalysis() {
        const container = document.getElementById('swot-analysis');
        const swot = marketData.competitiveLandscape.swotAnalysis;
        
        const swotQuadrants = [
            { title: 'Strengths', items: swot.strengths, color: 'bg-green-50 border-green-200', icon: 'fa-thumbs-up text-green-600' },
            { title: 'Weaknesses', items: swot.weaknesses, color: 'bg-red-50 border-red-200', icon: 'fa-thumbs-down text-red-600' },
            { title: 'Opportunities', items: swot.opportunities, color: 'bg-blue-50 border-blue-200', icon: 'fa-lightbulb text-blue-600' },
            { title: 'Threats', items: swot.threats, color: 'bg-yellow-50 border-yellow-200', icon: 'fa-exclamation-triangle text-yellow-600' }
        ];

        container.innerHTML = '';
        swotQuadrants.forEach(quadrant => {
            const div = document.createElement('div');
            div.className = `${quadrant.color} border rounded-lg p-4`;
            div.innerHTML = `
                <h4 class="font-semibold mb-3 flex items-center">
                    <i class="fas ${quadrant.icon} mr-2"></i>
                    ${quadrant.title}
                </h4>
                <ul class="space-y-1">
                    ${quadrant.items.map(item => `<li class="text-sm text-gray-700">• ${item}</li>`).join('')}
                </ul>
            `;
            container.appendChild(div);
        });
    }

    createCompetitorCards() {
        const container = document.getElementById('competitor-cards');
        container.innerHTML = '';

        marketData.competitiveLandscape.competitorAnalysis.forEach(competitor => {
            const threatColor = competitor.threatLevel === 'High' ? 'text-red-600' : 
                               competitor.threatLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600';
            
            const card = document.createElement('div');
            card.className = 'bg-white border rounded-lg p-4';
            card.innerHTML = `
                <h4 class="font-semibold mb-2">${competitor.name}</h4>
                <div class="mb-3">
                    <span class="text-xs bg-gray-100 px-2 py-1 rounded">${competitor.marketPosition}</span>
                    <span class="text-xs px-2 py-1 rounded ml-2 ${threatColor}">${competitor.threatLevel} Threat</span>
                </div>
                <div class="mb-3">
                    <h5 class="text-sm font-medium text-green-600 mb-1">Strengths:</h5>
                    <ul class="text-xs text-gray-600">
                        ${competitor.strengths.map(s => `<li>• ${s}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h5 class="text-sm font-medium text-red-600 mb-1">Weaknesses:</h5>
                    <ul class="text-xs text-gray-600">
                        ${competitor.weaknesses.map(w => `<li>• ${w}</li>`).join('')}
                    </ul>
                </div>
            `;
            container.appendChild(card);
        });
    }

    loadRegionalAnalysisData() {
        this.createRegionalRevenueChart();
        this.createRegionalGrowthChart();
        this.createRegionalTable();
    }

    createRegionalRevenueChart() {
        const ctx = document.getElementById('regionalRevenueChart').getContext('2d');
        
        if (this.charts.regionalRevenue) {
            this.charts.regionalRevenue.destroy();
        }

        this.charts.regionalRevenue = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: marketData.regionalData.map(r => r.region),
                datasets: [{
                    label: 'Revenue ($M)',
                    data: marketData.regionalData.map(r => r.revenue),
                    backgroundColor: '#4f46e5',
                    borderColor: '#4f46e5',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createRegionalGrowthChart() {
        const ctx = document.getElementById('regionalGrowthChart').getContext('2d');
        
        if (this.charts.regionalGrowth) {
            this.charts.regionalGrowth.destroy();
        }

        this.charts.regionalGrowth = new Chart(ctx, {
            type: 'line',
            data: {
                labels: marketData.regionalData.map(r => r.region),
                datasets: [{
                    label: 'Growth Rate (%)',
                    data: marketData.regionalData.map(r => r.growth),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createRegionalTable() {
        const tbody = document.getElementById('regional-tbody');
        tbody.innerHTML = '';

        marketData.regionalData.forEach(region => {
            const opportunityLevel = region.growth > 15 ? 'High' : region.growth > 10 ? 'Medium' : 'Low';
            const opportunityColor = opportunityLevel === 'High' ? 'bg-green-100 text-green-800' : 
                                   opportunityLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                   'bg-red-100 text-red-800';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${region.region}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${region.revenue}M</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${region.growth}%</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${region.marketShare}%</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${opportunityColor}">
                        ${opportunityLevel}
                    </span>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    showLoadingOverlay(show) {
        const overlay = document.getElementById('loading-overlay');
        if (show) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }

    refreshDashboard() {
        this.showLoadingOverlay(true);
        
        // Simulate refresh delay
        setTimeout(() => {
            this.loadSectionData(this.currentSection);
            this.showLoadingOverlay(false);
            
            // Show success message
            this.showNotification('Dashboard refreshed successfully!', 'success');
        }, 1500);
    }

    exportReport() {
        // Create a comprehensive report
        const reportData = {
            timestamp: new Date().toISOString(),
            marketOverview: marketData.kpis.current,
            industryTrends: marketData.industryTrends,
            customerSegments: marketData.customerSegments,
            competitiveLandscape: marketData.competitiveLandscape,
            regionalAnalysis: marketData.regionalData
        };

        // Convert to JSON and download
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `market-research-report-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('Report exported successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MarketDashboard();
});